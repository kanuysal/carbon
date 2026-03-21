class n {
  constructor(t, e) {
    ((this.instance = t), (this.app = e), setInterval(() => this.updateNewYorkTime(), 1e3));
  }
  updateNewYorkTime() {
    const t = { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: !1 },
      e = new Date().toLocaleTimeString("en-US", t);
    this.instance && (this.instance.textContent = e);
  }
}
export { n as default };
