export class CommonUtils {
  static SHAPE_PADDING: number = 36;

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
    }
    return hash;
  }

  private static getNextSeedRandomValue(state: { s0: number; s1: number; s2: number; c: number }): number {
    const { s0, s1, s2, c } = state;
    const t = (s0 + s1 + s2) >>> 0;
    state.s0 = s1;
    state.s1 = s2;
    state.s2 = t;

    return ((t >>> 0) / 0x100000000) % 1;
  }

  static createSeededRandom(id: string) {
    const state = {
      s0: this.hashString(id),
      s1: this.hashString(id),
      s2: this.hashString(id),
      c: 1,
    };

    return () => this.getNextSeedRandomValue(state);
  }
}
