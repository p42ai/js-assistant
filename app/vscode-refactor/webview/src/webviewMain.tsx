import * as React from "react";
import * as ReactDOM from "react-dom";
import ErrorBoundary from "./component/ErrorBoundary";
import { AssistantPanel } from "./panel/assistant/AssistantPanel";
import { DependencyVisualizationView } from "./panel/dependency-visualization/DependencyVisualizationView";
import { FileScanView } from "./panel/file-scan/FileScanView";
import * as StateManager from "./vscode/StateManager";

const webviewId = document!.currentScript!.getAttribute("data-webview-id")!;

const MainView: React.FC<{
  state: any | undefined;
}> = ({ state }) => {
  switch (webviewId) {
    case "assistant":
      return <AssistantPanel data={state} />;
    case "dependency-visualization":
      return <DependencyVisualizationView data={state} />;
    case "file-scan":
      return <FileScanView data={state} />;
    default:
      return <></>;
  }
};

function render(state?: any | undefined) {
  try {
    ReactDOM.render(
      <React.StrictMode>
        <ErrorBoundary>
          <MainView state={state} />
        </ErrorBoundary>
      </React.StrictMode>,
      document.getElementById("root")
    );
  } catch (error) {
    console.error(error);
  }
}

StateManager.registerUpdateListener(render);

render();
