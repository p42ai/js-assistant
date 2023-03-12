import _ from "lodash";
import { getId } from "../ast/getId";

const idReplacer = (value: any) => getId(value) ?? value;

export function toEqualWithNodeIds(received: any, expected: any) {
  const receivedWithIds = _.cloneDeepWith(received, idReplacer);
  const expectedWithIds = _.cloneDeepWith(expected, idReplacer);

  return _.isEqual(receivedWithIds, expectedWithIds)
    ? {
        message: () =>
          `${receivedWithIds} equal to expected ${expectedWithIds}`,
        pass: true,
      }
    : {
        message: () =>
          `${receivedWithIds} is not equal to expected ${expectedWithIds}`,
        pass: false,
      };
}
