import * as fs from "fs";

export function generateProjectJson(filename, path, dependencies) {
  fs.writeFileSync(
    filename,
    `{
      "root": "${path}",
      "targets": {
        "compile": {
          "dependsOn": ["^compile"],
          "executor": "nx:run-commands",
          "options": {
            "cwd": "${path}",
            "command": "tsc --build"
          }
        },
        "test": {
          "dependsOn": ["compile"],
          "executor": "nx:run-commands",
          "options": {
            "cwd": "${path}",
            "command": "jest"
          }
        }
      }
    }
    
`
  );

  // eslint-disable-next-line no-console
  console.log(`generated ${filename}`);
}
