import { g as e } from "./all.xlujcirQ.js";
import { S as s } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
e.registerPlugin(s);
class c {
  constructor(t, o) {
    ((this.instance = t),
      (this.app = o),
      (this.destroyed = !1),
      (this.modelLoaded = !1),
      (this.links = this.instance.querySelectorAll(".footer_anchor")),
      this.links.forEach((i) => {
        const r = i.querySelector("._32").textContent;
        i.addEventListener("click", () => {
          ((this.app.options.anchor = r), this.app.barba.go("/"));
        });
      }),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {
    this.tl = e.timeline({});
    const t = window.innerHeight * 0.5;
    (this.tl.fromTo(this.instance.querySelector(".footer_img"), { y: -t }, { y: 0, ease: "none" }),
      (this.scroll = s.create({
        trigger: this.instance,
        start: "top bottom",
        end: "top top",
        scrub: !0,
        animation: this.tl,
      })));
  }
  resize() {
    this.destroyed ||
      (this.tl.kill(), this.scroll.kill(), this.scrollModel?.kill(), this.modelLoaded && this.model(), this.init());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { c as default };
