import { _ as i } from "./Layout.astro_astro_type_script_index_0_lang.313rQJIa.js";
class o {
  constructor() {
    ((this.active = window.location.href.includes("debug")), (this.gui = null), this.active && this.loadGui());
  }
  async loadGui() {
    ((this.gui = await i(() => import("./lil-gui.esm.DFUWXXp-.js"), [])), (this.gui = new this.gui.default()));
    const t = document.querySelector(".lil-gui.autoPlace");
    if ((t.style.setProperty("right", "0"), t.setAttribute("data-lenis-prevent", "true"), window.innerWidth <= 768)) {
      (t.style.setProperty("--width", "120px"),
        t.style.setProperty("--font-size", "10px"),
        t.style.setProperty("--input-font-size", "10px"),
        t.style.setProperty("--title-height", "20px"),
        t.style.setProperty("--widget-height", "16px"),
        t.style.setProperty("--spacing", "3px"),
        t.style.setProperty("--padding", "3px"));
      const e = document.createElement("style");
      ((e.id = "debug-mobile-styles"),
        (e.innerHTML = `
                @media (max-width: 768px) {
                    .lil-gui .controller {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    .lil-gui .controller .name {
                        width: 100% !important;
                        padding-bottom: 3px !important;
                    }
                    .lil-gui .controller .widget {
                        width: 100% !important;
                        padding-left: 0 !important;
                        display: flex;
                        flex-direction: column;
                        gap: 3px;
                    }
                    .lil-gui .controller .widget input {
                        width: 100% !important;
                    }
                    .lil-gui .controller.number .slider {
                        width: 100% !important;
                    }
                }
            `),
        document.getElementById("debug-mobile-styles") || document.head.appendChild(e));
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        if (
          (t.style.setProperty("--width", "200px"),
          t.style.setProperty("--font-size", "10px"),
          t.style.setProperty("--input-font-size", "10px"),
          t.style.setProperty("--title-height", "20px"),
          t.style.setProperty("--widget-height", "16px"),
          t.style.setProperty("--spacing", "3px"),
          t.style.setProperty("--padding", "3px"),
          !document.getElementById("debug-mobile-styles"))
        ) {
          const e = document.createElement("style");
          ((e.id = "debug-mobile-styles"),
            (e.innerHTML = `
                        @media (max-width: 768px) {
                            .lil-gui .controller {
                                flex-direction: column !important;
                                align-items: flex-start !important;
                            }
                            .lil-gui .controller .name {
                                width: 100% !important;
                                padding-bottom: 3px !important;
                            }
                            .lil-gui .controller .widget {
                                width: 100% !important;
                                padding-left: 0 !important;
                            }
                            .lil-gui .controller.number .slider {
                                width: 100% !important;
                            }
                        }
                    `),
            document.head.appendChild(e));
        }
      } else
        (t.style.removeProperty("--width"),
          t.style.removeProperty("--font-size"),
          t.style.removeProperty("--input-font-size"),
          t.style.removeProperty("--title-height"),
          t.style.removeProperty("--widget-height"),
          t.style.removeProperty("--spacing"),
          t.style.removeProperty("--padding"));
    });
  }
}
export { o as default };
