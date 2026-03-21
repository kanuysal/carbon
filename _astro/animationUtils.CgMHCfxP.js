import {
  T as Le,
  f as Q,
  g as fe,
  h as he,
  j as U,
  F as j,
  k as b,
  V as pe,
  C as O,
  l as w,
  m as C,
  n as we,
  P as be,
  D as Se,
  o as B,
  e as P,
  I as Me,
  Q as me,
  p as Ie,
  O as ge,
  q as Ne,
  r as Ce,
  c as G,
  s as Oe,
  t as Te,
  N as ke,
  u as Pe,
  v as De,
  w as Z,
  x as Re,
  R as $,
  y as Fe,
  z as He,
  E as ve,
  H as V,
  L as Ue,
  J as xe,
  K as Ge,
  M as v,
  W as je,
  B as _e,
  X as Be,
  b as Ke,
  Y as Ve,
  d as ze,
  Z as Xe,
  _ as We,
  G as z,
  $ as qe,
  a0 as Ye,
  a1 as Je,
  a2 as Qe,
  a3 as Ze,
  a4 as $e,
  a5 as et,
  a6 as ye,
  a7 as tt,
  a8 as se,
  a9 as re,
  aa as ie,
  ab as oe,
  ac as ee,
  ad as nt,
  ae as st,
  af as rt,
  ag as it,
  S as ot,
} from "./GL.D5Drsdv4.js";
import { g as X } from "./index.xlujcirQ.js";
function ae(d, e) {
  if (e === Le)
    return (console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), d);
  if (e === Q || e === fe) {
    let t = d.getIndex();
    if (t === null) {
      const s = [],
        a = d.getAttribute("position");
      if (a !== void 0) {
        for (let o = 0; o < a.count; o++) s.push(o);
        (d.setIndex(s), (t = d.getIndex()));
      } else
        return (
          console.error(
            "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.",
          ),
          d
        );
    }
    const i = t.count - 2,
      n = [];
    if (e === Q) for (let s = 1; s <= i; s++) (n.push(t.getX(0)), n.push(t.getX(s)), n.push(t.getX(s + 1)));
    else
      for (let s = 0; s < i; s++)
        s % 2 === 0
          ? (n.push(t.getX(s)), n.push(t.getX(s + 1)), n.push(t.getX(s + 2)))
          : (n.push(t.getX(s + 2)), n.push(t.getX(s + 1)), n.push(t.getX(s)));
    n.length / 3 !== i &&
      console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = d.clone();
    return (r.setIndex(n), r.clearGroups(), r);
  } else return (console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), d);
}
class Xt extends he {
  constructor(e) {
    (super(e),
      (this.dracoLoader = null),
      (this.ktx2Loader = null),
      (this.meshoptDecoder = null),
      (this.pluginCallbacks = []),
      this.register(function (t) {
        return new dt(t);
      }),
      this.register(function (t) {
        return new ft(t);
      }),
      this.register(function (t) {
        return new yt(t);
      }),
      this.register(function (t) {
        return new At(t);
      }),
      this.register(function (t) {
        return new Et(t);
      }),
      this.register(function (t) {
        return new pt(t);
      }),
      this.register(function (t) {
        return new mt(t);
      }),
      this.register(function (t) {
        return new gt(t);
      }),
      this.register(function (t) {
        return new Tt(t);
      }),
      this.register(function (t) {
        return new lt(t);
      }),
      this.register(function (t) {
        return new Rt(t);
      }),
      this.register(function (t) {
        return new ht(t);
      }),
      this.register(function (t) {
        return new _t(t);
      }),
      this.register(function (t) {
        return new xt(t);
      }),
      this.register(function (t) {
        return new ct(t);
      }),
      this.register(function (t) {
        return new Lt(t);
      }),
      this.register(function (t) {
        return new wt(t);
      }));
  }
  load(e, t, i, n) {
    const r = this;
    let s;
    if (this.resourcePath !== "") s = this.resourcePath;
    else if (this.path !== "") {
      const c = U.extractUrlBase(e);
      s = U.resolveURL(c, this.path);
    } else s = U.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function (c) {
        (n ? n(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e));
      },
      o = new j(this.manager);
    (o.setPath(this.path),
      o.setResponseType("arraybuffer"),
      o.setRequestHeader(this.requestHeader),
      o.setWithCredentials(this.withCredentials),
      o.load(
        e,
        function (c) {
          try {
            r.parse(
              c,
              s,
              function (l) {
                (t(l), r.manager.itemEnd(e));
              },
              a,
            );
          } catch (l) {
            a(l);
          }
        },
        i,
        a,
      ));
  }
  setDRACOLoader(e) {
    return ((this.dracoLoader = e), this);
  }
  setKTX2Loader(e) {
    return ((this.ktx2Loader = e), this);
  }
  setMeshoptDecoder(e) {
    return ((this.meshoptDecoder = e), this);
  }
  register(e) {
    return (this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this);
  }
  unregister(e) {
    return (
      this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
      this
    );
  }
  parse(e, t, i, n) {
    let r;
    const s = {},
      a = {},
      o = new TextDecoder();
    if (typeof e == "string") r = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (o.decode(new Uint8Array(e, 0, 4)) === Ae) {
        try {
          s[R.KHR_BINARY_GLTF] = new bt(e);
        } catch (u) {
          n && n(u);
          return;
        }
        r = JSON.parse(s[R.KHR_BINARY_GLTF].content);
      } else r = JSON.parse(o.decode(e));
    else r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Ut(r, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder,
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let l = 0; l < this.pluginCallbacks.length; l++) {
      const u = this.pluginCallbacks[l](c);
      (u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),
        (a[u.name] = u),
        (s[u.name] = !0));
    }
    if (r.extensionsUsed)
      for (let l = 0; l < r.extensionsUsed.length; ++l) {
        const u = r.extensionsUsed[l],
          f = r.extensionsRequired || [];
        switch (u) {
          case R.KHR_MATERIALS_UNLIT:
            s[u] = new ut();
            break;
          case R.KHR_DRACO_MESH_COMPRESSION:
            s[u] = new St(r, this.dracoLoader);
            break;
          case R.KHR_TEXTURE_TRANSFORM:
            s[u] = new Mt();
            break;
          case R.KHR_MESH_QUANTIZATION:
            s[u] = new It();
            break;
          default:
            f.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    (c.setExtensions(s), c.setPlugins(a), c.parse(i, n));
  }
  parseAsync(e, t) {
    const i = this;
    return new Promise(function (n, r) {
      i.parse(e, t, n, r);
    });
  }
}
function at() {
  let d = {};
  return {
    get: function (e) {
      return d[e];
    },
    add: function (e, t) {
      d[e] = t;
    },
    remove: function (e) {
      delete d[e];
    },
    removeAll: function () {
      d = {};
    },
  };
}
const R = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing",
};
class ct {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_LIGHTS_PUNCTUAL), (this.cache = { refs: {}, uses: {} }));
  }
  _markDefs() {
    const e = this.parser,
      t = this.parser.json.nodes || [];
    for (let i = 0, n = t.length; i < n; i++) {
      const r = t[i];
      r.extensions &&
        r.extensions[this.name] &&
        r.extensions[this.name].light !== void 0 &&
        e._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser,
      i = "light:" + e;
    let n = t.cache.get(i);
    if (n) return n;
    const r = t.json,
      o = (((r.extensions && r.extensions[this.name]) || {}).lights || [])[e];
    let c;
    const l = new O(16777215);
    o.color !== void 0 && l.setRGB(o.color[0], o.color[1], o.color[2], w);
    const u = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        ((c = new Se(l)), c.target.position.set(0, 0, -1), c.add(c.target));
        break;
      case "point":
        ((c = new be(l)), (c.distance = u));
        break;
      case "spot":
        ((c = new we(l)),
          (c.distance = u),
          (o.spot = o.spot || {}),
          (o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0),
          (o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4),
          (c.angle = o.spot.outerConeAngle),
          (c.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle),
          c.target.position.set(0, 0, -1),
          c.add(c.target));
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return (
      c.position.set(0, 0, 0),
      S(c, o),
      o.intensity !== void 0 && (c.intensity = o.intensity),
      (c.name = t.createUniqueName(o.name || "light_" + e)),
      (n = Promise.resolve(c)),
      t.cache.add(i, n),
      n
    );
  }
  getDependency(e, t) {
    if (e === "light") return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this,
      i = this.parser,
      r = i.json.nodes[e],
      a = ((r.extensions && r.extensions[this.name]) || {}).light;
    return a === void 0
      ? null
      : this._loadLight(a).then(function (o) {
          return i._getNodeRef(t.cache, a, o);
        });
  }
}
class ut {
  constructor() {
    this.name = R.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return v;
  }
  extendParams(e, t, i) {
    const n = [];
    ((e.color = new O(1, 1, 1)), (e.opacity = 1));
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const s = r.baseColorFactor;
        (e.color.setRGB(s[0], s[1], s[2], w), (e.opacity = s[3]));
      }
      r.baseColorTexture !== void 0 && n.push(i.assignTexture(e, "map", r.baseColorTexture, C));
    }
    return Promise.all(n);
  }
}
class lt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_EMISSIVE_STRENGTH));
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = n.extensions[this.name].emissiveStrength;
    return (r !== void 0 && (t.emissiveIntensity = r), Promise.resolve());
  }
}
class dt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_CLEARCOAT));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    if (
      (s.clearcoatFactor !== void 0 && (t.clearcoat = s.clearcoatFactor),
      s.clearcoatTexture !== void 0 && r.push(i.assignTexture(t, "clearcoatMap", s.clearcoatTexture)),
      s.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = s.clearcoatRoughnessFactor),
      s.clearcoatRoughnessTexture !== void 0 &&
        r.push(i.assignTexture(t, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)),
      s.clearcoatNormalTexture !== void 0 &&
        (r.push(i.assignTexture(t, "clearcoatNormalMap", s.clearcoatNormalTexture)),
        s.clearcoatNormalTexture.scale !== void 0))
    ) {
      const a = s.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new pe(a, a);
    }
    return Promise.all(r);
  }
}
class ft {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_DISPERSION));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = n.extensions[this.name];
    return ((t.dispersion = r.dispersion !== void 0 ? r.dispersion : 0), Promise.resolve());
  }
}
class ht {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_IRIDESCENCE));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    return (
      s.iridescenceFactor !== void 0 && (t.iridescence = s.iridescenceFactor),
      s.iridescenceTexture !== void 0 && r.push(i.assignTexture(t, "iridescenceMap", s.iridescenceTexture)),
      s.iridescenceIor !== void 0 && (t.iridescenceIOR = s.iridescenceIor),
      t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]),
      s.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum),
      s.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum),
      s.iridescenceThicknessTexture !== void 0 &&
        r.push(i.assignTexture(t, "iridescenceThicknessMap", s.iridescenceThicknessTexture)),
      Promise.all(r)
    );
  }
}
class pt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_SHEEN));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [];
    ((t.sheenColor = new O(0, 0, 0)), (t.sheenRoughness = 0), (t.sheen = 1));
    const s = n.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const a = s.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], w);
    }
    return (
      s.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = s.sheenRoughnessFactor),
      s.sheenColorTexture !== void 0 && r.push(i.assignTexture(t, "sheenColorMap", s.sheenColorTexture, C)),
      s.sheenRoughnessTexture !== void 0 && r.push(i.assignTexture(t, "sheenRoughnessMap", s.sheenRoughnessTexture)),
      Promise.all(r)
    );
  }
}
class mt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_TRANSMISSION));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    return (
      s.transmissionFactor !== void 0 && (t.transmission = s.transmissionFactor),
      s.transmissionTexture !== void 0 && r.push(i.assignTexture(t, "transmissionMap", s.transmissionTexture)),
      Promise.all(r)
    );
  }
}
class gt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_VOLUME));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    ((t.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0),
      s.thicknessTexture !== void 0 && r.push(i.assignTexture(t, "thicknessMap", s.thicknessTexture)),
      (t.attenuationDistance = s.attenuationDistance || 1 / 0));
    const a = s.attenuationColor || [1, 1, 1];
    return ((t.attenuationColor = new O().setRGB(a[0], a[1], a[2], w)), Promise.all(r));
  }
}
class Tt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_IOR));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = n.extensions[this.name];
    return ((t.ior = r.ior !== void 0 ? r.ior : 1.5), Promise.resolve());
  }
}
class Rt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_SPECULAR));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    ((t.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1),
      s.specularTexture !== void 0 && r.push(i.assignTexture(t, "specularIntensityMap", s.specularTexture)));
    const a = s.specularColorFactor || [1, 1, 1];
    return (
      (t.specularColor = new O().setRGB(a[0], a[1], a[2], w)),
      s.specularColorTexture !== void 0 && r.push(i.assignTexture(t, "specularColorMap", s.specularColorTexture, C)),
      Promise.all(r)
    );
  }
}
class xt {
  constructor(e) {
    ((this.parser = e), (this.name = R.EXT_MATERIALS_BUMP));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    return (
      (t.bumpScale = s.bumpFactor !== void 0 ? s.bumpFactor : 1),
      s.bumpTexture !== void 0 && r.push(i.assignTexture(t, "bumpMap", s.bumpTexture)),
      Promise.all(r)
    );
  }
}
class _t {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_MATERIALS_ANISOTROPY));
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : b;
  }
  extendMaterialParams(e, t) {
    const i = this.parser,
      n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      s = n.extensions[this.name];
    return (
      s.anisotropyStrength !== void 0 && (t.anisotropy = s.anisotropyStrength),
      s.anisotropyRotation !== void 0 && (t.anisotropyRotation = s.anisotropyRotation),
      s.anisotropyTexture !== void 0 && r.push(i.assignTexture(t, "anisotropyMap", s.anisotropyTexture)),
      Promise.all(r)
    );
  }
}
class yt {
  constructor(e) {
    ((this.parser = e), (this.name = R.KHR_TEXTURE_BASISU));
  }
  loadTexture(e) {
    const t = this.parser,
      i = t.json,
      n = i.textures[e];
    if (!n.extensions || !n.extensions[this.name]) return null;
    const r = n.extensions[this.name],
      s = t.options.ktx2Loader;
    if (!s) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, r.source, s);
  }
}
class At {
  constructor(e) {
    ((this.parser = e), (this.name = R.EXT_TEXTURE_WEBP));
  }
  loadTexture(e) {
    const t = this.name,
      i = this.parser,
      n = i.json,
      r = n.textures[e];
    if (!r.extensions || !r.extensions[t]) return null;
    const s = r.extensions[t],
      a = n.images[s.source];
    let o = i.textureLoader;
    if (a.uri) {
      const c = i.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return i.loadTextureImage(e, s.source, o);
  }
}
class Et {
  constructor(e) {
    ((this.parser = e), (this.name = R.EXT_TEXTURE_AVIF));
  }
  loadTexture(e) {
    const t = this.name,
      i = this.parser,
      n = i.json,
      r = n.textures[e];
    if (!r.extensions || !r.extensions[t]) return null;
    const s = r.extensions[t],
      a = n.images[s.source];
    let o = i.textureLoader;
    if (a.uri) {
      const c = i.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return i.loadTextureImage(e, s.source, o);
  }
}
class Lt {
  constructor(e) {
    ((this.name = R.EXT_MESHOPT_COMPRESSION), (this.parser = e));
  }
  loadBufferView(e) {
    const t = this.parser.json,
      i = t.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const n = i.extensions[this.name],
        r = this.parser.getDependency("buffer", n.buffer),
        s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function (a) {
        const o = n.byteOffset || 0,
          c = n.byteLength || 0,
          l = n.count,
          u = n.byteStride,
          f = new Uint8Array(a, o, c);
        return s.decodeGltfBufferAsync
          ? s.decodeGltfBufferAsync(l, u, f, n.mode, n.filter).then(function (h) {
              return h.buffer;
            })
          : s.ready.then(function () {
              const h = new ArrayBuffer(l * u);
              return (s.decodeGltfBuffer(new Uint8Array(h), l, u, f, n.mode, n.filter), h);
            });
      });
    } else return null;
  }
}
class wt {
  constructor(e) {
    ((this.name = R.EXT_MESH_GPU_INSTANCING), (this.parser = e));
  }
  createNodeMesh(e) {
    const t = this.parser.json,
      i = t.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0) return null;
    const n = t.meshes[i.mesh];
    for (const c of n.primitives)
      if (c.mode !== A.TRIANGLES && c.mode !== A.TRIANGLE_STRIP && c.mode !== A.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const s = i.extensions[this.name].attributes,
      a = [],
      o = {};
    for (const c in s) a.push(this.parser.getDependency("accessor", s[c]).then((l) => ((o[c] = l), o[c])));
    return a.length < 1
      ? null
      : (a.push(this.parser.createNodeMesh(e)),
        Promise.all(a).then((c) => {
          const l = c.pop(),
            u = l.isGroup ? l.children : [l],
            f = c[0].count,
            h = [];
          for (const p of u) {
            const T = new B(),
              m = new P(),
              g = new me(),
              x = new P(1, 1, 1),
              y = new Me(p.geometry, p.material, f);
            for (let _ = 0; _ < f; _++)
              (o.TRANSLATION && m.fromBufferAttribute(o.TRANSLATION, _),
                o.ROTATION && g.fromBufferAttribute(o.ROTATION, _),
                o.SCALE && x.fromBufferAttribute(o.SCALE, _),
                y.setMatrixAt(_, T.compose(m, g, x)));
            for (const _ in o)
              if (_ === "_COLOR_0") {
                const L = o[_];
                y.instanceColor = new Ie(L.array, L.itemSize, L.normalized);
              } else _ !== "TRANSLATION" && _ !== "ROTATION" && _ !== "SCALE" && p.geometry.setAttribute(_, o[_]);
            (ge.prototype.copy.call(y, p), this.parser.assignFinalMaterial(y), h.push(y));
          }
          return l.isGroup ? (l.clear(), l.add(...h), l) : h[0];
        }));
  }
}
const Ae = "glTF",
  H = 12,
  ce = { JSON: 1313821514, BIN: 5130562 };
class bt {
  constructor(e) {
    ((this.name = R.KHR_BINARY_GLTF), (this.content = null), (this.body = null));
    const t = new DataView(e, 0, H),
      i = new TextDecoder();
    if (
      ((this.header = {
        magic: i.decode(new Uint8Array(e.slice(0, 4))),
        version: t.getUint32(4, !0),
        length: t.getUint32(8, !0),
      }),
      this.header.magic !== Ae)
    )
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - H,
      r = new DataView(e, H);
    let s = 0;
    for (; s < n; ) {
      const a = r.getUint32(s, !0);
      s += 4;
      const o = r.getUint32(s, !0);
      if (((s += 4), o === ce.JSON)) {
        const c = new Uint8Array(e, H + s, a);
        this.content = i.decode(c);
      } else if (o === ce.BIN) {
        const c = H + s;
        this.body = e.slice(c, c + a);
      }
      s += a;
    }
    if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class St {
  constructor(e, t) {
    if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    ((this.name = R.KHR_DRACO_MESH_COMPRESSION), (this.json = e), (this.dracoLoader = t), this.dracoLoader.preload());
  }
  decodePrimitive(e, t) {
    const i = this.json,
      n = this.dracoLoader,
      r = e.extensions[this.name].bufferView,
      s = e.extensions[this.name].attributes,
      a = {},
      o = {},
      c = {};
    for (const l in s) {
      const u = te[l] || l.toLowerCase();
      a[u] = s[l];
    }
    for (const l in e.attributes) {
      const u = te[l] || l.toLowerCase();
      if (s[l] !== void 0) {
        const f = i.accessors[e.attributes[l]],
          h = D[f.componentType];
        ((c[u] = h.name), (o[u] = f.normalized === !0));
      }
    }
    return t.getDependency("bufferView", r).then(function (l) {
      return new Promise(function (u, f) {
        n.decodeDracoFile(
          l,
          function (h) {
            for (const p in h.attributes) {
              const T = h.attributes[p],
                m = o[p];
              m !== void 0 && (T.normalized = m);
            }
            u(h);
          },
          a,
          c,
          w,
          f,
        );
      });
    });
  }
}
class Mt {
  constructor() {
    this.name = R.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (
      ((t.texCoord === void 0 || t.texCoord === e.channel) &&
        t.offset === void 0 &&
        t.rotation === void 0 &&
        t.scale === void 0) ||
        ((e = e.clone()),
        t.texCoord !== void 0 && (e.channel = t.texCoord),
        t.offset !== void 0 && e.offset.fromArray(t.offset),
        t.rotation !== void 0 && (e.rotation = t.rotation),
        t.scale !== void 0 && e.repeat.fromArray(t.scale),
        (e.needsUpdate = !0)),
      e
    );
  }
}
class It {
  constructor() {
    this.name = R.KHR_MESH_QUANTIZATION;
  }
}
class Ee extends st {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer,
      i = this.sampleValues,
      n = this.valueSize,
      r = e * n * 3 + n;
    for (let s = 0; s !== n; s++) t[s] = i[r + s];
    return t;
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer,
      s = this.sampleValues,
      a = this.valueSize,
      o = a * 2,
      c = a * 3,
      l = n - t,
      u = (i - t) / l,
      f = u * u,
      h = f * u,
      p = e * c,
      T = p - c,
      m = -2 * h + 3 * f,
      g = h - f,
      x = 1 - m,
      y = g - f + u;
    for (let _ = 0; _ !== a; _++) {
      const L = s[T + _ + a],
        M = s[T + _ + o] * l,
        E = s[p + _ + a],
        F = s[p + _] * l;
      r[_] = x * L + y * M + m * E + g * F;
    }
    return r;
  }
}
const Nt = new me();
class Ct extends Ee {
  interpolate_(e, t, i, n) {
    const r = super.interpolate_(e, t, i, n);
    return (Nt.fromArray(r).normalize().toArray(r), r);
  }
}
const A = { POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6 },
  D = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array },
  ue = { 9728: Re, 9729: Z, 9984: De, 9985: Pe, 9986: ke, 9987: Te },
  le = { 33071: He, 33648: Fe, 10497: $ },
  W = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
  te = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex",
  },
  N = { scale: "scale", translation: "position", rotation: "quaternion", weights: "morphTargetInfluences" },
  Ot = { CUBICSPLINE: void 0, LINEAR: ye, STEP: et },
  q = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" };
function kt(d) {
  return (
    d.DefaultMaterial === void 0 &&
      (d.DefaultMaterial = new xe({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: nt,
      })),
    d.DefaultMaterial
  );
}
function k(d, e, t) {
  for (const i in t.extensions)
    d[i] === void 0 &&
      ((e.userData.gltfExtensions = e.userData.gltfExtensions || {}), (e.userData.gltfExtensions[i] = t.extensions[i]));
}
function S(d, e) {
  e.extras !== void 0 &&
    (typeof e.extras == "object"
      ? Object.assign(d.userData, e.extras)
      : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Pt(d, e, t) {
  let i = !1,
    n = !1,
    r = !1;
  for (let c = 0, l = e.length; c < l; c++) {
    const u = e[c];
    if (
      (u.POSITION !== void 0 && (i = !0),
      u.NORMAL !== void 0 && (n = !0),
      u.COLOR_0 !== void 0 && (r = !0),
      i && n && r)
    )
      break;
  }
  if (!i && !n && !r) return Promise.resolve(d);
  const s = [],
    a = [],
    o = [];
  for (let c = 0, l = e.length; c < l; c++) {
    const u = e[c];
    if (i) {
      const f = u.POSITION !== void 0 ? t.getDependency("accessor", u.POSITION) : d.attributes.position;
      s.push(f);
    }
    if (n) {
      const f = u.NORMAL !== void 0 ? t.getDependency("accessor", u.NORMAL) : d.attributes.normal;
      a.push(f);
    }
    if (r) {
      const f = u.COLOR_0 !== void 0 ? t.getDependency("accessor", u.COLOR_0) : d.attributes.color;
      o.push(f);
    }
  }
  return Promise.all([Promise.all(s), Promise.all(a), Promise.all(o)]).then(function (c) {
    const l = c[0],
      u = c[1],
      f = c[2];
    return (
      i && (d.morphAttributes.position = l),
      n && (d.morphAttributes.normal = u),
      r && (d.morphAttributes.color = f),
      (d.morphTargetsRelative = !0),
      d
    );
  });
}
function Dt(d, e) {
  if ((d.updateMorphTargets(), e.weights !== void 0))
    for (let t = 0, i = e.weights.length; t < i; t++) d.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (d.morphTargetInfluences.length === t.length) {
      d.morphTargetDictionary = {};
      for (let i = 0, n = t.length; i < n; i++) d.morphTargetDictionary[t[i]] = i;
    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Ft(d) {
  let e;
  const t = d.extensions && d.extensions[R.KHR_DRACO_MESH_COMPRESSION];
  if (
    (t
      ? (e = "draco:" + t.bufferView + ":" + t.indices + ":" + Y(t.attributes))
      : (e = d.indices + ":" + Y(d.attributes) + ":" + d.mode),
    d.targets !== void 0)
  )
    for (let i = 0, n = d.targets.length; i < n; i++) e += ":" + Y(d.targets[i]);
  return e;
}
function Y(d) {
  let e = "";
  const t = Object.keys(d).sort();
  for (let i = 0, n = t.length; i < n; i++) e += t[i] + ":" + d[t[i]] + ";";
  return e;
}
function ne(d) {
  switch (d) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Ht(d) {
  return d.search(/\.jpe?g($|\?)/i) > 0 || d.search(/^data\:image\/jpeg/) === 0
    ? "image/jpeg"
    : d.search(/\.webp($|\?)/i) > 0 || d.search(/^data\:image\/webp/) === 0
      ? "image/webp"
      : d.search(/\.ktx2($|\?)/i) > 0 || d.search(/^data\:image\/ktx2/) === 0
        ? "image/ktx2"
        : "image/png";
}
const vt = new B();
class Ut {
  constructor(e = {}, t = {}) {
    ((this.json = e),
      (this.extensions = {}),
      (this.plugins = {}),
      (this.options = t),
      (this.cache = new at()),
      (this.associations = new Map()),
      (this.primitiveCache = {}),
      (this.nodeCache = {}),
      (this.meshCache = { refs: {}, uses: {} }),
      (this.cameraCache = { refs: {}, uses: {} }),
      (this.lightCache = { refs: {}, uses: {} }),
      (this.sourceCache = {}),
      (this.textureCache = {}),
      (this.nodeNamesUsed = {}));
    let i = !1,
      n = -1,
      r = !1,
      s = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const o = a.match(/Version\/(\d+)/);
      ((n = i && o ? parseInt(o[1], 10) : -1),
        (r = a.indexOf("Firefox") > -1),
        (s = r ? a.match(/Firefox\/([0-9]+)\./)[1] : -1));
    }
    (typeof createImageBitmap > "u" || (i && n < 17) || (r && s < 98)
      ? (this.textureLoader = new Ne(this.options.manager))
      : (this.textureLoader = new Ce(this.options.manager)),
      this.textureLoader.setCrossOrigin(this.options.crossOrigin),
      this.textureLoader.setRequestHeader(this.options.requestHeader),
      (this.fileLoader = new j(this.options.manager)),
      this.fileLoader.setResponseType("arraybuffer"),
      this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0));
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const i = this,
      n = this.json,
      r = this.extensions;
    (this.cache.removeAll(),
      (this.nodeCache = {}),
      this._invokeAll(function (s) {
        return s._markDefs && s._markDefs();
      }),
      Promise.all(
        this._invokeAll(function (s) {
          return s.beforeRoot && s.beforeRoot();
        }),
      )
        .then(function () {
          return Promise.all([i.getDependencies("scene"), i.getDependencies("animation"), i.getDependencies("camera")]);
        })
        .then(function (s) {
          const a = {
            scene: s[0][n.scene || 0],
            scenes: s[0],
            animations: s[1],
            cameras: s[2],
            asset: n.asset,
            parser: i,
            userData: {},
          };
          return (
            k(r, a, n),
            S(a, n),
            Promise.all(
              i._invokeAll(function (o) {
                return o.afterRoot && o.afterRoot(a);
              }),
            ).then(function () {
              for (const o of a.scenes) o.updateMatrixWorld();
              e(a);
            })
          );
        })
        .catch(t));
  }
  _markDefs() {
    const e = this.json.nodes || [],
      t = this.json.skins || [],
      i = this.json.meshes || [];
    for (let n = 0, r = t.length; n < r; n++) {
      const s = t[n].joints;
      for (let a = 0, o = s.length; a < o; a++) e[s[a]].isBone = !0;
    }
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n];
      (s.mesh !== void 0 &&
        (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (i[s.mesh].isSkinnedMesh = !0)),
        s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera));
    }
  }
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, i) {
    if (e.refs[t] <= 1) return i;
    const n = i.clone(),
      r = (s, a) => {
        const o = this.associations.get(s);
        o != null && this.associations.set(a, o);
        for (const [c, l] of s.children.entries()) r(l, a.children[c]);
      };
    return (r(i, n), (n.name += "_instance_" + e.uses[t]++), n);
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let i = 0; i < t.length; i++) {
      const n = e(t[i]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const i = [];
    for (let n = 0; n < t.length; n++) {
      const r = e(t[n]);
      r && i.push(r);
    }
    return i;
  }
  getDependency(e, t) {
    const i = e + ":" + t;
    let n = this.cache.get(i);
    if (!n) {
      switch (e) {
        case "scene":
          n = this.loadScene(t);
          break;
        case "node":
          n = this._invokeOne(function (r) {
            return r.loadNode && r.loadNode(t);
          });
          break;
        case "mesh":
          n = this._invokeOne(function (r) {
            return r.loadMesh && r.loadMesh(t);
          });
          break;
        case "accessor":
          n = this.loadAccessor(t);
          break;
        case "bufferView":
          n = this._invokeOne(function (r) {
            return r.loadBufferView && r.loadBufferView(t);
          });
          break;
        case "buffer":
          n = this.loadBuffer(t);
          break;
        case "material":
          n = this._invokeOne(function (r) {
            return r.loadMaterial && r.loadMaterial(t);
          });
          break;
        case "texture":
          n = this._invokeOne(function (r) {
            return r.loadTexture && r.loadTexture(t);
          });
          break;
        case "skin":
          n = this.loadSkin(t);
          break;
        case "animation":
          n = this._invokeOne(function (r) {
            return r.loadAnimation && r.loadAnimation(t);
          });
          break;
        case "camera":
          n = this.loadCamera(t);
          break;
        default:
          if (
            ((n = this._invokeOne(function (r) {
              return r != this && r.getDependency && r.getDependency(e, t);
            })),
            !n)
          )
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(i, n);
    }
    return n;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const i = this,
        n = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      ((t = Promise.all(
        n.map(function (r, s) {
          return i.getDependency(e, s);
        }),
      )),
        this.cache.add(e, t));
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e],
      i = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[R.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function (r, s) {
      i.load(U.resolveURL(t.uri, n.path), r, void 0, function () {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function (i) {
      const n = t.byteLength || 0,
        r = t.byteOffset || 0;
      return i.slice(r, r + n);
    });
  }
  loadAccessor(e) {
    const t = this,
      i = this.json,
      n = this.json.accessors[e];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const s = W[n.type],
        a = D[n.componentType],
        o = n.normalized === !0,
        c = new a(n.count * s);
      return Promise.resolve(new G(c, s, o));
    }
    const r = [];
    return (
      n.bufferView !== void 0 ? r.push(this.getDependency("bufferView", n.bufferView)) : r.push(null),
      n.sparse !== void 0 &&
        (r.push(this.getDependency("bufferView", n.sparse.indices.bufferView)),
        r.push(this.getDependency("bufferView", n.sparse.values.bufferView))),
      Promise.all(r).then(function (s) {
        const a = s[0],
          o = W[n.type],
          c = D[n.componentType],
          l = c.BYTES_PER_ELEMENT,
          u = l * o,
          f = n.byteOffset || 0,
          h = n.bufferView !== void 0 ? i.bufferViews[n.bufferView].byteStride : void 0,
          p = n.normalized === !0;
        let T, m;
        if (h && h !== u) {
          const g = Math.floor(f / h),
            x = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + g + ":" + n.count;
          let y = t.cache.get(x);
          (y || ((T = new c(a, g * h, (n.count * h) / l)), (y = new Oe(T, h / l)), t.cache.add(x, y)),
            (m = new tt(y, o, (f % h) / l, p)));
        } else (a === null ? (T = new c(n.count * o)) : (T = new c(a, f, n.count * o)), (m = new G(T, o, p)));
        if (n.sparse !== void 0) {
          const g = W.SCALAR,
            x = D[n.sparse.indices.componentType],
            y = n.sparse.indices.byteOffset || 0,
            _ = n.sparse.values.byteOffset || 0,
            L = new x(s[1], y, n.sparse.count * g),
            M = new c(s[2], _, n.sparse.count * o);
          (a !== null && (m = new G(m.array.slice(), m.itemSize, m.normalized)), (m.normalized = !1));
          for (let E = 0, F = L.length; E < F; E++) {
            const I = L[E];
            if (
              (m.setX(I, M[E * o]),
              o >= 2 && m.setY(I, M[E * o + 1]),
              o >= 3 && m.setZ(I, M[E * o + 2]),
              o >= 4 && m.setW(I, M[E * o + 3]),
              o >= 5)
            )
              throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
          }
          m.normalized = p;
        }
        return m;
      })
    );
  }
  loadTexture(e) {
    const t = this.json,
      i = this.options,
      r = t.textures[e].source,
      s = t.images[r];
    let a = this.textureLoader;
    if (s.uri) {
      const o = i.manager.getHandler(s.uri);
      o !== null && (a = o);
    }
    return this.loadTextureImage(e, r, a);
  }
  loadTextureImage(e, t, i) {
    const n = this,
      r = this.json,
      s = r.textures[e],
      a = r.images[t],
      o = (a.uri || a.bufferView) + ":" + s.sampler;
    if (this.textureCache[o]) return this.textureCache[o];
    const c = this.loadImageSource(t, i)
      .then(function (l) {
        ((l.flipY = !1),
          (l.name = s.name || a.name || ""),
          l.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (l.name = a.uri));
        const f = (r.samplers || {})[s.sampler] || {};
        return (
          (l.magFilter = ue[f.magFilter] || Z),
          (l.minFilter = ue[f.minFilter] || Te),
          (l.wrapS = le[f.wrapS] || $),
          (l.wrapT = le[f.wrapT] || $),
          (l.generateMipmaps = !l.isCompressedTexture && l.minFilter !== Re && l.minFilter !== Z),
          n.associations.set(l, { textures: e }),
          l
        );
      })
      .catch(function () {
        return null;
      });
    return ((this.textureCache[o] = c), c);
  }
  loadImageSource(e, t) {
    const i = this,
      n = this.json,
      r = this.options;
    if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((u) => u.clone());
    const s = n.images[e],
      a = self.URL || self.webkitURL;
    let o = s.uri || "",
      c = !1;
    if (s.bufferView !== void 0)
      o = i.getDependency("bufferView", s.bufferView).then(function (u) {
        c = !0;
        const f = new Blob([u], { type: s.mimeType });
        return ((o = a.createObjectURL(f)), o);
      });
    else if (s.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const l = Promise.resolve(o)
      .then(function (u) {
        return new Promise(function (f, h) {
          let p = f;
          (t.isImageBitmapLoader === !0 &&
            (p = function (T) {
              const m = new se(T);
              ((m.needsUpdate = !0), f(m));
            }),
            t.load(U.resolveURL(u, r.path), p, void 0, h));
        });
      })
      .then(function (u) {
        return (c === !0 && a.revokeObjectURL(o), S(u, s), (u.userData.mimeType = s.mimeType || Ht(s.uri)), u);
      })
      .catch(function (u) {
        throw (console.error("THREE.GLTFLoader: Couldn't load texture", o), u);
      });
    return ((this.sourceCache[e] = l), l);
  }
  assignTexture(e, t, i, n) {
    const r = this;
    return this.getDependency("texture", i.index).then(function (s) {
      if (!s) return null;
      if (
        (i.texCoord !== void 0 && i.texCoord > 0 && ((s = s.clone()), (s.channel = i.texCoord)),
        r.extensions[R.KHR_TEXTURE_TRANSFORM])
      ) {
        const a = i.extensions !== void 0 ? i.extensions[R.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const o = r.associations.get(s);
          ((s = r.extensions[R.KHR_TEXTURE_TRANSFORM].extendTexture(s, a)), r.associations.set(s, o));
        }
      }
      return (n !== void 0 && (s.colorSpace = n), (e[t] = s), s);
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let i = e.material;
    const n = t.attributes.tangent === void 0,
      r = t.attributes.color !== void 0,
      s = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + i.uuid;
      let o = this.cache.get(a);
      (o ||
        ((o = new ve()),
        V.prototype.copy.call(o, i),
        o.color.copy(i.color),
        (o.map = i.map),
        (o.sizeAttenuation = !1),
        this.cache.add(a, o)),
        (i = o));
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + i.uuid;
      let o = this.cache.get(a);
      (o || ((o = new Ue()), V.prototype.copy.call(o, i), o.color.copy(i.color), (o.map = i.map), this.cache.add(a, o)),
        (i = o));
    }
    if (n || r || s) {
      let a = "ClonedMaterial:" + i.uuid + ":";
      (n && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), s && (a += "flat-shading:"));
      let o = this.cache.get(a);
      (o ||
        ((o = i.clone()),
        r && (o.vertexColors = !0),
        s && (o.flatShading = !0),
        n && (o.normalScale && (o.normalScale.y *= -1), o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)),
        this.cache.add(a, o),
        this.associations.set(o, this.associations.get(i))),
        (i = o));
    }
    e.material = i;
  }
  getMaterialType() {
    return xe;
  }
  loadMaterial(e) {
    const t = this,
      i = this.json,
      n = this.extensions,
      r = i.materials[e];
    let s;
    const a = {},
      o = r.extensions || {},
      c = [];
    if (o[R.KHR_MATERIALS_UNLIT]) {
      const u = n[R.KHR_MATERIALS_UNLIT];
      ((s = u.getMaterialType()), c.push(u.extendParams(a, r, t)));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (((a.color = new O(1, 1, 1)), (a.opacity = 1), Array.isArray(u.baseColorFactor))) {
        const f = u.baseColorFactor;
        (a.color.setRGB(f[0], f[1], f[2], w), (a.opacity = f[3]));
      }
      (u.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", u.baseColorTexture, C)),
        (a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1),
        (a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1),
        u.metallicRoughnessTexture !== void 0 &&
          (c.push(t.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)),
          c.push(t.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))),
        (s = this._invokeOne(function (f) {
          return f.getMaterialType && f.getMaterialType(e);
        })),
        c.push(
          Promise.all(
            this._invokeAll(function (f) {
              return f.extendMaterialParams && f.extendMaterialParams(e, a);
            }),
          ),
        ));
    }
    r.doubleSided === !0 && (a.side = Ge);
    const l = r.alphaMode || q.OPAQUE;
    if (
      (l === q.BLEND
        ? ((a.transparent = !0), (a.depthWrite = !1))
        : ((a.transparent = !1), l === q.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)),
      r.normalTexture !== void 0 &&
        s !== v &&
        (c.push(t.assignTexture(a, "normalMap", r.normalTexture)),
        (a.normalScale = new pe(1, 1)),
        r.normalTexture.scale !== void 0))
    ) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (
      (r.occlusionTexture !== void 0 &&
        s !== v &&
        (c.push(t.assignTexture(a, "aoMap", r.occlusionTexture)),
        r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)),
      r.emissiveFactor !== void 0 && s !== v)
    ) {
      const u = r.emissiveFactor;
      a.emissive = new O().setRGB(u[0], u[1], u[2], w);
    }
    return (
      r.emissiveTexture !== void 0 && s !== v && c.push(t.assignTexture(a, "emissiveMap", r.emissiveTexture, C)),
      Promise.all(c).then(function () {
        const u = new s(a);
        return (
          r.name && (u.name = r.name),
          S(u, r),
          t.associations.set(u, { materials: e }),
          r.extensions && k(n, u, r),
          u
        );
      })
    );
  }
  createUniqueName(e) {
    const t = je.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : ((this.nodeNamesUsed[t] = 0), t);
  }
  loadGeometries(e) {
    const t = this,
      i = this.extensions,
      n = this.primitiveCache;
    function r(a) {
      return i[R.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function (o) {
        return de(o, a, t);
      });
    }
    const s = [];
    for (let a = 0, o = e.length; a < o; a++) {
      const c = e[a],
        l = Ft(c),
        u = n[l];
      if (u) s.push(u.promise);
      else {
        let f;
        (c.extensions && c.extensions[R.KHR_DRACO_MESH_COMPRESSION] ? (f = r(c)) : (f = de(new _e(), c, t)),
          (n[l] = { primitive: c, promise: f }),
          s.push(f));
      }
    }
    return Promise.all(s);
  }
  loadMesh(e) {
    const t = this,
      i = this.json,
      n = this.extensions,
      r = i.meshes[e],
      s = r.primitives,
      a = [];
    for (let o = 0, c = s.length; o < c; o++) {
      const l = s[o].material === void 0 ? kt(this.cache) : this.getDependency("material", s[o].material);
      a.push(l);
    }
    return (
      a.push(t.loadGeometries(s)),
      Promise.all(a).then(function (o) {
        const c = o.slice(0, o.length - 1),
          l = o[o.length - 1],
          u = [];
        for (let h = 0, p = l.length; h < p; h++) {
          const T = l[h],
            m = s[h];
          let g;
          const x = c[h];
          if (m.mode === A.TRIANGLES || m.mode === A.TRIANGLE_STRIP || m.mode === A.TRIANGLE_FAN || m.mode === void 0)
            ((g = r.isSkinnedMesh === !0 ? new Be(T, x) : new Ke(T, x)),
              g.isSkinnedMesh === !0 && g.normalizeSkinWeights(),
              m.mode === A.TRIANGLE_STRIP
                ? (g.geometry = ae(g.geometry, fe))
                : m.mode === A.TRIANGLE_FAN && (g.geometry = ae(g.geometry, Q)));
          else if (m.mode === A.LINES) g = new Ve(T, x);
          else if (m.mode === A.LINE_STRIP) g = new ze(T, x);
          else if (m.mode === A.LINE_LOOP) g = new Xe(T, x);
          else if (m.mode === A.POINTS) g = new We(T, x);
          else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode);
          (Object.keys(g.geometry.morphAttributes).length > 0 && Dt(g, r),
            (g.name = t.createUniqueName(r.name || "mesh_" + e)),
            S(g, r),
            m.extensions && k(n, g, m),
            t.assignFinalMaterial(g),
            u.push(g));
        }
        for (let h = 0, p = u.length; h < p; h++) t.associations.set(u[h], { meshes: e, primitives: h });
        if (u.length === 1) return (r.extensions && k(n, u[0], r), u[0]);
        const f = new z();
        (r.extensions && k(n, f, r), t.associations.set(f, { meshes: e }));
        for (let h = 0, p = u.length; h < p; h++) f.add(u[h]);
        return f;
      })
    );
  }
  loadCamera(e) {
    let t;
    const i = this.json.cameras[e],
      n = i[i.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return (
      i.type === "perspective"
        ? (t = new qe(Ye.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6))
        : i.type === "orthographic" && (t = new Je(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)),
      i.name && (t.name = this.createUniqueName(i.name)),
      S(t, i),
      Promise.resolve(t)
    );
  }
  loadSkin(e) {
    const t = this.json.skins[e],
      i = [];
    for (let n = 0, r = t.joints.length; n < r; n++) i.push(this._loadNodeShallow(t.joints[n]));
    return (
      t.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", t.inverseBindMatrices)) : i.push(null),
      Promise.all(i).then(function (n) {
        const r = n.pop(),
          s = n,
          a = [],
          o = [];
        for (let c = 0, l = s.length; c < l; c++) {
          const u = s[c];
          if (u) {
            a.push(u);
            const f = new B();
            (r !== null && f.fromArray(r.array, c * 16), o.push(f));
          } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
        }
        return new Qe(a, o);
      })
    );
  }
  loadAnimation(e) {
    const t = this.json,
      i = this,
      n = t.animations[e],
      r = n.name ? n.name : "animation_" + e,
      s = [],
      a = [],
      o = [],
      c = [],
      l = [];
    for (let u = 0, f = n.channels.length; u < f; u++) {
      const h = n.channels[u],
        p = n.samplers[h.sampler],
        T = h.target,
        m = T.node,
        g = n.parameters !== void 0 ? n.parameters[p.input] : p.input,
        x = n.parameters !== void 0 ? n.parameters[p.output] : p.output;
      T.node !== void 0 &&
        (s.push(this.getDependency("node", m)),
        a.push(this.getDependency("accessor", g)),
        o.push(this.getDependency("accessor", x)),
        c.push(p),
        l.push(T));
    }
    return Promise.all([Promise.all(s), Promise.all(a), Promise.all(o), Promise.all(c), Promise.all(l)]).then(
      function (u) {
        const f = u[0],
          h = u[1],
          p = u[2],
          T = u[3],
          m = u[4],
          g = [];
        for (let x = 0, y = f.length; x < y; x++) {
          const _ = f[x],
            L = h[x],
            M = p[x],
            E = T[x],
            F = m[x];
          if (_ === void 0) continue;
          _.updateMatrix && _.updateMatrix();
          const I = i._createAnimationTracks(_, L, M, E, F);
          if (I) for (let K = 0; K < I.length; K++) g.push(I[K]);
        }
        return new Ze(r, void 0, g);
      },
    );
  }
  createNodeMesh(e) {
    const t = this.json,
      i = this,
      n = t.nodes[e];
    return n.mesh === void 0
      ? null
      : i.getDependency("mesh", n.mesh).then(function (r) {
          const s = i._getNodeRef(i.meshCache, n.mesh, r);
          return (
            n.weights !== void 0 &&
              s.traverse(function (a) {
                if (a.isMesh)
                  for (let o = 0, c = n.weights.length; o < c; o++) a.morphTargetInfluences[o] = n.weights[o];
              }),
            s
          );
        });
  }
  loadNode(e) {
    const t = this.json,
      i = this,
      n = t.nodes[e],
      r = i._loadNodeShallow(e),
      s = [],
      a = n.children || [];
    for (let c = 0, l = a.length; c < l; c++) s.push(i.getDependency("node", a[c]));
    const o = n.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", n.skin);
    return Promise.all([r, Promise.all(s), o]).then(function (c) {
      const l = c[0],
        u = c[1],
        f = c[2];
      f !== null &&
        l.traverse(function (h) {
          h.isSkinnedMesh && h.bind(f, vt);
        });
      for (let h = 0, p = u.length; h < p; h++) l.add(u[h]);
      return l;
    });
  }
  _loadNodeShallow(e) {
    const t = this.json,
      i = this.extensions,
      n = this;
    if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
    const r = t.nodes[e],
      s = r.name ? n.createUniqueName(r.name) : "",
      a = [],
      o = n._invokeOne(function (c) {
        return c.createNodeMesh && c.createNodeMesh(e);
      });
    return (
      o && a.push(o),
      r.camera !== void 0 &&
        a.push(
          n.getDependency("camera", r.camera).then(function (c) {
            return n._getNodeRef(n.cameraCache, r.camera, c);
          }),
        ),
      n
        ._invokeAll(function (c) {
          return c.createNodeAttachment && c.createNodeAttachment(e);
        })
        .forEach(function (c) {
          a.push(c);
        }),
      (this.nodeCache[e] = Promise.all(a).then(function (c) {
        let l;
        if (
          (r.isBone === !0
            ? (l = new $e())
            : c.length > 1
              ? (l = new z())
              : c.length === 1
                ? (l = c[0])
                : (l = new ge()),
          l !== c[0])
        )
          for (let u = 0, f = c.length; u < f; u++) l.add(c[u]);
        if (
          (r.name && ((l.userData.name = r.name), (l.name = s)),
          S(l, r),
          r.extensions && k(i, l, r),
          r.matrix !== void 0)
        ) {
          const u = new B();
          (u.fromArray(r.matrix), l.applyMatrix4(u));
        } else
          (r.translation !== void 0 && l.position.fromArray(r.translation),
            r.rotation !== void 0 && l.quaternion.fromArray(r.rotation),
            r.scale !== void 0 && l.scale.fromArray(r.scale));
        if (!n.associations.has(l)) n.associations.set(l, {});
        else if (r.mesh !== void 0 && n.meshCache.refs[r.mesh] > 1) {
          const u = n.associations.get(l);
          n.associations.set(l, { ...u });
        }
        return ((n.associations.get(l).nodes = e), l);
      })),
      this.nodeCache[e]
    );
  }
  loadScene(e) {
    const t = this.extensions,
      i = this.json.scenes[e],
      n = this,
      r = new z();
    (i.name && (r.name = n.createUniqueName(i.name)), S(r, i), i.extensions && k(t, r, i));
    const s = i.nodes || [],
      a = [];
    for (let o = 0, c = s.length; o < c; o++) a.push(n.getDependency("node", s[o]));
    return Promise.all(a).then(function (o) {
      for (let l = 0, u = o.length; l < u; l++) r.add(o[l]);
      const c = (l) => {
        const u = new Map();
        for (const [f, h] of n.associations) (f instanceof V || f instanceof se) && u.set(f, h);
        return (
          l.traverse((f) => {
            const h = n.associations.get(f);
            h != null && u.set(f, h);
          }),
          u
        );
      };
      return ((n.associations = c(r)), r);
    });
  }
  _createAnimationTracks(e, t, i, n, r) {
    const s = [],
      a = e.name ? e.name : e.uuid,
      o = [];
    N[r.path] === N.weights
      ? e.traverse(function (f) {
          f.morphTargetInfluences && o.push(f.name ? f.name : f.uuid);
        })
      : o.push(a);
    let c;
    switch (N[r.path]) {
      case N.weights:
        c = ie;
        break;
      case N.rotation:
        c = oe;
        break;
      case N.translation:
      case N.scale:
        c = re;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            c = ie;
            break;
          case 2:
          case 3:
          default:
            c = re;
            break;
        }
        break;
    }
    const l = n.interpolation !== void 0 ? Ot[n.interpolation] : ye,
      u = this._getArrayFromAccessor(i);
    for (let f = 0, h = o.length; f < h; f++) {
      const p = new c(o[f] + "." + N[r.path], t.array, u, l);
      (n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), s.push(p));
    }
    return s;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const i = ne(t.constructor),
        n = new Float32Array(t.length);
      for (let r = 0, s = t.length; r < s; r++) n[r] = t[r] * i;
      t = n;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    ((e.createInterpolant = function (i) {
      const n = this instanceof oe ? Ct : Ee;
      return new n(this.times, this.values, this.getValueSize() / 3, i);
    }),
      (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0));
  }
}
function Gt(d, e, t) {
  const i = e.attributes,
    n = new rt();
  if (i.POSITION !== void 0) {
    const a = t.json.accessors[i.POSITION],
      o = a.min,
      c = a.max;
    if (o !== void 0 && c !== void 0) {
      if ((n.set(new P(o[0], o[1], o[2]), new P(c[0], c[1], c[2])), a.normalized)) {
        const l = ne(D[a.componentType]);
        (n.min.multiplyScalar(l), n.max.multiplyScalar(l));
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else return;
  const r = e.targets;
  if (r !== void 0) {
    const a = new P(),
      o = new P();
    for (let c = 0, l = r.length; c < l; c++) {
      const u = r[c];
      if (u.POSITION !== void 0) {
        const f = t.json.accessors[u.POSITION],
          h = f.min,
          p = f.max;
        if (h !== void 0 && p !== void 0) {
          if (
            (o.setX(Math.max(Math.abs(h[0]), Math.abs(p[0]))),
            o.setY(Math.max(Math.abs(h[1]), Math.abs(p[1]))),
            o.setZ(Math.max(Math.abs(h[2]), Math.abs(p[2]))),
            f.normalized)
          ) {
            const T = ne(D[f.componentType]);
            o.multiplyScalar(T);
          }
          a.max(o);
        } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(a);
  }
  d.boundingBox = n;
  const s = new it();
  (n.getCenter(s.center), (s.radius = n.min.distanceTo(n.max) / 2), (d.boundingSphere = s));
}
function de(d, e, t) {
  const i = e.attributes,
    n = [];
  function r(s, a) {
    return t.getDependency("accessor", s).then(function (o) {
      d.setAttribute(a, o);
    });
  }
  for (const s in i) {
    const a = te[s] || s.toLowerCase();
    a in d.attributes || n.push(r(i[s], a));
  }
  if (e.indices !== void 0 && !d.index) {
    const s = t.getDependency("accessor", e.indices).then(function (a) {
      d.setIndex(a);
    });
    n.push(s);
  }
  return (
    ee.workingColorSpace !== w &&
      "COLOR_0" in i &&
      console.warn(
        `THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ee.workingColorSpace}" not supported.`,
      ),
    S(d, e),
    Gt(d, e, t),
    Promise.all(n).then(function () {
      return e.targets !== void 0 ? Pt(d, e.targets, t) : d;
    })
  );
}
const J = new WeakMap();
class Wt extends he {
  constructor(e) {
    (super(e),
      (this.decoderPath = ""),
      (this.decoderConfig = {}),
      (this.decoderBinary = null),
      (this.decoderPending = null),
      (this.workerLimit = 4),
      (this.workerPool = []),
      (this.workerNextTaskID = 1),
      (this.workerSourceURL = ""),
      (this.defaultAttributeIDs = { position: "POSITION", normal: "NORMAL", color: "COLOR", uv: "TEX_COORD" }),
      (this.defaultAttributeTypes = {
        position: "Float32Array",
        normal: "Float32Array",
        color: "Float32Array",
        uv: "Float32Array",
      }));
  }
  setDecoderPath(e) {
    return ((this.decoderPath = e), this);
  }
  setDecoderConfig(e) {
    return ((this.decoderConfig = e), this);
  }
  setWorkerLimit(e) {
    return ((this.workerLimit = e), this);
  }
  load(e, t, i, n) {
    const r = new j(this.manager);
    (r.setPath(this.path),
      r.setResponseType("arraybuffer"),
      r.setRequestHeader(this.requestHeader),
      r.setWithCredentials(this.withCredentials),
      r.load(
        e,
        (s) => {
          this.parse(s, t, n);
        },
        i,
        n,
      ));
  }
  parse(e, t, i = () => {}) {
    this.decodeDracoFile(e, t, null, null, C, i).catch(i);
  }
  decodeDracoFile(e, t, i, n, r = w, s = () => {}) {
    const a = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: n || this.defaultAttributeTypes,
      useUniqueIDs: !!i,
      vertexColorSpace: r,
    };
    return this.decodeGeometry(e, a).then(t).catch(s);
  }
  decodeGeometry(e, t) {
    const i = JSON.stringify(t);
    if (J.has(e)) {
      const o = J.get(e);
      if (o.key === i) return o.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.",
        );
    }
    let n;
    const r = this.workerNextTaskID++,
      s = e.byteLength,
      a = this._getWorker(r, s)
        .then(
          (o) => (
            (n = o),
            new Promise((c, l) => {
              ((n._callbacks[r] = { resolve: c, reject: l }),
                n.postMessage({ type: "decode", id: r, taskConfig: t, buffer: e }, [e]));
            })
          ),
        )
        .then((o) => this._createGeometry(o.geometry));
    return (
      a
        .catch(() => !0)
        .then(() => {
          n && r && this._releaseTask(n, r);
        }),
      J.set(e, { key: i, promise: a }),
      a
    );
  }
  _createGeometry(e) {
    const t = new _e();
    e.index && t.setIndex(new G(e.index.array, 1));
    for (let i = 0; i < e.attributes.length; i++) {
      const n = e.attributes[i],
        r = n.name,
        s = n.array,
        a = n.itemSize,
        o = new G(s, a);
      (r === "color" &&
        (this._assignVertexColorSpace(o, n.vertexColorSpace), (o.normalized = !(s instanceof Float32Array))),
        t.setAttribute(r, o));
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== C) return;
    const i = new O();
    for (let n = 0, r = e.count; n < r; n++)
      (i.fromBufferAttribute(e, n), ee.colorSpaceToWorking(i, C), e.setXYZ(n, i.r, i.g, i.b));
  }
  _loadLibrary(e, t) {
    const i = new j(this.manager);
    return (
      i.setPath(this.decoderPath),
      i.setResponseType(t),
      i.setWithCredentials(this.withCredentials),
      new Promise((n, r) => {
        i.load(e, n, void 0, r);
      })
    );
  }
  preload() {
    return (this._initDecoder(), this);
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js",
      t = [];
    return (
      e
        ? t.push(this._loadLibrary("draco_decoder.js", "text"))
        : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
          t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
      (this.decoderPending = Promise.all(t).then((i) => {
        const n = i[0];
        e || (this.decoderConfig.wasmBinary = i[1]);
        const r = jt.toString(),
          s = ["/* draco decoder */", n, "", "/* worker */", r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([s]));
      })),
      this.decoderPending
    );
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const n = new Worker(this.workerSourceURL);
        ((n._callbacks = {}),
          (n._taskCosts = {}),
          (n._taskLoad = 0),
          n.postMessage({ type: "init", decoderConfig: this.decoderConfig }),
          (n.onmessage = function (r) {
            const s = r.data;
            switch (s.type) {
              case "decode":
                n._callbacks[s.id].resolve(s);
                break;
              case "error":
                n._callbacks[s.id].reject(s);
                break;
              default:
                console.error('THREE.DRACOLoader: Unexpected message, "' + s.type + '"');
            }
          }),
          this.workerPool.push(n));
      } else
        this.workerPool.sort(function (n, r) {
          return n._taskLoad > r._taskLoad ? -1 : 1;
        });
      const i = this.workerPool[this.workerPool.length - 1];
      return ((i._taskCosts[e] = t), (i._taskLoad += t), i);
    });
  }
  _releaseTask(e, t) {
    ((e._taskLoad -= e._taskCosts[t]), delete e._callbacks[t], delete e._taskCosts[t]);
  }
  debug() {
    console.log(
      "Task load: ",
      this.workerPool.map((e) => e._taskLoad),
    );
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
    return (
      (this.workerPool.length = 0),
      this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL),
      this
    );
  }
}
function jt() {
  let d, e;
  onmessage = function (s) {
    const a = s.data;
    switch (a.type) {
      case "init":
        ((d = a.decoderConfig),
          (e = new Promise(function (l) {
            ((d.onModuleLoaded = function (u) {
              l({ draco: u });
            }),
              DracoDecoderModule(d));
          })));
        break;
      case "decode":
        const o = a.buffer,
          c = a.taskConfig;
        e.then((l) => {
          const u = l.draco,
            f = new u.Decoder();
          try {
            const h = t(u, f, new Int8Array(o), c),
              p = h.attributes.map((T) => T.array.buffer);
            (h.index && p.push(h.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: h }, p));
          } catch (h) {
            (console.error(h), self.postMessage({ type: "error", id: a.id, error: h.message }));
          } finally {
            u.destroy(f);
          }
        });
        break;
    }
  };
  function t(s, a, o, c) {
    const l = c.attributeIDs,
      u = c.attributeTypes;
    let f, h;
    const p = a.GetEncodedGeometryType(o);
    if (p === s.TRIANGULAR_MESH) ((f = new s.Mesh()), (h = a.DecodeArrayToMesh(o, o.byteLength, f)));
    else if (p === s.POINT_CLOUD) ((f = new s.PointCloud()), (h = a.DecodeArrayToPointCloud(o, o.byteLength, f)));
    else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!h.ok() || f.ptr === 0) throw new Error("THREE.DRACOLoader: Decoding failed: " + h.error_msg());
    const T = { index: null, attributes: [] };
    for (const m in l) {
      const g = self[u[m]];
      let x, y;
      if (c.useUniqueIDs) ((y = l[m]), (x = a.GetAttributeByUniqueId(f, y)));
      else {
        if (((y = a.GetAttributeId(f, s[l[m]])), y === -1)) continue;
        x = a.GetAttribute(f, y);
      }
      const _ = n(s, a, f, m, g, x);
      (m === "color" && (_.vertexColorSpace = c.vertexColorSpace), T.attributes.push(_));
    }
    return (p === s.TRIANGULAR_MESH && (T.index = i(s, a, f)), s.destroy(f), T);
  }
  function i(s, a, o) {
    const l = o.num_faces() * 3,
      u = l * 4,
      f = s._malloc(u);
    a.GetTrianglesUInt32Array(o, u, f);
    const h = new Uint32Array(s.HEAPF32.buffer, f, l).slice();
    return (s._free(f), { array: h, itemSize: 1 });
  }
  function n(s, a, o, c, l, u) {
    const f = u.num_components(),
      p = o.num_points() * f,
      T = p * l.BYTES_PER_ELEMENT,
      m = r(s, l),
      g = s._malloc(T);
    a.GetAttributeDataArrayForAllPoints(o, u, m, T, g);
    const x = new l(s.HEAPF32.buffer, g, p).slice();
    return (s._free(g), { name: c, array: x, itemSize: f });
  }
  function r(s, a) {
    switch (a) {
      case Float32Array:
        return s.DT_FLOAT32;
      case Int8Array:
        return s.DT_INT8;
      case Int16Array:
        return s.DT_INT16;
      case Int32Array:
        return s.DT_INT32;
      case Uint8Array:
        return s.DT_UINT8;
      case Uint16Array:
        return s.DT_UINT16;
      case Uint32Array:
        return s.DT_UINT32;
    }
  }
}
var Bt = `varying vec2 vUv;
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
  Kt = `void main()
{
    gl_FragColor = vec4(vec3(1.), 0.0);
}`;
class qt {
  constructor(e, t, i, n, r) {
    ((this.app = e), (this.gl = t), (this.mesh = i), (this.group = n), (this.color = r), this.init());
  }
  init() {
    this.setMaterial();
  }
  setMaterial() {
    ((this.material = new ot({ vertexShader: Bt, fragmentShader: Kt, transparent: !0, uniforms: {} })),
      (this.mesh.material = this.material));
  }
  resize() {}
  update() {}
  destroy() {}
}
const Yt = "/_astro/1.glb",
  Jt = "/_astro/2.glb";
function Qt(d) {
  d.group.scale.set(d.scale, d.scale, d.scale);
  let e = d.position.x;
  if (d.name === "footerModel") {
    const t = window.innerWidth / window.innerHeight;
    if (!(window.innerWidth <= 768) && t < 1.7) {
      const n = 1.7 - t;
      e = d.position.x + n * 2;
    }
  }
  (d.group.position.set(e, d.position.y, d.position.z), d.group.rotation.set(d.rotate.x, d.rotate.y, d.rotate.z));
}
function Zt(d) {
  return {
    rotationX: X.quickTo(d.animatedRotation, "x", {
      duration: 1,
      onUpdate: () => (d.group.rotation.x = d.rotate.x + d.animatedRotation.x + d.animatedScrollRotation.x),
    }),
    rotationY: X.quickTo(d.animatedRotation, "y", {
      duration: 1,
      onUpdate: () => (d.group.rotation.y = d.rotate.y + d.animatedRotation.y + d.animatedScrollRotation.y),
    }),
    rotationZ: X.quickTo(d.animatedRotation, "z", {
      duration: 1,
      onUpdate: () => (d.group.rotation.z = d.rotate.z + d.animatedRotation.z + d.animatedScrollRotation.z),
    }),
  };
}
export { Wt as D, Xt as G, Yt as a, Qt as b, Zt as c, qt as i, Jt as m };
