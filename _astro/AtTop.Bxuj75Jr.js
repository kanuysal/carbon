import { g as r } from "./index.xlujcirQ.js";
import { S as o } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
r.registerPlugin(o);
class p {
  constructor() {
    const t = document.querySelector("body");
    (t.classList.add("at-top"),
      o.create({
        trigger: t,
        start: "top top",
        end: "300 top",
        onLeave: () => t.classList.remove("at-top"),
        onEnterBack: () => t.classList.add("at-top"),
      }));
  }
}
export { p as default };
