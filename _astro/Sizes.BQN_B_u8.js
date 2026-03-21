import { E as o } from "./Layout.astro_astro_type_script_index_0_lang.313rQJIa.js";
class c extends o {
  constructor() {
    (super(),
      (this.width = window.innerWidth),
      (this.height = window.innerHeight),
      (this.pixelRatio = Math.min(window.devicePixelRatio, 2)),
      (this.aspect = this.width / this.height),
      (this.aspectV = this.height / this.width));
    let e = window.innerWidth,
      h = window.innerHeight,
      n = e;
    const d = () => {
      let t = window.innerWidth,
        i = window.innerHeight;
      ((e !== t || (n >= 991 && h !== i)) &&
        ((this.width = window.innerWidth),
        (this.height = window.innerHeight),
        (this.pixelRatio = Math.min(window.devicePixelRatio, 2)),
        (this.aspect = this.width / this.height),
        (this.aspectV = this.height / this.width),
        this.trigger("resize")),
        (e = window.innerWidth));
    };
    function s(t) {
      let i;
      return function (w) {
        (i && clearTimeout(i), (i = setTimeout(t, 300, w)));
      };
    }
    window.addEventListener(
      "resize",
      s(function (t) {
        d();
      }),
    );
  }
}
export { c as default };
