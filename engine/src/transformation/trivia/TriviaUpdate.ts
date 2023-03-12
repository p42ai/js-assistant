import { TriviaManager } from "./TriviaManager";

export interface TriviaUpdate {
  addOverlays(triviaManager: TriviaManager): void;
}
