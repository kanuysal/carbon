import { g as e } from "./all.xlujcirQ.js";
import { S as o } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
e.registerPlugin(o);
class d {
  constructor(t, i, a, s) {
    ((this.data = t),
      (this.done = i),
      (this.check = a),
      (this.app = s),
      (this.scroll = this.app.scroll.lenis),
      (this.prevContainer = this.data.current.container),
      (this.nextContainer = this.data.next.container),
      (this.canvasContainer = document.querySelector(".canvas-container")),
      this.init());
  }
  init() {
    ((this.tl = e.timeline({
      onStart: () => this.start(),
      onComplete: () => this.complete(),
      defaults: { ease: "expo.inOut", duration: 1.4 },
    })),
      this.tl.to(this.nextContainer, {
        clipPath: "polygon(0 -10%, 100% 0%, 100% 100%, 0 100%)",
        willChange: "clip-path, transform",
        y: "0vh",
      }),
      this.data.current.namespace === "home" &&
        (this.app.gl.world.models.forEach((t) => {
          (this.tl.to(t.inner.material.uniforms.uOpacity, { value: 0, duration: 0.8, ease: "power2.out" }, 0.2),
            this.tl.to(t.material.material.uniforms.uOpacity, { value: 0, duration: 0.8, ease: "power2.out" }, "<"));
        }),
        this.tl.to(
          this.app.gl.world.footerGradient.material.uniforms.uProgress,
          { value: 0, duration: 0.8, overwrite: !0 },
          "<",
        )),
      this.app.gl.world.footerModel &&
        this.tl.to(
          this.app.gl.world.footerModel.material.material.uniforms.uOpacity,
          { value: 0, duration: 0.8, ease: "power2.out" },
          0.2,
        ));
  }
  async start() {
    (this.scroll.destroy(),
      e.set(this.nextContainer, {
        height: "100dvh",
        overflow: "hidden",
        position: "fixed",
        y: "20vh",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 1,
        autoAlpha: 1,
        clipPath: "polygon(0 100%, 100% 140%, 100% 100%, 0 100%)",
        backgroundColor: this.data.next.namespace === "home" ? "#dedede" : "#000000",
      }),
      e.set(this.prevContainer, { zIndex: 0, position: "relative" }),
      this.app.trigger("destroy"),
      await this.check(this.nextContainer, this.app),
      await this.app.page.triggerLoad(),
      await this.app.moduleLoader.loadModules(this.nextContainer),
      this.data.next.namespace === "home"
        ? (this.app.page.loader.tl.progress(1),
          document.body.classList.remove("bg-black", "text-white"),
          document.body.classList.add("bg-grey", "text-black"),
          setTimeout(() => document.body.classList.remove("white-nav", "high-noise"), 500))
        : setTimeout(() => document.body.classList.add("white-nav", "high-noise"), 240));
  }
  async complete() {
    if (
      (e.set(this.nextContainer, {
        clearProps: "width,height,overflow,position,top,left,zIndex,clipPath,backgroundColor,willChange,y",
      }),
      this.done(),
      this.app.trigger("worldDestroy"),
      (this.app.gl.loaded = !1),
      (this.app.options.onceLoaded = !0),
      this.app.scroll.destroy(),
      window.scrollTo(0, 0),
      (document.documentElement.style.scrollBehavior = "instant"),
      window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
      requestAnimationFrame(() => {
        (window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
          requestAnimationFrame(() => {
            (window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
              (document.documentElement.style.scrollBehavior = ""),
              setTimeout(() => {
                (this.app.scroll.init(), this.app.trigger("newLenis"), o.refresh());
              }, 100));
          }));
      }),
      await this.app.gl.loadWorld(this.nextContainer),
      this.data.next.namespace === "home")
    ) {
      const t = window.innerWidth < 768 ? 0.1 : 0;
      (await this.app.page.loader.loadModel(t), (document.querySelector(".canvas-container").style.zIndex = -1));
    } else this.data.next.namespace === "about" && (document.querySelector(".canvas-container").style.zIndex = 10);
  }
}
export { d as default };
