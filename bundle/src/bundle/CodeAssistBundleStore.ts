import {
  CodeAssistMetadata,
  CodeAssistDocumentationCategories,
  isPathReadable,
} from "@p42/engine";
import * as fs from "fs";
import * as _ from "lodash";
import { CodeAssistBundle } from "./CodeAssistBundle";

export class CodeAssistBundleStore {
  readonly #path: string;

  constructor(path: string) {
    this.#path = path;
  }

  resolveBundlePath(bundleId: string, path: string) {
    return `${this.#path}/${bundleId}${path}`;
  }

  async readBundleContent(
    bundleId: string,
    path: string
  ): Promise<string | null> {
    return this.readPath(this.resolveBundlePath(bundleId, path));
  }

  async readPath(filePath: string): Promise<string | null> {
    return (await isPathReadable(filePath))
      ? fs.promises.readFile(filePath, { encoding: "utf8" })
      : null;
  }

  async readBundleJson(bundleId: string, path: string) {
    const content = await this.readBundleContent(bundleId, path);
    return content != null ? JSON.parse(content) : undefined;
  }

  async getBundle(id: string): Promise<CodeAssistBundle | undefined> {
    try {
      const metadata: CodeAssistMetadata = await this.readBundleJson(
        id,
        "/src/code-assist.json"
      );

      if (metadata == null) {
        throw `No metadata found for code assist bundle '${id}'.`;
      }

      const description = (await this.readBundleContent(
        id,
        "/doc/description.md"
      ))!;
      const safety = await this.readBundleContent(id, "/doc/safety.md");
      const rationale = await this.readBundleContent(id, "/doc/rationale.md");
      const mechanics = await this.readBundleContent(id, "/doc/mechanics.md");

      // validate category descriptions
      const { categories } = metadata.documentation;
      if (
        categories.length === 0 ||
        categories.some(
          (category) => !CodeAssistDocumentationCategories.includes(category)
        )
      ) {
        throw new Error(
          `invalid documentationCategories ${categories.join(", ")}`
        );
      }

      return {
        id,
        platform: metadata.platform,
        isEnabled: metadata.isEnabled ?? true,
        suggestions: metadata.suggestions ?? { available: false },
        requiresCloudAi: metadata.requiresCloudAi ?? false,
        visualStudioCode: metadata.visualStudioCode ?? null,
        documentation: {
          title: metadata.documentation.title,
          description: description ?? null,
          categories: metadata.documentation.categories,
          shortDescription: metadata.documentation.shortDescription ?? null,
          relatedCodeAssists: metadata.documentation.relatedCodeAssists ?? null,
          references: metadata.documentation.references ?? null,
          safety: safety ?? null,
          rationale: rationale ?? null,
          mechanics: mechanics ?? null,
        },
      } as any; // TODO better type safety
    } catch (ex) {
      console.error(ex);
      return undefined;
    }
  }

  async getBundles(): Promise<Record<string, CodeAssistBundle>> {
    const ids = await this.getRefactoringIds();
    const bundles = (
      await Promise.all(ids.map(async (id) => this.getBundle(id)))
    ).filter((bundle) => bundle != null) as Array<CodeAssistBundle>;
    return _.keyBy(bundles, (bundle) => bundle.id) as Record<
      string,
      CodeAssistBundle
    >;
  }

  async getRefactoringIds(): Promise<string[]> {
    const refactoringIds: string[] = [];

    const entries = await fs.promises.readdir(this.#path, {
      withFileTypes: true,
    });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        refactoringIds.push(entry.name);
      }
    }

    return refactoringIds;
  }
}
