export class Grouping<KEY, VALUE> {
  private groups = new Map<KEY, Array<VALUE>>();

  addValue(key: KEY, value: VALUE) {
    if (!this.groups.has(key)) {
      this.groups.set(key, []);
    }
    this.groups.get(key)!.push(value);
  }

  getGroup(key: KEY): Array<VALUE> | undefined {
    return this.groups.get(key);
  }

  entries() {
    return this.groups.entries();
  }
}
