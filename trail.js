export class Trail {
  #closed = false;
  static count = 0;

  constructor(name, km, rating, gain) {
    this.name = name;
    this.km = km;
    this.rating = rating;
    this.gain = gain;
    Trail.count++;
  }

  get steepness() { return Math.round(this.gain / this.km); }
  get isClosed() { return this.#closed; }
  close() { this.#closed = true; return this; }
  open() { this.#closed = false; return this; }
  describe() { return `${this.name} — ${this.km} km, ${this.rating}`; }
  toJSON() {
    return { name: this.name, km: this.km, rating: this.rating, gain: this.gain, closed: this.#closed };
  }
  static fromObject(obj) {
    const { name, km, rating, gain = 0 } = obj;
    return new Trail(name, km, rating, gain);
  }
}

export class BikeTrail extends Trail {
  constructor(name, km, rating, gain, surface = "gravel") {
    super(name, km, rating, gain);
    this.surface = surface;
  }
  describe() { return `${super.describe()} — ${this.surface}`; }
  toJSON() { return { ...super.toJSON(), surface: this.surface }; }
}
