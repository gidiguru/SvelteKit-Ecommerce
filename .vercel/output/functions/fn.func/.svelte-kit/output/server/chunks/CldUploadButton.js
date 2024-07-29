import { c as create_ssr_component, v as validate_component, k as spread, m as escape_object } from "./ssr.js";
import { c as checkCloudinaryCloudName } from "./getCldImageUrl.js";
var define_import_meta_env_default = { VITE_PUBLIC_CLOUDINARY_CLOUD_NAME: "da6xasun0", VITE_PUBLIC_CLOUDINARY_API_KEY: "528393748178165", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const CldUploadWidget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { uploadPreset, signatureEndpoint, onError, onUpload, options, onOpen, onClose } = $$props;
  let cloudinary;
  let widget;
  const signed = !!signatureEndpoint;
  const WIDGET_WATCHED_EVENTS = ["success", "display-changed"];
  const WIDGET_EVENTS = {
    abort: "onAbort",
    "batch-cancelled": "onBatchCancelled",
    // 'close': 'onClose', // TODO: should follow other event patterns
    "display-changed": "onDisplayChanged",
    publicid: "onPublicId",
    "queues-end": "onQueuesEnd",
    "queues-start": "onQueuesStart",
    retry: "onRetry",
    "show-completed": "onShowCompleted",
    "source-changed": "onSourceChanged",
    success: "onSuccess",
    tags: "onTags",
    "upload-added": "onUploadAdded"
  };
  checkCloudinaryCloudName("da6xasun0");
  let isLoading = true;
  const uploadOptions = {
    cloudName: "da6xasun0",
    uploadPreset: uploadPreset || define_import_meta_env_default.PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    apiKey: "528393748178165",
    ...options
  };
  if (signed) {
    uploadOptions.uploadSignature = generateSignature;
    if (!uploadOptions.apiKey) {
      console.warn(`Missing dependency: Signed Upload requires an API key`);
    }
  }
  function generateSignature(callback, paramsToSign) {
    if (typeof signatureEndpoint === "undefined") {
      throw Error("Failed to generate signature: signatureEndpoint undefined.");
    }
    fetch(signatureEndpoint, {
      method: "POST",
      body: JSON.stringify({ paramsToSign })
    }).then((r) => r.json()).then(({ signature }) => {
      callback(signature);
    });
  }
  function createWidget() {
    return cloudinary?.createUploadWidget(uploadOptions, (uploadError, uploadResult) => {
      if (uploadError && uploadError !== null) {
        handleError(uploadError);
      }
      if (typeof uploadResult?.event === "string") {
        if (WIDGET_WATCHED_EVENTS.includes(uploadResult?.event)) {
          handleResults(uploadResult);
        }
        const widgetEvent = WIDGET_EVENTS[uploadResult.event];
        if (typeof widgetEvent === "string" && typeof $$props[widgetEvent] === "function" && typeof $$props[widgetEvent]) {
          const callback = $$props[widgetEvent];
          callback(uploadResult, { widget, ...instanceMethods });
        }
      }
    });
  }
  function handleResults(results) {
    if (results != null) {
      const isSuccess = results.event === "success";
      const isClosed = results.event === "display-changed" && results.info === "hidden";
      if (isSuccess && typeof onUpload === "function") {
        onUpload(results, widget);
      }
      if (isClosed && typeof onClose === "function") {
        onClose(widget);
      }
    }
  }
  function handleError(error) {
    if (error && typeof onError === "function") {
      onError(error, widget);
    }
  }
  function invokeInstanceMethod(method, options2 = []) {
    if (!widget) {
      widget = createWidget();
    }
    if (typeof widget?.[method] === "function") {
      return widget?.[method](...options2);
    }
  }
  function close(options2) {
    invokeInstanceMethod("close", [options2]);
  }
  function destroy(options2) {
    return invokeInstanceMethod("destroy", [options2]);
  }
  function hide() {
    invokeInstanceMethod("hide");
  }
  function isDestroyed() {
    return invokeInstanceMethod("isDestroyed");
  }
  function isMinimized() {
    return invokeInstanceMethod("isMinimized");
  }
  function isShowing() {
    return invokeInstanceMethod("isShowing");
  }
  function minimize() {
    invokeInstanceMethod("minimize");
  }
  function open(widgetSource, options2) {
    invokeInstanceMethod("open", [typeof widgetSource === "string" ? widgetSource : null, options2]);
    if (typeof onOpen === "function") {
      onOpen(widget);
    }
  }
  function show() {
    invokeInstanceMethod("show");
  }
  function update() {
    invokeInstanceMethod("update");
  }
  const instanceMethods = {
    close,
    destroy,
    hide,
    isDestroyed,
    isMinimized,
    isShowing,
    minimize,
    open,
    show,
    update
  };
  return `${slots.default ? slots.default({
    widget,
    cloudinary,
    isLoading,
    ...instanceMethods,
    "data-testid": "slot"
  }) : ``}`;
});
const CldUploadButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { children, onError, onOpen, onUpload, onAbort, onBatchCancelled, onClose, onDisplayChanged, onPublicId, onQueuesEnd, onQueuesStart, onRetry, onShowCompleted, onSourceChanged, onSuccess, onTags, onUploadAdded, options, signatureEndpoint, uploadPreset, ...buttonProps } = $$props;
  let baseProps = {
    onAbort,
    onBatchCancelled,
    onDisplayChanged,
    onPublicId,
    onQueuesEnd,
    onQueuesStart,
    onRetry,
    onShowCompleted,
    onSourceChanged,
    onSuccess,
    onUploadAdded,
    onClose,
    onOpen,
    options,
    onUpload,
    onError,
    uploadPreset,
    signatureEndpoint
  };
  delete buttonProps["$$slots"];
  delete buttonProps["$$scope"];
  return `${validate_component(CldUploadWidget, "CldUploadWidget").$$render($$result, Object.assign({}, baseProps), {}, {
    default: ({ open, isLoading }) => {
      return `<button${spread([escape_object(buttonProps), { disabled: isLoading || null }], {})}>${slots.default ? slots.default({}) : `Upload`}</button>`;
    }
  })}`;
});
export {
  CldUploadButton as C
};
