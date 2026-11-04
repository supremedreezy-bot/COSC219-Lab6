import { Trail, BikeTrail } from "./trail.js";

export class TrailRegistry {
  #trails = [];

  constructor(trails = []) {
    trails.forEach(trail => this.add(trail));
  }
  get size() { return this.#trails.length; }
  get all() { return [...this.#trails]; }
  add(trail) {
    if (!(trail instanceof Trail)) throw new TypeError("Expected a Trail");
    this.#trails.push(trail);
    return this;
  }
  find(name) {
    return this.#trails.find(trail => trail.name.toLowerCase() === name.toLowerCase());
  }
  byRating(rating) {
    return this.#trails.filter(trail => trail.rating === rating);
  }
  get openTrails() { return this.#trails.filter(trail => !trail.isClosed); }
  get totalDistance() {
    return Math.round(this.#trails.reduce((sum, trail) => sum + trail.km, 0) * 10) / 10;
  }
  get steepest() {
    return this.#trails.reduce((best, trail) =>
      !best || trail.steepness > best.steepness ? trail : best, undefined);
  }
  describeAll() { return this.#trails.map(trail => trail.describe()); }
  static fromData(rows) {
    const registry = new TrailRegistry();
    rows.forEach(row => {
      const { name, km, rating, gain = 0, surface } = row;
      registry.add(Object.hasOwn(row, "surface")
        ? new BikeTrail(name, km, rating, gain, surface)
        : Trail.fromObject(row));
    });
    return registry;
  }
}
