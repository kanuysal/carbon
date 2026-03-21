import { g as t } from "./all.xlujcirQ.js";
import { S as e } from "./SplitText.Cpc1cBKW.js";
t.registerPlugin(e);
class o {
  constructor(s, i, r, n = !1) {
    ((this.instance = s),
      (this.text = i),
      (this.app = r),
      (this.setFixed = n),
      (this.destroyed = !1),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {
    ((this.split = new e(this.text[0], { type: "chars, lines", charsClass: "link-char" })),
      (this.splitSecond = new e(this.text[1], { type: "chars, lines", charsClass: "link-char" })),
      t.set([this.split.lines, this.splitSecond.lines], {
        overflow: "clip",
        paddingBottom: "0.1em",
        marginBottom: "-0.1em",
      }),
      (this.tl = t.timeline({ paused: !0, defaults: { ease: "power3", stagger: 0.02, duration: 0.8 } })),
      this.tl
        .to(this.split.chars, { yPercent: -110 }, 0)
        .fromTo(this.splitSecond.chars, { yPercent: 110 }, { yPercent: 0 }, "<0.1"),
      this.instance.addEventListener("mouseenter", () => this.tl.play()),
      this.instance.addEventListener("mouseleave", () => this.tl.reverse()));
  }
  resize() {
    this.destroyed ||
      (this.instance.removeEventListener("mouseenter", () => this.tl.play()),
      this.instance.removeEventListener("mouseleave", () => this.tl.reverse()),
      this.tl?.kill(),
      this.split?.revert(),
      this.splitSecond?.revert(),
      this.init());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { o as L };
