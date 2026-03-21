import { E as e } from "./Layout.astro_astro_type_script_index_0_lang.313rQJIa.js";
class r extends e {
  constructor() {
    (super(),
      (this.start = Date.now()),
      (this.current = this.start),
      (this.elapsed = 0),
      (this.delta = 16),
      window.requestAnimationFrame(() => {
        this.tick();
      }));
  }
  tick() {
    const t = Date.now();
    ((this.delta = t - this.current),
      (this.current = t),
      (this.elapsed = this.current - this.start),
      this.trigger("tick"),
      window.requestAnimationFrame(() => {
        this.tick();
      }));
  }
}
export { r as default };
