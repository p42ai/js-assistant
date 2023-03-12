// TODO convert to Module
export const Flags = {
  isSet(state: number, flag: number): boolean {
    return (state & flag) === flag;
  },

  isAnySet(state: number, flags: number): boolean {
    return !!(state & flags);
  },

  clear(state: number, flag: number): number {
    return state & ~flag;
  },

  set(state: number, flag: number): number {
    return state | flag;
  },
};
