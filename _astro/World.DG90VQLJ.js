import { S as u, U as i, C as p, V as v, G as x } from "./GL.D5Drsdv4.js";
import { g as M } from "./index.xlujcirQ.js";
import { S as g } from "./ScrollTrigger.C4gmGO9R.js";
import { D as y, G as z, a as b, m as w, c as P, b as h, i as C } from "./animationUtils.CgMHCfxP.js";
import { A as _ } from "./AnimateModel.BzLk166y.js";
import "./Layout.astro_astro_type_script_index_0_lang.313rQJIa.js";
import "./tempus.B_tY_6We.js";
import "./CSSPlugin.pkypRvgD.js";
import "./all.xlujcirQ.js";
var D = `varying vec2 vUv;
varying vec2 screenUv;
varying vec3 vPosition;

void main()
{
    vUv = uv;
    vec4 modelPoisition = modelMatrix * vec4(position, 1.0);

    
    gl_Position = projectionMatrix * viewMatrix * modelPoisition;

    screenUv = vec2(gl_Position.xy / gl_Position.w) * 0.5 + 0.5;
    vPosition = modelPoisition.xyz;
}`,
  F = `uniform float uLoading;
uniform float uProgress;
uniform float uMinZ;
uniform float uMaxZ;
uniform float uColor;
uniform float uTime;
uniform float uMultiplier1;
uniform float uMultiplier2;
uniform float uMultiplier3;
uniform vec2 uDirection;
uniform vec3 uAccentColor;
uniform float uShowAccent;
uniform float uOpacity;

varying vec2 vUv;
varying vec2 screenUv;
varying vec3 vPosition;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  
  
  
  
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - D.yyy;      

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; 
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  
  
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
m = m * m;
return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                            dot(p2,x2), dot(p3,x3) ) );
}

vec3 snoiseVec3(vec3 x)
{
    float s = snoise(vec3(x));
    float s1 = snoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
    float s2 = snoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
    vec3 c = vec3(s, s1, s2);
    return c;
}

vec3 curlNoise( vec3 p )
{
    const float e = 0.1;
    vec3 dx = vec3( e, 0.0, 0.0 );
    vec3 dy = vec3( 0.0, e, 0.0 );
    vec3 dz = vec3( 0.0, 0.0, e );

    vec3 p_x0 = snoiseVec3( p - dx );
    vec3 p_x1 = snoiseVec3( p + dx );
    vec3 p_y0 = snoiseVec3( p - dy );
    vec3 p_y1 = snoiseVec3( p + dy );
    vec3 p_z0 = snoiseVec3( p - dz );
    vec3 p_z1 = snoiseVec3( p + dz );

    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

    const float div = 1.0 / (2.0 * e);

    return normalize(vec3(x, y, z) * div);
}

void main()
{
    vec2 uv = vUv;

    
    vec2 displacedUv = uv + snoise(vec3(uv * uMultiplier1, uTime * 0.05));
    float noiseValue = snoise(vec3(displacedUv * uMultiplier2, uTime * 0.1));

    
    float zDistance = abs(vPosition.z - cameraPosition.z);

    
    float normalizedDepth = (zDistance - uMinZ) / (uMaxZ - uMinZ);
    normalizedDepth = clamp(normalizedDepth, 0.0, 1.0);

    
    
    float directionalBias = dot(screenUv - vec2(0.5), uDirection) * 0.5;
    normalizedDepth += directionalBias;

    
    float displacedProgress = uLoading + noiseValue * 0.02;

    
    float clipMask = smoothstep(normalizedDepth - 0.001, normalizedDepth + 0.001, displacedProgress);

    
    float edgeDistance = abs(normalizedDepth - displacedProgress);
    float edgeGlow = exp(-edgeDistance * 30.0) * clipMask * uShowAccent;

    
    vec3 finalColor = mix(vec3(uColor), vec3(.0), edgeGlow);

    
    float finalAlpha = clipMask * uLoading;

    gl_FragColor = vec4(vec3(1.), clipMask * uOpacity);
}`;
let R = class {
  constructor(o, t, n, s, a) {
    ((this.app = o), (this.gl = t), (this.mesh = n), (this.group = s), (this.color = a), this.init());
  }
  init() {
    this.setMaterial();
  }
  setMaterial() {
    ((this.material = new u({
      vertexShader: D,
      fragmentShader: F,
      transparent: !0,
      uniforms: {
        uLoading: new i(0),
        uProgress: new i(0),
        uMinZ: new i(-2),
        uMaxZ: new i(10),
        uColor: new i(this.color),
        uTime: new i(0),
        uMultiplier1: new i(2.8),
        uMultiplier2: new i(0.82),
        uMultiplier3: new i(3.77),
        uDirection: new i(new v(1, -0.5)),
        uAccentColor: new i(new p("#8B0000")),
        uShowAccent: new i(1),
        uOpacity: new i(1),
      },
    })),
      (this.mesh.material = this.material));
  }
  resize() {}
  update() {
    this.material.uniforms.uTime.value = this.app.time.elapsed * 0.001;
  }
  destroy() {}
};
const A = "footerModel",
  k = 0,
  L = 11.8,
  S = { x: 0, y: 0, z: 0 },
  U = { x: 9.47, y: -0.68, z: -0.870000000000001 },
  I = { x: 0, y: 0, z: 0 },
  T = { x: 0, y: 0, z: 0 },
  V = { x: 1, y: -0.5 },
  O = {
    sectionIndex: 0,
    startPos: {
      position: { x: -5.33, y: -12.59, z: 1.7 },
      rotation: { x: -0.4715, y: -0.9715, z: 1.5784 },
      scale: 11.8,
    },
    endPos: {
      position: { x: -5.79, y: -7.89, z: 1.91 },
      rotation: { x: -0.513185307179586, y: -0.383185307179586, z: 1.59681469282041 },
      scale: 11.8,
    },
    transform: { start: "top bottom", end: "bottom bottom-=5%", trigger: 0, endTrigger: 0 },
    materialFadeIn: { enabled: !0, progress: { start: 0, end: 1 } },
    materialFadeOut: { enabled: !1 },
    showMarkers: !1,
  },
  Z = {
    sectionIndex: 0,
    startPos: { position: { x: 9.47, y: -0.68, z: -0.870000000000001 }, rotation: { x: 0, y: 0, z: 0 }, scale: 11.8 },
    endPos: {
      position: { x: 5.72, y: 1.55, z: 0.83 },
      rotation: { x: -0.503185307179586, y: 2.62681469282041, z: 0 },
      scale: 6.41,
    },
    transform: { start: "top bottom", end: "bottom bottom", trigger: 0, endTrigger: 0 },
    materialFadeIn: { enabled: !0, progress: { start: 0, end: 1 } },
    materialFadeOut: { enabled: !1 },
    showMarkers: !1,
  },
  e = {
    name: A,
    index: k,
    scale: L,
    position: S,
    mobilePosition: U,
    rotate: I,
    mobileRotation: T,
    direction: V,
    animationConfig: O,
    mobileAnimationConfig: Z,
  };
M.registerPlugin(g);
class H {
  constructor(o, t, n, s) {
    ((this.gl = o),
      (this.app = t),
      (this.scene = n),
      (this.main = s),
      (this.sizes = this.app.sizes),
      (this.renderer = this.gl.renderer.instance),
      (this.camera = this.gl.camera.instance),
      (this.scene = n),
      (this.debug = this.app.debug),
      (this.debugFolders = {}),
      this.load());
  }
  load() {
    if (
      (this.modelOptions(),
      (this.dracoLoader = new y()),
      this.dracoLoader.setDecoderPath("/draco/"),
      (this.loader = new z()),
      this.loader.setDRACOLoader(this.dracoLoader),
      this.app.options.footerModel && this.app.options.firstModel)
    )
      this.init();
    else {
      const o = [];
      (this.app.options.footerModel ||
        o.push(
          this.loader.loadAsync(this.footerModel.url).then((t) => {
            const n = [...t.scene.children];
            ((this.app.options.footerModel = n[0]), (this.footerModel.loaded = !0));
          }),
        ),
        this.app.options.firstModel ||
          o.push(
            this.loader.loadAsync(b).then((t) => {
              this.app.options.firstModel = t.scene;
            }),
          ),
        Promise.all(o).then(() => {
          ((this.loaded = !0), this.init());
        }));
    }
  }
  modelOptions() {
    const o = window.innerWidth <= 768;
    ((this.footerModel = {
      name: e.name,
      index: e.index,
      url: w,
      group: new x(),
      scale: e.scale,
      position: o && e.mobilePosition ? { ...e.mobilePosition } : { ...e.position },
      rotate: o && e.mobileRotation ? { ...e.mobileRotation } : { ...e.rotate },
      direction: e.direction ? { ...e.direction } : null,
      animatedRotation: { x: 0, y: 0, z: 0 },
      animatedScrollRotation: { x: 0, y: 0, z: 0 },
      loaded: !1,
      desktopPosition: { ...e.position },
      mobilePosition: e.mobilePosition ? { ...e.mobilePosition } : null,
      desktopRotation: { ...e.rotate },
      mobileRotation: e.mobileRotation ? { ...e.mobileRotation } : null,
      animationConfig: o && e.mobileAnimationConfig ? e.mobileAnimationConfig : e.animationConfig,
      mobileAnimationConfig: e.mobileAnimationConfig,
    }),
      (this.footerModel.quicks = P(this.footerModel)));
  }
  createFooterModel() {
    (this.footerModel.group.add(this.app.options.footerModel.clone()),
      h(this.footerModel),
      (this.footerModel.inner = new C(
        this.app,
        this.gl,
        this.footerModel.group.children[0],
        this.footerModel.group,
        0.8671875,
      )),
      (this.footerModel.material = new R(
        this.app,
        this.gl,
        this.footerModel.group.children[0].children[0].children[0],
        this.footerModel.group,
        1,
        this.footerModel.direction,
      )),
      (this.footerModel.loaded = !0),
      this.scene.add(this.footerModel.group),
      this.addDebugGUI(),
      this.setupFooterAnimation(),
      setTimeout(() => this.app.trigger("modelsLoaded"), 100));
  }
  setupFooterAnimation() {
    this.footerModel.animationConfig &&
      !this.footerModel.animation &&
      (this.footerModel.animation = new _(this.footerModel, this.app, this.main, this.footerModel.animationConfig));
  }
  addDebugGUI() {
    if (!this.debug || !this.debug.active || !this.debug.gui) return;
    const o = this.debug.gui.addFolder("Footer Model").close(),
      t = o.addFolder("Position");
    (t.add(this.footerModel.group.position, "x", -30, 30, 0.01).name("X"),
      t.add(this.footerModel.group.position, "y", -30, 30, 0.01).name("Y"),
      t.add(this.footerModel.group.position, "z", -30, 30, 0.01).name("Z"));
    const n = o.addFolder("Rotation"),
      s = () => {
        this.footerModel.group.rotation.set(
          this.footerModel.rotate.x + this.footerModel.animatedRotation.x,
          this.footerModel.rotate.y + this.footerModel.animatedRotation.y,
          this.footerModel.rotate.z + this.footerModel.animatedRotation.z,
        );
      };
    (n.add(this.footerModel.rotate, "x", -Math.PI, Math.PI, 0.01).name("X").onChange(s),
      n.add(this.footerModel.rotate, "y", -Math.PI, Math.PI, 0.01).name("Y").onChange(s),
      n.add(this.footerModel.rotate, "z", -Math.PI, Math.PI, 0.01).name("Z").onChange(s));
    const a = { scale: this.footerModel.scale };
    if (
      (o
        .addFolder("Scale")
        .add(a, "scale", 0.1, 40, 0.01)
        .name("Uniform Scale")
        .onChange((r) => {
          (this.footerModel.group.scale.set(r, r, r), (this.footerModel.scale = r));
        }),
      this.footerModel.direction)
    ) {
      const r = o.addFolder("Direction"),
        c = () => {
          this.footerModel.material &&
            this.footerModel.material.material &&
            this.footerModel.material.material.uniforms.uDirection &&
            this.footerModel.material.material.uniforms.uDirection.value.set(
              this.footerModel.direction.x,
              this.footerModel.direction.y,
            );
        };
      (r.add(this.footerModel.direction, "x", -5, 5, 0.01).name("X").onChange(c),
        r.add(this.footerModel.direction, "y", -5, 5, 0.01).name("Y").onChange(c));
    }
    const m = { progress: 0 },
      l = o.addFolder("Material");
    l.add(m, "progress", 0, 1, 0.01)
      .name("Progress")
      .onChange((r) => {
        ((this.footerModel.inner.material.uniforms.uLoading.value = r),
          (this.footerModel.material.material.uniforms.uLoading.value = r));
      });
    const d = { data: "#000" };
    l.addColor(d, "data")
      .name("Color")
      .onChange(() => {
        this.footerModel.material.material.uniforms.uColor.value = new p(d.data);
      });
  }
  init() {
    (!this.app.options.onceLoaded && !this.app.options.noLoader && this.app.globalLoader.tl.play(),
      this.createFooterModel(),
      (this.gl.loaded = !0),
      this.gl.trigger("loaded"));
  }
  setScroll() {}
  update() {
    (this.footerModel.loaded && (this.footerModel.inner.update(), this.footerModel.material.update()), this.gl.loaded);
  }
  createTexture(o) {
    return (
      this.renderer.setRenderTarget(o),
      this.renderer.render(this.scene, this.camera),
      this.renderer.setRenderTarget(null),
      o.texture
    );
  }
  resize() {
    if (this.footerModel.loaded) {
      const o = window.innerWidth <= 768;
      (this.footerModel.mobilePosition &&
        this.footerModel.desktopPosition &&
        (this.footerModel.position = o
          ? { ...this.footerModel.mobilePosition }
          : { ...this.footerModel.desktopPosition }),
        this.footerModel.mobileRotation &&
          this.footerModel.desktopRotation &&
          (this.footerModel.rotate = o
            ? { ...this.footerModel.mobileRotation }
            : { ...this.footerModel.desktopRotation }),
        h(this.footerModel),
        this.footerModel.animation && this.footerModel.animation.resize());
    }
  }
  onMouseMove(o, t) {
    !(window.innerWidth <= 768) &&
      this.footerModel.loaded &&
      (this.footerModel.quicks.rotationX(0),
      this.footerModel.quicks.rotationY(t.x * 0.02),
      this.footerModel.quicks.rotationZ(t.y * 0.02));
  }
  destroy() {
    (this.footerModel.animation && (this.footerModel.animation.destroy(), (this.footerModel.animation = null)),
      this.footerModel.loaded &&
        (this.footerModel.group.children[0].children[0].children[0].material.dispose(),
        this.footerModel.group.children[0].children[0].children[0].geometry.dispose(),
        this.footerModel.group.children[0].material.dispose(),
        this.footerModel.group.children[0].geometry.dispose(),
        this.scene.remove(this.footerModel.group)));
  }
}
export { H as default };
