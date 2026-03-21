var m = class {
    _elapsed = 0;
    _currentTime = 0;
    _startTime = void 0;
    _lastTime = void 0;
    _isPlaying = !1;
    _deltaTime = 0;
    play() {
      this._isPlaying || ((this._currentTime = 0), (this._startTime = void 0), (this._isPlaying = !0));
    }
    pause() {
      this._isPlaying && ((this._deltaTime = 0), (this._isPlaying = !1));
    }
    reset() {
      ((this._elapsed = 0),
        (this._deltaTime = 0),
        (this._currentTime = 0),
        (this._lastTime = void 0),
        (this._isPlaying = !1));
    }
    update(t) {
      this._isPlaying &&
        (this._startTime || (this._startTime = t),
        this._lastTime === void 0
          ? ((this._lastTime = this._startTime), (this._currentTime = 0), (this._deltaTime = 0))
          : ((this._lastTime = this._currentTime),
            (this._currentTime = t - this._startTime),
            (this._deltaTime = this._currentTime - this._lastTime),
            (this._elapsed += this._deltaTime)));
    }
    get time() {
      return this._elapsed;
    }
    get isPlaying() {
      return this._isPlaying;
    }
    get deltaTime() {
      return this._deltaTime;
    }
  },
  l = 0;
function u() {
  return l++;
}
var s = typeof window < "u",
  h = s && window.requestAnimationFrame,
  o = s && window.cancelAnimationFrame,
  c = class {
    callbacks = [];
    fps;
    time = 0;
    lastTickDate = performance.now();
    framesCount = 0;
    constructor(t = Number.POSITIVE_INFINITY) {
      this.fps = t;
    }
    get isRelativeFps() {
      return typeof this.fps == "string" && this.fps.endsWith("%");
    }
    get maxFramesCount() {
      return this.isRelativeFps ? Math.max(1, Math.round(100 / Number(this.fps.replace("%", "")))) : 1;
    }
    get executionTime() {
      return this.isRelativeFps ? 0 : 1e3 / this.fps;
    }
    dispatch(t, e) {
      for (let i = 0; i < this.callbacks.length; i++) {
        const r = performance.now();
        this.callbacks[i]?.callback(t, e);
        const a = performance.now() - r;
        (this.callbacks[i].samples?.push(a), (this.callbacks[i].samples = this.callbacks[i].samples?.slice(-9)));
      }
    }
    raf(t, e) {
      if (((this.time += e), this.isRelativeFps))
        (this.framesCount === 0 && this.dispatch(t, e), this.framesCount++, (this.framesCount %= this.maxFramesCount));
      else if (this.fps === Number.POSITIVE_INFINITY) this.dispatch(t, e);
      else if (this.time >= this.executionTime) {
        this.time = this.time % this.executionTime;
        const i = t - this.lastTickDate;
        ((this.lastTickDate = t), this.dispatch(t, i));
      }
    }
    add({ callback: t, priority: e, label: i }) {
      if (typeof t != "function") {
        console.warn("Tempus.add: callback is not a function");
        return;
      }
      const r = u();
      return (
        this.callbacks.push({ callback: t, priority: e, uid: r, label: i, samples: [] }),
        this.callbacks.sort((a, n) => a.priority - n.priority),
        () => this.remove(r)
      );
    }
    remove(t) {
      this.callbacks = this.callbacks.filter(({ uid: e }) => t !== e);
    }
  },
  f = class {
    framerates = {};
    clock = new m();
    fps;
    usage = 0;
    rafId;
    constructor() {
      s && this.play();
    }
    restart() {
      this.rafId && cancelAnimationFrame(this.rafId);
      for (const t of Object.values(this.framerates))
        ((t.framesCount = 0), (t.time = 0), (t.lastTickDate = performance.now()));
      (this.clock.reset(), this.play());
    }
    play() {
      !s || this.clock.isPlaying || (this.clock.play(), (this.rafId = requestAnimationFrame(this.raf)));
    }
    pause() {
      !s ||
        !this.rafId ||
        !this.clock.isPlaying ||
        (cancelAnimationFrame(this.rafId), (this.rafId = void 0), this.clock.pause());
    }
    get isPlaying() {
      return this.clock.isPlaying;
    }
    add(t, { priority: e = 0, fps: i = Number.POSITIVE_INFINITY, label: r = "" } = {}) {
      if (s) {
        if (typeof i == "number" || (typeof i == "string" && i.endsWith("%")))
          return (
            this.framerates[i] || (this.framerates[i] = new c(i)),
            this.framerates[i].add({ callback: t, priority: e, label: r })
          );
        console.warn('Tempus.add: fps is not a number or a string ending with "%"');
      }
    }
    raf = (t) => {
      if (!s) return;
      this.clock.update(t);
      const e = this.clock.time,
        i = this.clock.deltaTime;
      this.fps = 1e3 / i;
      const r = performance.now();
      for (const n of Object.values(this.framerates)) n.raf(e, i);
      const a = performance.now() - r;
      ((this.usage = a / i), (this.rafId = requestAnimationFrame(this.raf)));
    };
    patch() {
      s &&
        ((window.requestAnimationFrame = (t, { priority: e = 0, fps: i = Number.POSITIVE_INFINITY } = {}) =>
          t === this.raf || !t.toString().includes("requestAnimationFrame(")
            ? h(t)
            : (t.__tempusPatched ||
                ((t.__tempusPatched = !0),
                (t.__tempusUnsubscribe = this.add(t, { priority: e, fps: i, label: t.name }))),
              t.__tempusUnsubscribe)),
        (window.cancelAnimationFrame = (t) => {
          if (typeof t == "function") {
            t?.();
            return;
          }
          return o(t);
        }));
    }
    unpatch() {
      s && ((window.requestAnimationFrame = h), (window.cancelAnimationFrame = o));
    }
  },
  d = new f();
export { d as T };
