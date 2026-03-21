import { g as i } from "./all.xlujcirQ.js";
import { S as n } from "./SplitText.Cpc1cBKW.js";
import { S as r } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
i.registerPlugin(r, n);
class u {
  constructor(t, e) {
    ((this.instance = t),
      (this.app = e),
      (this.destroyed = !1),
      (this.parent = this.instance.parentElement),
      (this.textParent = this.instance.querySelector(".h1") || this.instance.querySelector(".h2")),
      (this.text = this.textParent.querySelectorAll("div")),
      (this.notAnimateY = this.instance.dataset.notAnimateY === "true"),
      (this.long = this.instance.dataset.long === "true"),
      (this.negativeYTrigger = this.instance.dataset.negativeYTrigger === "true"),
      (this.quick = i.quickSetter(this.textParent, "y", "px")),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {
    ((this.split = new n(this.text, { type: "lines" })),
      (this.tl = i.timeline({ defaults: { ease: "expo.out" }, paused: !0 })),
      this.tl
        .fromTo(this.split.lines[0], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 0)
        .fromTo(
          this.split.lines[0],
          { xPercent: -10 },
          { xPercent: 0, duration: 0.8, willChange: "transform", force3D: !0 },
          "<",
        ),
      this.split.lines[1] &&
        this.tl
          .fromTo(this.split.lines[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, "<0.4")
          .fromTo(
            this.split.lines[1],
            { xPercent: 10 },
            { xPercent: 0, duration: 0.5, willChange: "transform", force3D: !0 },
            "<",
          ),
      this.split.lines[2] &&
        this.tl
          .fromTo(this.split.lines[2], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, "<0.2")
          .fromTo(
            this.split.lines[2],
            { xPercent: -10 },
            { xPercent: 0, duration: 0.5, willChange: "transform", force3D: !0 },
            "<",
          ),
      this.split.lines[3] &&
        this.tl
          .fromTo(this.split.lines[3], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, "<0.2")
          .fromTo(
            this.split.lines[3],
            { xPercent: 10 },
            { xPercent: 0, duration: 0.5, willChange: "transform", force3D: !0 },
            "<",
          ),
      this.split.lines[4] &&
        this.tl
          .fromTo(this.split.lines[4], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, "<0.2")
          .fromTo(
            this.split.lines[4],
            { xPercent: -10 },
            { xPercent: 0, duration: 0.5, willChange: "transform", force3D: !0 },
            "<",
          ));
    const t = window.innerWidth < 768;
    if (
      ((this.enterScroll = r.create({
        trigger: this.long ? this.instance.parentElement : this.textParent,
        start: this.long ? (t ? "center center+=75%" : "center center+=130%") : "top 80%",
        end: this.long ? (t ? "center center-=20%" : "center center+=30%") : "top top",
        scrub: !0,
        animation: this.tl,
      })),
      this.notAnimateY)
    ) {
      if (window.innerWidth < 1023) return;
      ((this.heroTitleEnterTl = i.timeline({ paused: !0, defaults: { ease: "linear" } })),
        this.heroTitleEnterTl.fromTo(
          this.textParent,
          { y: window.innerHeight * 0.5 + this.textParent.offsetHeight },
          { y: 0 },
        ),
        (this.heroTitleLeaveTl = i.timeline({ paused: !0, defaults: { ease: "linear" } })),
        this.heroTitleLeaveTl.fromTo(
          this.textParent,
          { y: 0 },
          { y: (window.innerHeight * 0.5 + this.textParent.offsetHeight) * -1, immediateRender: !1 },
        ),
        (this.heroTitleEnterScroll = r.create({
          trigger: this.instance.parentElement,
          start: "top top",
          end: "center center+=130%",
          scrub: !0,
          animation: this.heroTitleEnterTl,
        })),
        (this.heroTitleLeaveScroll = r.create({
          trigger: this.instance.parentElement,
          start: "center center-=130%",
          end: "bottom bottom",
          scrub: !0,
          animation: this.heroTitleLeaveTl,
        })));
    } else {
      const e = this.calculateTop() - this.calculateTop() * 0.2,
        s = this.textParent.getBoundingClientRect().height / 6;
      this.scrollTrigger = r.create({
        trigger: this.parent,
        start: "top -50%",
        end: "bottom bottom",
        onUpdate: (l) => {
          this.quick((e + s) * -1 * l.progress);
        },
      });
    }
  }
  calculateTop() {
    if (this.destroyed) return;
    const t = this.parent.getBoundingClientRect().top,
      e = this.textParent.getBoundingClientRect().top;
    return Math.abs(t - e);
  }
  resize() {
    this.destroyed ||
      (this.heroTitleEnterScroll?.kill(),
      this.heroTitleLeaveScroll?.kill(),
      this.heroTitleEnterTl?.kill(),
      this.heroTitleLeaveTl?.kill(),
      this.scrollTrigger?.kill(),
      this.split?.revert(),
      this.tl?.kill(),
      this.enterScroll?.kill(),
      this.leaveScroll?.kill(),
      this.quick(0),
      this.init());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { u as default };
