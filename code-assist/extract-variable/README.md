# Extract Variable

## Improvement

### Target Scope Selection
I'm thinking about implementing the target scope selection with a input box, i.e. the context menu would show
* Top-level scope should always be a potential target.
* Extract multiple occurrences into const *default, exact number of occurrences depends on target scope*
* Extract single occurrence into const
and then in the next step a input box would show up with multiple options for the available target scopes (just enter would select the preferred scope, i.e. the one where the occurrence count stops increasing).

## Known Issues
* When there is an `arguments` identifier, its scope needs to be considered (function scoped)
* Extract not possible when the text does not match the AST structure:
  `const arrowFunction = (aParam) => aParam * aParam * anObject.someProperty;`
  Extracting `aParam * anObject.someProperty` is not possible
* "Extract 0 occurrences" shows up frequently?
* Extracting empty array from return breaks typescript inference (should warn)
* Extracting breaking type inference (here: codeassistprovider):
  ```typescript
    const result = await runMultiphase({
      content: new FixedContent("test.js", undefined, `a.b();`),
      sourceDocumentFactory: new SourceDocumentFactory(CoreAugmentations, [
        type,
      ]),
      codeAssistProvider: {
        async getCodeAssists(sourceDocument) {
          const { codeAssists } = await sourceDocument.getScanCodeAssists({
            codeAssistTypeIds: [type.id],
            onlySuggestions: false,
          });
          return codeAssists.length > 0 ? [codeAssists[0]] : [];
        },
        recordApplicationResults(results) {
          applicationResults.push(results);
        },
      },
    });
    ```
* Potential bug extract read property usages into a variable when there are write usages (read after write might not have been updated) 
* Extracting moves expression to a scope with different type constraints and thus breaks on typescript.
* Extract not working for `candidate.transformationResults`:
  ```javascript
    const processedTransformationResults = new Set<TransformationResult>();
    for (const candidate of candidates) {
      for (const transformationResult of candidate.transformationResults) {
        if (processedTransformationResults.has(transformationResult)) {
          continue;
        }

        const nodesImpactedByTransformation =
          transformationResult.getImpactNodes();

        if (
          nodesImpactedByTransformation.some(
            (transformationNode) =>
              impactedNodes.includes(transformationNode) ||
              hasImpactedAncestor(
                transformationNode,
                transformationResult.match.context
              )
          )
        ) {
          applicationResults.push({
            codeAssistId: transformationResult.id,
            result: "rejected/conflict",
          });
          continue;
        }

        await transformationResult.apply(tree);

        processedTransformationResults.add(transformationResult);
        impactedNodes.push(...nodesImpactedByTransformation);

        applicationResults.push({
          codeAssistId: transformationResult.id,
          result: "applied",
        });
      }
    }

    return {
      edit: this.convertEditToAbsoluteRange(tree.toEdit()),
      applicationResults,
    };
  }
  ```

* Better extract in JSX (`codeAssist.documentation`)
  ```javascript
        {codeAssistCategories.map((category) => (
          <>
            {/* Anchor is used to offset navigation bar */}
            <a className={classes.anchor} id={category.id} />
            <h2>{category.title}</h2>
            {category.description && <p>{category.description}</p>}
            <ul>
              {Object.values(codeAssists)
                .filter((codeAssist) =>
                  (codeAssist.documentation.categories as Array<string>).includes(
                    category.id
                  )
                )
                .map((codeAssist) => {
                  const isUpsell = codeAssist.limitedToProAndBusiness ?? false;
                  return (
                    <li>
                      <b>
                        <InternalLink href={CodeAssistPage.route(codeAssist.id)}>
                          {codeAssist.documentation.title}
                        </InternalLink>
                        {isUpsell && <ProTag />}
                      </b>
                      <Markdown
                        source={codeAssist.documentation.shortDescription ?? ""}
                        style={{ marginTop: "-5px" }}
                      />
                    </li>
                  );
                })}
            </ul>
          </>
        ))}
  ```

* Comment duplication when extracting match.captures.elseIf
```javascript
  async apply(match: MoveIfElseIfBranchesMatch, tree: TransformedNodeTree) {
    const newElseStatement = tree.updateIfStatement(match.node, {
      elseStatement: match.captures.elseIf.elseStatement ?? null,
    });

    const newNode = newElseStatement;
    tree.replace(
      match.node,
      tree.updateIfStatement(match.captures.elseIf, {
        elseStatement: newNode,
      })
    );

    const context = match.context;

    const position = context.selectedRange?.start;
    if (position != null) {
      return Promise.resolve(
        EditorOperation.moveCursorInside(
          tree.getNodePath(newNode),
          position - match.captures.elseIf.pos - 1 // TODO why is -1 needed?
        )
      );
    }
  }
```