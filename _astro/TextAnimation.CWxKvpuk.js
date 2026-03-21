import { g as t } from "./all.xlujcirQ.js";
import { S as i } from "./SplitText.Cpc1cBKW.js";
import { S as e } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
t.registerPlugin(e, i);
class p {
  constructor(s, r) {
    ((this.instance = s),
      (this.app = r),
      (this.destroyed = !1),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {
    ((this.isDesktop = window.innerWidth > 1024),
      (this.delay = (this.isDesktop && this.instance.dataset.delay) || 0),
      (this.text = this.instance.querySelectorAll("p")),
      (this.text = this.text.length ? this.text : [this.instance]),
      (this.split = new i(this.text, { type: "lines", linesClass: "text-line" })),
      (this.splitSecond = new i(this.text, { type: "lines" })),
      t.set(this.splitSecond.lines, { overflow: "clip", paddingBottom: "0.1em", marginBottom: "-0.1em" }),
      (this.tl = t.timeline({
        defaults: { ease: "power2" },
        paused: !0,
        onComplete: () => {
          window.innerWidth < 768 && (this.split.revert(), this.tl.kill());
        },
      })),
      this.tl.fromTo(this.split.lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.8 }, this.delay),
      (this.tlScroll = e.create({ trigger: this.instance, start: "top 80%", onEnter: () => this.tl.play() })),
      window.innerWidth > 768 &&
        (this.tlScrollBack = e.create({
          trigger: this.instance,
          start: "top bottom",
          onLeaveBack: () => this.tl.pause(0),
        })));
  }
  resize() {
    this.destroyed ||
      (this.split.revert(), this.tl?.kill(), this.tlScroll?.kill(), this.tlScrollBack?.kill(), this.init());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { p as default };
