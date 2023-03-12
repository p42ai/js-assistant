import { sleep } from "./sleep";

export const defer = async (): Promise<void> => sleep(0);
