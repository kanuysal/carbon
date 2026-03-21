import { g as s } from "./all.xlujcirQ.js";
import { S as t } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
s.registerPlugin(t);
class h {
  constructor(i, e) {
    ((this.instance = i),
      (this.app = e),
      (this.destroyed = !1),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {
    ((this.tl = s.timeline({ paused: !0, defaults: { ease: "power2", duration: 0.8 } })),
      this.tl.fromTo(this.instance, { autoAlpha: 0 }, { autoAlpha: 1 }),
      (this.scroll = t.create({ trigger: this.instance, start: "top 85%", onEnter: () => this.tl.play() })),
      (this.scrollBack = t.create({
        trigger: this.instance,
        start: "top bottom",
        onLeaveBack: () => this.tl.pause(0),
      })));
  }
  resize() {
    this.destroyed || (this.tl?.kill(), this.scroll?.kill(), this.scrollBack?.kill(), this.init());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { h as default };
