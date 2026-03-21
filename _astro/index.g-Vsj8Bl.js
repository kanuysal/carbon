import { g as l } from "./all.xlujcirQ.js";
import { S as m } from "./ScrollTrigger.C4gmGO9R.js";
import { S as u } from "./SplitText.Cpc1cBKW.js";
import "./CSSPlugin.pkypRvgD.js";
function A(i, e) {
  let t;
  return function (...s) {
    let o = this;
    (clearTimeout(t),
      (t = setTimeout(() => {
        ((t = void 0), i.apply(o, s));
      }, e)));
  };
}
function T(i) {
  (getComputedStyle(i).position === "sticky" &&
    (i.style.setProperty("position", "static"), (i.dataset.sticky = "true")),
    i.offsetParent && T(i.offsetParent));
}
function v(i) {
  (i?.dataset?.sticky === "true" && (i.style.removeProperty("position"), delete i.dataset.sticky),
    i.offsetParent && v(i.offsetParent));
}
function P(i, e = 0) {
  const t = e + i.offsetTop;
  return i.offsetParent ? P(i.offsetParent, t) : t;
}
function k(i, e = 0) {
  const t = e + i.offsetLeft;
  return i.offsetParent ? k(i.offsetParent, t) : t;
}
function x(i, e = 0) {
  const t = e + i.scrollTop;
  return i.offsetParent ? x(i.offsetParent, t) : t + window.scrollY;
}
function z(i, e = 0) {
  const t = e + i.scrollLeft;
  return i.offsetParent ? z(i.offsetParent, t) : t + window.scrollX;
}
var H = class {
    element;
    options;
    align;
    rect = {};
    wrapperResizeObserver;
    resizeObserver;
    constructor(i, { align: e = ["start"], ignoreSticky: t = !0, ignoreTransform: s = !1 } = {}) {
      ((this.element = i),
        (this.options = { align: e, ignoreSticky: t, ignoreTransform: s }),
        (this.align = [e].flat()),
        (this.wrapperResizeObserver = new ResizeObserver(this.onWrapperResize)),
        this.wrapperResizeObserver.observe(document.body),
        this.onWrapperResize(),
        (this.resizeObserver = new ResizeObserver(this.onResize)),
        this.resizeObserver.observe(this.element),
        this.setRect({ width: this.element.offsetWidth, height: this.element.offsetHeight }));
    }
    destroy() {
      (this.wrapperResizeObserver.disconnect(), this.resizeObserver.disconnect());
    }
    setRect({ top: i, left: e, width: t, height: s, element: o } = {}) {
      ((i = i ?? this.rect.top),
        (e = e ?? this.rect.left),
        (t = t ?? this.rect.width),
        (s = s ?? this.rect.height),
        (o = o ?? this.rect.element),
        !(
          i === this.rect.top &&
          e === this.rect.left &&
          t === this.rect.width &&
          s === this.rect.height &&
          o === this.rect.element
        ) &&
          ((this.rect.top = i),
          (this.rect.y = i),
          (this.rect.width = t),
          (this.rect.height = s),
          (this.rect.left = e),
          (this.rect.x = e),
          (this.rect.bottom = i + s),
          (this.rect.right = e + t)));
    }
    onWrapperResize = () => {
      let i, e;
      if ((this.options.ignoreSticky && T(this.element), this.options.ignoreTransform))
        ((i = P(this.element)), (e = k(this.element)));
      else {
        const t = this.element.getBoundingClientRect();
        ((i = t.top + x(this.element)), (e = t.left + z(this.element)));
      }
      (this.options.ignoreSticky && v(this.element), this.setRect({ top: i, left: e }));
    };
    onResize = ([i]) => {
      if (!i?.borderBoxSize[0]) return;
      const e = i.borderBoxSize[0].inlineSize,
        t = i.borderBoxSize[0].blockSize;
      this.setRect({ width: e, height: t });
    };
  },
  R = 0;
function w() {
  return R++;
}
var q = class {
  constructor(
    i,
    {
      type: e = "proximity",
      lerp: t,
      easing: s,
      duration: o,
      distanceThreshold: n = "50%",
      debounce: h = 500,
      onSnapStart: c,
      onSnapComplete: S,
    } = {},
  ) {
    ((this.lenis = i),
      (this.options = {
        type: e,
        lerp: t,
        easing: s,
        duration: o,
        distanceThreshold: n,
        debounce: h,
        onSnapStart: c,
        onSnapComplete: S,
      }),
      this.onWindowResize(),
      window.addEventListener("resize", this.onWindowResize, !1),
      (this.onSnapDebounced = A(this.onSnap, this.options.debounce)),
      this.lenis.on("virtual-scroll", this.onSnapDebounced));
  }
  options;
  elements = new Map();
  snaps = new Map();
  viewport = { width: window.innerWidth, height: window.innerHeight };
  isStopped = !1;
  onSnapDebounced;
  destroy() {
    (this.lenis.off("virtual-scroll", this.onSnapDebounced),
      window.removeEventListener("resize", this.onWindowResize, !1),
      this.elements.forEach((i) => i.destroy()));
  }
  start() {
    this.isStopped = !1;
  }
  stop() {
    this.isStopped = !0;
  }
  add(i, e = {}) {
    const t = w();
    return (this.snaps.set(t, { value: i, userData: e }), () => this.snaps.delete(t));
  }
  addElement(i, e = {}) {
    const t = w();
    return (this.elements.set(t, new H(i, e)), () => this.elements.delete(t));
  }
  onWindowResize = () => {
    ((this.viewport.width = window.innerWidth), (this.viewport.height = window.innerHeight));
  };
  onSnap = () => {
    let { scroll: i, isHorizontal: e } = this.lenis;
    i = Math.ceil(this.lenis.scroll);
    let t = [...this.snaps.values()];
    if (
      (this.elements.forEach(({ rect: r, align: g }) => {
        let a;
        g.forEach((d) => {
          (d === "start"
            ? (a = r.top)
            : d === "center"
              ? (a = e
                  ? r.left + r.width / 2 - this.viewport.width / 2
                  : r.top + r.height / 2 - this.viewport.height / 2)
              : d === "end" &&
                (a = e ? r.left + r.width - this.viewport.width : r.top + r.height - this.viewport.height),
            typeof a == "number" && t.push({ value: Math.ceil(a), userData: {} }));
        });
      }),
      (t = t.sort((r, g) => Math.abs(r.value) - Math.abs(g.value))),
      t.length === 0)
    )
      return;
    let s = t.findLast(({ value: r }) => r <= i);
    s === void 0 && (s = t[0]);
    const o = Math.abs(i - s.value);
    let n = t.find(({ value: r }) => r >= i);
    n === void 0 && (n = t[t.length - 1]);
    const h = Math.abs(i - n.value),
      c = o < h ? s : n,
      S = Math.abs(i - c.value);
    let f;
    const p = e ? "width" : "height";
    (typeof this.options.distanceThreshold == "string" && this.options.distanceThreshold.endsWith("%")
      ? (f = (Number(this.options.distanceThreshold.replace("%", "")) / 100) * this.viewport[p])
      : typeof this.options.distanceThreshold == "number"
        ? (f = this.options.distanceThreshold)
        : (f = this.viewport[p]),
      (this.options.type === "mandatory" || (this.options.type === "proximity" && S <= f)) &&
        this.lenis.scrollTo(c.value, {
          lerp: this.options.lerp,
          easing: this.options.easing,
          duration: this.options.duration,
          userData: { initiator: "snap" },
          onStart: () => {
            this.options.onSnapStart?.(c);
          },
          onComplete: () => {
            this.options.onSnapComplete?.(c);
          },
        }));
  };
};
l.registerPlugin(m);
class b {
  constructor(e, t, s) {
    ((this.instance = e),
      (this.app = t),
      (this.keys = s),
      (this.scroll = this.app.scroll.lenis),
      (this.destroyed = !1),
      (this.snaps = [...this.keys.map((o) => o)]),
      (this.snaps = [...new Set(this.snaps)].sort((o, n) => o - n)),
      this.app.options.onceLoaded || this.initSnap(),
      this.app.on("newLenis", () => {
        this.destroyed || this.initSnap();
      }));
  }
  initSnap() {
    ((this.snap = new q(this.app.scroll.lenis, {
      distanceThreshold: window.innerHeight,
      debounce: 400,
      lerp: 0.1,
      duration: 0.7,
    })),
      this.snaps.forEach((e) => this.snap.add(e)));
  }
  resize(e) {
    (this.snap.destroy(),
      (this.keys = e),
      (this.snaps = [...this.keys.map((t) => t)]),
      (this.snaps = [...new Set(this.snaps)].sort((t, s) => t - s)),
      this.initSnap());
  }
  destroy() {
    this.destroyed || ((this.destroyed = !0), this.snap.destroy());
  }
}
l.registerPlugin(m, u);
class E {
  constructor(e, t) {
    ((this.main = e),
      (this.app = t),
      (this.sections = this.main.querySelectorAll(".about_section")),
      (this.destroyed = !1),
      this.init(),
      this.loading(),
      window.matchMedia("(min-width: 768px)").matches &&
        (this.snaps = new b(this.main, this.app, this.calculateSnaps())),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  calculateSnaps() {
    return (
      (this.heroHeight = this.sections[0].offsetHeight - window.innerHeight),
      (this.secondSectionHeight = this.sections[1].offsetHeight - window.innerHeight),
      (this.thirdSectionHeight = this.sections[2].offsetHeight - window.innerHeight),
      (this.heroTop = 0),
      (this.heroSnaps = [
        window.innerHeight * 0.8,
        this.heroHeight * 0.41,
        this.heroHeight * 0.6,
        this.heroHeight * 0.8,
      ]),
      (this.secondSectionTop = this.getOffsetTop(this.sections[1])),
      (this.secondSectionSnaps = [
        this.secondSectionTop + this.secondSectionHeight * 0.4,
        this.secondSectionTop + this.secondSectionHeight * 0.55,
        this.secondSectionTop + this.secondSectionHeight * 0.67,
        this.secondSectionTop + this.secondSectionHeight * 0.79,
      ]),
      (this.thirdSectionTop = this.getOffsetTop(this.sections[2])),
      (this.thirdSectionSnaps = [
        this.thirdSectionTop + this.thirdSectionHeight * 0.4,
        this.thirdSectionTop + this.thirdSectionHeight * 0.55,
        this.thirdSectionTop + this.thirdSectionHeight * 0.67,
        this.thirdSectionTop + this.thirdSectionHeight * 0.79,
      ]),
      (this.footerTop = this.getOffsetTop(this.main.querySelector("footer"))),
      [
        this.heroTop,
        ...this.heroSnaps,
        this.secondSectionTop + window.innerHeight * 0.1,
        ...this.secondSectionSnaps,
        this.thirdSectionTop,
        ...this.thirdSectionSnaps,
        this.footerTop,
      ]
    );
  }
  init() {
    ((this.hero = {}),
      (this.hero.titleSplit = new u(this.sections[0].querySelector("h1"), { type: "chars, lines" })),
      (this.hero.titleSplitSecond = new u(this.sections[0].querySelector("h1"), { type: "chars" })),
      (this.hero.secondTitle = new u(this.sections[0].querySelector("h2"), {
        type: "chars, lines",
        charsClass: "about_title-char",
      })),
      (this.hero.colsSplites = [...this.sections[0].querySelectorAll(".about_col")].map((e) => {
        const t = e.querySelectorAll("._20"),
          s = new u(t, { type: "lines" }),
          o = new u(t, { type: "lines" });
        return (l.set(o.lines, { overflow: "clip" }), { split: s, second: o });
      })),
      this.createHeroAnimation(),
      (this.secondSection = this.createSectionAnimation(this.sections[1])),
      (this.thirdSection = this.createSectionAnimation(this.sections[2])));
  }
  createHeroAnimation() {
    (l.set([this.hero.secondTitle.lines, this.hero.titleSplit.lines], {
      overflow: "clip",
      paddingBottom: "0.1em",
      marginBottom: "-0.1em",
      paddingRight: "0.1em",
      marginRight: "-0.1em",
    }),
      (this.hero.tl = l.timeline({ defaults: { ease: "power2", duration: 1 } })),
      this.hero.tl
        .to(this.hero.titleSplitSecond.chars, { yPercent: -110, stagger: 0.02 }, 0)
        .fromTo(this.sections[0].querySelector("h2"), { autoAlpha: 0 }, { autoAlpha: 1 }, "-=0.2")
        .fromTo(this.hero.secondTitle.chars, { yPercent: 110 }, { yPercent: 0, stagger: 0.02 }, "<0.1"));
    const e = 480;
    (l.matchMedia().add({ isLarge: `(min-width: ${e}px)`, isSmall: `(max-width: ${e - 1}px)` }, (t) => {
      const { isLarge: s, isSmall: o } = t.conditions;
      s
        ? (this.hero.colsSplites.forEach((n, h) => {
            const c = h === 0 ? "-=0.4" : "<60%";
            this.hero.tl.fromTo(n.split.lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.05 }, c);
          }),
          this.hero.tl.fromTo(
            this.sections[0].querySelectorAll(".about_text"),
            { yPercent: 110 },
            { yPercent: 0, stagger: 0.05 },
            "<60%",
          ))
        : o &&
          this.hero.colsSplites.forEach((n, h) => {
            const c = h === 0 ? "-=0.4" : ">";
            (this.hero.tl.fromTo(n.split.lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.05 }, c),
              h !== this.hero.colsSplites.length - 1
                ? this.hero.tl.to(n.split.lines, { yPercent: -110, stagger: 0.05 }, ">0.4")
                : this.hero.tl.fromTo(
                    this.sections[0].querySelectorAll(".about_text"),
                    { yPercent: 110 },
                    { yPercent: 0, stagger: 0.05 },
                    "<60%",
                  ));
          });
    }),
      (this.hero.scroll = m.create({
        trigger: this.sections[0],
        start: "top top",
        end: "bottom bottom+=50%",
        scrub: !0,
        animation: this.hero.tl,
      })),
      (this.hero.bg = this.createBgAnimation(this.sections[0], "top top", "bottom bottom-=100%", !1)),
      (this.hero.bgEnd = this.createBgParallax(this.sections[0], !1)));
  }
  createBgParallax(e, t = !0) {
    let s, o;
    const n = window.innerHeight * 0.5;
    t &&
      ((s = l.timeline({ paused: !0 })),
      s.fromTo(e.querySelectorAll("img"), { y: -n }, { y: 0, ease: "none", force3D: !0 }),
      (o = m.create({ trigger: e, start: "top bottom", end: "top top", scrub: !0, animation: s })));
    const h = l.timeline({ paused: !0 });
    h.fromTo(e.querySelectorAll("img"), { y: 0 }, { y: n, immediateRender: !1, ease: "none", force3D: !0 });
    const c = window.innerWidth < 768;
    let S = !1;
    c && !t && (S = !0);
    const f = m.create({
      trigger: e,
      start: S ? "bottom bottom-=10%" : "bottom bottom",
      end: "bottom top",
      scrub: !0,
      animation: h,
    });
    return t ? { enterTl: s, enterScroll: o, leaveTl: h, leaveScroll: f } : { leaveTl: h, leaveScroll: f };
  }
  createBgAnimation(e, t = "top bottom", s = "bottom bottom-=100%", o = !0) {
    if (!o && window.innerWidth < 768) return { tl: null, scroll: null };
    const n = l.timeline({});
    n.fromTo(e.querySelectorAll("img"), { scale: 1.001 }, { scale: 1.09 });
    const h = m.create({ trigger: e, start: t, end: s, scrub: !0, animation: n });
    return { tl: n, scroll: h };
  }
  setTitlesOffset(e) {
    const t = e.querySelectorAll(".about_title")[1],
      s = e.querySelector(".about_wrapper");
    (t.offsetHeight, s.offsetTop, t.offsetTop);
  }
  createSectionAnimation(e) {
    const t = e.querySelectorAll("h2"),
      s = [...t].map((p) => new u(p, { type: "chars, lines", charsClass: "about_title-char" }));
    s.forEach((p) => l.set(p.lines, { overflow: "clip", paddingBottom: "0.1em", marginBottom: "-0.1em" }));
    const o = [...e.querySelectorAll(".about_col")].map((p) => {
        const r = p.querySelector("._24"),
          g = p.querySelectorAll("._20"),
          a = new u(g, { type: "lines" }),
          d = new u(g, { type: "lines" });
        return (l.set(d.lines, { overflow: "clip" }), { split: a, second: d, title: r });
      }),
      n = l.timeline({});
    n.fromTo(t[0], { autoAlpha: 0 }, { autoAlpha: 1 })
      .fromTo(
        s[0].chars,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.02, willChange: "transform", force3D: !0 },
        "-=0.1",
      )
      .to(s[0].chars, { yPercent: -110, stagger: 0.02, willChange: "transform", force3D: !0 }, ">0.4")
      .to(t[0], { autoAlpha: 0, duration: 0.2 }, ">")
      .fromTo(t[1], { autoAlpha: 0 }, { autoAlpha: 1 }, "-=0.1")
      .fromTo(s[1].chars, { yPercent: 110 }, { yPercent: 0, stagger: 0.02, willChange: "transform", force3D: !0 }, "<");
    const h = 480;
    l.matchMedia().add({ isLarge: `(min-width: ${h}px)`, isSmall: `(max-width: ${h - 1}px)` }, (p) => {
      const { isLarge: r, isSmall: g } = p.conditions;
      r
        ? o.forEach((a, d) => {
            const y = d === 0 ? ">0.2" : ">";
            n.fromTo([a.title, a.split.lines], { yPercent: 110 }, { yPercent: 0, stagger: 0.05 }, y);
          })
        : g &&
          o.forEach((a, d) => {
            const y = d === 0 ? ">0.2" : ">";
            (n.fromTo(
              [a.title, a.split.lines],
              { yPercent: 110 },
              { yPercent: 0, stagger: 0.05, willChange: "transform", force3D: !0 },
              y,
            ),
              d !== o.length - 1 &&
                n.to(
                  [a.title, a.split.lines],
                  { yPercent: -110, stagger: 0.05, willChange: "transform", force3D: !0 },
                  ">0.4",
                ));
          });
    });
    const c = m.create({ trigger: e, start: "top center", end: "bottom bottom+=50%", scrub: !0, animation: n }),
      S = this.createBgParallax(e),
      f = this.createBgAnimation(e);
    return { tl: n, scroll: c, bg: S, bgScale: f, titleSplits: s, cols: o };
  }
  loading() {
    this.app.options.onceLoaded ||
      (l.set(this.hero.titleSplit.lines, { overflow: "clip", paddingBottom: "0.1em", marginBottom: "-0.1em" }),
      (this.loadingTl = l.timeline({
        defaults: { ease: "power2" },
        paused: !0,
        onStart: () => l.set(this.main, { autoAlpha: 1 }),
      })),
      this.loadingTl.fromTo(this.hero.titleSplit.chars, { yPercent: 110 }, { yPercent: 0, stagger: 0.02 }, 0.8),
      this.loadingTl.fromTo(this.sections[0].querySelectorAll("img"), { autoAlpha: 0 }, { autoAlpha: 1 }, 0.8));
  }
  resize() {
    if (this.destroyed) return;
    (this.hero.titleSplit.revert(),
      this.hero.secondTitle.revert(),
      this.hero.colsSplites.forEach((t) => t.split.revert()),
      this.hero.bg.tl?.kill(),
      this.hero.bg.scroll?.kill(),
      this.hero.bgEnd.leaveTl.kill(),
      this.hero.bgEnd.leaveScroll.kill(),
      this.hero.tl.kill(),
      this.hero.scroll.kill(),
      this.secondSection.titleSplits.forEach((t) => t.revert()),
      this.secondSection.cols.forEach((t) => t.split.revert()),
      this.secondSection.bg.enterTl.kill(),
      this.secondSection.bg.enterScroll.kill(),
      this.secondSection.bg.leaveTl.kill(),
      this.secondSection.bg.leaveScroll.kill(),
      this.secondSection.bgScale.tl.kill(),
      this.secondSection.bgScale.scroll.kill(),
      this.secondSection.tl.kill(),
      this.secondSection.scroll.kill(),
      this.thirdSection.titleSplits.forEach((t) => t.revert()),
      this.thirdSection.cols.forEach((t) => t.split.revert()),
      this.thirdSection.bg.enterTl.kill(),
      this.thirdSection.bg.enterScroll.kill(),
      this.thirdSection.bg.leaveTl.kill(),
      this.thirdSection.bg.leaveScroll.kill(),
      this.thirdSection.bgScale.tl.kill(),
      this.thirdSection.bgScale.scroll.kill(),
      this.thirdSection.tl.kill(),
      this.thirdSection.scroll.kill(),
      this.init(),
      window.matchMedia("(min-width: 768px)").matches
        ? this.snaps
          ? setTimeout(() => this.snaps.resize(this.calculateSnaps()), 10)
          : (this.snaps = new b(this.main, this.app, this.calculateSnaps()))
        : this.snaps && (this.snaps.destroy(), (this.snaps = null)));
  }
  getOffsetTop(e) {
    let t = 0;
    for (; e && e !== document.body; ) ((t += e.offsetTop || 0), (e = e.offsetParent));
    return t;
  }
  destroy() {
    this.destroyed || ((this.destroyed = !0), this.snaps && this.snaps.destroy());
  }
}
class W {
  constructor(e, t) {
    ((this.main = e),
      (this.app = t),
      (this.gl = this.app.gl),
      (this.loaded = !1),
      (this.triggerLoad = async () => this.load()));
  }
  async load() {
    this.loader = new E(this.main, this.app);
  }
}
export { W as default };
