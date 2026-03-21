import { g as i } from "./index.xlujcirQ.js";
import { S as s } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
i.registerPlugin(s);
class c {
  constructor(t, e, a) {
    ((this.instance = t),
      (this.main = e),
      (this.app = a),
      (this.maxLine = this.instance.dataset.line || 4),
      (this.items = this.instance.children),
      (this.items = [...this.items].filter((r) => !r.classList.contains("dashed"))),
      (this.destroyed = !1),
      this.init());
  }
  init() {
    (i.set(this.items, { autoAlpha: 0 }),
      (this.scroll = s.batch(this.items, {
        interval: 0.05,
        batchMax: this.maxLine,
        onEnter: (t) => i.to(t, { autoAlpha: 1, overwrite: !0, stagger: 0.1 }),
        start: "top 80%",
      })),
      (this.scrollBack = s.batch(this.items, {
        interval: 0.05,
        batchMax: this.maxLine,
        onLeaveBack: (t) => i.set(t, { autoAlpha: 0, overwrite: !0, stagger: 0 }),
        start: "top bottom",
      })));
  }
  resize() {
    this.destroyed || (this.scroll.forEach((t) => t.kill()), this.scrollBack.forEach((t) => t.kill()), this.init());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { c as default };
