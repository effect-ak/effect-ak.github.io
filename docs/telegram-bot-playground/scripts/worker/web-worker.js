// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Function.js
var isFunction = (input) => typeof input === "function";
var dual = function(arity, body) {
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
var identity = (a) => a;
var constant = (value) => () => value;
var constTrue = /* @__PURE__ */ constant(true);
var constFalse = /* @__PURE__ */ constant(false);
var constUndefined = /* @__PURE__ */ constant(void 0);
var constVoid = constUndefined;
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Equivalence.js
var make = (isEquivalent) => (self2, that) => self2 === that || isEquivalent(self2, that);

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/version.js
var moduleVersion = "3.11.9";
var getCurrentVersion = () => moduleVersion;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/GlobalValue.js
var globalStoreId = /* @__PURE__ */ Symbol.for(`effect/GlobalValue/globalStoreId/${/* @__PURE__ */ getCurrentVersion()}`);
if (!(globalStoreId in globalThis)) {
  ;
  globalThis[globalStoreId] = /* @__PURE__ */ new Map();
}
var globalStore = globalThis[globalStoreId];
var globalValue = (id, compute) => {
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Predicate.js
var isFunction2 = isFunction;
var isRecordOrArray = (input) => typeof input === "object" && input !== null;
var isObject = (input) => isRecordOrArray(input) || isFunction2(input);
var hasProperty = /* @__PURE__ */ dual(2, (self2, property) => isObject(self2) && property in self2);
var isTagged = /* @__PURE__ */ dual(2, (self2, tag) => hasProperty(self2, "_tag") && self2["_tag"] === tag);

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/errors.js
var getBugErrorMessage = (message) => `BUG: ${message} - please report an issue at https://github.com/Effect-TS/effect/issues`;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Utils.js
var GenKindTypeId = /* @__PURE__ */ Symbol.for("effect/Gen/GenKind");
var GenKindImpl = class {
  value;
  constructor(value) {
    this.value = value;
  }
  /**
   * @since 2.0.0
   */
  get _F() {
    return identity;
  }
  /**
   * @since 2.0.0
   */
  get _R() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  get _O() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  get _E() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  [GenKindTypeId] = GenKindTypeId;
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new SingleShotGen(this);
  }
};
var SingleShotGen = class _SingleShotGen {
  self;
  called = false;
  constructor(self2) {
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
    return new _SingleShotGen(this.self);
  }
};
var MUL_HI = 1481765933 >>> 0;
var MUL_LO = 1284865837 >>> 0;
var YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
var YieldWrap = class {
  /**
   * @since 3.0.6
   */
  #value;
  constructor(value) {
    this.#value = value;
  }
  /**
   * @since 3.0.6
   */
  [YieldWrapTypeId]() {
    return this.#value;
  }
};
function yieldWrapGet(self2) {
  if (typeof self2 === "object" && self2 !== null && YieldWrapTypeId in self2) {
    return self2[YieldWrapTypeId]();
  }
  throw new Error(getBugErrorMessage("yieldWrapGet"));
}
var structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
  enabled: false,
  tester: void 0
}));
var genConstructor = function* () {
}.constructor;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Hash.js
var randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
var symbol = /* @__PURE__ */ Symbol.for("effect/Hash");
var hash = (self2) => {
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
        return self2[symbol]();
      } else {
        return random(self2);
      }
    }
    default:
      throw new Error(`BUG: unhandled typeof ${typeof self2} - please report an issue at https://github.com/Effect-TS/effect/issues`);
  }
};
var random = (self2) => {
  if (!randomHashCache.has(self2)) {
    randomHashCache.set(self2, number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self2);
};
var combine = (b) => (self2) => self2 * 53 ^ b;
var optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
var isHash = (u) => hasProperty(u, symbol);
var number = (n) => {
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
var string = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
var structureKeys = (o, keys2) => {
  let h = 12289;
  for (let i = 0; i < keys2.length; i++) {
    h ^= pipe(string(keys2[i]), combine(hash(o[keys2[i]])));
  }
  return optimize(h);
};
var structure = (o) => structureKeys(o, Object.keys(o));
var array = (arr) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = pipe(h, combine(hash(arr[i])));
  }
  return optimize(h);
};
var cached = function() {
  if (arguments.length === 1) {
    const self3 = arguments[0];
    return function(hash3) {
      Object.defineProperty(self3, symbol, {
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
  Object.defineProperty(self2, symbol, {
    value() {
      return hash2;
    },
    enumerable: false
  });
  return hash2;
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Equal.js
var symbol2 = /* @__PURE__ */ Symbol.for("effect/Equal");
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
        if (hash(self2) === hash(that) && self2[symbol2](that)) {
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
var isEqual = (u) => hasProperty(u, symbol2);

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Inspectable.js
var NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var toJSON = (x) => {
  try {
    if (hasProperty(x, "toJSON") && isFunction2(x["toJSON"]) && x["toJSON"].length === 0) {
      return x.toJSON();
    } else if (Array.isArray(x)) {
      return x.map(toJSON);
    }
  } catch (_) {
    return {};
  }
  return redact(x);
};
var format = (x) => JSON.stringify(x, null, 2);
var BaseProto = {
  toJSON() {
    return toJSON(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
var Class = class {
  /**
   * @since 2.0.0
   */
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  /**
   * @since 2.0.0
   */
  toString() {
    return format(this.toJSON());
  }
};
var toStringUnknown = (u, whitespace = 2) => {
  if (typeof u === "string") {
    return u;
  }
  try {
    return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
  } catch (_) {
    return String(u);
  }
};
var stringifyCircular = (obj, whitespace) => {
  let cache = [];
  const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? void 0 : cache.push(value) && (redactableState.fiberRefs !== void 0 && isRedactable(value) ? value[symbolRedactable](redactableState.fiberRefs) : value) : value, whitespace);
  cache = void 0;
  return retVal;
};
var symbolRedactable = /* @__PURE__ */ Symbol.for("effect/Inspectable/Redactable");
var isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
var redactableState = /* @__PURE__ */ globalValue("effect/Inspectable/redactableState", () => ({
  fiberRefs: void 0
}));
var redact = (u) => {
  if (isRedactable(u) && redactableState.fiberRefs !== void 0) {
    return u[symbolRedactable](redactableState.fiberRefs);
  }
  return u;
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Pipeable.js
var pipeArguments = (self2, args2) => {
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/opCodes/effect.js
var OP_COMMIT = "Commit";
var OP_FAILURE = "Failure";
var OP_WITH_RUNTIME = "WithRuntime";

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/effectable.js
var EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
var StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
var SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
var ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
var effectVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _,
  _V: /* @__PURE__ */ getCurrentVersion()
};
var sinkVariance = {
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
var channelVariance = {
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
var EffectPrototype = {
  [EffectTypeId]: effectVariance,
  [StreamTypeId]: effectVariance,
  [SinkTypeId]: sinkVariance,
  [ChannelTypeId]: channelVariance,
  [symbol2](that) {
    return this === that;
  },
  [symbol]() {
    return cached(this, random(this));
  },
  [Symbol.iterator]() {
    return new SingleShotGen(new YieldWrap(this));
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var StructuralPrototype = {
  [symbol]() {
    return cached(this, structure(this));
  },
  [symbol2](that) {
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
var CommitPrototype = {
  ...EffectPrototype,
  _op: OP_COMMIT
};
var StructuralCommitPrototype = {
  ...CommitPrototype,
  ...StructuralPrototype
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/option.js
var TypeId = /* @__PURE__ */ Symbol.for("effect/Option");
var CommonProto = {
  ...EffectPrototype,
  [TypeId]: {
    _A: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
var SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "Some",
  _op: "Some",
  [symbol2](that) {
    return isOption(that) && isSome(that) && equals(this.value, that.value);
  },
  [symbol]() {
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
var NoneHash = /* @__PURE__ */ hash("None");
var NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "None",
  _op: "None",
  [symbol2](that) {
    return isOption(that) && isNone(that);
  },
  [symbol]() {
    return NoneHash;
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag
    };
  }
});
var isOption = (input) => hasProperty(input, TypeId);
var isNone = (fa) => fa._tag === "None";
var isSome = (fa) => fa._tag === "Some";
var none = /* @__PURE__ */ Object.create(NoneProto);
var some = (value) => {
  const a = Object.create(SomeProto);
  a.value = value;
  return a;
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/either.js
var TypeId2 = /* @__PURE__ */ Symbol.for("effect/Either");
var CommonProto2 = {
  ...EffectPrototype,
  [TypeId2]: {
    _R: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
var RightProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto2), {
  _tag: "Right",
  _op: "Right",
  [symbol2](that) {
    return isEither(that) && isRight(that) && equals(this.right, that.right);
  },
  [symbol]() {
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
var LeftProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto2), {
  _tag: "Left",
  _op: "Left",
  [symbol2](that) {
    return isEither(that) && isLeft(that) && equals(this.left, that.left);
  },
  [symbol]() {
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
var isEither = (input) => hasProperty(input, TypeId2);
var isLeft = (ma) => ma._tag === "Left";
var isRight = (ma) => ma._tag === "Right";
var left = (left3) => {
  const a = Object.create(LeftProto);
  a.left = left3;
  return a;
};
var right = (right3) => {
  const a = Object.create(RightProto);
  a.right = right3;
  return a;
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Either.js
var right2 = right;
var left2 = left;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Option.js
var none2 = () => none;
var some2 = some;
var isNone2 = isNone;
var isSome2 = isSome;
var getOrElse = /* @__PURE__ */ dual(2, (self2, onNone) => isNone2(self2) ? onNone() : self2.value);
var getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Array.js
var fromIterable = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
var isArray = Array.isArray;
var reverse = (self2) => Array.from(self2).reverse();
var reduce = /* @__PURE__ */ dual(3, (self2, b, f) => fromIterable(self2).reduce((b2, a, i) => f(b2, a, i), b));

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/context.js
var TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
var ReferenceTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Reference");
var STMSymbolKey = "effect/STM";
var STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
var TagProto = {
  ...EffectPrototype,
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
    return make2(this, self2);
  }
};
var ReferenceProto = {
  ...TagProto,
  [ReferenceTypeId]: ReferenceTypeId
};
var Tag = (id) => () => {
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
var Reference = () => (id, options) => {
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
var TypeId3 = /* @__PURE__ */ Symbol.for("effect/Context");
var ContextProto = {
  [TypeId3]: {
    _Services: (_) => _
  },
  [symbol2](that) {
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
  [symbol]() {
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
var makeContext = (unsafeMap) => {
  const context = Object.create(ContextProto);
  context.unsafeMap = unsafeMap;
  return context;
};
var serviceNotFoundError = (tag) => {
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
var isContext = (u) => hasProperty(u, TypeId3);
var make2 = (tag, service2) => makeContext(/* @__PURE__ */ new Map([[tag.key, service2]]));
var add = /* @__PURE__ */ dual(3, (self2, tag, service2) => {
  const map7 = new Map(self2.unsafeMap);
  map7.set(tag.key, service2);
  return makeContext(map7);
});
var defaultValueCache = /* @__PURE__ */ globalValue("effect/Context/defaultValueCache", () => /* @__PURE__ */ new Map());
var getDefaultValue = (tag) => {
  if (defaultValueCache.has(tag.key)) {
    return defaultValueCache.get(tag.key);
  }
  const value = tag.defaultValue();
  defaultValueCache.set(tag.key, value);
  return value;
};
var unsafeGetReference = (self2, tag) => {
  return self2.unsafeMap.has(tag.key) ? self2.unsafeMap.get(tag.key) : getDefaultValue(tag);
};
var unsafeGet = /* @__PURE__ */ dual(2, (self2, tag) => {
  if (!self2.unsafeMap.has(tag.key)) {
    if (ReferenceTypeId in tag) return getDefaultValue(tag);
    throw serviceNotFoundError(tag);
  }
  return self2.unsafeMap.get(tag.key);
});

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Context.js
var add2 = add;
var unsafeGet2 = unsafeGet;
var Tag2 = Tag;
var Reference2 = Reference;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Effectable.js
var EffectPrototype2 = EffectPrototype;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Micro.js
var TypeId4 = /* @__PURE__ */ Symbol.for("effect/Micro");
var MicroExitTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroExit");
var isMicro = (u) => typeof u === "object" && u !== null && TypeId4 in u;
var MicroCauseTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroCause");
var microCauseVariance = {
  _E: identity
};
var MicroCauseImpl = class extends globalThis.Error {
  _tag;
  traces;
  [MicroCauseTypeId];
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
  [NodeInspectSymbol]() {
    return this.stack;
  }
};
var Fail = class extends MicroCauseImpl {
  error;
  constructor(error, traces = []) {
    super("Fail", error, traces);
    this.error = error;
  }
};
var causeFail = (error, traces = []) => new Fail(error, traces);
var Die = class extends MicroCauseImpl {
  defect;
  constructor(defect, traces = []) {
    super("Die", defect, traces);
    this.defect = defect;
  }
};
var causeDie = (defect, traces = []) => new Die(defect, traces);
var Interrupt = class extends MicroCauseImpl {
  constructor(traces = []) {
    super("Interrupt", "interrupted", traces);
  }
};
var causeInterrupt = (traces = []) => new Interrupt(traces);
var causeIsFail = (self2) => self2._tag === "Fail";
var causeIsInterrupt = (self2) => self2._tag === "Interrupt";
var MicroFiberTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroFiber");
var fiberVariance = {
  _A: identity,
  _E: identity
};
var MicroFiberImpl = class {
  context;
  interruptible;
  [MicroFiberTypeId];
  _stack = [];
  _observers = [];
  _exit;
  _children;
  currentOpCount = 0;
  constructor(context, interruptible2 = true) {
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
  _interrupted = false;
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
  getCont(symbol3) {
    while (true) {
      const op = this._stack.pop();
      if (!op) return void 0;
      const cont = op[ensureCont] && op[ensureCont](this);
      if (cont) return {
        [symbol3]: cont
      };
      if (op[symbol3]) return op;
    }
  }
  // cancel the yielded operation, or for the yielded exit value
  _yielded = void 0;
  yieldWith(value) {
    this._yielded = value;
    return Yield;
  }
  children() {
    return this._children ??= /* @__PURE__ */ new Set();
  }
};
var fiberMiddleware = /* @__PURE__ */ globalValue("effect/Micro/fiberMiddleware", () => ({
  interruptChildren: void 0
}));
var fiberAwait = (self2) => async((resume) => sync(self2.addObserver((exit2) => resume(succeed(exit2)))));
var fiberInterrupt = (self2) => suspend(() => {
  self2.unsafeInterrupt();
  return asVoid(fiberAwait(self2));
});
var fiberInterruptAll = (fibers) => suspend(() => {
  for (const fiber of fibers) fiber.unsafeInterrupt();
  const iter = fibers[Symbol.iterator]();
  const wait = suspend(() => {
    let result = iter.next();
    while (!result.done) {
      if (result.value.unsafePoll()) {
        result = iter.next();
        continue;
      }
      const fiber = result.value;
      return async((resume) => {
        fiber.addObserver((_) => {
          resume(wait);
        });
      });
    }
    return exitVoid;
  });
  return wait;
});
var identifier = /* @__PURE__ */ Symbol.for("effect/Micro/identifier");
var args = /* @__PURE__ */ Symbol.for("effect/Micro/args");
var evaluate = /* @__PURE__ */ Symbol.for("effect/Micro/evaluate");
var successCont = /* @__PURE__ */ Symbol.for("effect/Micro/successCont");
var failureCont = /* @__PURE__ */ Symbol.for("effect/Micro/failureCont");
var ensureCont = /* @__PURE__ */ Symbol.for("effect/Micro/ensureCont");
var Yield = /* @__PURE__ */ Symbol.for("effect/Micro/Yield");
var microVariance = {
  _A: identity,
  _E: identity,
  _R: identity
};
var MicroProto = {
  ...EffectPrototype2,
  _op: "Micro",
  [TypeId4]: microVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  [Symbol.iterator]() {
    return new SingleShotGen(new YieldWrap(this));
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
var makePrimitiveProto = (options) => ({
  ...MicroProto,
  [identifier]: options.op,
  [evaluate]: options.eval ?? defaultEvaluate,
  [successCont]: options.contA,
  [failureCont]: options.contE,
  [ensureCont]: options.ensure
});
var makePrimitive = (options) => {
  const Proto = makePrimitiveProto(options);
  return function() {
    const self2 = Object.create(Proto);
    self2[args] = options.single === false ? arguments : arguments[0];
    return self2;
  };
};
var makeExit = (options) => {
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
    [symbol2](that) {
      return isMicroExit(that) && that._tag === options.op && equals(this[args], that[args]);
    },
    [symbol]() {
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
var succeed = /* @__PURE__ */ makeExit({
  op: "Success",
  prop: "value",
  eval(fiber) {
    const cont = fiber.getCont(successCont);
    return cont ? cont[successCont](this[args], fiber) : fiber.yieldWith(this);
  }
});
var failCause = /* @__PURE__ */ makeExit({
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
var fail = (error) => failCause(causeFail(error));
var sync = /* @__PURE__ */ makePrimitive({
  op: "Sync",
  eval(fiber) {
    const value = this[args]();
    const cont = fiber.getCont(successCont);
    return cont ? cont[successCont](value, fiber) : fiber.yieldWith(exitSucceed(value));
  }
});
var suspend = /* @__PURE__ */ makePrimitive({
  op: "Suspend",
  eval(_fiber) {
    return this[args]();
  }
});
var yieldNowWith = /* @__PURE__ */ makePrimitive({
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
var yieldNow = /* @__PURE__ */ yieldNowWith(0);
var void_ = /* @__PURE__ */ succeed(void 0);
var tryPromise = (options) => asyncOptions(function(resume, signal) {
  try {
    options.try(signal).then((a) => resume(succeed(a)), (e) => resume(fail(options.catch(e))));
  } catch (err) {
    resume(fail(options.catch(err)));
  }
}, options.try.length !== 0);
var withMicroFiber = /* @__PURE__ */ makePrimitive({
  op: "WithMicroFiber",
  eval(fiber) {
    return this[args](fiber);
  }
});
var asyncOptions = /* @__PURE__ */ makePrimitive({
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
    }, controller?.signal);
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
      controller?.abort();
      return onCancel ?? exitVoid;
    }));
    return Yield;
  }
});
var asyncFinalizer = /* @__PURE__ */ makePrimitive({
  op: "AsyncFinalizer",
  ensure(fiber) {
    if (fiber.interruptible) {
      fiber.interruptible = false;
      fiber._stack.push(setInterruptible(true));
    }
  },
  contE(cause, _fiber) {
    return causeIsInterrupt(cause) ? flatMap(this[args](), () => failCause(cause)) : failCause(cause);
  }
});
var async = (register) => asyncOptions(register, register.length >= 2);
var gen = (...args2) => suspend(() => fromIterator(args2.length === 1 ? args2[0]() : args2[1].call(args2[0])));
var fromIterator = /* @__PURE__ */ makePrimitive({
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
var as = /* @__PURE__ */ dual(2, (self2, value) => map2(self2, (_) => value));
var andThen = /* @__PURE__ */ dual(2, (self2, f) => flatMap(self2, (a) => {
  const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
  return isMicro(value) ? value : succeed(value);
}));
var tap = /* @__PURE__ */ dual(2, (self2, f) => flatMap(self2, (a) => {
  const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
  return isMicro(value) ? as(value, a) : succeed(a);
}));
var asVoid = (self2) => flatMap(self2, (_) => exitVoid);
var exit = (self2) => matchCause(self2, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
var flatMap = /* @__PURE__ */ dual(2, (self2, f) => {
  const onSuccess = Object.create(OnSuccessProto);
  onSuccess[args] = self2;
  onSuccess[successCont] = f;
  return onSuccess;
});
var OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnSuccess",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
var map2 = /* @__PURE__ */ dual(2, (self2, f) => flatMap(self2, (a) => succeed(f(a))));
var isMicroExit = (u) => hasProperty(u, MicroExitTypeId);
var exitSucceed = succeed;
var exitFailCause = failCause;
var exitInterrupt = /* @__PURE__ */ exitFailCause(/* @__PURE__ */ causeInterrupt());
var exitDie = (defect) => exitFailCause(causeDie(defect));
var exitVoid = /* @__PURE__ */ exitSucceed(void 0);
var exitVoidAll = (exits) => {
  for (const exit2 of exits) {
    if (exit2._tag === "Failure") {
      return exit2;
    }
  }
  return exitVoid;
};
var setImmediate = "setImmediate" in globalThis ? globalThis.setImmediate : (f) => setTimeout(f, 0);
var MicroSchedulerDefault = class {
  tasks = [];
  running = false;
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
  afterScheduled = () => {
    this.running = false;
    this.runTasks();
  };
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
};
var service = (tag) => withMicroFiber((fiber) => succeed(unsafeGet2(fiber.context, tag)));
var updateContext = /* @__PURE__ */ dual(2, (self2, f) => withMicroFiber((fiber) => {
  const prev = fiber.context;
  fiber.context = f(prev);
  return onExit(self2, () => {
    fiber.context = prev;
    return void_;
  });
}));
var provideService = /* @__PURE__ */ dual(3, (self2, tag, service2) => updateContext(self2, add2(tag, service2)));
var provideServiceEffect = /* @__PURE__ */ dual(3, (self2, tag, acquire) => flatMap(acquire, (service2) => provideService(self2, tag, service2)));
var MaxOpsBeforeYield = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentMaxOpsBeforeYield", {
  defaultValue: () => 2048
})) {
};
var CurrentConcurrency = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentConcurrency", {
  defaultValue: () => "unbounded"
})) {
};
var CurrentScheduler = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentScheduler", {
  defaultValue: () => new MicroSchedulerDefault()
})) {
};
var repeatExit = /* @__PURE__ */ dual(2, (self2, options) => suspend(() => {
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
      if (isNone2(duration)) {
        return exit2;
      }
      delayEffect = sleep(duration.value);
    }
    return flatMap(delayEffect, () => loop);
  });
  return loop;
}));
var repeat = /* @__PURE__ */ dual((args2) => isMicro(args2[0]), (self2, options) => repeatExit(self2, {
  ...options,
  while: (exit2) => exit2._tag === "Success" && (options?.while === void 0 || options.while(exit2.value))
}));
var catchAllCause = /* @__PURE__ */ dual(2, (self2, f) => {
  const onFailure = Object.create(OnFailureProto);
  onFailure[args] = self2;
  onFailure[failureCont] = f;
  return onFailure;
});
var OnFailureProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnFailure",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
var catchCauseIf = /* @__PURE__ */ dual(3, (self2, predicate, f) => catchAllCause(self2, (cause) => predicate(cause) ? f(cause) : failCause(cause)));
var tapErrorCauseIf = /* @__PURE__ */ dual(3, (self2, refinement, f) => catchCauseIf(self2, refinement, (cause) => andThen(f(cause), failCause(cause))));
var tapError = /* @__PURE__ */ dual(2, (self2, f) => tapErrorCauseIf(self2, causeIsFail, (fail4) => f(fail4.error)));
var matchCauseEffect = /* @__PURE__ */ dual(2, (self2, options) => {
  const primitive = Object.create(OnSuccessAndFailureProto);
  primitive[args] = self2;
  primitive[successCont] = options.onSuccess;
  primitive[failureCont] = options.onFailure;
  return primitive;
});
var OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnSuccessAndFailure",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
var matchCause = /* @__PURE__ */ dual(2, (self2, options) => matchCauseEffect(self2, {
  onFailure: (cause) => sync(() => options.onFailure(cause)),
  onSuccess: (value) => sync(() => options.onSuccess(value))
}));
var sleep = (millis) => async((resume) => {
  const timeout = setTimeout(() => {
    resume(void_);
  }, millis);
  return sync(() => {
    clearTimeout(timeout);
  });
});
var delay = /* @__PURE__ */ dual(2, (self2, millis) => andThen(sleep(millis), self2));
var MicroScopeTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroScope");
var MicroScopeImpl = class _MicroScopeImpl {
  [MicroScopeTypeId];
  state = {
    _tag: "Open",
    finalizers: /* @__PURE__ */ new Set()
  };
  constructor() {
    this[MicroScopeTypeId] = MicroScopeTypeId;
  }
  unsafeAddFinalizer(finalizer) {
    if (this.state._tag === "Open") {
      this.state.finalizers.add(finalizer);
    }
  }
  addFinalizer(finalizer) {
    return suspend(() => {
      if (this.state._tag === "Open") {
        this.state.finalizers.add(finalizer);
        return void_;
      }
      return finalizer(this.state.exit);
    });
  }
  unsafeRemoveFinalizer(finalizer) {
    if (this.state._tag === "Open") {
      this.state.finalizers.delete(finalizer);
    }
  }
  close(microExit) {
    return suspend(() => {
      if (this.state._tag === "Open") {
        const finalizers = Array.from(this.state.finalizers).reverse();
        this.state = {
          _tag: "Closed",
          exit: microExit
        };
        return flatMap(forEach(finalizers, (finalizer) => exit(finalizer(microExit))), exitVoidAll);
      }
      return void_;
    });
  }
  get fork() {
    return sync(() => {
      const newScope = new _MicroScopeImpl();
      if (this.state._tag === "Closed") {
        newScope.state = this.state;
        return newScope;
      }
      function fin(exit2) {
        return newScope.close(exit2);
      }
      this.state.finalizers.add(fin);
      newScope.unsafeAddFinalizer((_) => sync(() => this.unsafeRemoveFinalizer(fin)));
      return newScope;
    });
  }
};
var onExit = /* @__PURE__ */ dual(2, (self2, f) => uninterruptibleMask((restore) => matchCauseEffect(restore(self2), {
  onFailure: (cause) => flatMap(f(exitFailCause(cause)), () => failCause(cause)),
  onSuccess: (a) => flatMap(f(exitSucceed(a)), () => succeed(a))
})));
var setInterruptible = /* @__PURE__ */ makePrimitive({
  op: "SetInterruptible",
  ensure(fiber) {
    fiber.interruptible = this[args];
    if (fiber._interrupted && fiber.interruptible) {
      return () => exitInterrupt;
    }
  }
});
var interruptible = (self2) => withMicroFiber((fiber) => {
  if (fiber.interruptible) return self2;
  fiber.interruptible = true;
  fiber._stack.push(setInterruptible(false));
  if (fiber._interrupted) return exitInterrupt;
  return self2;
});
var uninterruptibleMask = (f) => withMicroFiber((fiber) => {
  if (!fiber.interruptible) return f(identity);
  fiber.interruptible = false;
  fiber._stack.push(setInterruptible(true));
  return f(interruptible);
});
var whileLoop = /* @__PURE__ */ makePrimitive({
  op: "While",
  contA(value, fiber) {
    this[args].step(value);
    if (this[args].while()) {
      fiber._stack.push(this);
      return this[args].body();
    }
    return exitVoid;
  },
  eval(fiber) {
    if (this[args].while()) {
      fiber._stack.push(this);
      return this[args].body();
    }
    return exitVoid;
  }
});
var forEach = (iterable, f, options) => withMicroFiber((parent) => {
  const concurrencyOption = options?.concurrency === "inherit" ? parent.getRef(CurrentConcurrency) : options?.concurrency ?? 1;
  const concurrency = concurrencyOption === "unbounded" ? Number.POSITIVE_INFINITY : Math.max(1, concurrencyOption);
  const items = fromIterable(iterable);
  let length = items.length;
  if (length === 0) {
    return options?.discard ? void_ : succeed([]);
  }
  const out = options?.discard ? void 0 : new Array(length);
  let index = 0;
  if (concurrency === 1) {
    return as(whileLoop({
      while: () => index < items.length,
      body: () => f(items[index], index),
      step: out ? (b) => out[index++] = b : (_) => index++
    }), out);
  }
  return async((resume) => {
    const fibers = /* @__PURE__ */ new Set();
    let result = void 0;
    let inProgress = 0;
    let doneCount = 0;
    let pumping = false;
    let interrupted = false;
    function pump() {
      pumping = true;
      while (inProgress < concurrency && index < length) {
        const currentIndex = index;
        const item = items[currentIndex];
        index++;
        inProgress++;
        try {
          const child = unsafeFork(parent, f(item, currentIndex), true, true);
          fibers.add(child);
          child.addObserver((exit2) => {
            fibers.delete(child);
            if (interrupted) {
              return;
            } else if (exit2._tag === "Failure") {
              if (result === void 0) {
                result = exit2;
                length = index;
                fibers.forEach((fiber) => fiber.unsafeInterrupt());
              }
            } else if (out !== void 0) {
              out[currentIndex] = exit2.value;
            }
            doneCount++;
            inProgress--;
            if (doneCount === length) {
              resume(result ?? succeed(out));
            } else if (!pumping && inProgress < concurrency) {
              pump();
            }
          });
        } catch (err) {
          result = exitDie(err);
          length = index;
          fibers.forEach((fiber) => fiber.unsafeInterrupt());
        }
      }
      pumping = false;
    }
    pump();
    return suspend(() => {
      interrupted = true;
      index = length;
      return fiberInterruptAll(fibers);
    });
  });
});
var unsafeFork = (parent, effect, immediate = false, daemon = false) => {
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
var forkDaemon = (self2) => withMicroFiber((fiber) => succeed(unsafeFork(fiber, self2, false, true)));
var runFork = (effect, options) => {
  const fiber = new MicroFiberImpl(CurrentScheduler.context(options?.scheduler ?? new MicroSchedulerDefault()));
  fiber.evaluate(effect);
  if (options?.signal) {
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
var runPromiseExit = (effect, options) => new Promise((resolve, _reject) => {
  const handle = runFork(effect, options);
  handle.addObserver(resolve);
});
var runPromise = (effect, options) => runPromiseExit(effect, options).then((exit2) => {
  if (exit2._tag === "Failure") {
    throw exit2.cause;
  }
  return exit2.value;
});

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/String.js
var snakeToCamel = (self2) => {
  let str = self2[0];
  for (let i = 1; i < self2.length; i++) {
    str += self2[i] === "_" ? self2[++i].toUpperCase() : self2[i];
  }
  return str;
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Chunk.js
var TypeId5 = /* @__PURE__ */ Symbol.for("effect/Chunk");
function copy(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }
  return dest;
}
var emptyArray = [];
var getEquivalence = (isEquivalent) => make((self2, that) => self2.length === that.length && toReadonlyArray(self2).every((value, i) => isEquivalent(value, unsafeGet3(that, i))));
var _equivalence = /* @__PURE__ */ getEquivalence(equals);
var ChunkProto = {
  [TypeId5]: {
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
  [symbol2](that) {
    return isChunk(that) && _equivalence(this, that);
  },
  [symbol]() {
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
var makeChunk = (backing) => {
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
      chunk.left = _empty;
      chunk.right = _empty;
      break;
    }
    case "ISingleton": {
      chunk.length = 1;
      chunk.depth = 0;
      chunk.left = _empty;
      chunk.right = _empty;
      break;
    }
    case "ISlice": {
      chunk.length = backing.length;
      chunk.depth = backing.chunk.depth + 1;
      chunk.left = _empty;
      chunk.right = _empty;
      break;
    }
  }
  return chunk;
};
var isChunk = (u) => hasProperty(u, TypeId5);
var _empty = /* @__PURE__ */ makeChunk({
  _tag: "IEmpty"
});
var empty2 = () => _empty;
var make3 = (...as2) => as2.length === 1 ? of(as2[0]) : unsafeFromNonEmptyArray(as2);
var of = (a) => makeChunk({
  _tag: "ISingleton",
  a
});
var fromIterable2 = (self2) => isChunk(self2) ? self2 : makeChunk({
  _tag: "IArray",
  array: fromIterable(self2)
});
var copyToArray = (self2, array2, initial) => {
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
        array2[j] = unsafeGet3(self2, i);
        i += 1;
        j += 1;
      }
      break;
    }
  }
};
var toReadonlyArray_ = (self2) => {
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
      self2.left = _empty;
      self2.right = _empty;
      self2.depth = 0;
      return arr;
    }
  }
};
var toReadonlyArray = toReadonlyArray_;
var reverseChunk = (self2) => {
  switch (self2.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return self2;
    case "IArray": {
      return makeChunk({
        _tag: "IArray",
        array: reverse(self2.backing.array)
      });
    }
    case "IConcat": {
      return makeChunk({
        _tag: "IConcat",
        left: reverse2(self2.backing.right),
        right: reverse2(self2.backing.left)
      });
    }
    case "ISlice":
      return unsafeFromArray(reverse(toReadonlyArray(self2)));
  }
};
var reverse2 = reverseChunk;
var unsafeFromArray = (self2) => makeChunk({
  _tag: "IArray",
  array: self2
});
var unsafeFromNonEmptyArray = (self2) => unsafeFromArray(self2);
var unsafeGet3 = /* @__PURE__ */ dual(2, (self2, index) => {
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
      return index < self2.left.length ? unsafeGet3(self2.left, index) : unsafeGet3(self2.right, index - self2.left.length);
    }
    case "ISlice": {
      return unsafeGet3(self2.backing.chunk, index + self2.backing.offset);
    }
  }
});
var prepend = /* @__PURE__ */ dual(2, (self2, elem) => appendAll(of(elem), self2));
var appendAll = /* @__PURE__ */ dual(2, (self2, that) => {
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
var isEmpty = (self2) => self2.length === 0;
var isNonEmpty = (self2) => self2.length > 0;
var unsafeHead = (self2) => unsafeGet3(self2, 0);
var headNonEmpty = unsafeHead;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/hashMap/config.js
var SIZE = 5;
var BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/hashMap/bitwise.js
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/stack.js
var make4 = (value, previous) => ({
  value,
  previous
});

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/hashMap/array.js
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
  ;
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/hashMap/node.js
var EmptyNode = class _EmptyNode {
  _tag = "EmptyNode";
  modify(edit, _shift, f, hash2, key, size4) {
    const v = f(none2());
    if (isNone2(v)) return new _EmptyNode();
    ++size4.value;
    return new LeafNode(edit, hash2, key, v);
  }
};
function isEmptyNode(a) {
  return isTagged(a, "EmptyNode");
}
function isLeafNode(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}
function canEditNode(node, edit) {
  return isEmptyNode(node) ? false : edit === node.edit;
}
var LeafNode = class _LeafNode {
  edit;
  hash;
  key;
  value;
  _tag = "LeafNode";
  constructor(edit, hash2, key, value) {
    this.edit = edit;
    this.hash = hash2;
    this.key = key;
    this.value = value;
  }
  modify(edit, shift, f, hash2, key, size4) {
    if (equals(key, this.key)) {
      const v2 = f(this.value);
      if (v2 === this.value) return this;
      else if (isNone2(v2)) {
        ;
        --size4.value;
        return new EmptyNode();
      }
      if (canEditNode(this, edit)) {
        this.value = v2;
        return this;
      }
      return new _LeafNode(edit, hash2, key, v2);
    }
    const v = f(none2());
    if (isNone2(v)) return this;
    ++size4.value;
    return mergeLeaves(edit, shift, this.hash, this, hash2, new _LeafNode(edit, hash2, key, v));
  }
};
var CollisionNode = class _CollisionNode {
  edit;
  hash;
  children;
  _tag = "CollisionNode";
  constructor(edit, hash2, children) {
    this.edit = edit;
    this.hash = hash2;
    this.children = children;
  }
  modify(edit, shift, f, hash2, key, size4) {
    if (hash2 === this.hash) {
      const canEdit = canEditNode(this, edit);
      const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size4);
      if (list === this.children) return this;
      return list.length > 1 ? new _CollisionNode(edit, this.hash, list) : list[0];
    }
    const v = f(none2());
    if (isNone2(v)) return this;
    ++size4.value;
    return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
  updateCollisionList(mutate2, edit, hash2, list, f, key, size4) {
    const len = list.length;
    for (let i = 0; i < len; ++i) {
      const child = list[i];
      if ("key" in child && equals(key, child.key)) {
        const value = child.value;
        const newValue2 = f(value);
        if (newValue2 === value) return list;
        if (isNone2(newValue2)) {
          ;
          --size4.value;
          return arraySpliceOut(mutate2, i, list);
        }
        return arrayUpdate(mutate2, i, new LeafNode(edit, hash2, key, newValue2), list);
      }
    }
    const newValue = f(none2());
    if (isNone2(newValue)) return list;
    ++size4.value;
    return arrayUpdate(mutate2, len, new LeafNode(edit, hash2, key, newValue), list);
  }
};
var IndexedNode = class _IndexedNode {
  edit;
  mask;
  children;
  _tag = "IndexedNode";
  constructor(edit, mask, children) {
    this.edit = edit;
    this.mask = mask;
    this.children = children;
  }
  modify(edit, shift, f, hash2, key, size4) {
    const mask = this.mask;
    const children = this.children;
    const frag = hashFragment(shift, hash2);
    const bit = toBitmap(frag);
    const indx = fromBitmap(mask, bit);
    const exists = mask & bit;
    const canEdit = canEditNode(this, edit);
    if (!exists) {
      const _newChild = new EmptyNode().modify(edit, shift + SIZE, f, hash2, key, size4);
      if (!_newChild) return this;
      return children.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children) : new _IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children));
    }
    const current = children[indx];
    const child = current.modify(edit, shift + SIZE, f, hash2, key, size4);
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
    return new _IndexedNode(edit, bitmap, newChildren);
  }
};
var ArrayNode = class _ArrayNode {
  edit;
  size;
  children;
  _tag = "ArrayNode";
  constructor(edit, size4, children) {
    this.edit = edit;
    this.size = size4;
    this.children = children;
  }
  modify(edit, shift, f, hash2, key, size4) {
    let count = this.size;
    const children = this.children;
    const frag = hashFragment(shift, hash2);
    const child = children[frag];
    const newChild = (child || new EmptyNode()).modify(edit, shift + SIZE, f, hash2, key, size4);
    if (child === newChild) return this;
    const canEdit = canEditNode(this, edit);
    let newChildren;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ;
      ++count;
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      ;
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
    return new _ArrayNode(edit, count, newChildren);
  }
};
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
      stack = make4(res, stack);
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/hashMap.js
var HashMapSymbolKey = "effect/HashMap";
var HashMapTypeId = /* @__PURE__ */ Symbol.for(HashMapSymbolKey);
var HashMapProto = {
  [HashMapTypeId]: HashMapTypeId,
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  },
  [symbol]() {
    let hash2 = hash(HashMapSymbolKey);
    for (const item of this) {
      hash2 ^= pipe(hash(item[0]), combine(hash(item[1])));
    }
    return cached(this, hash2);
  },
  [symbol2](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = pipe(that, getHash(item[0], hash(item[0])));
        if (isNone2(elem)) {
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
var makeImpl = (editable, edit, root, size4) => {
  const map7 = Object.create(HashMapProto);
  map7._editable = editable;
  map7._edit = edit;
  map7._root = root;
  map7._size = size4;
  return map7;
};
var HashMapIterator = class _HashMapIterator {
  map;
  f;
  v;
  constructor(map7, f) {
    this.map = map7;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, void 0);
  }
  next() {
    if (isNone2(this.v)) {
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
    return new _HashMapIterator(this.map, this.f);
  }
};
var applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none2();
var visitLazy = (node, f, cont = void 0) => {
  switch (node._tag) {
    case "LeafNode": {
      if (isSome2(node.value)) {
        return some2({
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
var visitLazyChildren = (len, children, i, f, cont) => {
  while (i < len) {
    const child = children[i++];
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }
  return applyCont(cont);
};
var _empty2 = /* @__PURE__ */ makeImpl(false, 0, /* @__PURE__ */ new EmptyNode(), 0);
var empty3 = () => _empty2;
var isHashMap = (u) => hasProperty(u, HashMapTypeId);
var getHash = /* @__PURE__ */ dual(3, (self2, key, hash2) => {
  let node = self2._root;
  let shift = 0;
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return equals(key, node.key) ? node.value : none2();
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
        return none2();
      }
      case "IndexedNode": {
        const frag = hashFragment(shift, hash2);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift += SIZE;
          break;
        }
        return none2();
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift, hash2)];
        if (node) {
          shift += SIZE;
          break;
        }
        return none2();
      }
      default:
        return none2();
    }
  }
});
var set = /* @__PURE__ */ dual(3, (self2, key, value) => modifyAt(self2, key, () => some2(value)));
var setTree = /* @__PURE__ */ dual(3, (self2, newRoot, newSize) => {
  if (self2._editable) {
    ;
    self2._root = newRoot;
    self2._size = newSize;
    return self2;
  }
  return newRoot === self2._root ? self2 : makeImpl(self2._editable, self2._edit, newRoot, newSize);
});
var keys = (self2) => new HashMapIterator(self2, (key) => key);
var size = (self2) => self2._size;
var beginMutation = (self2) => makeImpl(true, self2._edit + 1, self2._root, self2._size);
var modifyAt = /* @__PURE__ */ dual(3, (self2, key, f) => modifyHash(self2, key, hash(key), f));
var modifyHash = /* @__PURE__ */ dual(4, (self2, key, hash2, f) => {
  const size4 = {
    value: self2._size
  };
  const newRoot = self2._root.modify(self2._editable ? self2._edit : NaN, 0, f, hash2, key, size4);
  return pipe(self2, setTree(newRoot, size4.value));
});
var forEach2 = /* @__PURE__ */ dual(2, (self2, f) => reduce2(self2, void 0, (_, value, key) => f(value, key)));
var reduce2 = /* @__PURE__ */ dual(3, (self2, zero, f) => {
  const root = self2._root;
  if (root._tag === "LeafNode") {
    return isSome2(root.value) ? f(zero, root.value.value, root.key) : zero;
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
          if (isSome2(child.value)) {
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/hashSet.js
var HashSetSymbolKey = "effect/HashSet";
var HashSetTypeId = /* @__PURE__ */ Symbol.for(HashSetSymbolKey);
var HashSetProto = {
  [HashSetTypeId]: HashSetTypeId,
  [Symbol.iterator]() {
    return keys(this._keyMap);
  },
  [symbol]() {
    return cached(this, combine(hash(this._keyMap))(hash(HashSetSymbolKey)));
  },
  [symbol2](that) {
    if (isHashSet(that)) {
      return size(this._keyMap) === size(that._keyMap) && equals(this._keyMap, that._keyMap);
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
var makeImpl2 = (keyMap) => {
  const set2 = Object.create(HashSetProto);
  set2._keyMap = keyMap;
  return set2;
};
var isHashSet = (u) => hasProperty(u, HashSetTypeId);
var _empty3 = /* @__PURE__ */ makeImpl2(/* @__PURE__ */ empty3());
var empty4 = () => _empty3;
var size2 = (self2) => size(self2._keyMap);
var beginMutation2 = (self2) => makeImpl2(beginMutation(self2._keyMap));
var endMutation = (self2) => {
  ;
  self2._keyMap._editable = false;
  return self2;
};
var mutate = /* @__PURE__ */ dual(2, (self2, f) => {
  const transient = beginMutation2(self2);
  f(transient);
  return endMutation(transient);
});
var add3 = /* @__PURE__ */ dual(2, (self2, value) => self2._keyMap._editable ? (set(value, true)(self2._keyMap), self2) : makeImpl2(set(value, true)(self2._keyMap)));
var union2 = /* @__PURE__ */ dual(2, (self2, that) => mutate(empty4(), (set2) => {
  forEach3(self2, (value) => add3(set2, value));
  for (const value of that) {
    add3(set2, value);
  }
}));
var forEach3 = /* @__PURE__ */ dual(2, (self2, f) => forEach2(self2._keyMap, (_, k) => f(k)));

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/HashSet.js
var empty5 = empty4;
var size3 = size2;
var add4 = add3;
var union3 = union2;

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/opCodes/cause.js
var OP_DIE = "Die";
var OP_EMPTY = "Empty";
var OP_FAIL = "Fail";
var OP_INTERRUPT = "Interrupt";
var OP_PARALLEL = "Parallel";
var OP_SEQUENTIAL = "Sequential";

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/cause.js
var CauseSymbolKey = "effect/Cause";
var CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
var variance = {
  /* c8 ignore next */
  _E: (_) => _
};
var proto = {
  [CauseTypeId]: variance,
  [symbol]() {
    return pipe(hash(CauseSymbolKey), combine(hash(flattenCause(this))), cached(this));
  },
  [symbol2](that) {
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
var fail2 = (error) => {
  const o = Object.create(proto);
  o._tag = OP_FAIL;
  o.error = error;
  return o;
};
var parallel = (left3, right3) => {
  const o = Object.create(proto);
  o._tag = OP_PARALLEL;
  o.left = left3;
  o.right = right3;
  return o;
};
var sequential = (left3, right3) => {
  const o = Object.create(proto);
  o._tag = OP_SEQUENTIAL;
  o.left = left3;
  o.right = right3;
  return o;
};
var isCause = (u) => hasProperty(u, CauseTypeId);
var isInterruptedOnly = (self2) => reduceWithContext(void 0, IsInterruptedOnlyCauseReducer)(self2);
var causeEquals = (left3, right3) => {
  let leftStack = of(left3);
  let rightStack = of(right3);
  while (isNonEmpty(leftStack) && isNonEmpty(rightStack)) {
    const [leftParallel, leftSequential] = pipe(headNonEmpty(leftStack), reduce4([empty5(), empty2()], ([parallel2, sequential2], cause) => {
      const [par, seq] = evaluateCause(cause);
      return some2([pipe(parallel2, union3(par)), pipe(sequential2, appendAll(seq))]);
    }));
    const [rightParallel, rightSequential] = pipe(headNonEmpty(rightStack), reduce4([empty5(), empty2()], ([parallel2, sequential2], cause) => {
      const [par, seq] = evaluateCause(cause);
      return some2([pipe(parallel2, union3(par)), pipe(sequential2, appendAll(seq))]);
    }));
    if (!equals(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
var flattenCause = (cause) => {
  return flattenCauseLoop(of(cause), empty2());
};
var flattenCauseLoop = (causes, flattened) => {
  while (1) {
    const [parallel2, sequential2] = pipe(causes, reduce([empty5(), empty2()], ([parallel3, sequential3], cause) => {
      const [par, seq] = evaluateCause(cause);
      return [pipe(parallel3, union3(par)), pipe(sequential3, appendAll(seq))];
    }));
    const updated = size3(parallel2) > 0 ? pipe(flattened, prepend(parallel2)) : flattened;
    if (isEmpty(sequential2)) {
      return reverse2(updated);
    }
    causes = sequential2;
    flattened = updated;
  }
  throw new Error(getBugErrorMessage("Cause.flattenCauseLoop"));
};
var evaluateCause = (self2) => {
  let cause = self2;
  const stack = [];
  let _parallel = empty5();
  let _sequential = empty2();
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
        _parallel = add4(_parallel, make3(cause._tag, cause.error));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_DIE: {
        _parallel = add4(_parallel, make3(cause._tag, cause.defect));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_INTERRUPT: {
        _parallel = add4(_parallel, make3(cause._tag, cause.fiberId));
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
var IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  sequentialCase: (_, left3, right3) => left3 && right3,
  parallelCase: (_, left3, right3) => left3 && right3
};
var OP_SEQUENTIAL_CASE = "SequentialCase";
var OP_PARALLEL_CASE = "ParallelCase";
var reduce4 = /* @__PURE__ */ dual(3, (self2, zero, pf) => {
  let accumulator = zero;
  let cause = self2;
  const causes = [];
  while (cause !== void 0) {
    const option = pf(accumulator, cause);
    accumulator = isSome2(option) ? option.value : accumulator;
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
var reduceWithContext = /* @__PURE__ */ dual(3, (self2, context, reducer) => {
  const input = [self2];
  const output = [];
  while (input.length > 0) {
    const cause = input.pop();
    switch (cause._tag) {
      case OP_EMPTY: {
        output.push(right2(reducer.emptyCase(context)));
        break;
      }
      case OP_FAIL: {
        output.push(right2(reducer.failCase(context, cause.error)));
        break;
      }
      case OP_DIE: {
        output.push(right2(reducer.dieCase(context, cause.defect)));
        break;
      }
      case OP_INTERRUPT: {
        output.push(right2(reducer.interruptCase(context, cause.fiberId)));
        break;
      }
      case OP_SEQUENTIAL: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left2({
          _tag: OP_SEQUENTIAL_CASE
        }));
        break;
      }
      case OP_PARALLEL: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left2({
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
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value = reducer.sequentialCase(context, left3, right3);
            accumulator.push(value);
            break;
          }
          case OP_PARALLEL_CASE: {
            const left3 = accumulator.pop();
            const right3 = accumulator.pop();
            const value = reducer.parallelCase(context, left3, right3);
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
var pretty = (cause, options) => {
  if (isInterruptedOnly(cause)) {
    return "All fibers interrupted without errors.";
  }
  return prettyErrors(cause).map(function(e) {
    if (options?.renderErrorCause !== true || e.cause === void 0) {
      return e.stack;
    }
    return `${e.stack} {
${renderErrorCause(e.cause, "  ")}
}`;
  }).join("\n");
};
var renderErrorCause = (cause, prefix) => {
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
var PrettyError = class _PrettyError extends globalThis.Error {
  span = void 0;
  constructor(originalError) {
    const originalErrorIsObject = typeof originalError === "object" && originalError !== null;
    const prevLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 1;
    super(prettyErrorMessage(originalError), originalErrorIsObject && "cause" in originalError && typeof originalError.cause !== "undefined" ? {
      cause: new _PrettyError(originalError.cause)
    } : void 0);
    if (this.message === "") {
      this.message = "An error has occurred";
    }
    Error.stackTraceLimit = prevLimit;
    this.name = originalError instanceof Error ? originalError.name : "Error";
    if (originalErrorIsObject) {
      if (spanSymbol in originalError) {
        this.span = originalError[spanSymbol];
      }
      Object.keys(originalError).forEach((key) => {
        if (!(key in this)) {
          this[key] = originalError[key];
        }
      });
    }
    this.stack = prettyErrorStack(`${this.name}: ${this.message}`, originalError instanceof Error && originalError.stack ? originalError.stack : "", this.span);
  }
};
var prettyErrorMessage = (u) => {
  if (typeof u === "string") {
    return u;
  }
  if (typeof u === "object" && u !== null && u instanceof Error) {
    return u.message;
  }
  try {
    if (hasProperty(u, "toString") && isFunction2(u["toString"]) && u["toString"] !== Object.prototype.toString && u["toString"] !== globalThis.Array.prototype.toString) {
      return u["toString"]();
    }
  } catch {
  }
  return stringifyCircular(u);
};
var locationRegex = /\((.*)\)/;
var spanToTrace = /* @__PURE__ */ globalValue("effect/Tracer/spanToTrace", () => /* @__PURE__ */ new WeakMap());
var prettyErrorStack = (message, stack, span) => {
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
          const locationMatch = stack2.match(locationRegex);
          const location = locationMatch ? locationMatch[1] : stack2.replace(/^at /, "");
          out.push(`    at ${current.name} (${location})`);
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
var spanSymbol = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
var prettyErrors = (cause) => reduceWithContext(cause, void 0, {
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

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/singleShotGen.js
var SingleShotGen2 = class _SingleShotGen {
  self;
  called = false;
  constructor(self2) {
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
    return new _SingleShotGen(this.self);
  }
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/internal/core.js
var EffectTypeId2 = /* @__PURE__ */ Symbol.for("effect/Effect");
var EffectPrimitive = class {
  _op;
  effect_instruction_i0 = void 0;
  effect_instruction_i1 = void 0;
  effect_instruction_i2 = void 0;
  trace = void 0;
  [EffectTypeId2] = effectVariance;
  constructor(_op) {
    this._op = _op;
  }
  [symbol2](that) {
    return this === that;
  }
  [symbol]() {
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
    return new SingleShotGen2(new YieldWrap(this));
  }
};
var EffectPrimitiveFailure = class {
  _op;
  effect_instruction_i0 = void 0;
  effect_instruction_i1 = void 0;
  effect_instruction_i2 = void 0;
  trace = void 0;
  [EffectTypeId2] = effectVariance;
  constructor(_op) {
    this._op = _op;
    this._tag = _op;
  }
  [symbol2](that) {
    return exitIsExit(that) && that._op === "Failure" && // @ts-expect-error
    equals(this.effect_instruction_i0, that.effect_instruction_i0);
  }
  [symbol]() {
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
    return new SingleShotGen2(new YieldWrap(this));
  }
};
var EffectPrimitiveSuccess = class {
  _op;
  effect_instruction_i0 = void 0;
  effect_instruction_i1 = void 0;
  effect_instruction_i2 = void 0;
  trace = void 0;
  [EffectTypeId2] = effectVariance;
  constructor(_op) {
    this._op = _op;
    this._tag = _op;
  }
  [symbol2](that) {
    return exitIsExit(that) && that._op === "Success" && // @ts-expect-error
    equals(this.effect_instruction_i0, that.effect_instruction_i0);
  }
  [symbol]() {
    return pipe(
      // @ts-expect-error
      string(this._tag),
      // @ts-expect-error
      combine(hash(this.effect_instruction_i0)),
      cached(this)
    );
  }
  get value() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      value: toJSON(this.value)
    };
  }
  toString() {
    return format(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
};
var isEffect = (u) => hasProperty(u, EffectTypeId2);
var withFiberRuntime = (withRuntime) => {
  const effect = new EffectPrimitive(OP_WITH_RUNTIME);
  effect.effect_instruction_i0 = withRuntime;
  return effect;
};
var spanSymbol2 = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
var originalSymbol = /* @__PURE__ */ Symbol.for("effect/OriginalAnnotation");
var capture = (obj, span) => {
  if (isSome2(span)) {
    return new Proxy(obj, {
      has(target, p) {
        return p === spanSymbol2 || p === originalSymbol || p in target;
      },
      get(target, p) {
        if (p === spanSymbol2) {
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
var fail3 = (error) => isObject(error) && !(spanSymbol2 in error) ? withFiberRuntime((fiber) => failCause2(fail2(capture(error, currentSpanFromFiber(fiber))))) : failCause2(fail2(error));
var failCause2 = (cause) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.effect_instruction_i0 = cause;
  return effect;
};
var logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var RequestResolverSymbolKey = "effect/RequestResolver";
var RequestResolverTypeId = /* @__PURE__ */ Symbol.for(RequestResolverSymbolKey);
var requestResolverVariance = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
var RequestResolverImpl = class _RequestResolverImpl {
  runAll;
  target;
  [RequestResolverTypeId] = requestResolverVariance;
  constructor(runAll, target) {
    this.runAll = runAll;
    this.target = target;
  }
  [symbol]() {
    return cached(this, this.target ? hash(this.target) : random(this));
  }
  [symbol2](that) {
    return this.target ? isRequestResolver(that) && equals(this.target, that.target) : this === that;
  }
  identified(...ids) {
    return new _RequestResolverImpl(this.runAll, fromIterable2(ids));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var isRequestResolver = (u) => hasProperty(u, RequestResolverTypeId);
var YieldableError = /* @__PURE__ */ function() {
  class YieldableError2 extends globalThis.Error {
    commit() {
      return fail3(this);
    }
    toJSON() {
      return {
        ...this
      };
    }
    [NodeInspectSymbol]() {
      if (this.toString !== globalThis.Error.prototype.toString) {
        return this.stack ? `${this.toString()}
${this.stack.split("\n").slice(1).join("\n")}` : this.toString();
      } else if ("Bun" in globalThis) {
        return pretty(fail2(this), {
          renderErrorCause: true
        });
      }
      return this;
    }
  }
  Object.assign(YieldableError2.prototype, StructuralCommitPrototype);
  return YieldableError2;
}();
var makeException = (proto2, tag) => {
  class Base2 extends YieldableError {
    _tag = tag;
  }
  Object.assign(Base2.prototype, proto2);
  Base2.prototype.name = tag;
  return Base2;
};
var RuntimeExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/RuntimeException");
var RuntimeException = /* @__PURE__ */ makeException({
  [RuntimeExceptionTypeId]: RuntimeExceptionTypeId
}, "RuntimeException");
var InterruptedExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InterruptedException");
var InterruptedException = /* @__PURE__ */ makeException({
  [InterruptedExceptionTypeId]: InterruptedExceptionTypeId
}, "InterruptedException");
var IllegalArgumentExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/IllegalArgument");
var IllegalArgumentException = /* @__PURE__ */ makeException({
  [IllegalArgumentExceptionTypeId]: IllegalArgumentExceptionTypeId
}, "IllegalArgumentException");
var NoSuchElementExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/NoSuchElement");
var NoSuchElementException = /* @__PURE__ */ makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
var InvalidPubSubCapacityExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InvalidPubSubCapacityException");
var InvalidPubSubCapacityException = /* @__PURE__ */ makeException({
  [InvalidPubSubCapacityExceptionTypeId]: InvalidPubSubCapacityExceptionTypeId
}, "InvalidPubSubCapacityException");
var ExceededCapacityExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/ExceededCapacityException");
var ExceededCapacityException = /* @__PURE__ */ makeException({
  [ExceededCapacityExceptionTypeId]: ExceededCapacityExceptionTypeId
}, "ExceededCapacityException");
var TimeoutExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/Timeout");
var TimeoutException = /* @__PURE__ */ makeException({
  [TimeoutExceptionTypeId]: TimeoutExceptionTypeId
}, "TimeoutException");
var exitIsExit = (u) => isEffect(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure");
var currentSpanFromFiber = (fiber) => {
  const span = fiber.currentSpan;
  return span !== void 0 && span._tag === "Span" ? some2(span) : none2();
};

// node_modules/.pnpm/effect@3.11.9/node_modules/effect/dist/esm/Data.js
var Error2 = /* @__PURE__ */ function() {
  const plainArgsSymbol = /* @__PURE__ */ Symbol.for("effect/Data/Error/plainArgs");
  return class Base extends YieldableError {
    constructor(args2) {
      super(args2?.message, args2?.cause ? {
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
var TaggedError = (tag) => {
  class Base2 extends Error2 {
    _tag = tag;
  }
  ;
  Base2.prototype.name = tag;
  return Base2;
};

// node_modules/.pnpm/@effect-ak+tg-bot-client@file+..+tg-bot-client+effect-ak-tg-bot-client-0.2.2.tgz/node_modules/@effect-ak/tg-bot-client/dist/index.mjs
var defaultBaseUrl = "https://api.telegram.org";
var MESSAGE_EFFECTS = {
  "\u{1F525}": "5104841245755180586",
  "\u{1F44D}": "5107584321108051014",
  "\u{1F44E}": "5104858069142078462",
  "\u2764\uFE0F": "5159385139981059251",
  "\u{1F389}": "5046509860389126442",
  "\u{1F4A9}": "5046589136895476101"
};
var messageEffectIdCodes = Object.keys(MESSAGE_EFFECTS);
var makeTgBotClientConfig = (input) => TgBotClientConfig.of({
  ...input,
  ["base-url"]: input["base-url"] ?? defaultBaseUrl
});
var TgBotClientConfig = class extends Tag2("TgBotClientConfig")() {
};
var TgBotClientError = class _TgBotClientError extends TaggedError("TgBotClientError") {
  static missingSuccess = new _TgBotClientError({
    reason: {
      type: "ClientInternalError",
      cause: "Expected 'success' to be defined"
    }
  });
};
var isFileContent = (input) => typeof input == "object" && input != null && ("file_content" in input && input.file_content instanceof Uint8Array) && ("file_name" in input && typeof input.file_name == "string");
var isTgBotApiResponse = (input) => typeof input == "object" && input != null && ("ok" in input && typeof input.ok == "boolean");
var isTgBotClientSettingsInput = (input) => typeof input == "object" && input != null && ("bot-token" in input && typeof input["bot-token"] == "string");
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
var execute = (config, method, input) => gen(function* () {
  const httpResponse = yield* tryPromise({
    try: () => fetch(
      `${config["base-url"]}/bot${config["bot-token"]}/${snakeToCamel(method)}`,
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
    return yield* fail(new TgBotClientError({
      reason: { type: "UnexpectedResponse", response }
    }));
  }
  if (!httpResponse.ok) {
    return yield* fail(new TgBotClientError({
      reason: {
        type: "NotOkResponse",
        ...response.error_code ? { errorCode: response.error_code } : void 0,
        ...response.description ? { details: response.description } : void 0
      }
    }));
  }
  return response.result;
});
var ClientExecuteRequestService = class extends Tag2("ClientExecuteRequestService")() {
};
var ClientExecuteRequestServiceDefault = gen(function* () {
  const config = yield* service(TgBotClientConfig);
  return {
    execute: (method, input) => execute(config, method, input)
  };
});
var getFile = (fileId, config, execute2) => gen(function* () {
  const response = yield* execute2.execute("get_file", { file_id: fileId });
  const file_path = response.file_path;
  if (!file_path || file_path.length == 0) {
    return yield* fail(
      new TgBotClientError({
        reason: {
          type: "UnableToGetFile",
          cause: "File path not defined"
        }
      })
    );
  }
  const file_name = file_path.replaceAll("/", "-");
  const url = `${config["base-url"]}/file/bot${config["bot-token"]}/${file_path}`;
  const fileContent = yield* tryPromise({
    try: () => fetch(url).then((_) => _.arrayBuffer()),
    catch: (cause) => new TgBotClientError({
      reason: { type: "UnableToGetFile", cause }
    })
  });
  const file = new File([new Uint8Array(fileContent)], file_name);
  return file;
});
var ClientFileService = class extends Tag2("ClientFileService")() {
};
var ClientFileServiceDefault = gen(function* () {
  const config = yield* service(TgBotClientConfig);
  const execute2 = yield* service(ClientExecuteRequestService);
  return {
    getFile: (input) => getFile(input.file_id, config, execute2)
  };
}).pipe(
  provideServiceEffect(ClientExecuteRequestService, ClientExecuteRequestServiceDefault)
);
var makeSettingsFrom = (input) => {
  let limit = input.batch_size ?? 10;
  let timeout = input.timeout ?? 10;
  let max_empty_responses = input.max_empty_responses;
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
  return {
    limit,
    timeout,
    max_empty_responses
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
  return void 0;
};
var fetchUpdates = ({ state, settings, execute: execute2, handlers }) => gen(function* () {
  const updateId = state.lastUpdateId;
  console.info("getting updates", state);
  const updates = yield* execute2("get_updates", {
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
      console.warn("Handler for update not defined", update);
      hasError = true;
      break;
    }
    const handleResult = handler2(update);
    if ("chat" in update) {
      const response = yield* execute2(`send_${handleResult.type}`, {
        ...handleResult,
        chat_id: update.chat.id
      });
      console.log("bot response", response);
    }
    if (!handleResult) {
      hasError = true;
      console.log(handleResult);
      break;
    }
    ;
    lastSuccessId = updateObject.update_id;
  }
  if (hasError && lastSuccessId) {
    const resp = (
      //commit successfully handled messages
      yield* execute2("get_updates", {
        offset: lastSuccessId,
        limit: 0
      })
    );
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
      execute: input.execute,
      handlers: input.settings
    })
  ).pipe(
    repeat({
      while: ({ updates, lastSuccessId, hasError }) => {
        if (hasError) {
          console.warn("error in handler, quitting");
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
        ;
        if (lastSuccessId) {
          state.lastUpdateId = lastSuccessId + 1;
        }
        return true;
      }
    })
  );
};
var BotUpdatePollerService = class extends Tag2("BotUpdatePollerService")() {
};
var BotUpdatesPollerServiceDefault = gen(function* () {
  console.log("Initiating BotUpdatesPollerServiceDefault");
  const state = {
    fiber: void 0
  };
  const client = yield* service(ClientExecuteRequestService);
  const runBot = (messageHandler) => gen(function* () {
    console.log(state);
    const startFiber = pollAndHandle({
      settings: messageHandler,
      execute: client.execute
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
    console.log("Reading bot's updates.....", state.fiber == null);
    return state.fiber;
  });
  return {
    runBot
  };
}).pipe(
  provideServiceEffect(ClientExecuteRequestService, ClientExecuteRequestServiceDefault)
);
var makeClientConfigFrom = (input) => gen(function* () {
  if (input.type == "config") {
    return makeTgBotClientConfig(input);
  }
  const config = yield* tryPromise({
    try: async () => {
      const { readFileSync } = await import("fs");
      return JSON.parse(await readFileSync("config.json", "utf-8"));
    },
    catch: (error) => {
      console.warn(error);
      return "ReadingConfigError";
    }
  });
  if (!isTgBotClientSettingsInput(config)) {
    return yield* fail("InvalidConfig");
  }
  return makeTgBotClientConfig(config);
});
var makeBot = (messageHandler) => gen(function* () {
  const { runBot } = yield* service(BotUpdatePollerService);
  return {
    fiber: yield* runBot(messageHandler),
    runBot
  };
}).pipe(
  tapError((error) => {
    console.error(error);
    return void_;
  })
);
var BotFactoryService = class extends Tag2("BotFactoryService")() {
};
var BotFactoryServiceDefault = {
  makeBot,
  runBot: (input) => gen(function* () {
    console.log("client");
    const client = yield* makeClientConfigFrom(input);
    const poller = yield* BotUpdatesPollerServiceDefault.pipe(
      provideService(TgBotClientConfig, client)
    );
    const bot = yield* makeBot(input).pipe(
      provideService(BotUpdatePollerService, poller)
    );
    const reload = (input2) => bot.runBot(input2).pipe(runPromise);
    return {
      reload
    };
  })
};
var runTgChatBot = (input) => BotFactoryServiceDefault.runBot(input).pipe(runPromise);

// src/tg-bot-playground/types.ts
var isRunBot = (input) => typeof input == "object" && input != null && "command" in input && "token" in input && "code" in input;

// src/tg-bot-playground/worker/utils.ts
var parseJson = (input) => {
  try {
    return { parsed: JSON.parse(input) };
  } catch {
    return void 0;
  }
};
var deserialize = (input) => {
  const result = [];
  const fields = parseJson(input);
  if (typeof fields?.parsed != "object") return;
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

// src/tg-bot-playground/worker/handler.ts
var makeWorkerHandler = (notifyParent) => {
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
        "bot-token": command.token,
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

// src/tg-bot-playground/worker/web-worker.ts
var handler = makeWorkerHandler(
  (_) => self.postMessage(_)
);
self.onmessage = (msg) => handler(msg.data);
