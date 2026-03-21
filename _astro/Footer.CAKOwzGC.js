import { g as s } from "./all.xlujcirQ.js";
import { L as c } from "./LinkAnimation.BShULeRV.js";
import { S as o } from "./ScrollTrigger.C4gmGO9R.js";
import { S as n } from "./SplitText.Cpc1cBKW.js";
import "./CSSPlugin.pkypRvgD.js";
s.registerPlugin(o, n);
class y {
  constructor(e, r, i) {
    ((this.instance = e),
      (this.app = r),
      (this.main = i),
      this.app.observer.instance.observe(this.instance),
      (this.changedTitle = this.instance.querySelector(".footer_change")),
      (this.title = this.instance.querySelector(".footer_title-parent")),
      (this.selectedLine = this.instance.querySelector(".footer_change")),
      (this.texts = this.title.querySelectorAll(".footer_title")),
      (this.slashes = this.instance.querySelectorAll(".footer_slash")),
      (this.links = this.instance.querySelectorAll(".link")),
      this.links.forEach((t) => new c(t, t.querySelectorAll("._32"), this.app)),
      (this.anchors = this.instance.querySelectorAll(".footer_anchor")),
      (this.logo = this.instance.querySelector(".footer_logo")),
      (this.logoSvgs = this.logo.querySelectorAll("svg")),
      (this.mailParent = this.instance.querySelector(".footer_mail-parent")),
      (this.mailElement = this.instance.querySelectorAll(".footer-mail")),
      (this.copiedMessage = this.instance.querySelector(".mail-copied")),
      (this.sidebar = document.querySelector(".sidebar")),
      (this.phrases = ["experiential", "branding", "digital"]),
      (this.destroyed = !1),
      (this.entered = !1),
      (this.currenIndex = 0),
      (this.modelFaded = !1),
      this.init(),
      this.createSlashes(),
      this.setupEmailCopy(),
      this.app.gl.on("loaded", () => this.createModelFadeTimeline()),
      this.app.options.onceLoaded || this.sideBarAnimation(),
      this.app.on("newLenis", () => this.sideBarAnimation()),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  sideBarAnimation() {
    this.destroyed ||
      ((this.sidebarTl = s.timeline({ defaults: { ease: "linear" } })),
      this.sidebarTl.fromTo(this.sidebar, { opacity: 1 }, { opacity: window.innerWidth < 1023 ? 1 : 0 }),
      (this.scrollSideBar = o.create({
        trigger: this.instance,
        start: "top 80%",
        end: "+=20%",
        animation: this.sidebarTl,
        scrub: !0,
      })));
  }
  setupEmailCopy() {
    !this.mailParent ||
      !this.mailElement ||
      !this.copiedMessage ||
      ((this.copiedMessage.style.opacity = "0"),
      (this.copiedMessage.style.transform = "translateY(10px)"),
      (this.copiedMessage.style.transition = "opacity 0.3s ease, transform 0.3s ease"),
      this.mailElement.length > 0 && (this.mailHover = new c(this.mailParent, this.mailElement, this.app, !0)),
      this.mailParent.addEventListener("click", async (e) => {
        e.preventDefault();
        const r = this.mailParent.dataset.mail;
        let i = !1;
        if (navigator.clipboard && window.isSecureContext)
          try {
            (await navigator.clipboard.writeText(r), (i = !0));
          } catch (t) {
            console.warn("Clipboard API failed, trying fallback:", t);
          }
        if (!i)
          try {
            const t = document.createElement("textarea");
            ((t.value = r),
              (t.style.position = "fixed"),
              (t.style.left = "-999999px"),
              (t.style.top = "-999999px"),
              document.body.appendChild(t),
              t.focus(),
              t.select());
            try {
              (document.execCommand("copy"), (i = !0));
            } catch (a) {
              console.error("Fallback copy failed:", a);
            } finally {
              t.remove();
            }
          } catch (t) {
            console.error("Failed to create fallback textarea:", t);
          }
        i
          ? ((this.copiedMessage.style.opacity = "1"),
            (this.copiedMessage.style.transform = "translateY(0)"),
            this.copiedTimeout && clearTimeout(this.copiedTimeout),
            (this.copiedTimeout = setTimeout(() => {
              ((this.copiedMessage.style.opacity = "0"), (this.copiedMessage.style.transform = "translateY(10px)"));
            }, 1e3)))
          : console.error("All copy methods failed");
      }));
  }
  createSlashes() {
    this.slashes.forEach((e) => {
      e.innerHTML = "";
      const r = e.offsetWidth,
        i = document.createElement("div");
      ((i.className = "_12 f-mono sm_7"), (i.textContent = "/"), (i.style.position = "absolute"), e.appendChild(i));
      const t = i.offsetWidth;
      e.removeChild(i);
      const a = Math.floor(r / t);
      for (let h = 0; h < a; h++) {
        const l = document.createElement("div");
        ((l.className = "_12 f-mono sm_7 leading-1.2"), (l.textContent = "/"), e.appendChild(l));
      }
    });
  }
  createModelFadeTimeline() {
    if (!this.app.gl || !this.app.gl.world) return;
    const e = this.app.gl.world;
    if (!e.material || !e.material.material) return;
    const r = e.material.material.uniforms;
    ((this.modelFadeTl = s.timeline({ paused: !0, defaults: { ease: "power2.inOut" } })),
      this.modelFadeTl.to(r.uLoading, { value: 0, duration: 1.2 }),
      (this.modelFadeScrollTrigger = o.create({
        trigger: this.instance,
        start: "top 60%",
        end: "bottom bottom",
        onUpdate: (i) => (r.uLoading.value = 1 - i.progress),
      })));
  }
  init() {
    ((this.split = new n(this.texts, { type: "words, chars", charsClass: "footer_char" })),
      s.set(this.split.words, {
        overflow: "clip",
        paddingBottom: "0.1em",
        marginBottom: "-0.1em",
        paddingRight: "0.1em",
        marginRight: "-0.1em",
      }),
      (this.enterTl = s.timeline({
        defaults: { ease: "power2" },
        paused: !0,
        onComplete: () => {
          (this.enterTl.kill(), this.startLoop());
        },
      })),
      this.enterTl.fromTo(this.split.chars, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.02 }, "<"),
      (this.scrollEnter = o.create({
        trigger: this.title,
        start: "top 80%",
        onEnter: () => {
          (this.enterTl.play(), (this.entered = !0));
        },
      })),
      (this.scrollLeave = o.create({
        trigger: this.instance,
        start: "top bottom",
        onEnterBack: () => (this.entered = !1),
      })),
      (this.logoTl = s.timeline({ defaults: { ease: "power2" }, paused: !0 })),
      this.logoTl.fromTo(this.logoSvgs, { yPercent: 100 }, { yPercent: 0, stagger: 0.1 }),
      (this.scrollLogo = o.create({
        trigger: this.instance,
        start: "bottom bottom+=10%",
        end: "bottom bottom+=2%",
        onEnter: () => this.logoTl.play(),
        onLeaveBack: () => this.logoTl.reverse(0),
      })));
  }
  startLoop() {
    if (this.destroyed) return;
    this.loopTl = s.timeline({
      defaults: { ease: "power2" },
      delay: 0.5,
      onComplete: () => {
        (this.loopTl.kill(),
          this.currenIndex++,
          this.currenIndex >= this.phrases.length && (this.currenIndex = 0),
          this.createNewPhrase());
      },
    });
    const e = this.selectedLine.querySelectorAll(".footer_char");
    this.loopTl.to(e, { yPercent: -110, duration: 0.8, stagger: 0.02 });
  }
  createNewPhrase() {
    ((this.selectedLine.innerHTML = this.phrases[this.currenIndex]),
      (this.newSplit = new n(this.selectedLine, { type: "words, chars", charsClass: "footer_char" })),
      s.set(this.newSplit.words, {
        overflow: "clip",
        paddingBottom: "0.1em",
        marginBottom: "-0.1em",
        paddingRight: "0.1em",
        marginRight: "-0.1em",
      }),
      (this.loopTl = s.timeline({
        defaults: { ease: "power2" },
        onComplete: () => {
          (this.loopTl.kill(),
            this.currenIndex++,
            this.currenIndex >= this.phrases.length && (this.currenIndex = 0),
            this.createNewPhrase());
        },
      })));
    const e = this.selectedLine.querySelectorAll(".footer_char");
    this.loopTl
      .fromTo(e, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.02 })
      .to(e, { yPercent: -110, duration: 0.8, stagger: 0.02 }, ">0.5");
  }
  resize() {
    this.destroyed || this.createSlashes();
  }
  destroy() {
    this.destroyed ||
      ((this.destroyed = !0),
      this.modelFadeScrollTrigger && this.modelFadeScrollTrigger.kill(),
      this.modelFadeTl && this.modelFadeTl.kill(),
      this.sidebarTl?.kill(),
      this.scrollSideBar?.kill(),
      s.to(document.querySelector(".sidebar"), {
        opacity: 1,
        overwrite: !0,
        delay: 0.5,
        duration: 0.3,
        onComplete: () => s.set(document.querySelector(".sidebar"), { clearProps: "opacity" }),
      }));
  }
}
export { y as default };
