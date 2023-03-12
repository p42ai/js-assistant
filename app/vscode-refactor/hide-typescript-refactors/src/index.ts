const pluginMarker = Symbol("__p42HideTypeScriptRefactorsMarker__");

const overlappingRefactorNames: Array<string> = [
  "Add or remove braces in an arrow function",
  // "Convert arrow function or function expression",
];

function init(modules: {
  typescript: typeof import("typescript/lib/tsserverlibrary");
}) {
  const ts = modules.typescript;
  return {
    shouldRemoveOverlappingRefactors: false,

    create(info: ts.server.PluginCreateInfo) {
      const typescriptLanguageService = info.languageService;

      // note: very defensive programming to prevent (potentially unknown) versions of the
      // typescript language service from crashing when this plugin is installed.
      try {
        // check if already decorated:
        if ((typescriptLanguageService as any)[pluginMarker]) {
          return typescriptLanguageService;
        }

        const decorator: ts.LanguageService = Object.create({
          [pluginMarker]: true,
        });

        for (const methodName of Object.keys(
          typescriptLanguageService
        ) as Array<keyof ts.LanguageService>) {
          const originalMethod = typescriptLanguageService[methodName]!;
          // @ts-expect-error dynamic
          decorator[methodName] = (...args: Array<unknown>) =>
            // @ts-expect-error dynamic
            originalMethod.apply(typescriptLanguageService, args);
        }

        decorator.getApplicableRefactors = (...args) => {
          let refactors = typescriptLanguageService.getApplicableRefactors(
            ...args
          );

          try {
            if (this.shouldRemoveOverlappingRefactors) {
              refactors = this.removeOverlappingRefactors(refactors);
            }
          } catch (error) {
            // ignore
          }

          return refactors;
        };

        return decorator;
      } catch (error) {
        return typescriptLanguageService;
      }
    },

    removeOverlappingRefactors(
      refactors: Array<ts.ApplicableRefactorInfo>
    ): Array<ts.ApplicableRefactorInfo> {
      try {
        return refactors?.filter(
          (refactor) => !overlappingRefactorNames.includes(refactor.name)
        );
      } catch (error) {
        return refactors;
      }
    },

    onConfigurationChanged(configuration: any) {
      this.shouldRemoveOverlappingRefactors =
        configuration?.shouldRemoveOverlappingRefactors ?? false;
    },
  };
}

export = init;
