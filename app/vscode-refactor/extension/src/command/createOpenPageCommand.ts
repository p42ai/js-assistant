import { DomainInformation } from "../configuration/vscode/DomainInformation";

export const createOpenPageCommand =
  ({
    domainInformation,
    path,
  }: {
    domainInformation: DomainInformation;
    path: string;
  }) =>
  async () =>
    domainInformation.openUrl({
      path,
    });
