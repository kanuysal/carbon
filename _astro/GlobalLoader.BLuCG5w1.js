import { g as t } from "./all.xlujcirQ.js";
import { S as g } from "./SplitText.Cpc1cBKW.js";
import { S } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
t.registerPlugin(g);
const c = (m) => {
  const e = document.querySelector(".sidebar"),
    a = e.querySelectorAll(".side"),
    o = e.querySelectorAll("[data-item]"),
    r = e.querySelector(".sidebar-sign"),
    s = e.querySelectorAll("[data-divider]"),
    f = e.querySelector("[data-heart]"),
    y = document.querySelector("nav"),
    b = e.querySelector(".side-logo_parent"),
    h = e.querySelector(".side_logo-bg"),
    p = [...o].map((n) => new g(n, { type: "words, lines" }));
  p.forEach((n, l) => {
    t.set(n.lines, { overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" });
  });
  const i = t.timeline({ defaults: { ease: "power3", duration: 0.4 }, onStart: () => t.set(a, { autoAlpha: 1 }) }),
    u = 1024;
  return (
    t.matchMedia().add({ isLarge: `(min-width: ${u}px)`, isSmall: `(max-width: ${u - 1}px)` }, (n) => {
      const { isLarge: l, isSmall: d } = n.conditions;
      d &&
        (i.set(h, { autoAlpha: 0 }, 0),
        i.fromTo([b], { autoAlpha: 0 }, { autoAlpha: 1, onStart: () => t.set(h, { autoAlpha: 1 }) }, 0));
    }),
    p.forEach((n, l) => {
      const d = l === 0 ? 0 : "<0.2";
      i.fromTo(
        n.words,
        { xPercent: -110 },
        { xPercent: 0, stagger: 0.1, duration: 0.8, willChange: "transform", force3D: !0 },
        d,
      );
    }),
    i.from(f, { opacity: 0 }, "<0.2"),
    i.from(s, { scaleX: 0, stagger: 0.1 }, 0.1),
    i.fromTo(r, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "<0.2"),
    i.fromTo(y, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "<0.2"),
    i
  );
};
t.registerPlugin(S);
class A {
  constructor(e, a, o) {
    ((this.app = o),
      (this.toLoad = a),
      (this.main = e.container),
      (this.app.globalLoader = this),
      (this.noLoader = window.location.href.includes("no-loader")),
      (this.loaded = !1),
      (this.loader = document.querySelector(".loader")),
      (this.loaderPercentageParent = this.loader.querySelector(".loader_percentage")),
      (this.loaderSpan = this.loaderPercentageParent.querySelector("span")),
      (this.loaderLine = this.loader.querySelector(".loader_line")),
      (this.loaderLineParent = this.loader.querySelector(".loader_line-parent")),
      (this.navBody = document.querySelector(".nav_body")),
      (this.number = { value: 0 }),
      (this.fadeOut = { value: 1 }),
      (this.isMobile = window.innerWidth <= 768),
      (this.quick = this.isMobile
        ? t.quickSetter(this.loaderPercentageParent, "y", "px")
        : t.quickSetter(this.loaderPercentageParent, "x", "px")),
      (this.tl = t.timeline({
        paused: !0,
        defaults: { ease: "expo.inOut", duration: 4 },
        onStart: async () => {
          this.loaded || ((this.loaded = !0), await this.toLoad(o, this.main), await this.app.page.triggerLoad());
        },
        onComplete: () => this.complete(),
      })),
      this.tl
        .fromTo(
          this.number,
          { value: 0 },
          {
            value: 88,
            onUpdate: () => this.update(this.number.value),
            onStart: () => {
              setTimeout(() => (document.querySelector(".canvas-container").style.visibility = "visible"), 1e3);
            },
          },
        )
        .addLabel("start", ">"),
      this.tl
        .to(this.number, { value: 100, duration: 1, onUpdate: () => this.update(this.number.value) })
        .fromTo(this.loaderLineParent, { "--progress": 0 }, { "--progress": 1, duration: 0.8 }, "<80%")
        .fromTo(
          this.fadeOut,
          { value: 0 },
          {
            value: 1,
            duration: 1.3,
            onUpdate: () => this.gradientFade(),
            onStart: () => {
              (t.set(this.main, { autoAlpha: 1 }),
                this.main.getAttribute("data-transition-page") == "home"
                  ? this.app.page.loader.tl.play()
                  : this.main.getAttribute("data-transition-page") == "about" && this.app.page.loader.loadingTl.play());
            },
          },
          "<",
        )
        .fromTo(this.navBody, { "--nav-blur-load": 0 }, { "--nav-blur-load": 1, duration: 1 }, "<"),
      this.noLoader || this.tl.add(c(this.app), ">"),
      this.noLoader ? this.noLoaderLoad() : this.tl.tweenTo("start"),
      window.addEventListener("resize", () => {
        const r = this.isMobile;
        ((this.isMobile = window.innerWidth <= 768),
          r !== this.isMobile &&
            ((this.quick = this.isMobile
              ? t.quickSetter(this.loaderPercentageParent, "y", "px")
              : t.quickSetter(this.loaderPercentageParent, "x", "px")),
            this.isMobile
              ? t.set(this.loaderPercentageParent, { x: 0 })
              : t.set(this.loaderPercentageParent, { y: 0 })),
          this.update(this.number.value));
      }));
  }
  async noLoaderLoad() {
    (this.tl.kill(),
      await this.toLoad(this.app, this.main),
      await this.app.page.triggerLoad(),
      this.main.getAttribute("data-transition-page") == "home"
        ? this.app.page.loader.tl.play()
        : this.main.getAttribute("data-transition-page") == "about" && this.app.page.loader.loadingTl.play(),
      setTimeout(() => this.complete(), 500),
      c(this.app).play());
  }
  complete() {
    ((this.app.options.onceLoaded = !0),
      this.app.trigger("onceLoaded"),
      t.set(this.loader, { autoAlpha: 0 }),
      t.set(this.main, { autoAlpha: 1 }),
      this.main.getAttribute("data-transition-page") == "password"
        ? this.app.page.load()
        : this.main.getAttribute("data-transition-page") == "about" &&
          (document.querySelector(".canvas-container").style.zIndex = 10),
      this.main.getAttribute("data-transition-page") == "home" &&
        this.app.gl.loaderGradient &&
        (this.app.gl.loaderGradient.material.dispose(),
        this.app.gl.loaderGradient.geometry.dispose(),
        this.app.gl.scene.remove(this.app.gl.loaderGradient),
        (this.app.gl.loaderGradient = null),
        (this.app.loaderGradientAdded = !1)));
  }
  update(e) {
    (this.loaderLine.style.setProperty("--progress", e / 100), (this.loaderSpan.innerText = `${Math.round(e)}%`));
    const a = this.loaderPercentageParent.getBoundingClientRect(),
      o = this.loaderLine.getBoundingClientRect();
    if (this.isMobile) {
      const s = (o.height - a.height) * (1 - e / 100);
      (this.quick(s),
        this.loaderLine.style.setProperty("--y", s + "px"),
        this.loaderLine.style.setProperty("--textHeight", a.height + "px"));
    } else {
      const s = ((o.width - a.width) * e) / 100;
      (this.quick(s),
        this.loaderLine.style.setProperty("--x", s + "px"),
        this.loaderLine.style.setProperty("--textWidth", a.width + "px"));
    }
    if (
      !this.noLoader &&
      this.main.getAttribute("data-transition-page") == "home" &&
      this.app.loaderGradientAdded &&
      !this.app.options.onceLoaded
    ) {
      const r = t.utils.mapRange(0, 100, 0, 1.4, e);
      this.app.gl.loaderGradient.material.uniforms.uProgress.value = r;
    }
  }
  gradientFade() {
    if (!this.noLoader && this.main.getAttribute("data-transition-page") == "home" && this.app.loaderGradientAdded) {
      const e = t.utils.mapRange(0, 1, 1.4, 0, this.fadeOut.value);
      this.app.gl.loaderGradient.material.uniforms.uProgress.value = e;
    }
  }
}
export { A as default };
