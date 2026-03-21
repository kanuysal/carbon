import { g as o } from "./all.xlujcirQ.js";
import { S as a } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
o.registerPlugin(a);
class h {
  constructor(r, s) {
    ((this.instance = r),
      (this.app = s),
      (this.destroyed = !1),
      (this.items = this.instance.querySelectorAll("[data-item]")),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {
    this.tls = [...this.items].map((r, s) => {
      const t = r.querySelector("[data-number]"),
        n = parseInt(t.getAttribute("data-number-end")),
        i = { value: 0 },
        e = o.timeline({ paused: !0, defaults: { ease: "power3", duration: 2 } });
      (e.fromTo(t, { opacity: 0 }, { opacity: 1, ease: "power1", duration: 0.5 }, s * 0.1),
        e.to(
          i,
          {
            value: n,
            onUpdate: () => {
              t.textContent = Math.round(i.value);
            },
          },
          "<0",
        ));
      const u = a.create({ trigger: t, start: "top 80%", onEnter: () => e.play() });
      return { tl: e, scroll: u };
    });
  }
  resize() {
    this.destroyed;
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { h as default };
