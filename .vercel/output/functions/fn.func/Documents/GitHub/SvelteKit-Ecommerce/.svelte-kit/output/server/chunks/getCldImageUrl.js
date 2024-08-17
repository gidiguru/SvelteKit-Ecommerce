import { S as SVELTE_CLOUDINARY_ANALYTICS_ID, a as SVELTE_CLOUDINARY_VERSION, b as SVELTE_VERSION } from "./analytics.js";
function isObject(a) {
  if (typeof a !== "object" || a instanceof Array) {
    return false;
  } else {
    return true;
  }
}
class Config {
  filterOutNonSupportedKeys(userProvidedConfig, validKeys) {
    const obj = /* @__PURE__ */ Object.create({});
    if (isObject(userProvidedConfig)) {
      Object.keys(userProvidedConfig).forEach((key) => {
        if (validKeys.indexOf(key) >= 0) {
          obj[key] = userProvidedConfig[key];
        } else {
          console.warn("Warning - unsupported key provided to configuration: ", key);
        }
      });
      return obj;
    } else {
      return /* @__PURE__ */ Object.create({});
    }
  }
}
const ALLOWED_URL_CONFIG = [
  "cname",
  "secureDistribution",
  "privateCdn",
  "signUrl",
  "longUrlSignature",
  "shorten",
  "useRootPath",
  "secure",
  "forceVersion",
  "analytics",
  "queryParams"
];
class URLConfig extends Config {
  /**
   * @param {IURLConfig} userURLConfig
   */
  constructor(userURLConfig) {
    super();
    const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
    Object.assign(this, {
      secure: true
    }, urlConfig);
  }
  extend(userURLConfig) {
    const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
    return new URLConfig(Object.assign({}, this, urlConfig));
  }
  /**
   * @param {string} value Sets the cname
   */
  setCname(value) {
    this.cname = value;
    return this;
  }
  /**
   * @param {string} value Sets the secureDistribution
   */
  setSecureDistribution(value) {
    this.secureDistribution = value;
    return this;
  }
  /**
   * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
   */
  setPrivateCdn(value) {
    this.privateCdn = value;
    return this;
  }
  /**
   * @param value Sets whether or not to sign the URL
   */
  setSignUrl(value) {
    this.signUrl = value;
    return this;
  }
  /**
   * @param value Sets whether or not to use a long signature
   */
  setLongUrlSignature(value) {
    this.longUrlSignature = value;
    return this;
  }
  /**
   * @param value Sets whether or not to shorten the URL
   */
  setShorten(value) {
    this.shorten = value;
    return this;
  }
  /**
   * @param value Sets whether or not to use a root path
   */
  setUseRootPath(value) {
    this.useRootPath = value;
    return this;
  }
  /**
   * @param value Sets whether or not to deliver the asset through https
   */
  setSecure(value) {
    this.secure = value;
    return this;
  }
  /**
   * @param value Sets whether to force a version in the URL
   */
  setForceVersion(value) {
    this.forceVersion = value;
    return this;
  }
  /**
   * @param params Sets additional params
   */
  setQueryParams(params) {
    this.queryParams = params;
    return this;
  }
}
class QualifierValue {
  /**
   *
   * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
   */
  constructor(qualifierValue) {
    this.values = [];
    this.delimiter = ":";
    if (this.hasValue(qualifierValue)) {
      this.addValue(qualifierValue);
    }
  }
  /**
   * @description Joins the provided values with the provided delimiter
   */
  toString() {
    return this.values.join(this.delimiter);
  }
  /**
   * @description Checks if the provided argument has a value
   * @param {any} v
   * @private
   * @return {boolean}
   */
  hasValue(v) {
    return typeof v !== "undefined" && v !== null && v !== "";
  }
  /**
   * @desc Adds a value for the this qualifier instance
   * @param {any} value
   * @return {this}
   */
  addValue(value) {
    if (Array.isArray(value)) {
      this.values = this.values.concat(value);
    } else {
      this.values.push(value);
    }
    this.values = this.values.filter((v) => this.hasValue(v));
    return this;
  }
  /**
   * @description Sets the delimiter for this instance
   * @param delimiter
   */
  setDelimiter(delimiter) {
    this.delimiter = delimiter;
    return this;
  }
}
class UnsupportedError extends Error {
  constructor(message = "Unsupported") {
    super(message);
  }
}
function createUnsupportedError(message) {
  return new UnsupportedError(message);
}
function qualifierToJson() {
  return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
}
class QualifierModel {
  constructor() {
    this._qualifierModel = {};
  }
  toJson() {
    return qualifierToJson.apply(this);
  }
}
class Qualifier extends QualifierModel {
  constructor(key, qualifierValue) {
    super();
    this.delimiter = "_";
    this.key = key;
    if (qualifierValue instanceof QualifierValue) {
      this.qualifierValue = qualifierValue;
    } else {
      this.qualifierValue = new QualifierValue();
      this.qualifierValue.addValue(qualifierValue);
    }
  }
  toString() {
    const { key, delimiter, qualifierValue } = this;
    return `${key}${delimiter}${qualifierValue.toString()}`;
  }
  addValue(value) {
    this.qualifierValue.addValue(value);
    return this;
  }
}
class FlagQualifier extends Qualifier {
  constructor(flagType, flagValue) {
    let qualifierValue;
    if (flagValue) {
      qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(":");
    } else {
      qualifierValue = flagType;
    }
    super("fl", qualifierValue);
    this.flagValue = flagValue;
  }
  toString() {
    return super.toString().replace(/\./, "%2E");
  }
  getFlagValue() {
    return this.flagValue;
  }
}
function mapToSortedArray(map, flags2) {
  const array = Array.from(map.entries());
  flags2.forEach((flag) => {
    array.push(["fl", flag]);
  });
  return array.sort().map((v) => v[1]);
}
function actionToJson() {
  var _a, _b, _c;
  const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
  const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
  if (sourceTransformationError && sourceTransformationError instanceof Error) {
    return { error: sourceTransformationError };
  }
  if (actionModelIsNotEmpty) {
    return this._actionModel;
  }
  return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}
class ActionModel {
  constructor() {
    this._actionModel = {};
  }
  toJson() {
    return actionToJson.apply(this);
  }
}
class Action extends ActionModel {
  constructor() {
    super(...arguments);
    this.qualifiers = /* @__PURE__ */ new Map();
    this.flags = [];
    this.delimiter = ",";
    this.actionTag = "";
  }
  prepareQualifiers() {
  }
  /**
   * @description Returns the custom name tag that was given to this action
   * @return {string}
   */
  getActionTag() {
    return this.actionTag;
  }
  /**
   * @description Sets the custom name tag for this action
   * @return {this}
   */
  setActionTag(tag) {
    this.actionTag = tag;
    return this;
  }
  /**
   * @description Calls toString() on all child qualifiers (implicitly by using .join()).
   * @return {string}
   */
  toString() {
    this.prepareQualifiers();
    return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
  }
  /**
   * @description Adds the parameter to the action.
   * @param {SDK.Qualifier} qualifier
   * @return {this}
   */
  addQualifier(qualifier) {
    if (typeof qualifier === "string") {
      const [key, value] = qualifier.toLowerCase().split("_");
      if (key === "fl") {
        this.flags.push(new FlagQualifier(value));
      } else {
        this.qualifiers.set(key, new Qualifier(key, value));
      }
    } else {
      this.qualifiers.set(qualifier.key, qualifier);
    }
    return this;
  }
  /**
   * @description Adds a flag to the current action.
   * @param {Qualifiers.Flag} flag
   * @return {this}
   */
  addFlag(flag) {
    if (typeof flag === "string") {
      this.flags.push(new FlagQualifier(flag));
    } else {
      if (flag instanceof FlagQualifier) {
        this.flags.push(flag);
      }
    }
    return this;
  }
  addValueToQualifier(qualifierKey, qualifierValue) {
    this.qualifiers.get(qualifierKey).addValue(qualifierValue);
    return this;
  }
}
class BackgroundColor extends Action {
  constructor(color) {
    super();
    this.addQualifier(new Qualifier("b", new QualifierValue(color).setDelimiter("_")));
  }
}
function prepareColor(color) {
  if (color) {
    return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
  } else {
    return color;
  }
}
class RawAction {
  constructor(raw) {
    this.raw = raw;
  }
  toString() {
    return this.raw;
  }
  toJson() {
    return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
  }
}
function isErrorObject(obj) {
  const errorObj = obj;
  return "error" in errorObj && !!errorObj.error;
}
function lossy() {
  return new FlagQualifier("lossy");
}
function preserveTransparency() {
  return new FlagQualifier("preserve_transparency");
}
function progressive(mode) {
  return new FlagQualifier("progressive", mode);
}
class FormatQualifier extends QualifierValue {
  constructor(val) {
    super(val);
    this.val = val;
  }
  getValue() {
    return this.val;
  }
}
function objectFlip(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[obj[key]] = key;
  });
  return result;
}
const ACTION_TYPE_TO_CROP_MODE_MAP = {
  limitFit: "limit",
  limitFill: "lfill",
  minimumFit: "mfit",
  thumbnail: "thumb",
  limitPad: "lpad",
  minimumPad: "mpad"
};
const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
  colorSpace: "cs",
  dpr: "dpr",
  density: "dn",
  defaultImage: "d",
  format: "f",
  quality: "q"
};
const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
  redEye: "redeye",
  advancedRedEye: "adv_redeye",
  oilPaint: "oil_paint",
  unsharpMask: "unsharp_mask",
  makeTransparent: "make_transparent",
  generativeRestore: "gen_restore",
  upscale: "upscale"
};
const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
  autoBest: "auto:best",
  autoEco: "auto:eco",
  autoGood: "auto:good",
  autoLow: "auto:low",
  jpegminiHigh: "jpegmini:1",
  jpegminiMedium: "jpegmini:2",
  jpegminiBest: "jpegmini:0"
};
const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
  fullHd: "full_hd",
  fullHdWifi: "full_hd_wifi",
  fullHdLean: "full_hd_lean",
  hdLean: "hd_lean"
};
const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
  444: "CHROMA_444",
  420: "CHROMA_420"
};
const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
  "noCmyk": "no_cmyk",
  "keepCmyk": "keep_cmyk",
  "tinySrgb": "tinysrgb",
  "srgbTrueColor": "srgb:truecolor"
};
objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);
class DeliveryAction extends Action {
  /**
   * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
   * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
   * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
   * @see Visit {@link Actions.Delivery|Delivery} for an example
   */
  constructor(deliveryKey, deliveryType, modelProperty) {
    super();
    this._actionModel = {};
    let deliveryTypeValue;
    if (deliveryType instanceof FormatQualifier) {
      deliveryTypeValue = deliveryType.getValue();
    } else {
      deliveryTypeValue = deliveryType;
    }
    this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
    this._actionModel[modelProperty] = deliveryTypeValue;
    this.addQualifier(new Qualifier(deliveryKey, deliveryType));
  }
}
class ProgressiveQualifier extends FlagQualifier {
  constructor(mode) {
    super("progressive", mode);
  }
}
class DeliveryFormatAction extends DeliveryAction {
  constructor(deliveryKey, deliveryType) {
    super(deliveryKey, deliveryType, "formatType");
  }
  /**
   * @description Uses lossy compression when delivering animated GIF files.
   * @return {this}
   */
  lossy() {
    this._actionModel.lossy = true;
    this.addFlag(lossy());
    return this;
  }
  /**
   * @description Uses progressive compression when delivering JPG file format.
   * @return {this}
   */
  progressive(mode) {
    if (mode instanceof ProgressiveQualifier) {
      this._actionModel.progressive = { mode: mode.getFlagValue() };
      this.addFlag(mode);
    } else {
      this._actionModel.progressive = { mode };
      this.addFlag(progressive(mode));
    }
    return this;
  }
  /**
   * @description Ensures that images with a transparency channel are delivered in PNG format.
   */
  preserveTransparency() {
    this._actionModel.preserveTransparency = true;
    this.addFlag(preserveTransparency());
    return this;
  }
  static fromJson(actionModel) {
    const { formatType, lossy: lossy2, progressive: progressive2, preserveTransparency: preserveTransparency2 } = actionModel;
    let result;
    if (formatType) {
      result = new this("f", formatType);
    } else {
      result = new this("f");
    }
    if (progressive2) {
      if (progressive2.mode) {
        result.progressive(progressive2.mode);
      } else {
        result.progressive();
      }
    }
    lossy2 && result.lossy();
    preserveTransparency2 && result.preserveTransparency();
    return result;
  }
}
class Transformation {
  constructor() {
    this.actions = [];
  }
  /**
   * @param {SDK.Action | string} action
   * @return {this}
   */
  addAction(action) {
    let actionToAdd;
    if (typeof action === "string") {
      if (action.indexOf("/") >= 0) {
        throw "addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead";
      } else {
        actionToAdd = new RawAction(action);
      }
    } else {
      actionToAdd = action;
    }
    this.actions.push(actionToAdd);
    return this;
  }
  /**
   * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
   * @param {string | SDK.Transformation} tx
   * @example
   * import {Transformation} from "@cloudinary/url-gen";
   *
   * const transformation = new Transformation();
   * transformation.addTransformation('w_100/w_200/w_300');
   * @return {this}
   */
  addTransformation(tx) {
    if (tx instanceof Transformation) {
      this.actions = this.actions.concat(tx.actions);
    } else {
      this.actions.push(new RawAction(tx));
    }
    return this;
  }
  /**
   * @return {string}
   */
  toString() {
    return this.actions.map((action) => {
      return action.toString();
    }).filter((a) => a).join("/");
  }
  /**
   * @description Delivers an animated GIF.
   * @param {AnimatedAction} animatedAction
   * @return {this}
   */
  animated(animatedAction) {
    return this.addAction(animatedAction);
  }
  /**
   * @description Adds a border around the image.
   * @param {Border} borderAction
   * @return {this}
   */
  border(borderAction) {
    return this.addAction(borderAction);
  }
  /**
   * @description Adjusts the shape of the delivered image. </br>
   * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
   * @param {IReshape} reshapeAction
   * @return {this}
   */
  reshape(reshapeAction) {
    return this.addAction(reshapeAction);
  }
  /**
   * @description Resize the asset using provided resize action
   * @param {ResizeSimpleAction} resizeAction
   * @return {this}
   */
  resize(resizeAction) {
    return this.addAction(resizeAction);
  }
  /**
   * @desc An alias to Action Delivery.quality
   * @param {string|number} quality
   * @return {this}
   */
  quality(quality) {
    this.addAction(new DeliveryFormatAction("q", quality));
    return this;
  }
  /**
   * @desc An alias to Action Delivery.format
   * @param {string} format
   * @return {this}
   */
  format(format) {
    this.addAction(new DeliveryFormatAction("f", format));
    return this;
  }
  /**
   * @description Rounds the specified corners of an image.
   * @param roundCornersAction
   * @return {this}
   */
  roundCorners(roundCornersAction) {
    return this.addAction(roundCornersAction);
  }
  /**
   * @description Adds an overlay over the base image.
   * @param {LayerAction} overlayAction
   * @return {this}
   */
  overlay(overlayAction) {
    return this.addAction(overlayAction);
  }
  /**
   * @description Adds an underlay under the base image.
   * @param {LayerAction} underlayAction
   * @return {this}
   */
  underlay(underlayAction) {
    underlayAction.setLayerType("u");
    return this.addAction(underlayAction);
  }
  /**
   * @description Defines an new user variable.
   * @param {VariableAction} variableAction
   * @return {this}
   */
  addVariable(variableAction) {
    return this.addAction(variableAction);
  }
  /**
   * @description Specifies a condition to be met before applying a transformation.
   * @param {ConditionalAction} conditionAction
   * @return {this}
   */
  conditional(conditionAction) {
    return this.addAction(conditionAction);
  }
  /**
   * @description Applies a filter or an effect on an asset.
   * @param {SimpleEffectAction} effectAction
   * @return {this}
   */
  effect(effectAction) {
    return this.addAction(effectAction);
  }
  /**
   * @description Applies adjustment effect on an asset.
   * @param action
   * @return {this}
   */
  adjust(action) {
    return this.addAction(action);
  }
  /**
   * @description Rotates the asset by the given angle.
   * @param {RotateAction} rotateAction
   * @return {this}
   */
  rotate(rotateAction) {
    return this.addAction(rotateAction);
  }
  /**
   * @description Applies a pre-defined named transformation of the given name.
   * @param {NamedTransformation} namedTransformation
   * @return {this}
   */
  namedTransformation(namedTransformation) {
    return this.addAction(namedTransformation);
  }
  /**
   * @description Applies delivery action.
   * @param deliveryAction
   * @return {this}
   */
  delivery(deliveryAction) {
    return this.addAction(deliveryAction);
  }
  /**
   * @description Sets the color of the background.
   * @param {Qualifiers.Color} color
   * @return {this}
   */
  backgroundColor(color) {
    return this.addAction(new BackgroundColor(prepareColor(color)));
  }
  /**
   * @description Adds a layer in a Photoshop document.
   * @param action
   * @return {this}
   */
  psdTools(action) {
    return this.addAction(action);
  }
  /**
   * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
   * @param action
   * @return {this}
   */
  extract(action) {
    return this.addAction(action);
  }
  /**
   * @description Adds a flag as a separate action.
   * @param {Qualifiers.Flag | string} flagQualifier
   * @return {this}
   */
  addFlag(flagQualifier) {
    const action = new Action();
    let flagToAdd = flagQualifier;
    if (typeof flagQualifier === "string") {
      flagToAdd = new FlagQualifier(flagQualifier);
    }
    action.addQualifier(flagToAdd);
    return this.addAction(action);
  }
  /**
   * @description Inject a custom function into the image transformation pipeline.
   * @return {this}
   */
  customFunction(customFunction) {
    return this.addAction(customFunction);
  }
  /**
   * Transcodes the video (or audio) to another format.
   * @param {Action} action
   * @return {this}
   */
  transcode(action) {
    return this.addAction(action);
  }
  /**
   * Applies the specified video edit action.
   *
   * @param {videoEditType} action
   * @return {this}
   */
  videoEdit(action) {
    return this.addAction(action);
  }
  toJson() {
    const actions = [];
    for (const action of this.actions) {
      const json = action.toJson();
      if (isErrorObject(json)) {
        return json;
      }
      actions.push(json);
    }
    return { actions };
  }
}
class ImageTransformation extends Transformation {
}
class VideoTransformation extends Transformation {
}
function isUrl(publicID) {
  return publicID.match(/^https?:\//);
}
function isFileName(publicID) {
  return publicID.indexOf("/") < 0;
}
function publicIDContainsVersion(publicID) {
  return publicID.match(/^v[0-9]+/);
}
function getUrlPrefix(cloudName, urlConfig) {
  const secure = urlConfig.secure;
  const privateCDN = urlConfig.privateCdn;
  const cname = urlConfig.cname;
  const secureDistribution = urlConfig.secureDistribution;
  if (!secure && !cname) {
    return `http://res.cloudinary.com/${cloudName}`;
  }
  if (secure && !secureDistribution && privateCDN) {
    return `https://${cloudName}-res.cloudinary.com`;
  }
  if (secure && !secureDistribution) {
    return `https://res.cloudinary.com/${cloudName}`;
  }
  if (secure && secureDistribution && privateCDN) {
    return `https://${secureDistribution}`;
  }
  if (secure && secureDistribution) {
    return `https://${secureDistribution}/${cloudName}`;
  }
  if (!secure && cname) {
    return `http://${cname}/${cloudName}`;
  } else {
    return "ERROR";
  }
}
function handleAssetType(assetType) {
  if (!assetType) {
    return "image";
  }
  return assetType;
}
function handleDeliveryType(deliveryType) {
  if (!deliveryType) {
    return "upload";
  }
  return deliveryType;
}
function getUrlVersion(publicID, version, forceVersion) {
  const shouldForceVersion = forceVersion !== false;
  if (version) {
    return `v${version}`;
  }
  if (publicIDContainsVersion(publicID) || isUrl(publicID) || isFileName(publicID)) {
    return "";
  }
  return shouldForceVersion ? "v1" : "";
}
function stringPad(value, _targetLength, _padString) {
  let targetLength = _targetLength >> 0;
  let padString = String(typeof _padString !== "undefined" ? _padString : " ");
  if (value.length > targetLength) {
    return String(value);
  } else {
    targetLength = targetLength - value.length;
    if (targetLength > padString.length) {
      padString += repeatStringNumTimes(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(value);
  }
}
function repeatStringNumTimes(string, _times) {
  let times = _times;
  let repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64Map = {};
let num = 0;
chars.split("").forEach((char) => {
  let key = num.toString(2);
  key = stringPad(key, 6, "0");
  base64Map[key] = char;
  num++;
});
function reverseVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").reverse().join(".");
}
function padVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").map((segment) => {
    const asNumber = +segment;
    if (isNaN(asNumber) || asNumber < 0) {
      throw "Invalid version number provided";
    }
    return stringPad(segment, 2, "0");
  }).join(".");
}
function encodeVersion(semVer) {
  let strResult = "";
  const parts = semVer.split(".").length;
  const paddedStringLength = parts * 6;
  const reversedSemver = reverseVersion(semVer);
  const paddedSemver = padVersion(reversedSemver);
  const num2 = parseInt(paddedSemver.split(".").join(""));
  let paddedBinary = num2.toString(2);
  paddedBinary = stringPad(paddedBinary, paddedStringLength, "0");
  if (paddedBinary.length % 6 !== 0) {
    throw "Version must be smaller than 43.21.26)";
  }
  paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
    strResult += base64Map[bitString];
  });
  return strResult;
}
function getAnalyticsOptions(options) {
  const analyticsOptions = {
    sdkSemver: options.sdkSemver,
    techVersion: options.techVersion,
    sdkCode: options.sdkCode,
    product: options.product,
    feature: "0",
    osType: options.osType,
    osVersion: options.osVersion
  };
  if (options.accessibility) {
    analyticsOptions.feature = "D";
  }
  if (options.lazyload) {
    analyticsOptions.feature = "C";
  }
  if (options.responsive) {
    analyticsOptions.feature = "A";
  }
  if (options.placeholder) {
    analyticsOptions.feature = "B";
  }
  return analyticsOptions;
}
const packageVersion = "1.16.0";
function encodeOSVersion(semVer) {
  const [major, minor] = semVer.split(".");
  const binaryMajorVersion = parseInt(major).toString(2);
  const binaryMinorVersion = parseInt(minor).toString(2);
  const paddedMajor = binaryMajorVersion.padStart(6, "0");
  const paddedMinor = binaryMinorVersion.padStart(6, "0");
  return base64Map[paddedMajor] + base64Map[paddedMinor];
}
function getNodeVersion() {
  const failedVersion = "0.0.0";
  if (typeof window !== "undefined") {
    return failedVersion;
  } else {
    try {
      return process.versions.node || failedVersion;
    } catch (e) {
      return failedVersion;
    }
  }
}
function ensureShapeOfTrackedProperties(trackedAnalytics) {
  const defaults = {
    techVersion: getNodeVersion(),
    sdkCode: "T",
    sdkSemver: packageVersion.split("-")[0],
    product: "A",
    osType: "Z",
    osVersion: "0.0",
    responsive: false,
    placeholder: false,
    lazyload: false,
    accessibility: false
  };
  if (!trackedAnalytics) {
    return defaults;
  } else {
    return Object.assign(Object.assign({}, defaults), trackedAnalytics);
  }
}
function getSDKAnalyticsSignature(_trackedAnalytics) {
  const trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
  const analyticsOptions = getAnalyticsOptions(trackedAnalytics);
  try {
    const twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
    const encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
    const encodedTechVersion = encodeVersion(twoPartVersion);
    const encodedOSVersion = encodeOSVersion(analyticsOptions.osVersion);
    const featureCode = analyticsOptions.feature;
    const SDKCode = analyticsOptions.sdkCode;
    const { product, osType } = analyticsOptions;
    const algoVersion = "D";
    return `${algoVersion}${product}${SDKCode}${encodedSDKVersion}${encodedTechVersion}${osType}${encodedOSVersion}${featureCode}`;
  } catch (e) {
    return "E";
  }
}
function removePatchFromSemver(semVerStr) {
  const parts = semVerStr.split(".");
  return `${parts[0]}.${parts[1]}`;
}
const SEO_TYPES = {
  "image/upload": "images",
  "image/private": "private_images",
  "image/authenticated": "authenticated_images",
  "raw/upload": "files",
  "video/upload": "videos"
};
class CloudinaryFile {
  constructor(publicID, cloudConfig = {}, urlConfig) {
    this.setPublicID(publicID);
    this.setCloudConfig(cloudConfig);
    this.setURLConfig(urlConfig);
  }
  /**
   * @description Sets the URL Config for this asset
   * @param urlConfig
   * @return {this}
   */
  setURLConfig(urlConfig) {
    this.urlConfig = new URLConfig(urlConfig);
    return this;
  }
  /**
   * @description Sets the Cloud Config for this asset
   * @param urlConfig
   * @return {this}
   */
  setCloudConfig(cloudConfig) {
    this.cloudName = cloudConfig.cloudName;
    this.apiKey = cloudConfig.apiKey;
    this.apiSecret = cloudConfig.apiSecret;
    this.authToken = cloudConfig.authToken;
    return this;
  }
  /**
   * @description Sets the public ID of the asset.
   * @param {string} publicID The public ID of the asset.
   * @return {this}
   */
  setPublicID(publicID) {
    this.publicID = publicID ? publicID.toString() : "";
    return this;
  }
  /**
   * @description Sets the delivery type of the asset.
   * @param {DELIVERY_TYPE | string} newType The type of the asset.
   * @return {this}
   */
  setDeliveryType(newType) {
    this.deliveryType = newType;
    return this;
  }
  /**
   * @description Sets the URL SEO suffix of the asset.
   * @param {string} newSuffix The SEO suffix.
   * @return {this}
   */
  setSuffix(newSuffix) {
    this.suffix = newSuffix;
    return this;
  }
  /**
   * @description Sets the signature of the asset.
   * @param {string} signature The signature.
   * @return {this}
   */
  setSignature(signature) {
    this.signature = signature;
    return this;
  }
  /**
   * @description Sets the version of the asset.
   * @param {string} newVersion The version of the asset.
   * @return {this}
   */
  setVersion(newVersion) {
    if (newVersion) {
      this.version = newVersion;
    }
    return this;
  }
  /**
   * @description Sets the asset type.
   * @param {string} newType The type of the asset.
   * @return {this}
   */
  setAssetType(newType) {
    if (newType) {
      this.assetType = newType;
    }
    return this;
  }
  sign() {
    return this;
  }
  /**
   * @description Serializes to URL string
   * @param overwriteOptions
   */
  toURL(overwriteOptions = {}) {
    return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
  }
  /**
   * @description Validate various options before attempting to create a URL
   * The function will throw in case a violation
   * @throws Validation errors
   */
  validateAssetForURLCreation() {
    if (typeof this.cloudName === "undefined") {
      throw "You must supply a cloudName when initializing the asset";
    }
    const suffixContainsDot = this.suffix && this.suffix.indexOf(".") >= 0;
    const suffixContainsSlash = this.suffix && this.suffix.indexOf("/") >= 0;
    if (suffixContainsDot || suffixContainsSlash) {
      throw "`suffix`` should not include . or /";
    }
  }
  /**
   * @description return an SEO friendly name for a combination of asset/delivery, some examples:
   * * image/upload -> images
   * * video/upload -> videos
   * If no match is found, return `{asset}/{delivery}`
   */
  getResourceType() {
    const assetType = handleAssetType(this.assetType);
    const deliveryType = handleDeliveryType(this.deliveryType);
    const hasSuffix = !!this.suffix;
    const regularSEOType = `${assetType}/${deliveryType}`;
    const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
    const useRootPath = this.urlConfig.useRootPath;
    const shorten = this.urlConfig.shorten;
    if (useRootPath) {
      if (regularSEOType === "image/upload") {
        return "";
      } else {
        throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
      }
    }
    if (shorten && regularSEOType === "image/upload") {
      return "iu";
    }
    if (hasSuffix) {
      if (shortSEOType) {
        return shortSEOType;
      } else {
        throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(", ")}, Provided: ${regularSEOType} instead`);
      }
    }
    return regularSEOType;
  }
  getSignature() {
    if (this.signature) {
      return `s--${this.signature}--`;
    } else {
      return "";
    }
  }
  /**
   *
   * @description Creates a fully qualified CloudinaryURL
   * @return {string} CloudinaryURL
   * @throws Validation Errors
   */
  createCloudinaryURL(transformation, trackedAnalytics) {
    if (!this.publicID) {
      return "";
    }
    this.validateAssetForURLCreation();
    const prefix = getUrlPrefix(this.cloudName, this.urlConfig);
    const transformationString = transformation ? transformation.toString() : "";
    const version = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
    const publicID = this.publicID;
    if (typeof transformation === "string") {
      const url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version, publicID.replace(/,/g, "%2C"), this.suffix].filter((a) => a).join("/");
      return url;
    } else {
      const safeURL = [
        encodeURI(prefix),
        this.getResourceType(),
        this.getSignature(),
        encodeURI(transformationString),
        version,
        encodeURI(publicID).replace(/,/g, "%2C"),
        this.suffix && encodeURI(this.suffix)
      ].filter((a) => a).join("/").replace(/\?/g, "%3F").replace(/=/g, "%3D");
      const shouldAddAnalytics = this.urlConfig.analytics !== false && !publicID.includes("?");
      let queryParamsString = "";
      if (typeof this.urlConfig.queryParams === "object") {
        try {
          const queryParams = new URLSearchParams(this.urlConfig.queryParams);
          if (shouldAddAnalytics) {
            queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
          }
          queryParamsString = queryParams.toString();
        } catch (err) {
          console.error("Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string");
        }
      } else {
        queryParamsString = this.urlConfig.queryParams || "";
        if (shouldAddAnalytics) {
          queryParamsString += `${queryParamsString.length > 0 ? "&" : ""}_a=${getSDKAnalyticsSignature(trackedAnalytics)}`;
        }
      }
      if (queryParamsString) {
        return `${safeURL}?${queryParamsString}`;
      } else {
        return safeURL;
      }
    }
  }
}
class CloudinaryTransformable extends CloudinaryFile {
  constructor(publicID, cloudConfig, urlConfig, transformation) {
    super(publicID, cloudConfig, urlConfig);
    this.transformation = transformation;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Animated} animated
   * @return {this}
   */
  animated(animated) {
    this.transformation.animated(animated);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Border} border
   * @return {this}
   */
  border(border) {
    this.transformation.border(border);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Reshape} reshape
   * @return {this}
   */
  reshape(reshape) {
    this.transformation.reshape(reshape);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Resize} resize
   * @return {this}
   */
  resize(resize) {
    this.transformation.resize(resize);
    return this;
  }
  /**
   * @desc An alias to Action Delivery.quality
   * @param {string|number} quality
   * @return {this}
   */
  quality(quality) {
    this.addAction(new DeliveryFormatAction("q", quality));
    return this;
  }
  /**
   * @desc An alias to Action Delivery.format
   * @param {string} format
   * @return {this}
   */
  format(format) {
    this.addAction(new DeliveryFormatAction("f", format));
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.RoundCorners} roundCorners
   * @return {this}
   */
  roundCorners(roundCorners) {
    this.transformation.roundCorners(roundCorners);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  overlay(overlayAction) {
    this.transformation.overlay(overlayAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Variable} variableAction
   * @return {this}
   */
  addVariable(variableAction) {
    this.transformation.addVariable(variableAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Condition} conditionalAction
   * @return {this}
   */
  conditional(conditionalAction) {
    this.transformation.conditional(conditionalAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Effect} effect
   * @return {this}
   */
  effect(effect) {
    this.transformation.effect(effect);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Adjust} action
   * @return {this}
   */
  adjust(action) {
    this.transformation.adjust(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Rotate} rotate
   * @return {this}
   */
  rotate(rotate) {
    this.transformation.rotate(rotate);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.NamedTransformation} namedTransformation
   * @return {this}
   */
  namedTransformation(namedTransformation) {
    this.transformation.namedTransformation(namedTransformation);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Delivery} deliveryAction
   * @return {this}
   */
  delivery(deliveryAction) {
    this.transformation.delivery(deliveryAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Qualifiers.color} color
   * @return {this}
   */
  backgroundColor(color) {
    this.transformation.backgroundColor(color);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.PSDTools} action
   * @return {this}
   */
  psdTools(action) {
    this.transformation.psdTools(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Extract} action
   * @return {this}
   */
  extract(action) {
    this.transformation.extract(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Qualifiers.Flag | string} flagQualifier
   * @return {this}
   */
  addFlag(flagQualifier) {
    this.transformation.addFlag(flagQualifier);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.CustomFunction} customFunction
   * @return {this}
   */
  customFunction(customFunction) {
    this.transformation.customFunction(customFunction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {SDK.Action | string} action
   * @return {this}
   */
  addAction(action) {
    this.transformation.addAction(action);
    return this;
  }
  /**
   * @description Extend your transformation with another transformation
   * @param { string | SDK.Transformation } tx
   */
  addTransformation(tx) {
    this.transformation.addTransformation(tx);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {string}
   */
  toString() {
    return this.transformation.toString();
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  underlay(underlayAction) {
    this.transformation.underlay(underlayAction);
    return this;
  }
  toURL(overwriteOptions = {}) {
    return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === void 0 ? void 0 : overwriteOptions.trackedAnalytics);
  }
}
class CloudinaryImage extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new ImageTransformation());
  }
}
class CloudinaryVideo extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new VideoTransformation());
    this.assetType = "video";
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Transcode} action
   * @return {this}
   */
  transcode(action) {
    this.transformation.transcode(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.VideoEdit} action
   * @return {this}
   */
  videoEdit(action) {
    this.transformation.videoEdit(action);
    return this;
  }
}
class Cloudinary {
  constructor(cloudinaryConfig) {
    if (cloudinaryConfig) {
      this.cloudinaryConfig = cloudinaryConfig;
    }
  }
  image(publicID) {
    return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
  }
  video(publicID) {
    return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
  }
  setConfig(cloudinaryConfig) {
    this.cloudinaryConfig = cloudinaryConfig;
    return this;
  }
  getConfig() {
    return this.cloudinaryConfig;
  }
  extendConfig() {
  }
}
var REGEX_VERSION = /\/v\d+\//;
var REGEX_FORMAT = /\.(ai|avif|gif|png|webp|bmp|bw|djvu|dng|ps|ept|eps|eps3|fbx|flif|gif|glb|gltf|heif|heic|ico|indd|jpg|jpe|jpeg|jp2|wdp|jxr|hdp|obj|pdf|ply|png|psd|arw|cr2|svg|tga|tif|tiff|u3ma|usdz|webp|3g2|3gp|avi|flv|m3u8|ts|m2ts|mts|mov|mkv|mp4|mpeg|mpd|mxf|ogv|webm|wmv)$/i;
var REGEX_URL = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|images|video|videos|raw|files)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)?\/?(?<signature>s--([a-zA-Z0-9\_\-]{8}|[a-zA-Z0-9\_\-]{32})--)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?\/?)*\/)*(?<version>v\d+|\w{1,2})\/(?<publicId>[^\s]+)$/;
var ASSET_TYPES_SEO = ["images", "videos", "files"];
function parseUrl(src) {
  var _a, _b, _c, _d;
  if (typeof src !== "string") {
    throw new Error(`Failed to parse URL: Invalid src of type ${typeof src}`);
  }
  const hasVersion = REGEX_VERSION.test(src);
  if (!hasVersion) {
    throw new Error(`Invalid src: Does not include version (Ex: /v1234/)`);
  }
  const [baseUrlWithExtension, queryString] = src.split("?");
  const format = getFormat(baseUrlWithExtension);
  let baseUrl = baseUrlWithExtension;
  if (format) {
    baseUrl = baseUrlWithExtension.replace(new RegExp(`${format}$`), "");
  }
  const results = baseUrl.match(REGEX_URL);
  const transformations = (_b = (_a = results == null ? void 0 : results.groups) == null ? void 0 : _a.transformations) == null ? void 0 : _b.split("/").filter((t) => !!t);
  const parts = {
    ...results == null ? void 0 : results.groups,
    format,
    seoSuffix: void 0,
    transformations: transformations || [],
    queryParams: {},
    version: ((_c = results == null ? void 0 : results.groups) == null ? void 0 : _c.version) ? parseInt(results.groups.version.replace("v", "")) : void 0
  };
  if (queryString) {
    parts.queryParams = queryString.split("&").reduce((prev, curr) => {
      const [key, value] = curr.split("=");
      prev[key] = value;
      return prev;
    }, {});
  }
  if (parts.assetType && ASSET_TYPES_SEO.includes(parts.assetType)) {
    const publicIdParts = ((_d = parts.publicId) == null ? void 0 : _d.split("/")) || [];
    parts.seoSuffix = publicIdParts.pop();
    parts.publicId = publicIdParts.join("/");
  }
  if (parts.publicId) {
    parts.publicId = decodeURIComponent(parts.publicId);
  }
  return parts;
}
function getFormat(src) {
  const matches = src.match(REGEX_FORMAT);
  if (matches === null)
    return;
  return matches[0];
}
function testColorIsHex(value) {
  if (typeof value !== "string")
    return false;
  return !!value.startsWith("#");
}
function convertColorHexToRgb(value) {
  return `rgb:${value.replace("#", "")}`;
}
function encodeBase64(value) {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
}
function objectHasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function sortByKey(array = [], key, type = "asc") {
  function compare(a, b) {
    let keyA = a[key];
    let keyB = b[key];
    if (typeof keyA === "string") {
      keyA = keyA.toLowerCase();
    }
    if (typeof keyB === "string") {
      keyB = keyB.toLowerCase();
    }
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  }
  let newArray = [...array];
  if (typeof key !== "string")
    return newArray;
  newArray = newArray.sort(compare);
  if (type === "desc") {
    return newArray.reverse();
  }
  return newArray;
}
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var cropping_exports = {};
__export(cropping_exports, {
  assetTypes: () => assetTypes,
  normalizeNumberParameter: () => normalizeNumberParameter,
  plugin: () => plugin,
  props: () => props
});
var cropsAspectRatio = ["crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsGravityAuto = ["crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsWithZoom = ["crop", "thumb"];
var props = [
  "aspectRatio",
  "crop",
  "gravity",
  "zoom"
];
var assetTypes = ["image", "images", "video", "videos"];
function normalizeNumberParameter(param) {
  if (typeof param !== "string")
    return param;
  return parseInt(param);
}
function plugin(props17) {
  const { cldAsset, options } = props17;
  const {
    aspectRatio,
    width: defaultWidth,
    height: defaultHeight,
    widthResize: defaultWidthResize,
    crop = "limit"
  } = options;
  const overrides = {
    width: void 0
  };
  let height = normalizeNumberParameter(defaultHeight);
  let width = normalizeNumberParameter(defaultWidth);
  let widthResize = normalizeNumberParameter(defaultWidthResize);
  const hasDefinedDimensions = height || width;
  const hasValidAspectRatio = aspectRatio && cropsAspectRatio.includes(crop);
  let transformationString = "";
  if (crop && (hasDefinedDimensions || hasValidAspectRatio)) {
    transformationString = `c_${crop}`;
  }
  if (hasValidAspectRatio) {
    transformationString = `${transformationString},ar_${aspectRatio}`;
  }
  if (width) {
    transformationString = `${transformationString},w_${width}`;
  }
  if (!options.gravity && cropsGravityAuto.includes(crop)) {
    options.gravity = "auto";
  }
  if (!["limit"].includes(crop) && typeof height === "number") {
    transformationString = `${transformationString},h_${height}`;
  }
  if (options.gravity) {
    if (options.gravity === "auto" && !cropsGravityAuto.includes(crop)) {
      console.warn(`Auto gravity can only be used with crop modes: ${cropsGravityAuto.join(", ")}. Not applying gravity.`);
    } else {
      transformationString = `${transformationString},g_${options.gravity}`;
    }
  }
  if (options.zoom) {
    if (options.zoom === "auto" && !cropsWithZoom.includes(crop)) {
      console.warn(`Zoom can only be used with crop modes: ${cropsWithZoom.join(", ")}. Not applying zoom.`);
    } else {
      transformationString = `${transformationString},z_${options.zoom}`;
    }
  }
  cldAsset.effect(transformationString);
  if (widthResize) {
    overrides.width = widthResize;
  }
  return {
    options: overrides
  };
}
var default_image_exports = {};
__export(default_image_exports, {
  assetTypes: () => assetTypes2,
  plugin: () => plugin2,
  props: () => props2
});
var props2 = ["default"];
var assetTypes2 = ["image", "images"];
function plugin2(props17) {
  const { cldAsset, options } = props17;
  const { defaultImage } = options;
  if (typeof defaultImage === "string") {
    if (!getFormat(defaultImage)) {
      console.warn(`The defaultImage prop may be missing a format and must include it along with the public ID. (Ex: myimage.jpg)`);
    }
    const defaultImageId = defaultImage.replace(/\//g, ":");
    cldAsset.addTransformation(`d_${defaultImageId}`);
  }
  return {};
}
var effects_exports = {};
__export(effects_exports, {
  assetTypes: () => assetTypes3,
  plugin: () => plugin3,
  props: () => props3
});
var convertersColors = [
  {
    test: testColorIsHex,
    convert: convertColorHexToRgb
  }
];
var primary = {
  aspectRatio: {
    qualifier: "ar"
  },
  crop: {
    qualifier: "c"
  },
  gravity: {
    qualifier: "g"
  },
  height: {
    qualifier: "h"
  },
  width: {
    qualifier: "w"
  }
};
var position = {
  angle: {
    qualifier: "a"
  },
  gravity: {
    qualifier: "g"
  },
  x: {
    qualifier: "x"
  },
  y: {
    qualifier: "y"
  }
};
var text = {
  alignment: {
    qualifier: false,
    order: 6
  },
  antialias: {
    qualifier: "antialias"
  },
  border: {
    qualifier: "bo",
    location: "primary"
  },
  color: {
    qualifier: "co",
    location: "primary",
    converters: convertersColors
  },
  fontFamily: {
    qualifier: false,
    order: 1
  },
  fontSize: {
    qualifier: false,
    order: 2
  },
  fontStyle: {
    qualifier: false,
    order: 4
  },
  fontWeight: {
    qualifier: false,
    order: 3
  },
  hinting: {
    qualifier: "hinting"
  },
  letterSpacing: {
    qualifier: "letter_spacing"
  },
  lineSpacing: {
    qualifier: "line_spacing"
  },
  stroke: {
    qualifier: "self",
    order: 7
  },
  textDecoration: {
    qualifier: false,
    order: 5
  }
};
var effects = {
  art: {
    prefix: "e",
    qualifier: "art"
  },
  autoBrightness: {
    prefix: "e",
    qualifier: "auto_brightness"
  },
  autoColor: {
    prefix: "e",
    qualifier: "auto_color"
  },
  autoContrast: {
    prefix: "e",
    qualifier: "auto_contrast"
  },
  assistColorblind: {
    prefix: "e",
    qualifier: "assist_colorblind"
  },
  background: {
    qualifier: "b"
  },
  blackwhite: {
    prefix: "e",
    qualifier: "blackwhite"
  },
  blur: {
    prefix: "e",
    qualifier: "blur"
  },
  blurFaces: {
    prefix: "e",
    qualifier: "blur_faces"
  },
  blurRegion: {
    prefix: "e",
    qualifier: "blur_region"
  },
  border: {
    qualifier: "bo"
  },
  brightness: {
    prefix: "e",
    qualifier: "brightness"
  },
  brightnessHSB: {
    prefix: "e",
    qualifier: "brightness_hsb"
  },
  cartoonify: {
    prefix: "e",
    qualifier: "cartoonify"
  },
  color: {
    qualifier: "co",
    converters: convertersColors
  },
  colorize: {
    prefix: "e",
    qualifier: "colorize"
  },
  contrast: {
    prefix: "e",
    qualifier: "contrast"
  },
  distort: {
    prefix: "e",
    qualifier: "distort"
  },
  fillLight: {
    prefix: "e",
    qualifier: "fill_light"
  },
  gamma: {
    prefix: "e",
    qualifier: "gamma"
  },
  gradientFade: {
    prefix: "e",
    qualifier: "gradient_fade"
  },
  grayscale: {
    prefix: "e",
    qualifier: "grayscale"
  },
  improve: {
    prefix: "e",
    qualifier: "improve"
  },
  multiply: {
    prefix: "e",
    qualifier: "multiply"
  },
  negate: {
    prefix: "e",
    qualifier: "negate"
  },
  oilPaint: {
    prefix: "e",
    qualifier: "oil_paint"
  },
  opacity: {
    qualifier: "o"
  },
  outline: {
    prefix: "e",
    qualifier: "outline"
  },
  overlay: {
    prefix: "e",
    qualifier: "overlay"
  },
  pixelate: {
    prefix: "e",
    qualifier: "pixelate"
  },
  pixelateFaces: {
    prefix: "e",
    qualifier: "pixelate_faces"
  },
  pixelateRegion: {
    prefix: "e",
    qualifier: "pixelate_region"
  },
  radius: {
    qualifier: "r"
  },
  redeye: {
    prefix: "e",
    qualifier: "redeye"
  },
  replaceColor: {
    prefix: "e",
    qualifier: "replace_color"
  },
  saturation: {
    prefix: "e",
    qualifier: "saturation"
  },
  screen: {
    prefix: "e",
    qualifier: "screen"
  },
  sepia: {
    prefix: "e",
    qualifier: "sepia"
  },
  shadow: {
    prefix: "e",
    qualifier: "shadow"
  },
  sharpen: {
    prefix: "e",
    qualifier: "sharpen"
  },
  shear: {
    prefix: "e",
    qualifier: "shear"
  },
  simulateColorblind: {
    prefix: "e",
    qualifier: "simulate_colorblind"
  },
  tint: {
    prefix: "e",
    qualifier: "tint"
  },
  trim: {
    prefix: "e",
    qualifier: "trim"
  },
  unsharpMask: {
    prefix: "e",
    qualifier: "unsharp_mask"
  },
  vectorize: {
    prefix: "e",
    qualifier: "vectorize"
  },
  vibrance: {
    prefix: "e",
    qualifier: "vibrance"
  },
  vignette: {
    prefix: "e",
    qualifier: "vignette"
  }
};
var flags = {
  animated: {
    prefix: "fl",
    qualifier: "animated"
  },
  anyFormat: {
    prefix: "fl",
    qualifier: "any_format"
  },
  apng: {
    prefix: "fl",
    qualifier: "apng"
  },
  attachment: {
    prefix: "fl",
    qualifier: "attachment"
  },
  awebp: {
    prefix: "fl",
    qualifier: "awebp"
  },
  clip: {
    prefix: "fl",
    qualifier: "clip"
  },
  clipEvenodd: {
    prefix: "fl",
    qualifier: "clip_evenodd"
  },
  cutter: {
    prefix: "fl",
    qualifier: "cutter"
  },
  draco: {
    prefix: "fl",
    qualifier: "draco"
  },
  forceIcc: {
    prefix: "fl",
    qualifier: "force_icc"
  },
  forceStrip: {
    prefix: "fl",
    qualifier: "force_strip"
  },
  getinfo: {
    prefix: "fl",
    qualifier: "getinfo"
  },
  group4: {
    prefix: "fl",
    qualifier: "group4"
  },
  hlsv3: {
    prefix: "fl",
    qualifier: "hlsv3"
  },
  ignoreAspectRatio: {
    prefix: "fl",
    qualifier: "ignore_aspect_ratio"
  },
  ignoreMaskChannels: {
    prefix: "fl",
    qualifier: "ignore_mask_channels"
  },
  immutableCache: {
    prefix: "fl",
    qualifier: "immutable_cache"
  },
  keepAttribution: {
    prefix: "fl",
    qualifier: "keep_attribution"
  },
  keepDar: {
    prefix: "fl",
    qualifier: "keep_dar"
  },
  keepIptc: {
    prefix: "fl",
    qualifier: "keep_iptc"
  },
  layerApply: {
    prefix: "fl",
    qualifier: "layer_apply"
  },
  lossy: {
    prefix: "fl",
    qualifier: "lossy"
  },
  mono: {
    prefix: "fl",
    qualifier: "mono"
  },
  noOverflow: {
    prefix: "fl",
    qualifier: "no_overflow"
  },
  noStream: {
    prefix: "fl",
    qualifier: "no_stream"
  },
  png8: {
    prefix: "fl",
    qualifier: "png8"
  },
  png24: {
    prefix: "fl",
    qualifier: "png24"
  },
  png32: {
    prefix: "fl",
    qualifier: "png32"
  },
  preserveTransparency: {
    prefix: "fl",
    qualifier: "preserve_transparency"
  },
  progressive: {
    prefix: "fl",
    qualifier: "progressive"
  },
  rasterize: {
    prefix: "fl",
    qualifier: "rasterize"
  },
  regionRelative: {
    prefix: "fl",
    qualifier: "region_relative"
  },
  relative: {
    prefix: "fl",
    qualifier: "relative",
    location: "primary"
  },
  replaceImage: {
    prefix: "fl",
    qualifier: "replace_image"
  },
  sanitize: {
    prefix: "fl",
    qualifier: "sanitize"
  },
  splice: {
    prefix: "fl",
    qualifier: "splice"
  },
  streamingAttachment: {
    prefix: "fl",
    qualifier: "streaming_attachment"
  },
  stripProfile: {
    prefix: "fl",
    qualifier: "strip_profile"
  },
  textDisallowOverflow: {
    prefix: "fl",
    qualifier: "text_disallow_overflow"
  },
  textNoTrim: {
    prefix: "fl",
    qualifier: "text_no_trim"
  },
  tif8Lzw: {
    prefix: "fl",
    qualifier: "tif8_lzw"
  },
  tiled: {
    prefix: "fl",
    qualifier: "tiled"
  },
  truncateTs: {
    prefix: "fl",
    qualifier: "truncate_ts"
  },
  waveform: {
    prefix: "fl",
    qualifier: "waveform"
  }
};
var video = {
  streamingProfile: {
    qualifier: "sp",
    location: "primary"
  }
};
function constructTransformation({ prefix, qualifier, value, converters }) {
  let transformation = "";
  if (prefix) {
    transformation = `${prefix}_`;
  }
  let transformationValue = value;
  converters == null ? void 0 : converters.forEach(({ test, convert }) => {
    if (!test(transformationValue))
      return;
    transformationValue = convert(transformationValue);
  });
  if (transformationValue === true || transformationValue === "true") {
    return `${transformation}${qualifier}`;
  }
  if (typeof transformationValue === "string" || typeof transformationValue === "number") {
    if (prefix) {
      return `${transformation}${qualifier}:${transformationValue}`;
    } else {
      return `${qualifier}_${transformationValue}`;
    }
  }
}
var props3 = [...Object.keys(effects), "effects"];
var assetTypes3 = ["image", "images", "video", "videos"];
function plugin3(props17) {
  const { cldAsset, options } = props17;
  const transformationStrings = constructTransformationString({
    effects,
    options
  });
  transformationStrings.filter((t) => !!t).forEach((transformation) => cldAsset.effect(transformation));
  if (Array.isArray(options == null ? void 0 : options.effects)) {
    options == null ? void 0 : options.effects.forEach((effectsSet) => {
      const transformationString = constructTransformationString({
        effects,
        options: effectsSet
      }).filter((t) => !!t).join(",");
      cldAsset.effect(transformationString);
    });
  }
  function constructTransformationString({ effects: effects2, options: options2 }) {
    return Object.keys(effects2).map((key) => {
      const { prefix, qualifier, converters } = effects2[key];
      return constructTransformation({
        qualifier,
        prefix,
        value: options2 == null ? void 0 : options2[key],
        converters
      });
    });
  }
  return {};
}
var flags_exports = {};
__export(flags_exports, {
  assetTypes: () => assetTypes4,
  plugin: () => plugin4,
  props: () => props4
});
var props4 = ["flags"];
var assetTypes4 = ["image", "images", "video", "videos"];
var supportedFlags = Object.entries(flags).map(([_, { qualifier }]) => qualifier);
function plugin4(props17) {
  const { cldAsset, options } = props17;
  const { flags: flags2 = [] } = options;
  if (Array.isArray(flags2) && flags2.length > 0) {
    flags2.forEach((flag) => {
      if (!supportedFlags.includes(flag))
        return;
      cldAsset.addFlag(flag);
    });
  } else if (typeof flags2 === "object") {
    Object.entries(flags2).forEach(([qualifier, value]) => {
      if (!supportedFlags.includes(qualifier))
        return;
      cldAsset.addTransformation(`fl_${qualifier}:${value}`);
    });
  }
  return {};
}
var fill_background_exports = {};
__export(fill_background_exports, {
  assetTypes: () => assetTypes5,
  plugin: () => plugin5,
  props: () => props5
});
var props5 = ["fillBackground"];
var assetTypes5 = ["image", "images"];
var defaultCrop = "pad";
function plugin5(props17) {
  const { cldAsset, options } = props17;
  const { fillBackground } = options;
  if (fillBackground === true) {
    const properties = [
      "b_gen_fill",
      `ar_${options.width}:${options.height}`,
      `w_${options.width}`,
      `c_${defaultCrop}`
    ];
    cldAsset.addTransformation(properties.join(","));
  } else if (typeof fillBackground === "object") {
    const { crop = defaultCrop, gravity, prompt } = fillBackground;
    const properties = [
      `ar_${options.width}:${options.height}`,
      `w_${options.width}`,
      `c_${crop}`
    ];
    if (typeof prompt === "string") {
      properties.unshift(`b_gen_fill:${prompt}`);
    } else {
      properties.unshift(`b_gen_fill`);
    }
    if (typeof gravity === "string") {
      properties.push(`g_${gravity}`);
    }
    cldAsset.addTransformation(properties.join(","));
  }
  return {};
}
var sanitize_exports = {};
__export(sanitize_exports, {
  assetTypes: () => assetTypes6,
  plugin: () => plugin6,
  props: () => props6
});
var props6 = ["sanitize"];
var assetTypes6 = ["image", "images"];
function plugin6(props17) {
  const { cldAsset, options } = props17;
  const { sanitize = true } = options;
  const shouldApplySanitizer = sanitize && (options.format === "svg" || cldAsset.publicID.endsWith(".svg"));
  if (shouldApplySanitizer) {
    cldAsset.effect("fl_sanitize");
  }
  return {};
}
var overlays_exports = {};
__export(overlays_exports, {
  DEFAULT_TEXT_OPTIONS: () => DEFAULT_TEXT_OPTIONS,
  assetTypes: () => assetTypes7,
  plugin: () => plugin7,
  props: () => props7
});
var props7 = ["text", "overlays"];
var assetTypes7 = ["image", "images", "video", "videos"];
var DEFAULT_TEXT_OPTIONS = {
  color: "black",
  fontFamily: "Arial",
  fontSize: 200,
  fontWeight: "bold"
};
function plugin7(props17) {
  const { cldAsset, options } = props17;
  const { text: text2, overlays = [] } = options;
  const type = "overlay";
  const typeQualifier = "l";
  if (Array.isArray(overlays)) {
    overlays.forEach(applyOverlay);
  }
  if (typeof text2 === "string") {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        text: text2
      }
    });
  } else if (typeof text2 === "object") {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        ...text2
      }
    });
  }
  function applyOverlay({ publicId, url, position: position2, text: text3, effects: layerEffects = [], appliedEffects = [], ...options2 }) {
    var _a;
    const hasPublicId = typeof publicId === "string";
    const hasUrl = typeof url === "string";
    const hasText = typeof text3 === "object" || typeof text3 === "string";
    const hasPosition = typeof position2 === "object";
    if (!hasPublicId && !hasUrl && !hasText) {
      console.warn(`An ${type} is missing Public ID, URL, or Text`);
      return;
    }
    let layerTransformation;
    if (hasText) {
      layerTransformation = `${typeQualifier}_text`;
    } else if (hasPublicId) {
      layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ":")}`;
    } else if (hasUrl) {
      layerTransformation = `${typeQualifier}_fetch:${encodeBase64(url)}`;
    }
    const primary2 = [];
    const applied = [];
    Object.keys(options2).forEach((key) => {
      if (!objectHasKey(primary, key))
        return;
      const { qualifier, converters } = primary[key];
      const transformation = constructTransformation({
        qualifier,
        value: options2[key],
        converters
      });
      if (transformation) {
        primary2.push(transformation);
      }
    });
    layerEffects.forEach((effect) => {
      Object.keys(effect).forEach((key) => {
        const { qualifier, prefix, converters } = primary[key] || effects[key] || {};
        const transformation = constructTransformation({
          qualifier,
          prefix,
          value: effect[key],
          converters
        });
        if (transformation) {
          primary2.push(transformation);
        }
      });
    });
    appliedEffects.forEach((effect) => {
      Object.keys(effect).forEach((key) => {
        const { qualifier, prefix, converters } = primary[key] || effects[key] || {};
        const transformation = constructTransformation({
          qualifier,
          prefix,
          value: effect[key],
          converters
        });
        if (transformation) {
          applied.push(transformation);
        }
      });
    });
    if (hasText) {
      if (typeof text3 === "string") {
        text3 = {
          ...DEFAULT_TEXT_OPTIONS,
          text: text3
        };
      }
      const textTransformations = [];
      if (typeof text3 === "object") {
        const textOptions = Object.keys(text3).filter((key) => objectHasKey(text, key)).map((key) => {
          const value = text3 && objectHasKey(text3, key) && text3[key];
          return {
            ...text[key],
            key,
            value,
            order: text[key].order || 99
          };
        });
        const sortedTextOptions = sortByKey(textOptions, "order");
        for (const textOption of sortedTextOptions) {
          const { key, value, qualifier, location, converters } = textOption;
          let textValue = value;
          converters == null ? void 0 : converters.forEach(({ test, convert }) => {
            if (!test(value))
              return;
            textValue = convert(value);
          });
          if (location === "primary") {
            primary2.push(`${qualifier}_${textValue}`);
          } else if (qualifier === "self") {
            textTransformations.push(key);
          } else if (qualifier) {
            textTransformations.push(`${qualifier}_${textValue}`);
          } else {
            textTransformations.push(textValue);
          }
        }
      }
      const specialCharacters = {
        ".": "%2E",
        ",": "%2C",
        "/": "%2F"
      };
      let layerText = (text3 == null ? void 0 : text3.text) || "";
      if (typeof layerText === "string") {
        (_a = Object.keys(specialCharacters)) == null ? void 0 : _a.forEach((character) => {
          layerText = layerText == null ? void 0 : layerText.replace(character, specialCharacters[character]);
        });
      }
      layerTransformation = `${layerTransformation}:${textTransformations.join("_")}:${layerText}`;
    }
    if (hasPosition) {
      Object.keys(position2).forEach((key) => {
        if (!objectHasKey(position, key))
          return;
        const { qualifier, converters } = position[key];
        const transformation = constructTransformation({
          qualifier,
          value: position2[key],
          converters
        });
        if (transformation) {
          applied.push(transformation);
        }
      });
    }
    if (primary2.length > 0) {
      layerTransformation = `${layerTransformation},${primary2.join(",")}`;
    }
    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(",")}`;
    }
    cldAsset.addTransformation(layerTransformation);
  }
  return {};
}
var named_transformations_exports = {};
__export(named_transformations_exports, {
  assetTypes: () => assetTypes8,
  plugin: () => plugin8,
  props: () => props8,
  strict: () => strict
});
var props8 = ["transformations"];
var assetTypes8 = ["image", "images", "video", "videos"];
var strict = true;
function plugin8(props17) {
  const { cldAsset, options } = props17;
  let { transformations = [] } = options;
  if (!Array.isArray(transformations)) {
    transformations = [transformations];
  }
  transformations.forEach((transformation) => {
    cldAsset.addTransformation(`t_${transformation}`);
  });
  return {};
}
var raw_transformations_exports = {};
__export(raw_transformations_exports, {
  assetTypes: () => assetTypes9,
  plugin: () => plugin9,
  props: () => props9
});
var props9 = ["rawTransformations"];
var assetTypes9 = ["image", "images", "video", "videos"];
function plugin9(props17) {
  const { cldAsset, options } = props17;
  const { rawTransformations = [] } = options;
  rawTransformations.forEach((transformation) => {
    cldAsset.addTransformation(transformation);
  });
  return {};
}
var remove_background_exports = {};
__export(remove_background_exports, {
  assetTypes: () => assetTypes10,
  plugin: () => plugin10,
  props: () => props10
});
var props10 = ["removeBackground"];
var assetTypes10 = ["image", "images"];
function plugin10(props17) {
  const { cldAsset, options } = props17;
  const { removeBackground = false } = options;
  if (removeBackground) {
    cldAsset.effect("e_background_removal");
  }
  return {};
}
var generative_replace_exports = {};
__export(generative_replace_exports, {
  assetTypes: () => assetTypes11,
  plugin: () => plugin11,
  props: () => props11
});
var props11 = ["replace"];
var assetTypes11 = ["image", "images"];
function plugin11(props17) {
  const { cldAsset, options } = props17;
  const { replace = null } = options;
  if (replace) {
    let from, to, preserveGeometry = false;
    if (Array.isArray(replace)) {
      from = replace[0];
      to = replace[1];
      preserveGeometry = replace[2] || false;
    } else {
      from = replace.from;
      to = replace.to;
      preserveGeometry = replace.preserveGeometry || false;
    }
    const properties = [`e_gen_replace:from_${from}`, `to_${to}`];
    if (preserveGeometry) {
      properties.push(`preserve-geometry_${preserveGeometry}`);
    }
    cldAsset.effect(properties.join(";"));
  }
  return {};
}
var seo_exports = {};
__export(seo_exports, {
  assetTypes: () => assetTypes12,
  plugin: () => plugin12,
  props: () => props12
});
var props12 = ["seoSuffix"];
var assetTypes12 = ["image", "images", "video", "videos"];
function plugin12(props17) {
  const { cldAsset, options } = props17;
  const { seoSuffix } = options;
  if (typeof seoSuffix === "string") {
    if (options.deliveryType === "fetch") {
      console.warn("SEO suffix is not supported with a delivery type of fetch");
    } else {
      cldAsset.setSuffix(seoSuffix);
    }
  }
  return {};
}
var underlays_exports = {};
__export(underlays_exports, {
  assetTypes: () => assetTypes13,
  plugin: () => plugin13,
  props: () => props13
});
var props13 = ["underlay", "underlays"];
var assetTypes13 = ["image", "images", "video", "videos"];
function plugin13(props17) {
  const { cldAsset, options } = props17;
  const { underlay, underlays = [] } = options;
  const typeQualifier = "u";
  if (Array.isArray(underlays)) {
    underlays.forEach(applyUnderlay);
  }
  if (typeof underlay === "string") {
    const underlayOptions = {
      publicId: underlay,
      crop: "fill",
      width: "1.0",
      height: "1.0",
      flags: ["relative"]
    };
    applyUnderlay(underlayOptions);
  }
  function applyUnderlay({ publicId, type, position: position2, effects: layerEffects = [], flags: flags2 = [], ...options2 }) {
    const hasPublicId = typeof publicId === "string";
    const hasPosition = typeof position2 === "object";
    if (!hasPublicId) {
      console.warn(`An ${type} is missing a Public ID`);
      return;
    }
    let layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ":")}`;
    const primary2 = [];
    const applied = [];
    Object.keys(options2).forEach((key) => {
      if (!objectHasKey(primary, key))
        return;
      const { qualifier } = primary[key];
      primary2.push(`${qualifier}_${options2[key]}`);
    });
    layerEffects.forEach((effect) => {
      Object.keys(effect).forEach((key) => {
        if (!objectHasKey(primary, key))
          return;
        const { qualifier } = primary[key];
        primary2.push(`${qualifier}_${effect[key]}`);
      });
    });
    if (hasPosition) {
      Object.keys(position2).forEach((key) => {
        if (!objectHasKey(position, key))
          return;
        const { qualifier } = position[key];
        applied.push(`${qualifier}_${position2[key]}`);
      });
    }
    flags2.forEach((key) => {
      if (!objectHasKey(flags, key))
        return;
      const { qualifier, prefix } = flags[key];
      primary2.push(`${prefix}_${qualifier}`);
    });
    layerTransformation = `${layerTransformation},${primary2.join(",")}`;
    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(",")}`;
    }
    cldAsset.addTransformation(layerTransformation);
  }
  return {};
}
var version_exports = {};
__export(version_exports, {
  assetTypes: () => assetTypes14,
  plugin: () => plugin14,
  props: () => props14
});
var props14 = ["version"];
var assetTypes14 = ["image", "images", "video", "videos"];
function plugin14(props17) {
  const { cldAsset, options } = props17;
  const { version } = options;
  if (typeof version === "string" || typeof version === "number") {
    cldAsset.setVersion(`${version}`.replace("v", ""));
  }
  return {};
}
var video_exports = {};
__export(video_exports, {
  assetTypes: () => assetTypes15,
  plugin: () => plugin15,
  props: () => props15
});
var props15 = [...Object.keys(video)];
var assetTypes15 = ["video", "videos"];
function plugin15(props17) {
  const { cldAsset, options } = props17;
  Object.keys(options).forEach((key) => {
    if (!objectHasKey(video, key))
      return;
    const { prefix, qualifier, converters } = video[key];
    const transformation = constructTransformation({
      prefix,
      qualifier,
      value: options[key],
      converters
    });
    cldAsset.addTransformation(transformation);
  });
  return {};
}
var zoompan_exports = {};
__export(zoompan_exports, {
  assetTypes: () => assetTypes16,
  plugin: () => plugin16,
  props: () => props16
});
var props16 = ["zoompan"];
var assetTypes16 = ["image", "images"];
function plugin16(props17) {
  const { cldAsset, options } = props17;
  const { zoompan = false } = options;
  const overrides = {
    format: void 0
  };
  if (zoompan === true) {
    cldAsset.effect("e_zoompan");
  } else if (typeof zoompan === "string") {
    if (zoompan === "loop") {
      cldAsset.effect("e_zoompan");
      cldAsset.effect("e_loop");
    } else {
      cldAsset.effect(`e_zoompan:${zoompan}`);
    }
  } else if (typeof zoompan === "object") {
    let zoompanEffect = "e_zoompan";
    if (typeof zoompan.options === "string") {
      zoompanEffect = `${zoompanEffect}${zoompan.options}`;
    }
    cldAsset.effect(zoompanEffect);
    let loopEffect;
    if (zoompan.loop === true) {
      loopEffect = "e_loop";
    } else if (typeof zoompan.loop === "string") {
      loopEffect = `e_loop${zoompan.loop}`;
    }
    if (loopEffect) {
      cldAsset.effect(loopEffect);
    }
  }
  if (zoompan !== false) {
    overrides.format = "gif";
  }
  return {
    options: overrides
  };
}
var transformationPlugins = [
  generative_replace_exports,
  remove_background_exports,
  raw_transformations_exports,
  cropping_exports,
  default_image_exports,
  effects_exports,
  fill_background_exports,
  flags_exports,
  overlays_exports,
  sanitize_exports,
  named_transformations_exports,
  seo_exports,
  underlays_exports,
  version_exports,
  video_exports,
  zoompan_exports
];
function constructCloudinaryUrl({ options, config, analytics }) {
  const cld = new Cloudinary(config);
  if (typeof (options == null ? void 0 : options.src) !== "string") {
    throw Error(`Failed to construct Cloudinary URL: Missing source (src) in options`);
  }
  if (!(options == null ? void 0 : options.assetType)) {
    options.assetType = "image";
  }
  const propsCheck = [];
  transformationPlugins.forEach(({ props: props17 = [] }) => {
    props17.forEach((prop) => {
      if (propsCheck.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      propsCheck.push(prop);
    });
  });
  const parsedOptions = {};
  let publicId;
  if (typeof options.src === "string" && /^https?:\/\//.test(options.src)) {
    try {
      const parts = parseUrl(options.src);
      publicId = parts == null ? void 0 : parts.publicId;
      parsedOptions.seoSuffix = parts == null ? void 0 : parts.seoSuffix;
      parsedOptions.version = parts == null ? void 0 : parts.version;
    } catch (e) {
    }
  }
  if (!publicId) {
    publicId = options.src;
  }
  Object.keys(parsedOptions).forEach((key) => {
    if (objectHasKey(options, key))
      return;
    options[key] = parsedOptions[key];
  });
  let cldAsset = void 0;
  if (["image", "images"].includes(options.assetType)) {
    cldAsset = cld.image(publicId);
  } else if (["video", "videos"].includes(options.assetType)) {
    cldAsset = cld.video(publicId);
  }
  if (typeof cldAsset === "undefined") {
    throw new Error("Invalid asset type.");
  }
  transformationPlugins.forEach(({ plugin: plugin17, assetTypes: assetTypes17, props: props17, strict: strict2 }) => {
    const supportedAssetType = typeof (options == null ? void 0 : options.assetType) !== "undefined" && assetTypes17.includes(options == null ? void 0 : options.assetType);
    const optionsKeys = Object.keys(options);
    const attemptedUse = props17.map((prop) => optionsKeys.includes(prop)).filter((isUsed) => !!isUsed).length > 0;
    if (!supportedAssetType) {
      if (attemptedUse) {
        console.warn(`One of the following props [${props17.join(", ")}] was used with an unsupported asset type [${options == null ? void 0 : options.assetType}]`);
      }
      return;
    }
    if (options.strictTransformations && !strict2) {
      if (attemptedUse) {
        console.warn(`One of the following props [${props17.join(", ")}] was used that is not supported with Strict Transformations.`);
      }
      return;
    }
    const results = plugin17({
      cldAsset,
      options
    });
    const { options: pluginOptions } = results || { options: void 0 };
    if ((pluginOptions == null ? void 0 : pluginOptions.format) && options) {
      options.format = pluginOptions.format;
    }
    if ((pluginOptions == null ? void 0 : pluginOptions.width) && options) {
      options.resize = {
        width: pluginOptions == null ? void 0 : pluginOptions.width
      };
    }
  });
  if ((options == null ? void 0 : options.resize) && !options.strictTransformations) {
    const { width, crop = "limit" } = options.resize;
    cldAsset.effect(`c_${crop},w_${width}`);
  }
  cldAsset.setDeliveryType((options == null ? void 0 : options.deliveryType) || "upload");
  if (!options.strictTransformations) {
    if (options == null ? void 0 : options.dpr) {
      let dpr = options.dpr;
      if (typeof dpr === "number") {
        dpr = dpr.toFixed(1);
      }
      cldAsset.addTransformation(`dpr_${dpr}`);
    }
    if ((options == null ? void 0 : options.format) !== "default") {
      cldAsset.format((options == null ? void 0 : options.format) || "auto");
    }
    if ((options == null ? void 0 : options.quality) !== "default") {
      cldAsset.quality((options == null ? void 0 : options.quality) || "auto");
    }
  }
  return cldAsset.toURL({
    trackedAnalytics: analytics
  });
}
function checkCloudinaryCloudName(cloudName) {
  if (!cloudName) {
    throw new Error("[Svelte-cloudinary] A Cloudinary Cloud name is required, please make sure VITE_PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment");
  }
}
function getCldImageUrl(options, config, analytics) {
  checkCloudinaryCloudName("da6xasun0");
  return constructCloudinaryUrl({
    options,
    config: Object.assign({
      cloud: {
        cloudName: "da6xasun0"
      }
    }, config),
    analytics: Object.assign({
      sdkCode: SVELTE_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: SVELTE_CLOUDINARY_VERSION,
      techVersion: SVELTE_VERSION,
      product: "B"
    }, analytics)
  });
}
export {
  checkCloudinaryCloudName as c,
  getCldImageUrl as g,
  transformationPlugins as t
};
