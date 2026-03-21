import { g as a } from "./all.xlujcirQ.js";
import { L as p } from "./LinkAnimation.BShULeRV.js";
import { S as c } from "./ScrollTrigger.C4gmGO9R.js";
import "./CSSPlugin.pkypRvgD.js";
import "./SplitText.Cpc1cBKW.js";
a.registerPlugin(c);
class v {
  constructor(t, e) {
    ((this.instance = t),
      (this.app = e),
      (this.destroyed = !1),
      (this.items = this.instance.querySelectorAll(".services_item")),
      (this.list = this.instance.querySelector(".services_list")),
      (this.quicks = [...this.items].map((r) => a.quickSetter(r, "--progress"))),
      (this.mailParents = this.instance.querySelectorAll(".service_mail-parent")),
      (this.mailElements = this.instance.querySelectorAll(".service-mail")),
      (this.copiedMessages = this.instance.querySelectorAll(".mail-copied")),
      (this.mailHovers = []),
      this.init(),
      this.setupEmailCopy(),
      this.app.on("resize", () => this.resize()),
      this.app.on("destroy", () => this.destroy()));
  }
  setHeight() {
    const t = this.instance.querySelectorAll(".services_content")[0];
    (this.list.classList.remove("fixed-height"), this.list.style.setProperty("--height", "auto"));
    const e = this.list.offsetHeight + t.offsetHeight;
    (this.list.style.setProperty("--height", e + "px"), this.list.classList.add("fixed-height"));
  }
  init() {
    ((this.scrolls = [...this.items].map((t, e) =>
      c.create({ trigger: t, start: "top 80%", end: "top center", onUpdate: (r) => this.quicks[e](r.progress) }),
    )),
      this.mailParents.forEach((t, e) => {
        const r = t.querySelectorAll("._15");
        this.mailHovers.push(new p(t, r, this.app, !0));
      }));
  }
  setupEmailCopy() {
    !this.mailParents.length ||
      !this.mailElements.length ||
      !this.copiedMessages.length ||
      this.mailParents.forEach((t, e) => {
        const r = this.mailElements[e],
          i = this.copiedMessages[e];
        !t ||
          !r ||
          !i ||
          ((i.style.opacity = "0"),
          (i.style.transform = "translateY(10px)"),
          (i.style.transition = "opacity 0.3s ease, transform 0.3s ease"),
          t.addEventListener("click", async (n) => {
            n.preventDefault();
            const l = t.dataset.mail;
            let o = !1;
            if (navigator.clipboard && window.isSecureContext)
              try {
                (await navigator.clipboard.writeText(l), (o = !0));
              } catch (s) {
                console.warn("Clipboard API failed, trying fallback:", s);
              }
            if (!o)
              try {
                const s = document.createElement("textarea");
                ((s.value = l),
                  (s.style.position = "fixed"),
                  (s.style.left = "-999999px"),
                  (s.style.top = "-999999px"),
                  document.body.appendChild(s),
                  s.focus(),
                  s.select());
                try {
                  (document.execCommand("copy"), (o = !0));
                } catch (h) {
                  console.error("Fallback copy failed:", h);
                } finally {
                  s.remove();
                }
              } catch (s) {
                console.error("Failed to create fallback textarea:", s);
              }
            o
              ? ((i.style.opacity = "1"),
                (i.style.transform = "translateY(0)"),
                this[`copiedTimeout_${e}`] && clearTimeout(this[`copiedTimeout_${e}`]),
                console.log("Email copied to clipboard:", l),
                (this[`copiedTimeout_${e}`] = setTimeout(() => {
                  ((i.style.opacity = "0"), (i.style.transform = "translateY(10px)"));
                }, 1e3)))
              : console.error("All copy methods failed");
          }));
      });
  }
  resize() {
    this.destroyed || (this.scrolls.forEach((t) => t.kill()), this.mailHovers.forEach((t) => t?.resize()), this.init());
  }
  destroy() {
    this.destroyed ||
      ((this.destroyed = !0), this.mailHovers.forEach((t) => t?.destroy()), this.scrolls.forEach((t) => t.kill()));
  }
}
export { v as default };
