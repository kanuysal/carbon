const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "_astro/AtTop.Bxuj75Jr.js",
      "_astro/index.xlujcirQ.js",
      "_astro/CSSPlugin.pkypRvgD.js",
      "_astro/ScrollTrigger.C4gmGO9R.js",
      "_astro/Accordion.CGV3BB-y.js",
      "_astro/SplitText.Cpc1cBKW.js",
      "_astro/Batch.CBINLfBE.js",
      "_astro/Button.BB4Cin8c.js",
      "_astro/LinkAnimation.BShULeRV.js",
      "_astro/all.xlujcirQ.js",
      "_astro/Fade.DSmXQ57k.js",
      "_astro/Footer.CAKOwzGC.js",
      "_astro/FooterAbout.UcaEGjCs.js",
      "_astro/Marque.BX8svIbJ.js",
      "_astro/Numbers.BO1Fyi00.js",
      "_astro/Real.Bj6xwJ8W.js",
      "_astro/Layout.astro_astro_type_script_index_0_lang.313rQJIa.js",
      "_astro/SectionHeading.DfcbQDrO.js",
      "_astro/Services.BbZbQse5.js",
      "_astro/TextAnimation.CWxKvpuk.js",
    ]),
) => i.map((i) => d[i]);
import { _ as e } from "./Layout.astro_astro_type_script_index_0_lang.313rQJIa.js";
const m = (s, o, r) => {
  const t = s[o];
  return t
    ? typeof t == "function"
      ? t()
      : Promise.resolve(t)
    : new Promise((_, i) => {
        (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
          i.bind(
            null,
            new Error(
              "Unknown variable dynamic import: " +
                o +
                (o.split("/").length !== r ? ". Note that variables only represent file names one level deep." : ""),
            ),
          ),
        );
      });
};
class E {
  constructor(o) {
    this.app = o;
  }
  async loadModules(o) {
    try {
      const r = await e(() => import("./AtTop.Bxuj75Jr.js"), __vite__mapDeps([0, 1, 2, 3])).then(
          (_) => new _.default(this.app),
        ),
        t = o.querySelectorAll("[data-module]");
      if (t.length < 1) return;
      t.forEach(async (_) => {
        const u = _.getAttribute("data-module").split(" ");
        for (const d of u) {
          const a = await m(
            Object.assign({
              "../modules/Accordion.js": () =>
                e(() => import("./Accordion.CGV3BB-y.js"), __vite__mapDeps([4, 1, 2, 3, 5])),
              "../modules/Batch.js": () => e(() => import("./Batch.CBINLfBE.js"), __vite__mapDeps([6, 1, 2, 3])),
              "../modules/Button.js": () => e(() => import("./Button.BB4Cin8c.js"), __vite__mapDeps([7, 8, 9, 2, 5])),
              "../modules/Fade.js": () => e(() => import("./Fade.DSmXQ57k.js"), __vite__mapDeps([10, 9, 2, 3])),
              "../modules/Footer.js": () =>
                e(() => import("./Footer.CAKOwzGC.js"), __vite__mapDeps([11, 9, 2, 8, 5, 3])),
              "../modules/FooterAbout.js": () =>
                e(() => import("./FooterAbout.UcaEGjCs.js"), __vite__mapDeps([12, 9, 2, 3])),
              "../modules/Marque.js": () => e(() => import("./Marque.BX8svIbJ.js"), __vite__mapDeps([13, 9, 2, 3])),
              "../modules/Numbers.js": () => e(() => import("./Numbers.BO1Fyi00.js"), __vite__mapDeps([14, 9, 2, 3])),
              "../modules/Real.js": () => e(() => import("./Real.Bj6xwJ8W.js"), __vite__mapDeps([15, 16, 1, 2])),
              "../modules/RealOld.js": () => e(() => import("./RealOld.KMChwesq.js"), []),
              "../modules/SectionHeading.js": () =>
                e(() => import("./SectionHeading.DfcbQDrO.js"), __vite__mapDeps([17, 9, 2, 5, 3])),
              "../modules/Services.js": () =>
                e(() => import("./Services.BbZbQse5.js"), __vite__mapDeps([18, 9, 2, 8, 5, 3])),
              "../modules/TextAnimation.js": () =>
                e(() => import("./TextAnimation.CWxKvpuk.js"), __vite__mapDeps([19, 9, 2, 5, 3])),
              "../modules/Time.js": () => e(() => import("./Time.xGh0Sm4t.js"), []),
              "../modules/Year.js": () => e(() => import("./Year.dYfOwOZE.js"), []),
            }),
            `../modules/${d}.js`,
            3,
          ).then((l) => new l.default(_, this.app, o));
        }
      });
    } catch (r) {
      console.warn(`Error loading modules: ${r.message}`);
    }
  }
}
export { E as default };
