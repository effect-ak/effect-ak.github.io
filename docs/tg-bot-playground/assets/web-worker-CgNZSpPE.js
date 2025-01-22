var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
(function() {
  "use strict";
  var _value, _a, _b, _c, _d, _e;
  const isFunction$1 = (input) => typeof input === "function";
  const dual = function(arity, body) {
    if (typeof arity === "function") {
      return function() {
        if (arity(arguments)) {
          return body.apply(this, arguments);
        }
        return (self2) => body(self2, ...arguments);
      };
    }
    switch (arity) {
      case 0:
      case 1:
        throw new RangeError(`Invalid arity ${arity}`);
      case 2:
        return function(a, b) {
          if (arguments.length >= 2) {
            return body(a, b);
          }
          return function(self2) {
            return body(self2, a);
          };
        };
      case 3:
        return function(a, b, c) {
          if (arguments.length >= 3) {
            return body(a, b, c);
          }
          return function(self2) {
            return body(self2, a, b);
          };
        };
      case 4:
        return function(a, b, c, d) {
          if (arguments.length >= 4) {
            return body(a, b, c, d);
          }
          return function(self2) {
            return body(self2, a, b, c);
          };
        };
      case 5:
        return function(a, b, c, d, e) {
          if (arguments.length >= 5) {
            return body(a, b, c, d, e);
          }
          return function(self2) {
            return body(self2, a, b, c, d);
          };
        };
      default:
        return function() {
          if (arguments.length >= arity) {
            return body.apply(this, arguments);
          }
          const args2 = arguments;
          return function(self2) {
            return body(self2, ...args2);
          };
        };
    }
  };
  const identity = (a) => a;
  const constant = (value) => () => value;
  const constTrue = /* @__PURE__ */ constant(true);
  const constFalse = /* @__PURE__ */ constant(false);
  const constUndefined = /* @__PURE__ */ constant(void 0);
  const constVoid = constUndefined;
  function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
      case 1:
        return a;
      case 2:
        return ab(a);
      case 3:
        return bc(ab(a));
      case 4:
        return cd(bc(ab(a)));
      case 5:
        return de(cd(bc(ab(a))));
      case 6:
        return ef(de(cd(bc(ab(a)))));
      case 7:
        return fg(ef(de(cd(bc(ab(a))))));
      case 8:
        return gh(fg(ef(de(cd(bc(ab(a)))))));
      case 9:
        return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
      default: {
        let ret = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
          ret = arguments[i](ret);
        }
        return ret;
      }
    }
  }
  const make$4 = (isEquivalent) => (self2, that) => self2 === that || isEquivalent(self2, that);
  let moduleVersion = "3.12.6";
  const getCurrentVersion = () => moduleVersion;
  const globalStoreId = `effect/GlobalValue/globalStoreId/${/* @__PURE__ */ getCurrentVersion()}`;
  let globalStore;
  const globalValue = (id, compute) => {
    if (!globalStore) {
      globalThis[globalStoreId] ?? (globalThis[globalStoreId] = /* @__PURE__ */ new Map());
      globalStore = globalThis[globalStoreId];
    }
    if (!globalStore.has(id)) {
      globalStore.set(id, compute());
    }
    return globalStore.get(id);
  };
  const isFunction = isFunction$1;
  const isRecordOrArray = (input) => typeof input === "object" && input !== null;
  const isObject = (input) => isRecordOrArray(input) || isFunction(input);
  const hasProperty = /* @__PURE__ */ dual(2, (self2, property) => isObject(self2) && property in self2);
  const isTagged = /* @__PURE__ */ dual(2, (self2, tag) => hasProperty(self2, "_tag") && self2["_tag"] === tag);
  const getBugErrorMessage = (message) => `BUG: ${message} - please report an issue at https://github.com/Effect-TS/effect/issues`;
  let SingleShotGen$1 = class SingleShotGen2 {
    constructor(self2) {
      __publicField(this, "self");
      __publicField(this, "called", false);
      this.self = self2;
    }
    /**
     * @since 2.0.0
     */
    next(a) {
      return this.called ? {
        value: a,
        done: true
      } : (this.called = true, {
        value: this.self,
        done: false
      });
    }
    /**
     * @since 2.0.0
     */
    return(a) {
      return {
        value: a,
        done: true
      };
    }
    /**
     * @since 2.0.0
     */
    throw(e) {
      throw e;
    }
    /**
     * @since 2.0.0
     */
    [Symbol.iterator]() {
      return new SingleShotGen2(this.self);
    }
  };
  const YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
  class YieldWrap {
    constructor(value) {
      /**
       * @since 3.0.6
       */
      __privateAdd(this, _value);
      __privateSet(this, _value, value);
    }
    /**
     * @since 3.0.6
     */
    [YieldWrapTypeId]() {
      return __privateGet(this, _value);
    }
  }
  _value = new WeakMap();
  function yieldWrapGet(self2) {
    if (typeof self2 === "object" && self2 !== null && YieldWrapTypeId in self2) {
      return self2[YieldWrapTypeId]();
    }
    throw new Error(getBugErrorMessage("yieldWrapGet"));
  }
  const structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
    enabled: false,
    tester: void 0
  }));
  const randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
  const symbol$1 = /* @__PURE__ */ Symbol.for("effect/Hash");
  const hash = (self2) => {
    if (structuralRegionState.enabled === true) {
      return 0;
    }
    switch (typeof self2) {
      case "number":
        return number(self2);
      case "bigint":
        return string(self2.toString(10));
      case "boolean":
        return string(String(self2));
      case "symbol":
        return string(String(self2));
      case "string":
        return string(self2);
      case "undefined":
        return string("undefined");
      case "function":
      case "object": {
        if (self2 === null) {
          return string("null");
        } else if (self2 instanceof Date) {
          return hash(self2.toISOString());
        } else if (isHash(self2)) {
          return self2[symbol$1]();
        } else {
          return random(self2);
        }
      }
      default:
        throw new Error(`BUG: unhandled typeof ${typeof self2} - please report an issue at https://github.com/Effect-TS/effect/issues`);
    }
  };
  const random = (self2) => {
    if (!randomHashCache.has(self2)) {
      randomHashCache.set(self2, number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
    }
    return randomHashCache.get(self2);
  };
  const combine = (b) => (self2) => self2 * 53 ^ b;
  const optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
  const isHash = (u) => hasProperty(u, symbol$1);
  const number = (n) => {
    if (n !== n || n === Infinity) {
      return 0;
    }
    let h = n | 0;
    if (h !== n) {
      h ^= n * 4294967295;
    }
    while (n > 4294967295) {
      h ^= n /= 4294967295;
    }
    return optimize(h);
  };
  const string = (str) => {
    let h = 5381, i = str.length;
    while (i) {
      h = h * 33 ^ str.charCodeAt(--i);
    }
    return optimize(h);
  };
  const structureKeys = (o, keys2) => {
    let h = 12289;
    for (let i = 0; i < keys2.length; i++) {
      h ^= pipe(string(keys2[i]), combine(hash(o[keys2[i]])));
    }
    return optimize(h);
  };
  const structure = (o) => structureKeys(o, Object.keys(o));
  const array = (arr) => {
    let h = 6151;
    for (let i = 0; i < arr.length; i++) {
      h = pipe(h, combine(hash(arr[i])));
    }
    return optimize(h);
  };
  const cached = function() {
    if (arguments.length === 1) {
      const self3 = arguments[0];
      return function(hash3) {
        Object.defineProperty(self3, symbol$1, {
          value() {
            return hash3;
          },
          enumerable: false
        });
        return hash3;
      };
    }
    const self2 = arguments[0];
    const hash2 = arguments[1];
    Object.defineProperty(self2, symbol$1, {
      value() {
        return hash2;
      },
      enumerable: false
    });
    return hash2;
  };
  const symbol = /* @__PURE__ */ Symbol.for("effect/Equal");
  function equals() {
    if (arguments.length === 1) {
      return (self2) => compareBoth(self2, arguments[0]);
    }
    return compareBoth(arguments[0], arguments[1]);
  }
  function compareBoth(self2, that) {
    if (self2 === that) {
      return true;
    }
    const selfType = typeof self2;
    if (selfType !== typeof that) {
      return false;
    }
    if (selfType === "object" || selfType === "function") {
      if (self2 !== null && that !== null) {
        if (isEqual(self2) && isEqual(that)) {
          if (hash(self2) === hash(that) && self2[symbol](that)) {
            return true;
          } else {
            return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self2, that) : false;
          }
        } else if (self2 instanceof Date && that instanceof Date) {
          return self2.toISOString() === that.toISOString();
        }
      }
      if (structuralRegionState.enabled) {
        if (Array.isArray(self2) && Array.isArray(that)) {
          return self2.length === that.length && self2.every((v, i) => compareBoth(v, that[i]));
        }
        if (Object.getPrototypeOf(self2) === Object.prototype && Object.getPrototypeOf(self2) === Object.prototype) {
          const keysSelf = Object.keys(self2);
          const keysThat = Object.keys(that);
          if (keysSelf.length === keysThat.length) {
            for (const key of keysSelf) {
              if (!(key in that && compareBoth(self2[key], that[key]))) {
                return structuralRegionState.tester ? structuralRegionState.tester(self2, that) : false;
              }
            }
            return true;
          }
        }
        return structuralRegionState.tester ? structuralRegionState.tester(self2, that) : false;
      }
    }
    return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self2, that) : false;
  }
  const isEqual = (u) => hasProperty(u, symbol);
  const NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
  const toJSON = (x) => {
    try {
      if (hasProperty(x, "toJSON") && isFunction(x["toJSON"]) && x["toJSON"].length === 0) {
        return x.toJSON();
      } else if (Array.isArray(x)) {
        return x.map(toJSON);
      }
    } catch (_) {
      return {};
    }
    return redact(x);
  };
  const format = (x) => JSON.stringify(x, null, 2);
  const toStringUnknown = (u, whitespace = 2) => {
    if (typeof u === "string") {
      return u;
    }
    try {
      return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
    } catch (_) {
      return String(u);
    }
  };
  const stringifyCircular = (obj, whitespace) => {
    let cache = [];
    const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? void 0 : cache.push(value) && (redactableState.fiberRefs !== void 0 && isRedactable(value) ? value[symbolRedactable](redactableState.fiberRefs) : value) : value, whitespace);
    cache = void 0;
    return retVal;
  };
  const symbolRedactable = /* @__PURE__ */ Symbol.for("effect/Inspectable/Redactable");
  const isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
  const redactableState = /* @__PURE__ */ globalValue("effect/Inspectable/redactableState", () => ({
    fiberRefs: void 0
  }));
  const redact = (u) => {
    if (isRedactable(u) && redactableState.fiberRefs !== void 0) {
      return u[symbolRedactable](redactableState.fiberRefs);
    }
    return u;
  };
  const pipeArguments = (self2, args2) => {
    switch (args2.length) {
      case 0:
        return self2;
      case 1:
        return args2[0](self2);
      case 2:
        return args2[1](args2[0](self2));
      case 3:
        return args2[2](args2[1](args2[0](self2)));
      case 4:
        return args2[3](args2[2](args2[1](args2[0](self2))));
      case 5:
        return args2[4](args2[3](args2[2](args2[1](args2[0](self2)))));
      case 6:
        return args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self2))))));
      case 7:
        return args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self2)))))));
      case 8:
        return args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self2))))))));
      case 9:
        return args2[8](args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self2)))))))));
      default: {
        let ret = self2;
        for (let i = 0, len = args2.length; i < len; i++) {
          ret = args2[i](ret);
        }
        return ret;
      }
    }
  };
  const OP_COMMIT = "Commit";
  const OP_FAILURE = "Failure";
  const OP_WITH_RUNTIME = "WithRuntime";
  const EffectTypeId$1 = /* @__PURE__ */ Symbol.for("effect/Effect");
  const StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
  const SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
  const ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
  const effectVariance = {
    /* c8 ignore next */
    _R: (_) => _,
    /* c8 ignore next */
    _E: (_) => _,
    /* c8 ignore next */
    _A: (_) => _,
    _V: /* @__PURE__ */ getCurrentVersion()
  };
  const sinkVariance = {
    /* c8 ignore next */
    _A: (_) => _,
    /* c8 ignore next */
    _In: (_) => _,
    /* c8 ignore next */
    _L: (_) => _,
    /* c8 ignore next */
    _E: (_) => _,
    /* c8 ignore next */
    _R: (_) => _
  };
  const channelVariance = {
    /* c8 ignore next */
    _Env: (_) => _,
    /* c8 ignore next */
    _InErr: (_) => _,
    /* c8 ignore next */
    _InElem: (_) => _,
    /* c8 ignore next */
    _InDone: (_) => _,
    /* c8 ignore next */
    _OutErr: (_) => _,
    /* c8 ignore next */
    _OutElem: (_) => _,
    /* c8 ignore next */
    _OutDone: (_) => _
  };
  const EffectPrototype$1 = {
    [EffectTypeId$1]: effectVariance,
    [StreamTypeId]: effectVariance,
    [SinkTypeId]: sinkVariance,
    [ChannelTypeId]: channelVariance,
    [symbol](that) {
      return this === that;
    },
    [symbol$1]() {
      return cached(this, random(this));
    },
    [Symbol.iterator]() {
      return new SingleShotGen$1(new YieldWrap(this));
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
  const StructuralPrototype = {
    [symbol$1]() {
      return cached(this, structure(this));
    },
    [symbol](that) {
      const selfKeys = Object.keys(this);
      const thatKeys = Object.keys(that);
      if (selfKeys.length !== thatKeys.length) {
        return false;
      }
      for (const key of selfKeys) {
        if (!(key in that && equals(this[key], that[key]))) {
          return false;
        }
      }
      return true;
    }
  };
  const CommitPrototype = {
    ...EffectPrototype$1,
    _op: OP_COMMIT
  };
  const StructuralCommitPrototype = {
    ...CommitPrototype,
    ...StructuralPrototype
  };
  const TypeId$4 = /* @__PURE__ */ Symbol.for("effect/Option");
  const CommonProto$1 = {
    ...EffectPrototype$1,
    [TypeId$4]: {
      _A: (_) => _
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    toString() {
      return format(this.toJSON());
    }
  };
  const SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
    _tag: "Some",
    _op: "Some",
    [symbol](that) {
      return isOption(that) && isSome$1(that) && equals(this.value, that.value);
    },
    [symbol$1]() {
      return cached(this, combine(hash(this._tag))(hash(this.value)));
    },
    toJSON() {
      return {
        _id: "Option",
        _tag: this._tag,
        value: toJSON(this.value)
      };
    }
  });
  const NoneHash = /* @__PURE__ */ hash("None");
  const NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
    _tag: "None",
    _op: "None",
    [symbol](that) {
      return isOption(that) && isNone$1(that);
    },
    [symbol$1]() {
      return NoneHash;
    },
    toJSON() {
      return {
        _id: "Option",
        _tag: this._tag
      };
    }
  });
  const isOption = (input) => hasProperty(input, TypeId$4);
  const isNone$1 = (fa) => fa._tag === "None";
  const isSome$1 = (fa) => fa._tag === "Some";
  const none$1 = /* @__PURE__ */ Object.create(NoneProto);
  const some$1 = (value) => {
    const a = Object.create(SomeProto);
    a.value = value;
    return a;
  };
  const TypeId$3 = /* @__PURE__ */ Symbol.for("effect/Either");
  const CommonProto = {
    ...EffectPrototype$1,
    [TypeId$3]: {
      _R: (_) => _
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    toString() {
      return format(this.toJSON());
    }
  };
  const RightProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
    _tag: "Right",
    _op: "Right",
    [symbol](that) {
      return isEither(that) && isRight(that) && equals(this.right, that.right);
    },
    [symbol$1]() {
      return combine(hash(this._tag))(hash(this.right));
    },
    toJSON() {
      return {
        _id: "Either",
        _tag: this._tag,
        right: toJSON(this.right)
      };
    }
  });
  const LeftProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
    _tag: "Left",
    _op: "Left",
    [symbol](that) {
      return isEither(that) && isLeft(that) && equals(this.left, that.left);
    },
    [symbol$1]() {
      return combine(hash(this._tag))(hash(this.left));
    },
    toJSON() {
      return {
        _id: "Either",
        _tag: this._tag,
        left: toJSON(this.left)
      };
    }
  });
  const isEither = (input) => hasProperty(input, TypeId$3);
  const isLeft = (ma) => ma._tag === "Left";
  const isRight = (ma) => ma._tag === "Right";
  const left$1 = (left2) => {
    const a = Object.create(LeftProto);
    a.left = left2;
    return a;
  };
  const right$1 = (right2) => {
    const a = Object.create(RightProto);
    a.right = right2;
    return a;
  };
  const right = right$1;
  const left = left$1;
  const none = () => none$1;
  const some = some$1;
  const isNone = isNone$1;
  const isSome = isSome$1;
  const getOrElse = /* @__PURE__ */ dual(2, (self2, onNone) => isNone(self2) ? onNone() : self2.value);
  const getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);
  const fromIterable = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
  const reverse$1 = (self2) => Array.from(self2).reverse();
  const reduce$2 = /* @__PURE__ */ dual(3, (self2, b, f) => fromIterable(self2).reduce((b2, a, i) => f(b2, a, i), b));
  const TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
  const ReferenceTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Reference");
  const STMSymbolKey = "effect/STM";
  const STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
  const TagProto = {
    ...EffectPrototype$1,
    _op: "Tag",
    [STMTypeId]: effectVariance,
    [TagTypeId]: {
      _Service: (_) => _,
      _Identifier: (_) => _
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "Tag",
        key: this.key,
        stack: this.stack
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    of(self2) {
      return self2;
    },
    context(self2) {
      return make$3(this, self2);
    }
  };
  const ReferenceProto = {
    ...TagProto,
    [ReferenceTypeId]: ReferenceTypeId
  };
  const Tag$1 = (id) => () => {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    const creationError = new Error();
    Error.stackTraceLimit = limit;
    function TagClass() {
    }
    Object.setPrototypeOf(TagClass, TagProto);
    TagClass.key = id;
    Object.defineProperty(TagClass, "stack", {
      get() {
        return creationError.stack;
      }
    });
    return TagClass;
  };
  const Reference$1 = () => (id, options) => {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    const creationError = new Error();
    Error.stackTraceLimit = limit;
    function ReferenceClass() {
    }
    Object.setPrototypeOf(ReferenceClass, ReferenceProto);
    ReferenceClass.key = id;
    ReferenceClass.defaultValue = options.defaultValue;
    Object.defineProperty(ReferenceClass, "stack", {
      get() {
        return creationError.stack;
      }
    });
    return ReferenceClass;
  };
  const TypeId$2 = /* @__PURE__ */ Symbol.for("effect/Context");
  const ContextProto = {
    [TypeId$2]: {
      _Services: (_) => _
    },
    [symbol](that) {
      if (isContext(that)) {
        if (this.unsafeMap.size === that.unsafeMap.size) {
          for (const k of this.unsafeMap.keys()) {
            if (!that.unsafeMap.has(k) || !equals(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
              return false;
            }
          }
          return true;
        }
      }
      return false;
    },
    [symbol$1]() {
      return cached(this, number(this.unsafeMap.size));
    },
    pipe() {
      return pipeArguments(this, arguments);
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "Context",
        services: Array.from(this.unsafeMap).map(toJSON)
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    }
  };
  const makeContext = (unsafeMap) => {
    const context = Object.create(ContextProto);
    context.unsafeMap = unsafeMap;
    return context;
  };
  const serviceNotFoundError = (tag) => {
    const error = new Error(`Service not found${tag.key ? `: ${String(tag.key)}` : ""}`);
    if (tag.stack) {
      const lines = tag.stack.split("\n");
      if (lines.length > 2) {
        const afterAt = lines[2].match(/at (.*)/);
        if (afterAt) {
          error.message = error.message + ` (defined at ${afterAt[1]})`;
        }
      }
    }
    if (error.stack) {
      const lines = error.stack.split("\n");
      lines.splice(1, 3);
      error.stack = lines.join("\n");
    }
    return error;
  };
  const isContext = (u) => hasProperty(u, TypeId$2);
  const make$3 = (tag, service2) => makeContext(/* @__PURE__ */ new Map([[tag.key, service2]]));
  const add$3 = /* @__PURE__ */ dual(3, (self2, tag, service2) => {
    const map2 = new Map(self2.unsafeMap);
    map2.set(tag.key, service2);
    return makeContext(map2);
  });
  const defaultValueCache = /* @__PURE__ */ globalValue("effect/Context/defaultValueCache", () => /* @__PURE__ */ new Map());
  const getDefaultValue = (tag) => {
    if (defaultValueCache.has(tag.key)) {
      return defaultValueCache.get(tag.key);
    }
    const value = tag.defaultValue();
    defaultValueCache.set(tag.key, value);
    return value;
  };
  const unsafeGetReference = (self2, tag) => {
    return self2.unsafeMap.has(tag.key) ? self2.unsafeMap.get(tag.key) : getDefaultValue(tag);
  };
  const unsafeGet$2 = /* @__PURE__ */ dual(2, (self2, tag) => {
    if (!self2.unsafeMap.has(tag.key)) {
      if (ReferenceTypeId in tag) return getDefaultValue(tag);
      throw serviceNotFoundError(tag);
    }
    return self2.unsafeMap.get(tag.key);
  });
  const merge$1 = /* @__PURE__ */ dual(2, (self2, that) => {
    const map2 = new Map(self2.unsafeMap);
    for (const [tag, s] of that.unsafeMap) {
      map2.set(tag, s);
    }
    return makeContext(map2);
  });
  const make$2 = make$3;
  const add$2 = add$3;
  const unsafeGet$1 = unsafeGet$2;
  const merge = merge$1;
  const Tag = Tag$1;
  const Reference = Reference$1;
  const EffectPrototype = EffectPrototype$1;
  const TypeId$1 = /* @__PURE__ */ Symbol.for("effect/Micro");
  const MicroExitTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroExit");
  const isMicro = (u) => typeof u === "object" && u !== null && TypeId$1 in u;
  const MicroCauseTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroCause");
  const microCauseVariance = {
    _E: identity
  };
  class MicroCauseImpl extends globalThis.Error {
    constructor(_tag, originalError, traces) {
      const causeName = `MicroCause.${_tag}`;
      let name;
      let message;
      let stack;
      if (originalError instanceof globalThis.Error) {
        name = `(${causeName}) ${originalError.name}`;
        message = originalError.message;
        const messageLines = message.split("\n").length;
        stack = originalError.stack ? `(${causeName}) ${originalError.stack.split("\n").slice(0, messageLines + 3).join("\n")}` : `${name}: ${message}`;
      } else {
        name = causeName;
        message = toStringUnknown(originalError, 0);
        stack = `${name}: ${message}`;
      }
      if (traces.length > 0) {
        stack += `
    ${traces.join("\n    ")}`;
      }
      super(message);
      __publicField(this, "_tag");
      __publicField(this, "traces");
      __publicField(this, _a);
      this._tag = _tag;
      this.traces = traces;
      this[MicroCauseTypeId] = microCauseVariance;
      this.name = name;
      this.stack = stack;
    }
    pipe() {
      return pipeArguments(this, arguments);
    }
    toString() {
      return this.stack;
    }
    [(_a = MicroCauseTypeId, NodeInspectSymbol)]() {
      return this.stack;
    }
  }
  class Fail extends MicroCauseImpl {
    constructor(error, traces = []) {
      super("Fail", error, traces);
      __publicField(this, "error");
      this.error = error;
    }
  }
  const causeFail = (error, traces = []) => new Fail(error, traces);
  class Die extends MicroCauseImpl {
    constructor(defect, traces = []) {
      super("Die", defect, traces);
      __publicField(this, "defect");
      this.defect = defect;
    }
  }
  const causeDie = (defect, traces = []) => new Die(defect, traces);
  class Interrupt extends MicroCauseImpl {
    constructor(traces = []) {
      super("Interrupt", "interrupted", traces);
    }
  }
  const causeInterrupt = (traces = []) => new Interrupt(traces);
  const causeIsFail = (self2) => self2._tag === "Fail";
  const causeIsInterrupt = (self2) => self2._tag === "Interrupt";
  const MicroFiberTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroFiber");
  const fiberVariance = {
    _A: identity,
    _E: identity
  };
  _b = MicroFiberTypeId;
  class MicroFiberImpl {
    constructor(context, interruptible2 = true) {
      __publicField(this, "context");
      __publicField(this, "interruptible");
      __publicField(this, _b);
      __publicField(this, "_stack", []);
      __publicField(this, "_observers", []);
      __publicField(this, "_exit");
      __publicField(this, "_children");
      __publicField(this, "currentOpCount", 0);
      __publicField(this, "_interrupted", false);
      // cancel the yielded operation, or for the yielded exit value
      __publicField(this, "_yielded");
      this.context = context;
      this.interruptible = interruptible2;
      this[MicroFiberTypeId] = fiberVariance;
    }
    getRef(ref) {
      return unsafeGetReference(this.context, ref);
    }
    addObserver(cb) {
      if (this._exit) {
        cb(this._exit);
        return constVoid;
      }
      this._observers.push(cb);
      return () => {
        const index = this._observers.indexOf(cb);
        if (index >= 0) {
          this._observers.splice(index, 1);
        }
      };
    }
    unsafeInterrupt() {
      if (this._exit) {
        return;
      }
      this._interrupted = true;
      if (this.interruptible) {
        this.evaluate(exitInterrupt);
      }
    }
    unsafePoll() {
      return this._exit;
    }
    evaluate(effect) {
      if (this._exit) {
        return;
      } else if (this._yielded !== void 0) {
        const yielded = this._yielded;
        this._yielded = void 0;
        yielded();
      }
      const exit2 = this.runLoop(effect);
      if (exit2 === Yield) {
        return;
      }
      const interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
      if (interruptChildren !== void 0) {
        return this.evaluate(flatMap(interruptChildren, () => exit2));
      }
      this._exit = exit2;
      for (let i = 0; i < this._observers.length; i++) {
        this._observers[i](exit2);
      }
      this._observers.length = 0;
    }
    runLoop(effect) {
      let yielding = false;
      let current = effect;
      this.currentOpCount = 0;
      try {
        while (true) {
          this.currentOpCount++;
          if (!yielding && this.getRef(CurrentScheduler).shouldYield(this)) {
            yielding = true;
            const prev = current;
            current = flatMap(yieldNow, () => prev);
          }
          current = current[evaluate](this);
          if (current === Yield) {
            const yielded = this._yielded;
            if (MicroExitTypeId in yielded) {
              this._yielded = void 0;
              return yielded;
            }
            return Yield;
          }
        }
      } catch (error) {
        if (!hasProperty(current, evaluate)) {
          return exitDie(`MicroFiber.runLoop: Not a valid effect: ${String(current)}`);
        }
        return exitDie(error);
      }
    }
    getCont(symbol2) {
      while (true) {
        const op = this._stack.pop();
        if (!op) return void 0;
        const cont = op[ensureCont] && op[ensureCont](this);
        if (cont) return {
          [symbol2]: cont
        };
        if (op[symbol2]) return op;
      }
    }
    yieldWith(value) {
      this._yielded = value;
      return Yield;
    }
    children() {
      return this._children ?? (this._children = /* @__PURE__ */ new Set());
    }
  }
  const fiberMiddleware = /* @__PURE__ */ globalValue("effect/Micro/fiberMiddleware", () => ({
    interruptChildren: void 0
  }));
  const fiberAwait = (self2) => async((resume) => sync(self2.addObserver((exit2) => resume(succeed(exit2)))));
  const fiberInterrupt = (self2) => suspend(() => {
    self2.unsafeInterrupt();
    return asVoid(fiberAwait(self2));
  });
  const identifier = /* @__PURE__ */ Symbol.for("effect/Micro/identifier");
  const args = /* @__PURE__ */ Symbol.for("effect/Micro/args");
  const evaluate = /* @__PURE__ */ Symbol.for("effect/Micro/evaluate");
  const successCont = /* @__PURE__ */ Symbol.for("effect/Micro/successCont");
  const failureCont = /* @__PURE__ */ Symbol.for("effect/Micro/failureCont");
  const ensureCont = /* @__PURE__ */ Symbol.for("effect/Micro/ensureCont");
  const Yield = /* @__PURE__ */ Symbol.for("effect/Micro/Yield");
  const microVariance = {
    _A: identity,
    _E: identity,
    _R: identity
  };
  const MicroProto = {
    ...EffectPrototype,
    _op: "Micro",
    [TypeId$1]: microVariance,
    pipe() {
      return pipeArguments(this, arguments);
    },
    [Symbol.iterator]() {
      return new SingleShotGen$1(new YieldWrap(this));
    },
    toJSON() {
      return {
        _id: "Micro",
        op: this[identifier],
        ...args in this ? {
          args: this[args]
        } : void 0
      };
    },
    toString() {
      return format(this);
    },
    [NodeInspectSymbol]() {
      return format(this);
    }
  };
  function defaultEvaluate(_fiber) {
    return exitDie(`Micro.evaluate: Not implemented`);
  }
  const makePrimitiveProto = (options) => ({
    ...MicroProto,
    [identifier]: options.op,
    [evaluate]: options.eval ?? defaultEvaluate,
    [successCont]: options.contA,
    [failureCont]: options.contE,
    [ensureCont]: options.ensure
  });
  const makePrimitive = (options) => {
    const Proto = makePrimitiveProto(options);
    return function() {
      const self2 = Object.create(Proto);
      self2[args] = options.single === false ? arguments : arguments[0];
      return self2;
    };
  };
  const makeExit = (options) => {
    const Proto = {
      ...makePrimitiveProto(options),
      [MicroExitTypeId]: MicroExitTypeId,
      _tag: options.op,
      get [options.prop]() {
        return this[args];
      },
      toJSON() {
        return {
          _id: "MicroExit",
          _tag: options.op,
          [options.prop]: this[args]
        };
      },
      [symbol](that) {
        return isMicroExit(that) && that._tag === options.op && equals(this[args], that[args]);
      },
      [symbol$1]() {
        return cached(this, combine(string(options.op))(hash(this[args])));
      }
    };
    return function(value) {
      const self2 = Object.create(Proto);
      self2[args] = value;
      self2[successCont] = void 0;
      self2[failureCont] = void 0;
      self2[ensureCont] = void 0;
      return self2;
    };
  };
  const succeed = /* @__PURE__ */ makeExit({
    op: "Success",
    prop: "value",
    eval(fiber) {
      const cont = fiber.getCont(successCont);
      return cont ? cont[successCont](this[args], fiber) : fiber.yieldWith(this);
    }
  });
  const failCause$1 = /* @__PURE__ */ makeExit({
    op: "Failure",
    prop: "cause",
    eval(fiber) {
      let cont = fiber.getCont(failureCont);
      while (causeIsInterrupt(this[args]) && cont && fiber.interruptible) {
        cont = fiber.getCont(failureCont);
      }
      return cont ? cont[failureCont](this[args], fiber) : fiber.yieldWith(this);
    }
  });
  const fail$2 = (error) => failCause$1(causeFail(error));
  const sync = /* @__PURE__ */ makePrimitive({
    op: "Sync",
    eval(fiber) {
      const value = this[args]();
      const cont = fiber.getCont(successCont);
      return cont ? cont[successCont](value, fiber) : fiber.yieldWith(exitSucceed(value));
    }
  });
  const suspend = /* @__PURE__ */ makePrimitive({
    op: "Suspend",
    eval(_fiber) {
      return this[args]();
    }
  });
  const yieldNowWith = /* @__PURE__ */ makePrimitive({
    op: "Yield",
    eval(fiber) {
      let resumed = false;
      fiber.getRef(CurrentScheduler).scheduleTask(() => {
        if (resumed) return;
        fiber.evaluate(exitVoid);
      }, this[args] ?? 0);
      return fiber.yieldWith(() => {
        resumed = true;
      });
    }
  });
  const yieldNow = /* @__PURE__ */ yieldNowWith(0);
  const void_ = /* @__PURE__ */ succeed(void 0);
  const tryPromise = (options) => asyncOptions(function(resume, signal) {
    try {
      options.try(signal).then((a) => resume(succeed(a)), (e) => resume(fail$2(options.catch(e))));
    } catch (err) {
      resume(fail$2(options.catch(err)));
    }
  }, options.try.length !== 0);
  const withMicroFiber = /* @__PURE__ */ makePrimitive({
    op: "WithMicroFiber",
    eval(fiber) {
      return this[args](fiber);
    }
  });
  const asyncOptions = /* @__PURE__ */ makePrimitive({
    op: "Async",
    single: false,
    eval(fiber) {
      const register = this[args][0];
      let resumed = false;
      let yielded = false;
      const controller = this[args][1] ? new AbortController() : void 0;
      const onCancel = register((effect) => {
        if (resumed) return;
        resumed = true;
        if (yielded) {
          fiber.evaluate(effect);
        } else {
          yielded = effect;
        }
      }, controller == null ? void 0 : controller.signal);
      if (yielded !== false) return yielded;
      yielded = true;
      fiber._yielded = () => {
        resumed = true;
      };
      if (controller === void 0 && onCancel === void 0) {
        return Yield;
      }
      fiber._stack.push(asyncFinalizer(() => {
        resumed = true;
        controller == null ? void 0 : controller.abort();
        return onCancel ?? exitVoid;
      }));
      return Yield;
    }
  });
  const asyncFinalizer = /* @__PURE__ */ makePrimitive({
    op: "AsyncFinalizer",
    ensure(fiber) {
      if (fiber.interruptible) {
        fiber.interruptible = false;
        fiber._stack.push(setInterruptible(true));
      }
    },
    contE(cause, _fiber) {
      return causeIsInterrupt(cause) ? flatMap(this[args](), () => failCause$1(cause)) : failCause$1(cause);
    }
  });
  const async = (register) => asyncOptions(register, register.length >= 2);
  const gen = (...args2) => suspend(() => fromIterator(args2.length === 1 ? args2[0]() : args2[1].call(args2[0])));
  const fromIterator = /* @__PURE__ */ makePrimitive({
    op: "Iterator",
    contA(value, fiber) {
      const state = this[args].next(value);
      if (state.done) return succeed(state.value);
      fiber._stack.push(this);
      return yieldWrapGet(state.value);
    },
    eval(fiber) {
      return this[successCont](void 0, fiber);
    }
  });
  const as = /* @__PURE__ */ dual(2, (self2, value) => map(self2, (_) => value));
  const andThen = /* @__PURE__ */ dual(2, (self2, f) => flatMap(self2, (a) => {
    const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
    return isMicro(value) ? value : succeed(value);
  }));
  const tap = /* @__PURE__ */ dual(2, (self2, f) => flatMap(self2, (a) => {
    const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
    return isMicro(value) ? as(value, a) : succeed(a);
  }));
  const asVoid = (self2) => flatMap(self2, (_) => exitVoid);
  const exit = (self2) => matchCause(self2, {
    onFailure: exitFailCause,
    onSuccess: exitSucceed
  });
  const flatMap = /* @__PURE__ */ dual(2, (self2, f) => {
    const onSuccess = Object.create(OnSuccessProto);
    onSuccess[args] = self2;
    onSuccess[successCont] = f;
    return onSuccess;
  });
  const OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
    op: "OnSuccess",
    eval(fiber) {
      fiber._stack.push(this);
      return this[args];
    }
  });
  const map = /* @__PURE__ */ dual(2, (self2, f) => flatMap(self2, (a) => succeed(f(a))));
  const isMicroExit = (u) => hasProperty(u, MicroExitTypeId);
  const exitSucceed = succeed;
  const exitFailCause = failCause$1;
  const exitInterrupt = /* @__PURE__ */ exitFailCause(/* @__PURE__ */ causeInterrupt());
  const exitDie = (defect) => exitFailCause(causeDie(defect));
  const exitVoid = /* @__PURE__ */ exitSucceed(void 0);
  const setImmediate = "setImmediate" in globalThis ? globalThis.setImmediate : (f) => setTimeout(f, 0);
  class MicroSchedulerDefault {
    constructor() {
      __publicField(this, "tasks", []);
      __publicField(this, "running", false);
      /**
       * @since 3.5.9
       */
      __publicField(this, "afterScheduled", () => {
        this.running = false;
        this.runTasks();
      });
    }
    /**
     * @since 3.5.9
     */
    scheduleTask(task, _priority) {
      this.tasks.push(task);
      if (!this.running) {
        this.running = true;
        setImmediate(this.afterScheduled);
      }
    }
    /**
     * @since 3.5.9
     */
    runTasks() {
      const tasks = this.tasks;
      this.tasks = [];
      for (let i = 0, len = tasks.length; i < len; i++) {
        tasks[i]();
      }
    }
    /**
     * @since 3.5.9
     */
    shouldYield(fiber) {
      return fiber.currentOpCount >= fiber.getRef(MaxOpsBeforeYield);
    }
    /**
     * @since 3.5.9
     */
    flush() {
      while (this.tasks.length > 0) {
        this.runTasks();
      }
    }
  }
  const service = (tag) => withMicroFiber((fiber) => succeed(unsafeGet$1(fiber.context, tag)));
  const updateContext = /* @__PURE__ */ dual(2, (self2, f) => withMicroFiber((fiber) => {
    const prev = fiber.context;
    fiber.context = f(prev);
    return onExit(self2, () => {
      fiber.context = prev;
      return void_;
    });
  }));
  const provideContext = /* @__PURE__ */ dual(2, (self2, provided) => updateContext(self2, merge(provided)));
  const provideService = /* @__PURE__ */ dual(3, (self2, tag, service2) => updateContext(self2, add$2(tag, service2)));
  class MaxOpsBeforeYield extends (/* @__PURE__ */ Reference()("effect/Micro/currentMaxOpsBeforeYield", {
    defaultValue: () => 2048
  })) {
  }
  class CurrentScheduler extends (/* @__PURE__ */ Reference()("effect/Micro/currentScheduler", {
    defaultValue: () => new MicroSchedulerDefault()
  })) {
  }
  const repeatExit = /* @__PURE__ */ dual(2, (self2, options) => suspend(() => {
    const startedAt = options.schedule ? Date.now() : 0;
    let attempt = 0;
    const loop = flatMap(exit(self2), (exit2) => {
      if (options.while !== void 0 && !options.while(exit2)) {
        return exit2;
      } else if (options.times !== void 0 && attempt >= options.times) {
        return exit2;
      }
      attempt++;
      let delayEffect = yieldNow;
      if (options.schedule !== void 0) {
        const elapsed = Date.now() - startedAt;
        const duration = options.schedule(attempt, elapsed);
        if (isNone(duration)) {
          return exit2;
        }
        delayEffect = sleep(duration.value);
      }
      return flatMap(delayEffect, () => loop);
    });
    return loop;
  }));
  const repeat = /* @__PURE__ */ dual((args2) => isMicro(args2[0]), (self2, options) => repeatExit(self2, {
    ...options,
    while: (exit2) => exit2._tag === "Success" && ((options == null ? void 0 : options.while) === void 0 || options.while(exit2.value))
  }));
  const catchAllCause = /* @__PURE__ */ dual(2, (self2, f) => {
    const onFailure = Object.create(OnFailureProto);
    onFailure[args] = self2;
    onFailure[failureCont] = f;
    return onFailure;
  });
  const OnFailureProto = /* @__PURE__ */ makePrimitiveProto({
    op: "OnFailure",
    eval(fiber) {
      fiber._stack.push(this);
      return this[args];
    }
  });
  const catchCauseIf = /* @__PURE__ */ dual(3, (self2, predicate, f) => catchAllCause(self2, (cause) => predicate(cause) ? f(cause) : failCause$1(cause)));
  const tapErrorCauseIf = /* @__PURE__ */ dual(3, (self2, refinement, f) => catchCauseIf(self2, refinement, (cause) => andThen(f(cause), failCause$1(cause))));
  const tapError = /* @__PURE__ */ dual(2, (self2, f) => tapErrorCauseIf(self2, causeIsFail, (fail2) => f(fail2.error)));
  const matchCauseEffect = /* @__PURE__ */ dual(2, (self2, options) => {
    const primitive = Object.create(OnSuccessAndFailureProto);
    primitive[args] = self2;
    primitive[successCont] = options.onSuccess;
    primitive[failureCont] = options.onFailure;
    return primitive;
  });
  const OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
    op: "OnSuccessAndFailure",
    eval(fiber) {
      fiber._stack.push(this);
      return this[args];
    }
  });
  const matchCause = /* @__PURE__ */ dual(2, (self2, options) => matchCauseEffect(self2, {
    onFailure: (cause) => sync(() => options.onFailure(cause)),
    onSuccess: (value) => sync(() => options.onSuccess(value))
  }));
  const sleep = (millis) => async((resume) => {
    const timeout = setTimeout(() => {
      resume(void_);
    }, millis);
    return sync(() => {
      clearTimeout(timeout);
    });
  });
  const delay = /* @__PURE__ */ dual(2, (self2, millis) => andThen(sleep(millis), self2));
  const onExit = /* @__PURE__ */ dual(2, (self2, f) => uninterruptibleMask((restore) => matchCauseEffect(restore(self2), {
    onFailure: (cause) => flatMap(f(exitFailCause(cause)), () => failCause$1(cause)),
    onSuccess: (a) => flatMap(f(exitSucceed(a)), () => succeed(a))
  })));
  const setInterruptible = /* @__PURE__ */ makePrimitive({
    op: "SetInterruptible",
    ensure(fiber) {
      fiber.interruptible = this[args];
      if (fiber._interrupted && fiber.interruptible) {
        return () => exitInterrupt;
      }
    }
  });
  const interruptible = (self2) => withMicroFiber((fiber) => {
    if (fiber.interruptible) return self2;
    fiber.interruptible = true;
    fiber._stack.push(setInterruptible(false));
    if (fiber._interrupted) return exitInterrupt;
    return self2;
  });
  const uninterruptibleMask = (f) => withMicroFiber((fiber) => {
    if (!fiber.interruptible) return f(identity);
    fiber.interruptible = false;
    fiber._stack.push(setInterruptible(true));
    return f(interruptible);
  });
  const unsafeFork = (parent, effect, immediate = false, daemon = false) => {
    const child = new MicroFiberImpl(parent.context, parent.interruptible);
    if (!daemon) {
      parent.children().add(child);
      child.addObserver(() => parent.children().delete(child));
    }
    if (immediate) {
      child.evaluate(effect);
    } else {
      parent.getRef(CurrentScheduler).scheduleTask(() => child.evaluate(effect), 0);
    }
    return child;
  };
  const forkDaemon = (self2) => withMicroFiber((fiber) => succeed(unsafeFork(fiber, self2, false, true)));
  const runFork = (effect, options) => {
    const fiber = new MicroFiberImpl(CurrentScheduler.context((options == null ? void 0 : options.scheduler) ?? new MicroSchedulerDefault()));
    fiber.evaluate(effect);
    if (options == null ? void 0 : options.signal) {
      if (options.signal.aborted) {
        fiber.unsafeInterrupt();
      } else {
        const abort = () => fiber.unsafeInterrupt();
        options.signal.addEventListener("abort", abort, {
          once: true
        });
        fiber.addObserver(() => options.signal.removeEventListener("abort", abort));
      }
    }
    return fiber;
  };
  const runPromiseExit = (effect, options) => new Promise((resolve, _reject) => {
    const handle = runFork(effect, options);
    handle.addObserver(resolve);
  });
  const runPromise = (effect, options) => runPromiseExit(effect, options).then((exit2) => {
    if (exit2._tag === "Failure") {
      throw exit2.cause;
    }
    return exit2.value;
  });
  const snakeToCamel = (self2) => {
    let str = self2[0];
    for (let i = 1; i < self2.length; i++) {
      str += self2[i] === "_" ? self2[++i].toUpperCase() : self2[i];
    }
    return str;
  };
  const TypeId = /* @__PURE__ */ Symbol.for("effect/Chunk");
  function copy(src, srcPos, dest, destPos, len) {
    for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
      dest[destPos + i - srcPos] = src[i];
    }
    return dest;
  }
  const emptyArray = [];
  const getEquivalence = (isEquivalent) => make$4((self2, that) => self2.length === that.length && toReadonlyArray(self2).every((value, i) => isEquivalent(value, unsafeGet(that, i))));
  const _equivalence = /* @__PURE__ */ getEquivalence(equals);
  const ChunkProto = {
    [TypeId]: {
      _A: (_) => _
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "Chunk",
        values: toReadonlyArray(this).map(toJSON)
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    [symbol](that) {
      return isChunk(that) && _equivalence(this, that);
    },
    [symbol$1]() {
      return cached(this, array(toReadonlyArray(this)));
    },
    [Symbol.iterator]() {
      switch (this.backing._tag) {
        case "IArray": {
          return this.backing.array[Symbol.iterator]();
        }
        case "IEmpty": {
          return emptyArray[Symbol.iterator]();
        }
        default: {
          return toReadonlyArray(this)[Symbol.iterator]();
        }
      }
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
  const makeChunk = (backing) => {
    const chunk = Object.create(ChunkProto);
    chunk.backing = backing;
    switch (backing._tag) {
      case "IEmpty": {
        chunk.length = 0;
        chunk.depth = 0;
        chunk.left = chunk;
        chunk.right = chunk;
        break;
      }
      case "IConcat": {
        chunk.length = backing.left.length + backing.right.length;
        chunk.depth = 1 + Math.max(backing.left.depth, backing.right.depth);
        chunk.left = backing.left;
        chunk.right = backing.right;
        break;
      }
      case "IArray": {
        chunk.length = backing.array.length;
        chunk.depth = 0;
        chunk.left = _empty$2;
        chunk.right = _empty$2;
        break;
      }
      case "ISingleton": {
        chunk.length = 1;
        chunk.depth = 0;
        chunk.left = _empty$2;
        chunk.right = _empty$2;
        break;
      }
      case "ISlice": {
        chunk.length = backing.length;
        chunk.depth = backing.chunk.depth + 1;
        chunk.left = _empty$2;
        chunk.right = _empty$2;
        break;
      }
    }
    return chunk;
  };
  const isChunk = (u) => hasProperty(u, TypeId);
  const _empty$2 = /* @__PURE__ */ makeChunk({
    _tag: "IEmpty"
  });
  const empty$3 = () => _empty$2;
  const make$1 = (...as2) => as2.length === 1 ? of(as2[0]) : unsafeFromNonEmptyArray(as2);
  const of = (a) => makeChunk({
    _tag: "ISingleton",
    a
  });
  const copyToArray = (self2, array2, initial) => {
    switch (self2.backing._tag) {
      case "IArray": {
        copy(self2.backing.array, 0, array2, initial, self2.length);
        break;
      }
      case "IConcat": {
        copyToArray(self2.left, array2, initial);
        copyToArray(self2.right, array2, initial + self2.left.length);
        break;
      }
      case "ISingleton": {
        array2[initial] = self2.backing.a;
        break;
      }
      case "ISlice": {
        let i = 0;
        let j = initial;
        while (i < self2.length) {
          array2[j] = unsafeGet(self2, i);
          i += 1;
          j += 1;
        }
        break;
      }
    }
  };
  const toReadonlyArray_ = (self2) => {
    switch (self2.backing._tag) {
      case "IEmpty": {
        return emptyArray;
      }
      case "IArray": {
        return self2.backing.array;
      }
      default: {
        const arr = new Array(self2.length);
        copyToArray(self2, arr, 0);
        self2.backing = {
          _tag: "IArray",
          array: arr
        };
        self2.left = _empty$2;
        self2.right = _empty$2;
        self2.depth = 0;
        return arr;
      }
    }
  };
  const toReadonlyArray = toReadonlyArray_;
  const reverseChunk = (self2) => {
    switch (self2.backing._tag) {
      case "IEmpty":
      case "ISingleton":
        return self2;
      case "IArray": {
        return makeChunk({
          _tag: "IArray",
          array: reverse$1(self2.backing.array)
        });
      }
      case "IConcat": {
        return makeChunk({
          _tag: "IConcat",
          left: reverse(self2.backing.right),
          right: reverse(self2.backing.left)
        });
      }
      case "ISlice":
        return unsafeFromArray(reverse$1(toReadonlyArray(self2)));
    }
  };
  const reverse = reverseChunk;
  const unsafeFromArray = (self2) => makeChunk({
    _tag: "IArray",
    array: self2
  });
  const unsafeFromNonEmptyArray = (self2) => unsafeFromArray(self2);
  const unsafeGet = /* @__PURE__ */ dual(2, (self2, index) => {
    switch (self2.backing._tag) {
      case "IEmpty": {
        throw new Error(`Index out of bounds`);
      }
      case "ISingleton": {
        if (index !== 0) {
          throw new Error(`Index out of bounds`);
        }
        return self2.backing.a;
      }
      case "IArray": {
        if (index >= self2.length || index < 0) {
          throw new Error(`Index out of bounds`);
        }
        return self2.backing.array[index];
      }
      case "IConcat": {
        return index < self2.left.length ? unsafeGet(self2.left, index) : unsafeGet(self2.right, index - self2.left.length);
      }
      case "ISlice": {
        return unsafeGet(self2.backing.chunk, index + self2.backing.offset);
      }
    }
  });
  const prepend = /* @__PURE__ */ dual(2, (self2, elem) => appendAll(of(elem), self2));
  const appendAll = /* @__PURE__ */ dual(2, (self2, that) => {
    if (self2.backing._tag === "IEmpty") {
      return that;
    }
    if (that.backing._tag === "IEmpty") {
      return self2;
    }
    const diff = that.depth - self2.depth;
    if (Math.abs(diff) <= 1) {
      return makeChunk({
        _tag: "IConcat",
        left: self2,
        right: that
      });
    } else if (diff < -1) {
      if (self2.left.depth >= self2.right.depth) {
        const nr = appendAll(self2.right, that);
        return makeChunk({
          _tag: "IConcat",
          left: self2.left,
          right: nr
        });
      } else {
        const nrr = appendAll(self2.right.right, that);
        if (nrr.depth === self2.depth - 3) {
          const nr = makeChunk({
            _tag: "IConcat",
            left: self2.right.left,
            right: nrr
          });
          return makeChunk({
            _tag: "IConcat",
            left: self2.left,
            right: nr
          });
        } else {
          const nl = makeChunk({
            _tag: "IConcat",
            left: self2.left,
            right: self2.right.left
          });
          return makeChunk({
            _tag: "IConcat",
            left: nl,
            right: nrr
          });
        }
      }
    } else {
      if (that.right.depth >= that.left.depth) {
        const nl = appendAll(self2, that.left);
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: that.right
        });
      } else {
        const nll = appendAll(self2, that.left.left);
        if (nll.depth === that.depth - 3) {
          const nl = makeChunk({
            _tag: "IConcat",
            left: nll,
            right: that.left.right
          });
          return makeChunk({
            _tag: "IConcat",
            left: nl,
            right: that.right
          });
        } else {
          const nr = makeChunk({
            _tag: "IConcat",
            left: that.left.right,
            right: that.right
          });
          return makeChunk({
            _tag: "IConcat",
            left: nll,
            right: nr
          });
        }
      }
    }
  });
  const isEmpty = (self2) => self2.length === 0;
  const isNonEmpty = (self2) => self2.length > 0;
  const unsafeHead = (self2) => unsafeGet(self2, 0);
  const headNonEmpty = unsafeHead;
  const SIZE = 5;
  const BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
  const MASK = BUCKET_SIZE - 1;
  const MAX_INDEX_NODE = BUCKET_SIZE / 2;
  const MIN_ARRAY_NODE = BUCKET_SIZE / 4;
  function popcount(x) {
    x -= x >> 1 & 1431655765;
    x = (x & 858993459) + (x >> 2 & 858993459);
    x = x + (x >> 4) & 252645135;
    x += x >> 8;
    x += x >> 16;
    return x & 127;
  }
  function hashFragment(shift, h) {
    return h >>> shift & MASK;
  }
  function toBitmap(x) {
    return 1 << x;
  }
  function fromBitmap(bitmap, bit) {
    return popcount(bitmap & bit - 1);
  }
  const make = (value, previous) => ({
    value,
    previous
  });
  function arrayUpdate(mutate2, at, v, arr) {
    let out = arr;
    if (!mutate2) {
      const len = arr.length;
      out = new Array(len);
      for (let i = 0; i < len; ++i) out[i] = arr[i];
    }
    out[at] = v;
    return out;
  }
  function arraySpliceOut(mutate2, at, arr) {
    const newLen = arr.length - 1;
    let i = 0;
    let g = 0;
    let out = arr;
    if (mutate2) {
      i = g = at;
    } else {
      out = new Array(newLen);
      while (i < at) out[g++] = arr[i++];
    }
    ++i;
    while (i <= newLen) out[g++] = arr[i++];
    if (mutate2) {
      out.length = newLen;
    }
    return out;
  }
  function arraySpliceIn(mutate2, at, v, arr) {
    const len = arr.length;
    if (mutate2) {
      let i2 = len;
      while (i2 >= at) arr[i2--] = arr[i2];
      arr[at] = v;
      return arr;
    }
    let i = 0, g = 0;
    const out = new Array(len + 1);
    while (i < at) out[g++] = arr[i++];
    out[at] = v;
    while (i < len) out[++g] = arr[i++];
    return out;
  }
  class EmptyNode {
    constructor() {
      __publicField(this, "_tag", "EmptyNode");
    }
    modify(edit, _shift, f, hash2, key, size2) {
      const v = f(none());
      if (isNone(v)) return new EmptyNode();
      ++size2.value;
      return new LeafNode(edit, hash2, key, v);
    }
  }
  function isEmptyNode(a) {
    return isTagged(a, "EmptyNode");
  }
  function isLeafNode(node) {
    return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
  }
  function canEditNode(node, edit) {
    return isEmptyNode(node) ? false : edit === node.edit;
  }
  class LeafNode {
    constructor(edit, hash2, key, value) {
      __publicField(this, "edit");
      __publicField(this, "hash");
      __publicField(this, "key");
      __publicField(this, "value");
      __publicField(this, "_tag", "LeafNode");
      this.edit = edit;
      this.hash = hash2;
      this.key = key;
      this.value = value;
    }
    modify(edit, shift, f, hash2, key, size2) {
      if (equals(key, this.key)) {
        const v2 = f(this.value);
        if (v2 === this.value) return this;
        else if (isNone(v2)) {
          --size2.value;
          return new EmptyNode();
        }
        if (canEditNode(this, edit)) {
          this.value = v2;
          return this;
        }
        return new LeafNode(edit, hash2, key, v2);
      }
      const v = f(none());
      if (isNone(v)) return this;
      ++size2.value;
      return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
    }
  }
  class CollisionNode {
    constructor(edit, hash2, children) {
      __publicField(this, "edit");
      __publicField(this, "hash");
      __publicField(this, "children");
      __publicField(this, "_tag", "CollisionNode");
      this.edit = edit;
      this.hash = hash2;
      this.children = children;
    }
    modify(edit, shift, f, hash2, key, size2) {
      if (hash2 === this.hash) {
        const canEdit = canEditNode(this, edit);
        const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size2);
        if (list === this.children) return this;
        return list.length > 1 ? new CollisionNode(edit, this.hash, list) : list[0];
      }
      const v = f(none());
      if (isNone(v)) return this;
      ++size2.value;
      return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
    }
    updateCollisionList(mutate2, edit, hash2, list, f, key, size2) {
      const len = list.length;
      for (let i = 0; i < len; ++i) {
        const child = list[i];
        if ("key" in child && equals(key, child.key)) {
          const value = child.value;
          const newValue2 = f(value);
          if (newValue2 === value) return list;
          if (isNone(newValue2)) {
            --size2.value;
            return arraySpliceOut(mutate2, i, list);
          }
          return arrayUpdate(mutate2, i, new LeafNode(edit, hash2, key, newValue2), list);
        }
      }
      const newValue = f(none());
      if (isNone(newValue)) return list;
      ++size2.value;
      return arrayUpdate(mutate2, len, new LeafNode(edit, hash2, key, newValue), list);
    }
  }
  class IndexedNode {
    constructor(edit, mask, children) {
      __publicField(this, "edit");
      __publicField(this, "mask");
      __publicField(this, "children");
      __publicField(this, "_tag", "IndexedNode");
      this.edit = edit;
      this.mask = mask;
      this.children = children;
    }
    modify(edit, shift, f, hash2, key, size2) {
      const mask = this.mask;
      const children = this.children;
      const frag = hashFragment(shift, hash2);
      const bit = toBitmap(frag);
      const indx = fromBitmap(mask, bit);
      const exists = mask & bit;
      const canEdit = canEditNode(this, edit);
      if (!exists) {
        const _newChild = new EmptyNode().modify(edit, shift + SIZE, f, hash2, key, size2);
        if (!_newChild) return this;
        return children.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children) : new IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children));
      }
      const current = children[indx];
      const child = current.modify(edit, shift + SIZE, f, hash2, key, size2);
      if (current === child) return this;
      let bitmap = mask;
      let newChildren;
      if (isEmptyNode(child)) {
        bitmap &= ~bit;
        if (!bitmap) return new EmptyNode();
        if (children.length <= 2 && isLeafNode(children[indx ^ 1])) {
          return children[indx ^ 1];
        }
        newChildren = arraySpliceOut(canEdit, indx, children);
      } else {
        newChildren = arrayUpdate(canEdit, indx, child, children);
      }
      if (canEdit) {
        this.mask = bitmap;
        this.children = newChildren;
        return this;
      }
      return new IndexedNode(edit, bitmap, newChildren);
    }
  }
  class ArrayNode {
    constructor(edit, size2, children) {
      __publicField(this, "edit");
      __publicField(this, "size");
      __publicField(this, "children");
      __publicField(this, "_tag", "ArrayNode");
      this.edit = edit;
      this.size = size2;
      this.children = children;
    }
    modify(edit, shift, f, hash2, key, size2) {
      let count = this.size;
      const children = this.children;
      const frag = hashFragment(shift, hash2);
      const child = children[frag];
      const newChild = (child || new EmptyNode()).modify(edit, shift + SIZE, f, hash2, key, size2);
      if (child === newChild) return this;
      const canEdit = canEditNode(this, edit);
      let newChildren;
      if (isEmptyNode(child) && !isEmptyNode(newChild)) {
        ++count;
        newChildren = arrayUpdate(canEdit, frag, newChild, children);
      } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
        --count;
        if (count <= MIN_ARRAY_NODE) {
          return pack(edit, count, frag, children);
        }
        newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children);
      } else {
        newChildren = arrayUpdate(canEdit, frag, newChild, children);
      }
      if (canEdit) {
        this.size = count;
        this.children = newChildren;
        return this;
      }
      return new ArrayNode(edit, count, newChildren);
    }
  }
  function pack(edit, count, removed, elements) {
    const children = new Array(count - 1);
    let g = 0;
    let bitmap = 0;
    for (let i = 0, len = elements.length; i < len; ++i) {
      if (i !== removed) {
        const elem = elements[i];
        if (elem && !isEmptyNode(elem)) {
          children[g++] = elem;
          bitmap |= 1 << i;
        }
      }
    }
    return new IndexedNode(edit, bitmap, children);
  }
  function expand(edit, frag, child, bitmap, subNodes) {
    const arr = [];
    let bit = bitmap;
    let count = 0;
    for (let i = 0; bit; ++i) {
      if (bit & 1) arr[i] = subNodes[count++];
      bit >>>= 1;
    }
    arr[frag] = child;
    return new ArrayNode(edit, count + 1, arr);
  }
  function mergeLeavesInner(edit, shift, h1, n1, h2, n2) {
    if (h1 === h2) return new CollisionNode(edit, h1, [n2, n1]);
    const subH1 = hashFragment(shift, h1);
    const subH2 = hashFragment(shift, h2);
    if (subH1 === subH2) {
      return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
    } else {
      const children = subH1 < subH2 ? [n1, n2] : [n2, n1];
      return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children);
    }
  }
  function mergeLeaves(edit, shift, h1, n1, h2, n2) {
    let stack = void 0;
    let currentShift = shift;
    while (true) {
      const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
      if (typeof res === "function") {
        stack = make(res, stack);
        currentShift = currentShift + SIZE;
      } else {
        let final = res;
        while (stack != null) {
          final = stack.value(final);
          stack = stack.previous;
        }
        return final;
      }
    }
  }
  const HashMapSymbolKey = "effect/HashMap";
  const HashMapTypeId = /* @__PURE__ */ Symbol.for(HashMapSymbolKey);
  const HashMapProto = {
    [HashMapTypeId]: HashMapTypeId,
    [Symbol.iterator]() {
      return new HashMapIterator(this, (k, v) => [k, v]);
    },
    [symbol$1]() {
      let hash$1 = hash(HashMapSymbolKey);
      for (const item of this) {
        hash$1 ^= pipe(hash(item[0]), combine(hash(item[1])));
      }
      return cached(this, hash$1);
    },
    [symbol](that) {
      if (isHashMap(that)) {
        if (that._size !== this._size) {
          return false;
        }
        for (const item of this) {
          const elem = pipe(that, getHash(item[0], hash(item[0])));
          if (isNone(elem)) {
            return false;
          } else {
            if (!equals(item[1], elem.value)) {
              return false;
            }
          }
        }
        return true;
      }
      return false;
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "HashMap",
        values: Array.from(this).map(toJSON)
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
  const makeImpl$1 = (editable, edit, root, size2) => {
    const map2 = Object.create(HashMapProto);
    map2._editable = editable;
    map2._edit = edit;
    map2._root = root;
    map2._size = size2;
    return map2;
  };
  class HashMapIterator {
    constructor(map2, f) {
      __publicField(this, "map");
      __publicField(this, "f");
      __publicField(this, "v");
      this.map = map2;
      this.f = f;
      this.v = visitLazy(this.map._root, this.f, void 0);
    }
    next() {
      if (isNone(this.v)) {
        return {
          done: true,
          value: void 0
        };
      }
      const v0 = this.v.value;
      this.v = applyCont(v0.cont);
      return {
        done: false,
        value: v0.value
      };
    }
    [Symbol.iterator]() {
      return new HashMapIterator(this.map, this.f);
    }
  }
  const applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none();
  const visitLazy = (node, f, cont = void 0) => {
    switch (node._tag) {
      case "LeafNode": {
        if (isSome(node.value)) {
          return some({
            value: f(node.key, node.value.value),
            cont
          });
        }
        return applyCont(cont);
      }
      case "CollisionNode":
      case "ArrayNode":
      case "IndexedNode": {
        const children = node.children;
        return visitLazyChildren(children.length, children, 0, f, cont);
      }
      default: {
        return applyCont(cont);
      }
    }
  };
  const visitLazyChildren = (len, children, i, f, cont) => {
    while (i < len) {
      const child = children[i++];
      if (child && !isEmptyNode(child)) {
        return visitLazy(child, f, [len, children, i, f, cont]);
      }
    }
    return applyCont(cont);
  };
  const _empty$1 = /* @__PURE__ */ makeImpl$1(false, 0, /* @__PURE__ */ new EmptyNode(), 0);
  const empty$2 = () => _empty$1;
  const isHashMap = (u) => hasProperty(u, HashMapTypeId);
  const getHash = /* @__PURE__ */ dual(3, (self2, key, hash2) => {
    let node = self2._root;
    let shift = 0;
    while (true) {
      switch (node._tag) {
        case "LeafNode": {
          return equals(key, node.key) ? node.value : none();
        }
        case "CollisionNode": {
          if (hash2 === node.hash) {
            const children = node.children;
            for (let i = 0, len = children.length; i < len; ++i) {
              const child = children[i];
              if ("key" in child && equals(key, child.key)) {
                return child.value;
              }
            }
          }
          return none();
        }
        case "IndexedNode": {
          const frag = hashFragment(shift, hash2);
          const bit = toBitmap(frag);
          if (node.mask & bit) {
            node = node.children[fromBitmap(node.mask, bit)];
            shift += SIZE;
            break;
          }
          return none();
        }
        case "ArrayNode": {
          node = node.children[hashFragment(shift, hash2)];
          if (node) {
            shift += SIZE;
            break;
          }
          return none();
        }
        default:
          return none();
      }
    }
  });
  const set = /* @__PURE__ */ dual(3, (self2, key, value) => modifyAt(self2, key, () => some(value)));
  const setTree = /* @__PURE__ */ dual(3, (self2, newRoot, newSize) => {
    if (self2._editable) {
      self2._root = newRoot;
      self2._size = newSize;
      return self2;
    }
    return newRoot === self2._root ? self2 : makeImpl$1(self2._editable, self2._edit, newRoot, newSize);
  });
  const keys = (self2) => new HashMapIterator(self2, (key) => key);
  const size$2 = (self2) => self2._size;
  const beginMutation$1 = (self2) => makeImpl$1(true, self2._edit + 1, self2._root, self2._size);
  const modifyAt = /* @__PURE__ */ dual(3, (self2, key, f) => modifyHash(self2, key, hash(key), f));
  const modifyHash = /* @__PURE__ */ dual(4, (self2, key, hash2, f) => {
    const size2 = {
      value: self2._size
    };
    const newRoot = self2._root.modify(self2._editable ? self2._edit : NaN, 0, f, hash2, key, size2);
    return pipe(self2, setTree(newRoot, size2.value));
  });
  const forEach$1 = /* @__PURE__ */ dual(2, (self2, f) => reduce$1(self2, void 0, (_, value, key) => f(value, key)));
  const reduce$1 = /* @__PURE__ */ dual(3, (self2, zero, f) => {
    const root = self2._root;
    if (root._tag === "LeafNode") {
      return isSome(root.value) ? f(zero, root.value.value, root.key) : zero;
    }
    if (root._tag === "EmptyNode") {
      return zero;
    }
    const toVisit = [root.children];
    let children;
    while (children = toVisit.pop()) {
      for (let i = 0, len = children.length; i < len; ) {
        const child = children[i++];
        if (child && !isEmptyNode(child)) {
          if (child._tag === "LeafNode") {
            if (isSome(child.value)) {
              zero = f(zero, child.value.value, child.key);
            }
          } else {
            toVisit.push(child.children);
          }
        }
      }
    }
    return zero;
  });
  const HashSetSymbolKey = "effect/HashSet";
  const HashSetTypeId = /* @__PURE__ */ Symbol.for(HashSetSymbolKey);
  const HashSetProto = {
    [HashSetTypeId]: HashSetTypeId,
    [Symbol.iterator]() {
      return keys(this._keyMap);
    },
    [symbol$1]() {
      return cached(this, combine(hash(this._keyMap))(hash(HashSetSymbolKey)));
    },
    [symbol](that) {
      if (isHashSet(that)) {
        return size$2(this._keyMap) === size$2(that._keyMap) && equals(this._keyMap, that._keyMap);
      }
      return false;
    },
    toString() {
      return format(this.toJSON());
    },
    toJSON() {
      return {
        _id: "HashSet",
        values: Array.from(this).map(toJSON)
      };
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
  const makeImpl = (keyMap) => {
    const set2 = Object.create(HashSetProto);
    set2._keyMap = keyMap;
    return set2;
  };
  const isHashSet = (u) => hasProperty(u, HashSetTypeId);
  const _empty = /* @__PURE__ */ makeImpl(/* @__PURE__ */ empty$2());
  const empty$1 = () => _empty;
  const size$1 = (self2) => size$2(self2._keyMap);
  const beginMutation = (self2) => makeImpl(beginMutation$1(self2._keyMap));
  const endMutation = (self2) => {
    self2._keyMap._editable = false;
    return self2;
  };
  const mutate = /* @__PURE__ */ dual(2, (self2, f) => {
    const transient = beginMutation(self2);
    f(transient);
    return endMutation(transient);
  });
  const add$1 = /* @__PURE__ */ dual(2, (self2, value) => self2._keyMap._editable ? (set(value, true)(self2._keyMap), self2) : makeImpl(set(value, true)(self2._keyMap)));
  const union$1 = /* @__PURE__ */ dual(2, (self2, that) => mutate(empty$1(), (set2) => {
    forEach(self2, (value) => add$1(set2, value));
    for (const value of that) {
      add$1(set2, value);
    }
  }));
  const forEach = /* @__PURE__ */ dual(2, (self2, f) => forEach$1(self2._keyMap, (_, k) => f(k)));
  const empty = empty$1;
  const size = size$1;
  const add = add$1;
  const union = union$1;
  const OP_DIE = "Die";
  const OP_EMPTY = "Empty";
  const OP_FAIL = "Fail";
  const OP_INTERRUPT = "Interrupt";
  const OP_PARALLEL = "Parallel";
  const OP_SEQUENTIAL = "Sequential";
  const CauseSymbolKey = "effect/Cause";
  const CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
  const variance = {
    /* c8 ignore next */
    _E: (_) => _
  };
  const proto = {
    [CauseTypeId]: variance,
    [symbol$1]() {
      return pipe(hash(CauseSymbolKey), combine(hash(flattenCause(this))), cached(this));
    },
    [symbol](that) {
      return isCause(that) && causeEquals(this, that);
    },
    pipe() {
      return pipeArguments(this, arguments);
    },
    toJSON() {
      switch (this._tag) {
        case "Empty":
          return {
            _id: "Cause",
            _tag: this._tag
          };
        case "Die":
          return {
            _id: "Cause",
            _tag: this._tag,
            defect: toJSON(this.defect)
          };
        case "Interrupt":
          return {
            _id: "Cause",
            _tag: this._tag,
            fiberId: this.fiberId.toJSON()
          };
        case "Fail":
          return {
            _id: "Cause",
            _tag: this._tag,
            failure: toJSON(this.error)
          };
        case "Sequential":
        case "Parallel":
          return {
            _id: "Cause",
            _tag: this._tag,
            left: toJSON(this.left),
            right: toJSON(this.right)
          };
      }
    },
    toString() {
      return pretty(this);
    },
    [NodeInspectSymbol]() {
      return this.toJSON();
    }
  };
  const fail$1 = (error) => {
    const o = Object.create(proto);
    o._tag = OP_FAIL;
    o.error = error;
    return o;
  };
  const parallel = (left2, right2) => {
    const o = Object.create(proto);
    o._tag = OP_PARALLEL;
    o.left = left2;
    o.right = right2;
    return o;
  };
  const sequential = (left2, right2) => {
    const o = Object.create(proto);
    o._tag = OP_SEQUENTIAL;
    o.left = left2;
    o.right = right2;
    return o;
  };
  const isCause = (u) => hasProperty(u, CauseTypeId);
  const isInterruptedOnly = (self2) => reduceWithContext(void 0, IsInterruptedOnlyCauseReducer)(self2);
  const causeEquals = (left2, right2) => {
    let leftStack = of(left2);
    let rightStack = of(right2);
    while (isNonEmpty(leftStack) && isNonEmpty(rightStack)) {
      const [leftParallel, leftSequential] = pipe(headNonEmpty(leftStack), reduce([empty(), empty$3()], ([parallel2, sequential2], cause) => {
        const [par, seq] = evaluateCause(cause);
        return some([pipe(parallel2, union(par)), pipe(sequential2, appendAll(seq))]);
      }));
      const [rightParallel, rightSequential] = pipe(headNonEmpty(rightStack), reduce([empty(), empty$3()], ([parallel2, sequential2], cause) => {
        const [par, seq] = evaluateCause(cause);
        return some([pipe(parallel2, union(par)), pipe(sequential2, appendAll(seq))]);
      }));
      if (!equals(leftParallel, rightParallel)) {
        return false;
      }
      leftStack = leftSequential;
      rightStack = rightSequential;
    }
    return true;
  };
  const flattenCause = (cause) => {
    return flattenCauseLoop(of(cause), empty$3());
  };
  const flattenCauseLoop = (causes, flattened) => {
    while (1) {
      const [parallel2, sequential2] = pipe(causes, reduce$2([empty(), empty$3()], ([parallel3, sequential3], cause) => {
        const [par, seq] = evaluateCause(cause);
        return [pipe(parallel3, union(par)), pipe(sequential3, appendAll(seq))];
      }));
      const updated = size(parallel2) > 0 ? pipe(flattened, prepend(parallel2)) : flattened;
      if (isEmpty(sequential2)) {
        return reverse(updated);
      }
      causes = sequential2;
      flattened = updated;
    }
    throw new Error(getBugErrorMessage("Cause.flattenCauseLoop"));
  };
  const evaluateCause = (self2) => {
    let cause = self2;
    const stack = [];
    let _parallel = empty();
    let _sequential = empty$3();
    while (cause !== void 0) {
      switch (cause._tag) {
        case OP_EMPTY: {
          if (stack.length === 0) {
            return [_parallel, _sequential];
          }
          cause = stack.pop();
          break;
        }
        case OP_FAIL: {
          _parallel = add(_parallel, make$1(cause._tag, cause.error));
          if (stack.length === 0) {
            return [_parallel, _sequential];
          }
          cause = stack.pop();
          break;
        }
        case OP_DIE: {
          _parallel = add(_parallel, make$1(cause._tag, cause.defect));
          if (stack.length === 0) {
            return [_parallel, _sequential];
          }
          cause = stack.pop();
          break;
        }
        case OP_INTERRUPT: {
          _parallel = add(_parallel, make$1(cause._tag, cause.fiberId));
          if (stack.length === 0) {
            return [_parallel, _sequential];
          }
          cause = stack.pop();
          break;
        }
        case OP_SEQUENTIAL: {
          switch (cause.left._tag) {
            case OP_EMPTY: {
              cause = cause.right;
              break;
            }
            case OP_SEQUENTIAL: {
              cause = sequential(cause.left.left, sequential(cause.left.right, cause.right));
              break;
            }
            case OP_PARALLEL: {
              cause = parallel(sequential(cause.left.left, cause.right), sequential(cause.left.right, cause.right));
              break;
            }
            default: {
              _sequential = prepend(_sequential, cause.right);
              cause = cause.left;
              break;
            }
          }
          break;
        }
        case OP_PARALLEL: {
          stack.push(cause.right);
          cause = cause.left;
          break;
        }
      }
    }
    throw new Error(getBugErrorMessage("Cause.evaluateCauseLoop"));
  };
  const IsInterruptedOnlyCauseReducer = {
    emptyCase: constTrue,
    failCase: constFalse,
    dieCase: constFalse,
    interruptCase: constTrue,
    sequentialCase: (_, left2, right2) => left2 && right2,
    parallelCase: (_, left2, right2) => left2 && right2
  };
  const OP_SEQUENTIAL_CASE = "SequentialCase";
  const OP_PARALLEL_CASE = "ParallelCase";
  const reduce = /* @__PURE__ */ dual(3, (self2, zero, pf) => {
    let accumulator = zero;
    let cause = self2;
    const causes = [];
    while (cause !== void 0) {
      const option = pf(accumulator, cause);
      accumulator = isSome(option) ? option.value : accumulator;
      switch (cause._tag) {
        case OP_SEQUENTIAL: {
          causes.push(cause.right);
          cause = cause.left;
          break;
        }
        case OP_PARALLEL: {
          causes.push(cause.right);
          cause = cause.left;
          break;
        }
        default: {
          cause = void 0;
          break;
        }
      }
      if (cause === void 0 && causes.length > 0) {
        cause = causes.pop();
      }
    }
    return accumulator;
  });
  const reduceWithContext = /* @__PURE__ */ dual(3, (self2, context, reducer) => {
    const input = [self2];
    const output = [];
    while (input.length > 0) {
      const cause = input.pop();
      switch (cause._tag) {
        case OP_EMPTY: {
          output.push(right(reducer.emptyCase(context)));
          break;
        }
        case OP_FAIL: {
          output.push(right(reducer.failCase(context, cause.error)));
          break;
        }
        case OP_DIE: {
          output.push(right(reducer.dieCase(context, cause.defect)));
          break;
        }
        case OP_INTERRUPT: {
          output.push(right(reducer.interruptCase(context, cause.fiberId)));
          break;
        }
        case OP_SEQUENTIAL: {
          input.push(cause.right);
          input.push(cause.left);
          output.push(left({
            _tag: OP_SEQUENTIAL_CASE
          }));
          break;
        }
        case OP_PARALLEL: {
          input.push(cause.right);
          input.push(cause.left);
          output.push(left({
            _tag: OP_PARALLEL_CASE
          }));
          break;
        }
      }
    }
    const accumulator = [];
    while (output.length > 0) {
      const either = output.pop();
      switch (either._tag) {
        case "Left": {
          switch (either.left._tag) {
            case OP_SEQUENTIAL_CASE: {
              const left2 = accumulator.pop();
              const right2 = accumulator.pop();
              const value = reducer.sequentialCase(context, left2, right2);
              accumulator.push(value);
              break;
            }
            case OP_PARALLEL_CASE: {
              const left2 = accumulator.pop();
              const right2 = accumulator.pop();
              const value = reducer.parallelCase(context, left2, right2);
              accumulator.push(value);
              break;
            }
          }
          break;
        }
        case "Right": {
          accumulator.push(either.right);
          break;
        }
      }
    }
    if (accumulator.length === 0) {
      throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues");
    }
    return accumulator.pop();
  });
  const pretty = (cause, options) => {
    if (isInterruptedOnly(cause)) {
      return "All fibers interrupted without errors.";
    }
    return prettyErrors(cause).map(function(e) {
      if ((options == null ? void 0 : options.renderErrorCause) !== true || e.cause === void 0) {
        return e.stack;
      }
      return `${e.stack} {
${renderErrorCause(e.cause, "  ")}
}`;
    }).join("\n");
  };
  const renderErrorCause = (cause, prefix) => {
    const lines = cause.stack.split("\n");
    let stack = `${prefix}[cause]: ${lines[0]}`;
    for (let i = 1, len = lines.length; i < len; i++) {
      stack += `
${prefix}${lines[i]}`;
    }
    if (cause.cause) {
      stack += ` {
${renderErrorCause(cause.cause, `${prefix}  `)}
${prefix}}`;
    }
    return stack;
  };
  class PrettyError extends globalThis.Error {
    constructor(originalError) {
      const originalErrorIsObject = typeof originalError === "object" && originalError !== null;
      const prevLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 1;
      super(prettyErrorMessage(originalError), originalErrorIsObject && "cause" in originalError && typeof originalError.cause !== "undefined" ? {
        cause: new PrettyError(originalError.cause)
      } : void 0);
      __publicField(this, "span");
      if (this.message === "") {
        this.message = "An error has occurred";
      }
      Error.stackTraceLimit = prevLimit;
      this.name = originalError instanceof Error ? originalError.name : "Error";
      if (originalErrorIsObject) {
        if (spanSymbol$1 in originalError) {
          this.span = originalError[spanSymbol$1];
        }
        Object.keys(originalError).forEach((key) => {
          if (!(key in this)) {
            this[key] = originalError[key];
          }
        });
      }
      this.stack = prettyErrorStack(`${this.name}: ${this.message}`, originalError instanceof Error && originalError.stack ? originalError.stack : "", this.span);
    }
  }
  const prettyErrorMessage = (u) => {
    if (typeof u === "string") {
      return u;
    }
    if (typeof u === "object" && u !== null && u instanceof Error) {
      return u.message;
    }
    try {
      if (hasProperty(u, "toString") && isFunction(u["toString"]) && u["toString"] !== Object.prototype.toString && u["toString"] !== globalThis.Array.prototype.toString) {
        return u["toString"]();
      }
    } catch {
    }
    return stringifyCircular(u);
  };
  const locationRegex = /\((.*)\)/g;
  const spanToTrace = /* @__PURE__ */ globalValue("effect/Tracer/spanToTrace", () => /* @__PURE__ */ new WeakMap());
  const prettyErrorStack = (message, stack, span) => {
    const out = [message];
    const lines = stack.startsWith(message) ? stack.slice(message.length).split("\n") : stack.split("\n");
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].includes("Generator.next")) {
        break;
      }
      if (lines[i].includes("effect_internal_function")) {
        out.pop();
        break;
      }
      out.push(lines[i].replace(/at .*effect_instruction_i.*\((.*)\)/, "at $1").replace(/EffectPrimitive\.\w+/, "<anonymous>"));
    }
    if (span) {
      let current = span;
      let i = 0;
      while (current && current._tag === "Span" && i < 10) {
        const stackFn = spanToTrace.get(current);
        if (typeof stackFn === "function") {
          const stack2 = stackFn();
          if (typeof stack2 === "string") {
            const locationMatchAll = stack2.matchAll(locationRegex);
            let match = false;
            for (const [, location] of locationMatchAll) {
              match = true;
              out.push(`    at ${current.name} (${location})`);
            }
            if (!match) {
              out.push(`    at ${current.name} (${stack2.replace(/^at /, "")})`);
            }
          } else {
            out.push(`    at ${current.name}`);
          }
        } else {
          out.push(`    at ${current.name}`);
        }
        current = getOrUndefined(current.parent);
        i++;
      }
    }
    return out.join("\n");
  };
  const spanSymbol$1 = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
  const prettyErrors = (cause) => reduceWithContext(cause, void 0, {
    emptyCase: () => [],
    dieCase: (_, unknownError) => {
      return [new PrettyError(unknownError)];
    },
    failCase: (_, error) => {
      return [new PrettyError(error)];
    },
    interruptCase: () => [],
    parallelCase: (_, l, r) => [...l, ...r],
    sequentialCase: (_, l, r) => [...l, ...r]
  });
  class SingleShotGen {
    constructor(self2) {
      __publicField(this, "self");
      __publicField(this, "called", false);
      this.self = self2;
    }
    next(a) {
      return this.called ? {
        value: a,
        done: true
      } : (this.called = true, {
        value: this.self,
        done: false
      });
    }
    return(a) {
      return {
        value: a,
        done: true
      };
    }
    throw(e) {
      throw e;
    }
    [Symbol.iterator]() {
      return new SingleShotGen(this.self);
    }
  }
  const EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
  class EffectPrimitive {
    constructor(_op) {
      __publicField(this, "_op");
      __publicField(this, "effect_instruction_i0");
      __publicField(this, "effect_instruction_i1");
      __publicField(this, "effect_instruction_i2");
      __publicField(this, "trace");
      __publicField(this, _c, effectVariance);
      this._op = _op;
    }
    [(_c = EffectTypeId, symbol)](that) {
      return this === that;
    }
    [symbol$1]() {
      return cached(this, random(this));
    }
    pipe() {
      return pipeArguments(this, arguments);
    }
    toJSON() {
      return {
        _id: "Effect",
        _op: this._op,
        effect_instruction_i0: toJSON(this.effect_instruction_i0),
        effect_instruction_i1: toJSON(this.effect_instruction_i1),
        effect_instruction_i2: toJSON(this.effect_instruction_i2)
      };
    }
    toString() {
      return format(this.toJSON());
    }
    [NodeInspectSymbol]() {
      return this.toJSON();
    }
    [Symbol.iterator]() {
      return new SingleShotGen(new YieldWrap(this));
    }
  }
  class EffectPrimitiveFailure {
    constructor(_op) {
      __publicField(this, "_op");
      __publicField(this, "effect_instruction_i0");
      __publicField(this, "effect_instruction_i1");
      __publicField(this, "effect_instruction_i2");
      __publicField(this, "trace");
      __publicField(this, _d, effectVariance);
      this._op = _op;
      this._tag = _op;
    }
    [(_d = EffectTypeId, symbol)](that) {
      return exitIsExit(that) && that._op === "Failure" && // @ts-expect-error
      equals(this.effect_instruction_i0, that.effect_instruction_i0);
    }
    [symbol$1]() {
      return pipe(
        // @ts-expect-error
        string(this._tag),
        // @ts-expect-error
        combine(hash(this.effect_instruction_i0)),
        cached(this)
      );
    }
    get cause() {
      return this.effect_instruction_i0;
    }
    pipe() {
      return pipeArguments(this, arguments);
    }
    toJSON() {
      return {
        _id: "Exit",
        _tag: this._op,
        cause: this.cause.toJSON()
      };
    }
    toString() {
      return format(this.toJSON());
    }
    [NodeInspectSymbol]() {
      return this.toJSON();
    }
    [Symbol.iterator]() {
      return new SingleShotGen(new YieldWrap(this));
    }
  }
  const isEffect = (u) => hasProperty(u, EffectTypeId);
  const withFiberRuntime = (withRuntime) => {
    const effect = new EffectPrimitive(OP_WITH_RUNTIME);
    effect.effect_instruction_i0 = withRuntime;
    return effect;
  };
  const spanSymbol = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
  const originalSymbol = /* @__PURE__ */ Symbol.for("effect/OriginalAnnotation");
  const capture = (obj, span) => {
    if (isSome(span)) {
      return new Proxy(obj, {
        has(target, p) {
          return p === spanSymbol || p === originalSymbol || p in target;
        },
        get(target, p) {
          if (p === spanSymbol) {
            return span.value;
          }
          if (p === originalSymbol) {
            return obj;
          }
          return target[p];
        }
      });
    }
    return obj;
  };
  const fail = (error) => isObject(error) && !(spanSymbol in error) ? withFiberRuntime((fiber) => failCause(fail$1(capture(error, currentSpanFromFiber(fiber))))) : failCause(fail$1(error));
  const failCause = (cause) => {
    const effect = new EffectPrimitiveFailure(OP_FAILURE);
    effect.effect_instruction_i0 = cause;
    return effect;
  };
  const YieldableError = /* @__PURE__ */ function() {
    class YieldableError2 extends globalThis.Error {
      commit() {
        return fail(this);
      }
      toJSON() {
        const obj = {
          ...this
        };
        if (this.message) obj.message = this.message;
        if (this.cause) obj.cause = this.cause;
        return obj;
      }
      [NodeInspectSymbol]() {
        if (this.toString !== globalThis.Error.prototype.toString) {
          return this.stack ? `${this.toString()}
${this.stack.split("\n").slice(1).join("\n")}` : this.toString();
        } else if ("Bun" in globalThis) {
          return pretty(fail$1(this), {
            renderErrorCause: true
          });
        }
        return this;
      }
    }
    Object.assign(YieldableError2.prototype, StructuralCommitPrototype);
    return YieldableError2;
  }();
  const exitIsExit = (u) => isEffect(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure");
  const currentSpanFromFiber = (fiber) => {
    const span = fiber.currentSpan;
    return span !== void 0 && span._tag === "Span" ? some(span) : none();
  };
  const Error$1 = /* @__PURE__ */ function() {
    const plainArgsSymbol = /* @__PURE__ */ Symbol.for("effect/Data/Error/plainArgs");
    return class Base extends YieldableError {
      constructor(args2) {
        super(args2 == null ? void 0 : args2.message, (args2 == null ? void 0 : args2.cause) ? {
          cause: args2.cause
        } : void 0);
        if (args2) {
          Object.assign(this, args2);
          Object.defineProperty(this, plainArgsSymbol, {
            value: args2,
            enumerable: false
          });
        }
      }
      toJSON() {
        return {
          ...this[plainArgsSymbol],
          ...this
        };
      }
    };
  }();
  const TaggedError = (tag) => {
    class Base extends Error$1 {
      constructor() {
        super(...arguments);
        __publicField(this, "_tag", tag);
      }
    }
    Base.prototype.name = tag;
    return Base;
  };
  var makeSettingsFrom = (input) => {
    let limit = input.batch_size ?? 10;
    let timeout = input.timeout ?? 10;
    let max_empty_responses = input.max_empty_responses;
    let update_types = input.update_types;
    let log_level = input.log_level;
    if (limit < 10 || limit > 100) {
      console.warn("Wrong limit, must be in [10..100], using 10 instead");
      limit = 10;
    }
    if (timeout < 2 || timeout > 10) {
      console.warn("Wrong timeout, must be in [2..10], using 2 instead");
      limit = 10;
    }
    if (max_empty_responses && max_empty_responses < 2) {
      console.warn("Wrong max_empty_responses, must be in [2..infinity], using infinity");
      max_empty_responses = void 0;
    }
    if (max_empty_responses && max_empty_responses < 2) {
      console.warn("Wrong max_empty_responses, must be in [2..infinity], using infinity");
      max_empty_responses = void 0;
    }
    if (!update_types) {
      console.info("Handling only messages, ignoring others");
      update_types = ["message"];
    }
    if (!log_level) {
      log_level = "info";
    }
    return {
      limit,
      timeout,
      max_empty_responses,
      update_types,
      log_level
    };
  };
  var extractUpdate = (input) => {
    for (const [field, value] of Object.entries(input)) {
      if (field == "update_id") {
        continue;
      }
      return {
        type: field,
        ...value
      };
    }
    return;
  };
  var TgBotClientError = (_e = class extends TaggedError("TgBotClientError") {
  }, __publicField(_e, "missingSuccess", new _e({
    reason: {
      type: "ClientInternalError",
      cause: "Expected 'success' to be defined"
    }
  })), _e);
  var defaultBaseUrl = "https://api.telegram.org";
  var makeTgBotClientConfig = (input) => TgBotClientConfig.of({
    ...input,
    base_url: input.base_url ?? defaultBaseUrl
  });
  var TgBotClientConfig = class extends Tag("TgBotClientConfig")() {
  };
  var isFileContent = (input) => typeof input == "object" && input != null && ("file_content" in input && input.file_content instanceof Uint8Array) && ("file_name" in input && typeof input.file_name == "string");
  var isTgBotApiResponse = (input) => typeof input == "object" && input != null && ("ok" in input && typeof input.ok == "boolean");
  var isTgBotClientSettingsInput = (input) => typeof input == "object" && input != null && ("bot_token" in input && typeof input.bot_token == "string");
  var makePayload = (body) => {
    const entries = Object.entries(body);
    if (entries.length == 0) return void 0;
    const result = new FormData();
    for (const [key, value] of entries) {
      if (!value) continue;
      if (typeof value != "object") {
        result.append(key, `${value}`);
      } else if (isFileContent(value)) {
        result.append(key, new Blob([value.file_content]), value.file_name);
      } else {
        result.append(key, JSON.stringify(value));
      }
    }
    return result;
  };
  var execute = (method, input) => gen(function* () {
    const config = yield* service(TgBotClientConfig);
    const httpResponse = yield* tryPromise({
      try: () => fetch(
        `${config.base_url}/bot${config.bot_token}/${snakeToCamel(method)}`,
        {
          body: makePayload(input) ?? null,
          method: "POST"
        }
      ),
      catch: (cause) => new TgBotClientError({
        reason: { type: "ClientInternalError", cause }
      })
    });
    const response = yield* tryPromise({
      try: () => httpResponse.json(),
      catch: () => new TgBotClientError({
        reason: { type: "UnexpectedResponse", response: httpResponse }
      })
    });
    if (!isTgBotApiResponse(response)) {
      return yield* fail$2(new TgBotClientError({
        reason: { type: "UnexpectedResponse", response }
      }));
    }
    if (!httpResponse.ok) {
      return yield* fail$2(new TgBotClientError({
        reason: {
          type: "NotOkResponse",
          ...response.error_code ? { errorCode: response.error_code } : void 0,
          ...response.description ? { details: response.description } : void 0
        }
      }));
    }
    return response.result;
  });
  var fetchUpdates = ({ state, settings, handlers }) => gen(function* () {
    const updateId = state.lastUpdateId;
    if (settings.log_level == "debug") {
      console.debug("getting updates", state);
    }
    const updates = yield* execute("get_updates", {
      ...settings,
      ...updateId ? { offset: updateId } : void 0
    }).pipe(
      andThen((_) => _.sort((_2) => _2.update_id))
    );
    let lastSuccessId = void 0;
    let hasError = false;
    for (const updateObject of updates) {
      const update = extractUpdate(updateObject);
      if (!update) {
        console.warn("Unknown update", update);
        hasError = true;
        break;
      }
      const handler2 = handlers[`on_${update.type}`];
      if (!handler2) {
        if (settings.update_types.includes(update.type)) {
          console.error("Handler for update not defined", update);
          hasError = true;
          break;
        } else {
          if (settings.log_level == "debug") {
            console.debug("Ignored update", update);
          }
          lastSuccessId = updateObject.update_id;
          continue;
        }
      }
      if (update.type == "message" && "text" in update) {
        console.info("Got new message", {
          chatId: update.chat.id,
          chatType: update.chat.type,
          message: `${update.text.slice(0, 5)}...`
        });
      }
      const handleResult = handler2(update);
      if ("chat" in update && handleResult) {
        const response = yield* execute(`send_${handleResult.type}`, {
          ...handleResult,
          chat_id: update.chat.id
        });
        if (settings.log_level == "debug" && "text") {
          console.debug("bot response", response);
        }
      }
      if (!handleResult && settings.log_level == "debug") {
        console.debug("handler returned no response for update", { update });
      }
      lastSuccessId = updateObject.update_id;
    }
    if (hasError && lastSuccessId) {
      yield* execute("get_updates", {
        offset: lastSuccessId,
        limit: 0
      });
      if (settings.log_level == "debug") {
        console.debug("committed offset", lastSuccessId);
      }
    }
    return { updates, lastSuccessId, hasError };
  });
  var pollAndHandle = (input) => {
    const state = {
      lastUpdateId: void 0,
      emptyResponses: 0
    };
    const settings = makeSettingsFrom(input.settings);
    return delay(1e3)(
      fetchUpdates({
        state,
        settings,
        handlers: input.settings
      })
    ).pipe(
      repeat({
        while: ({ updates, lastSuccessId, hasError }) => {
          if (hasError) {
            console.info("error in handler, quitting");
            return false;
          }
          if (updates.length == 0) {
            state.emptyResponses += 1;
            if (settings.max_empty_responses && state.emptyResponses > settings.max_empty_responses) {
              console.info("too many empty responses, quitting");
              return false;
            }
          } else {
            state.emptyResponses = 0;
          }
          if (lastSuccessId) {
            state.lastUpdateId = lastSuccessId + 1;
          }
          return true;
        }
      })
    );
  };
  var BotUpdatePollerService = class extends Tag("BotUpdatePollerService")() {
  };
  var BotUpdatesPollerServiceDefault = gen(function* () {
    console.log("Initiating BotUpdatesPollerServiceDefault");
    const state = {
      fiber: void 0
    };
    const runBot = (messageHandler) => gen(function* () {
      const startFiber = pollAndHandle({
        settings: messageHandler
      }).pipe(
        forkDaemon,
        tap(
          (fiber) => fiber.addObserver((exit2) => {
            console.log("bot's fiber has been closed", exit2);
            if (messageHandler.onExit) {
              messageHandler.onExit(exit2);
            }
          })
        )
      );
      if (state.fiber) {
        console.log("killing previous bot's fiber");
        yield* fiberInterrupt(state.fiber);
      }
      state.fiber = yield* startFiber;
      console.log("Fetching bot updates via long polling...");
      return state.fiber;
    });
    return {
      runBot
    };
  });
  var makeClientConfigFrom = (input) => gen(function* () {
    if (input.type == "config") {
      return makeTgBotClientConfig(input);
    }
    const config = yield* tryPromise({
      try: async () => {
        const { readFileSync } = await Promise.resolve().then(function() {
          return __viteBrowserExternal;
        });
        return JSON.parse(await readFileSync("config.json", "utf-8"));
      },
      catch: (error) => {
        console.warn("invalid tg bot config", error);
        return "ReadingConfigError";
      }
    });
    if (!isTgBotClientSettingsInput(config)) {
      return yield* fail$2("InvalidConfig");
    }
    return makeTgBotClientConfig(config);
  });
  var makeBot = (messageHandler) => gen(function* () {
    const { runBot } = yield* service(BotUpdatePollerService);
    const fiber = yield* runBot(messageHandler);
    const interrupt = fiberInterrupt(fiber);
    return {
      runBot,
      interrupt
    };
  }).pipe(
    tapError((error) => {
      console.error(error);
      return void_;
    })
  );
  (class extends Tag("BotFactoryService")() {
  });
  var BotFactoryServiceDefault = {
    makeBot,
    runBot: (input) => gen(function* () {
      const client = make$2(TgBotClientConfig, yield* makeClientConfigFrom(input));
      const poller = yield* BotUpdatesPollerServiceDefault.pipe(
        provideContext(client)
      );
      const bot = yield* makeBot(input).pipe(
        provideContext(client),
        provideService(BotUpdatePollerService, poller)
      );
      const reload = (input2) => bot.runBot(input2).pipe(
        provideContext(client)
      );
      return {
        reload,
        bot
      };
    })
  };
  var runTgChatBot = (input) => BotFactoryServiceDefault.runBot(input).pipe(runPromise);
  var getFile = (fileId) => gen(function* () {
    const response = yield* execute("get_file", { file_id: fileId });
    const config = yield* service(TgBotClientConfig);
    const file_path = response.file_path;
    if (!file_path || file_path.length == 0) {
      return yield* fail$2(
        new TgBotClientError({
          reason: {
            type: "UnableToGetFile",
            cause: "File path not defined"
          }
        })
      );
    }
    const file_name = file_path.replaceAll("/", "-");
    const url = `${config.base_url}/file/bot${config.bot_token}/${file_path}`;
    const fileContent = yield* tryPromise({
      try: () => fetch(url).then((_) => _.arrayBuffer()),
      catch: (cause) => new TgBotClientError({
        reason: { type: "UnableToGetFile", cause }
      })
    });
    const file = new File([new Uint8Array(fileContent)], file_name);
    return file;
  });
  (class extends Tag("ClientFileService")() {
  });
  gen(function* () {
    return {
      getFile: (input) => getFile(input.file_id)
    };
  });
  const isRunBot = (input) => typeof input == "object" && input != null && "command" in input && "token" in input && "code" in input;
  const parseJson = (input) => {
    try {
      return { parsed: JSON.parse(input) };
    } catch {
      return void 0;
    }
  };
  const deserialize = (input) => {
    const result = [];
    const fields = parseJson(input);
    if (typeof (fields == null ? void 0 : fields.parsed) != "object") return;
    for (const [k, v] of Object.entries(fields.parsed)) {
      try {
        const f = new Function(`return ${v}`)();
        result.push([k, f]);
      } catch (e) {
        console.warn("deserialize field error", { k, v, e });
      }
    }
    return Object.fromEntries(result);
  };
  const makeWorkerHandler = (notifyParent) => {
    let messageId = 0;
    let botInstance = void 0;
    const sendEvent = (input) => notifyParent({
      ...input,
      messageId: messageId++
    });
    return async (command) => {
      if (!isRunBot(command)) {
        sendEvent({
          error: "not a run bot command",
          command
        });
        return;
      }
      if (command.command == "run-bot") {
        const handlers = deserialize(command.code);
        if (botInstance) {
          console.log("reloading...");
          await botInstance.reload({
            ...handlers
          });
          sendEvent({
            botState: {
              status: "reloaded"
            }
          });
          return;
        }
        botInstance = await runTgChatBot({
          type: "config",
          bot_token: command.token,
          ...handlers,
          onExit: (exit2) => sendEvent({
            success: "Bot's fiber has been shutdown",
            exit: exit2,
            botState: {
              status: "stopped"
            }
          })
        });
        sendEvent({
          success: "Bot's fiber has been created",
          botState: {
            status: "active"
          }
        });
        return;
      }
      sendEvent({
        error: "Unknown command"
      });
    };
  };
  const handler = makeWorkerHandler(
    (_) => self.postMessage(_)
  );
  self.onmessage = (msg) => handler(msg.data);
  var __viteBrowserExternal = /* @__PURE__ */ Object.freeze({
    __proto__: null
  });
})();
