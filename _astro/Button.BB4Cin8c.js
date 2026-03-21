import { L as s } from "./LinkAnimation.BShULeRV.js";
import "./all.xlujcirQ.js";
import "./CSSPlugin.pkypRvgD.js";
import "./SplitText.Cpc1cBKW.js";
class a {
  constructor(t, i) {
    ((this.instance = t),
      (this.app = i),
      (this.destroyed = !1),
      (this.text = this.instance.querySelectorAll("._32")),
      (this.hoverAnimation = new s(this.instance, this.text, this.app, !0)),
      this.init(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  init() {}
  resize() {
    this.destroyed;
  }
  destroy() {
    this.destroyed || (this.destroyed = !0);
  }
}
export { a as default };
