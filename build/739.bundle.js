"use strict";
(self["webpackChunkgitroasted_launch_video"] = self["webpackChunkgitroasted_launch_video"] || []).push([[739],{

/***/ 1739
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _index_vsxrxfpj_mjs__WEBPACK_IMPORTED_MODULE_0__.B)
/* harmony export */ });
/* harmony import */ var _index_vsxrxfpj_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3452);
/* harmony import */ var _index_jrw61pkj_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8336);
/* harmony import */ var _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6759);
/* harmony import */ var _index_5zrb1ft4_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6703);
/* harmony import */ var _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9722);
/* harmony import */ var _index_rcv7qkt5_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2126);









/***/ },

/***/ 8336
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ ModelManager)
/* harmony export */ });
/* harmony import */ var _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6759);
/* harmony import */ var _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9722);
/* harmony import */ var _remotion_studio_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3872);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6540);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4848);



// src/components/ModelManager.tsx



var modelPanel = {
  ..._index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .optionsPanel */ .Z6,
  flexDirection: "column"
};
var hiddenPanel = { display: "none" };
var container = {
  boxSizing: "border-box",
  flex: 1,
  fontFamily: "sans-serif",
  minWidth: 0,
  padding: "16px 16px 0",
  width: "100%"
};
var flushContainer = {
  ...container,
  padding: "16px 0 0"
};
var descriptionStyle = {
  color: _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_1__/* .LIGHT_TEXT */ .hf,
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  whiteSpace: "pre-line"
};
var list = { marginTop: 14 };
var modelRow = {
  alignItems: "center",
  borderBottom: _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_1__/* .BORDER_WHITE_ALPHA_12 */ .WY,
  display: "flex",
  gap: 10,
  minHeight: 38,
  padding: "0 10px"
};
var lastModelRow = {
  ...modelRow,
  borderBottom: "none"
};
var statusIcon = {
  flexShrink: 0,
  height: 14,
  width: 14
};
var modelName = {
  color: _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_1__/* .WHITE */ .UE,
  flex: 1,
  fontFamily: "monospace",
  fontSize: 13,
  lineHeight: 1.4,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var status = {
  color: _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_1__/* .LIGHT_TEXT */ .hf,
  fontSize: 12,
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1.4,
  whiteSpace: "nowrap"
};
var actionIcon = { height: 14, width: 14 };
var actionSlot = {
  alignItems: "center",
  display: "inline-flex",
  flexShrink: 0,
  height: 24,
  justifyContent: "center",
  width: 24
};
var ModelManager = ({
  ariaLabel,
  availableModels,
  description,
  indent,
  isModelCached,
  loadModel,
  prepare,
  removeModel,
  visible
}) => {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(true);
  const initialized = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  const [cachedModels, setCachedModels] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const [actionState, setActionState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
    type: "idle"
  });
  const [cacheCheckError, setCacheCheckError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!visible || initialized.current) {
      return;
    }
    initialized.current = true;
    Promise.resolve().then(() => prepare?.()).then(() => Promise.all(availableModels.map(async ({ name }) => await isModelCached(name) ? name : null))).then((models) => {
      if (mounted.current) {
        const cached = new Set;
        for (const model of models) {
          if (model !== null) {
            cached.add(model);
          }
        }
        setCachedModels(cached);
      }
    }).catch((error) => {
      if (mounted.current) {
        setCachedModels(new Set);
        setCacheCheckError(error instanceof Error ? error.message : String(error));
      }
    });
  }, [availableModels, isModelCached, prepare, visible]);
  const downloadModel = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((model) => {
    setActionState({ type: "downloading", model, progress: 0 });
    loadModel(model, (progress) => {
      if (mounted.current) {
        setActionState({ type: "downloading", model, progress });
      }
    }).then(() => {
      if (mounted.current) {
        setCachedModels((current) => new Set([...current ?? [], model]));
        setActionState({ type: "idle" });
      }
    }).catch((error) => {
      if (mounted.current) {
        setActionState({
          type: "error",
          model,
          message: error instanceof Error ? error.message : String(error)
        });
      }
    });
  }, [loadModel]);
  const remove = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((model) => {
    setActionState({ type: "removing", model });
    removeModel(model).then(() => {
      if (mounted.current) {
        setCachedModels((current) => {
          const next = new Set(current ?? []);
          next.delete(model);
          return next;
        });
        setActionState({ type: "idle" });
      }
    }).catch((error) => {
      if (mounted.current) {
        setActionState({
          type: "error",
          model,
          message: error instanceof Error ? error.message : String(error)
        });
      }
    });
  }, [removeModel]);
  const renderDownloadIcon = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((color) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .CloudDownloadIcon */ .$w, {
      color,
      style: actionIcon
    });
  }, []);
  const renderRemoveIcon = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((color) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .TrashIcon */ .uc, {
      color,
      style: actionIcon
    });
  }, []);
  const actionInProgress = actionState.type === "downloading" || actionState.type === "removing";
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    style: visible ? modelPanel : hiddenPanel,
    className: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .VERTICAL_SCROLLBAR_CLASSNAME */ .uV,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      style: indent ? container : flushContainer,
      children: [
        description === null ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          style: descriptionStyle,
          children: description
        }),
        cacheCheckError ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ValidationMessage */ .Xl, {
          align: "flex-start",
          message: cacheCheckError,
          type: "error"
        }) : null,
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          style: description === null ? undefined : list,
          role: "list",
          "aria-label": ariaLabel,
          children: availableModels.map((model, index) => {
            const cached = cachedModels?.has(model.name) ?? false;
            const processingThisModel = actionState.type !== "idle" && actionState.type !== "error" && actionState.model === model.name;
            const progress = actionState.type === "downloading" && actionState.model === model.name ? actionState.progress : null;
            const modelStatus = processingThisModel ? actionState.type === "removing" ? "Removing…" : `Downloading${progress === null ? "…" : ` ${Math.round(progress * 100)}%`}` : actionState.type === "error" && actionState.model === model.name ? actionState.message : (0,_remotion_studio_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatBytes */ .z3)(model.webGpuDownloadSize);
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              role: "listitem",
              style: index === availableModels.length - 1 ? lastModelRow : modelRow,
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: modelName,
                  children: model.name
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: status,
                  title: modelStatus,
                  children: modelStatus
                }),
                cached ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .CheckCircleFilled */ .Pk, {
                  "aria-hidden": true,
                  style: { ...statusIcon, fill: _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_1__/* .BLUE */ .ft }
                }) : null,
                processingThisModel ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: actionSlot,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .Spinner */ .y$, {
                    duration: 0.5,
                    size: 14
                  })
                }) : cached ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .InlineAction */ .gs, {
                  disabled: actionInProgress,
                  onClick: () => remove(model.name),
                  renderAction: renderRemoveIcon,
                  title: `Remove ${model.name}`,
                  variant: null
                }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_0__/* .InlineAction */ .gs, {
                  disabled: cachedModels === null || actionInProgress,
                  onClick: () => downloadModel(model.name),
                  renderAction: renderDownloadIcon,
                  title: `Download ${model.name}`,
                  variant: null
                })
              ]
            }, model.name);
          })
        })
      ]
    })
  });
};




/***/ },

/***/ 3452
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ Models)
/* harmony export */ });
/* harmony import */ var _index_jrw61pkj_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8336);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6540);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4848);


// src/components/Transcription/Models.tsx



var AVAILABLE_MODELS = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
var Models = ({ description, indent, visible }) => {
  const isModelCached = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  const loadModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model, onProgress) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
    model,
    onProgress: (progress) => onProgress(progress.progress)
  }), []);
  const removeModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index_jrw61pkj_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ModelManager */ .P, {
    ariaLabel: "Whisper models",
    availableModels: AVAILABLE_MODELS,
    description,
    indent,
    isModelCached,
    loadModel,
    prepare: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    removeModel,
    visible
  });
};




/***/ }

}]);
//# sourceMappingURL=739.bundle.js.map