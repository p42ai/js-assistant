export type EcmaScriptVersion =
  | "ES5"
  | "ES2015"
  | "ES2016"
  | "ES2017"
  | "ES2018"
  | "ES2019"
  | "ES2020"
  | "ES2021"
  | "ES2022"
  | "ESNEXT";

const orderedEcmaScriptVersions = [
  "ES5",
  "ES2015", // ES6
  "ES2016",
  "ES2017",
  "ES2018",
  "ES2019",
  "ES2020",
  "ES2021",
  "ES2022",
  "ESNEXT",
];

export const isEcmaScriptVersionSupported = (
  ecmaScriptVersion: EcmaScriptVersion | undefined,
  targetVersion: EcmaScriptVersion | undefined
) =>
  ecmaScriptVersion == null ||
  targetVersion == null ||
  orderedEcmaScriptVersions.indexOf(ecmaScriptVersion) <=
    orderedEcmaScriptVersions.indexOf(targetVersion);

export const isEcmaScriptVersion = (
  value: string
): value is EcmaScriptVersion => orderedEcmaScriptVersions.includes(value);
