"use strict";
(self["webpackChunkgitroasted_launch_video"] = self["webpackChunkgitroasted_launch_video"] || []).push([[477],{

/***/ 4477
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoMattingModal: () => (/* binding */ VideoMattingModal)
/* harmony export */ });
/* harmony import */ var _index_7tt71e8n_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6429);
/* harmony import */ var _index_mww32xc8_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2766);
/* harmony import */ var _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1889);
/* harmony import */ var _index_9x6e1dq0_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3651);
/* harmony import */ var _index_41kqns5c_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1235);
/* harmony import */ var _index_hbezgbbq_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5136);
/* harmony import */ var _index_jrw61pkj_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8336);
/* harmony import */ var _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6759);
/* harmony import */ var _index_5zrb1ft4_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6703);
/* harmony import */ var _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9722);
/* harmony import */ var _index_rcv7qkt5_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2126);
/* harmony import */ var _remotion_studio_shared__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3872);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6540);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4848);













// src/components/VideoMatting/VideoMattingModal.tsx




var MODELS = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
var controlStyle = { width: 330, maxWidth: "100%" };
var panelStyle = {
  ..._index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .optionsPanel */ .Z6,
  flexDirection: "column",
  paddingTop: 16
};
var modalStyle = {
  ..._index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .outerModalStyle */ .uT,
  height: "auto",
  maxHeight: "calc(100vh - 40px)",
  minHeight: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .outerModalStyle */ .uT.height,
  outline: "none"
};
var modalLayout = {
  ..._index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .horizontalLayout */ .D6,
  flex: "1 1 auto"
};
var hiddenPanel = { display: "none" };
var validationStyle = { padding: "0 16px 8px" };
var makeOptions = ({
  items,
  selected,
  setSelected
}) => items.map(({ id, label: optionLabel }) => ({
  type: "item",
  id,
  value: id,
  label: optionLabel,
  leftItem: id === selected ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkmark */ .MGO, {}) : null,
  keyHint: null,
  quickSwitcherLabel: null,
  subMenu: null,
  disabled: false,
  onClick: () => setSelected(id)
}));
var VideoMattingModal = ({
  displayName,
  src
}) => {
  const [tab, setTab] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)("separate");
  const isModelCached = (0,react__WEBPACK_IMPORTED_MODULE_13__.useCallback)((selectedModel) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model: selectedModel }), []);
  const cachedModels = (0,_index_7tt71e8n_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useModelCacheStatus */ .X)({
    isModelCached,
    models: MODELS,
    refreshKey: tab
  });
  const baseName = (0,react__WEBPACK_IMPORTED_MODULE_13__.useMemo)(() => (0,_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getDefaultOutputBaseName */ .Jjl)(src, displayName, "video"), [displayName, src]);
  const [baseOutName, setBaseOutName] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(`${baseName}-base.webm`);
  const [foregroundOutName, setForegroundOutName] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(`${baseName}-foreground.webm`);
  const [model, setModel] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)("ben2-base");
  const [audio, setAudio] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)("base");
  const [videoBitrate, setVideoBitrate] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)("very-high");
  const [support, setSupport] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)({ type: "checking" });
  const staticFiles = (0,_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useStaticFiles */ .JM3)();
  const { addVideoMattingJob, videoMattingJobs } = (0,react__WEBPACK_IMPORTED_MODULE_13__.useContext)(_index_9x6e1dq0_mjs__WEBPACK_IMPORTED_MODULE_3__/* .RenderQueueContext */ .x7);
  const { setSelectedModal } = (0,react__WEBPACK_IMPORTED_MODULE_13__.useContext)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SetSelectedModalContext */ .Mqz);
  const { setSidebarCollapsedState } = (0,react__WEBPACK_IMPORTED_MODULE_13__.useContext)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SidebarContext */ .I0U);
  (0,react__WEBPACK_IMPORTED_MODULE_13__.useEffect)(() => {
    let cancelled = false;
    setSupport({ type: "checking" });
    Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }).then((result) => {
      if (!cancelled) {
        setSupport(result.supported ? { type: "supported" } : { type: "unsupported", message: result.detailedReason });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [model]);
  const normalizedBase = baseOutName.normalize("NFC").toLowerCase();
  const normalizedForeground = foregroundOutName.normalize("NFC").toLowerCase();
  const duplicateOutput = normalizedBase === normalizedForeground;
  const queuedOutputs = new Set(videoMattingJobs.filter((job) => job.status === "idle" || job.status === "running").flatMap((job) => [job.baseOutName, job.foregroundOutName]).map((name) => name.normalize("NFC").toLowerCase()));
  const baseError = (0,_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .validatePublicOutputName */ .MDu)({ extension: ".webm", outName: baseOutName }) ?? (duplicateOutput ? "Base and foreground outputs must be different" : queuedOutputs.has(normalizedBase) ? "Another video matting job is using this output file" : null);
  const foregroundError = (0,_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .validatePublicOutputName */ .MDu)({
    extension: ".webm",
    outName: foregroundOutName
  }) ?? (duplicateOutput ? "Base and foreground outputs must be different" : queuedOutputs.has(normalizedForeground) ? "Another video matting job is using this output file" : null);
  const baseExists = staticFiles.some((file) => file.name.normalize("NFC").toLowerCase() === normalizedBase);
  const foregroundExists = staticFiles.some((file) => file.name.normalize("NFC").toLowerCase() === normalizedForeground);
  const canSubmit = support.type === "supported" && baseError === null && foregroundError === null;
  const modelOptions = (0,react__WEBPACK_IMPORTED_MODULE_13__.useMemo)(() => makeOptions({
    items: MODELS.map((item) => ({
      id: item.name,
      label: `${item.name} · ${(0,_remotion_studio_shared__WEBPACK_IMPORTED_MODULE_11__/* .formatBytes */ .z3)(item.webGpuDownloadSize)}${cachedModels.has(item.name) ? " · Downloaded" : ""}`
    })),
    selected: model,
    setSelected: setModel
  }), [cachedModels, model]);
  const audioOptions = (0,react__WEBPACK_IMPORTED_MODULE_13__.useMemo)(() => makeOptions({
    items: [
      { id: "base", label: "Background layer" },
      { id: "foreground", label: "Foreground layer" },
      { id: "both", label: "Both layers" },
      { id: "none", label: "No audio" }
    ],
    selected: audio,
    setSelected: setAudio
  }), [audio]);
  const qualityOptions = (0,react__WEBPACK_IMPORTED_MODULE_13__.useMemo)(() => makeOptions({
    items: ["very-low", "low", "medium", "high", "very-high"].map((id) => ({
      id,
      label: id.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ")
    })),
    selected: videoBitrate,
    setSelected: setVideoBitrate
  }), [videoBitrate]);
  const submit = (0,react__WEBPACK_IMPORTED_MODULE_13__.useCallback)(() => {
    if (!canSubmit)
      return;
    addVideoMattingJob({
      src,
      displayName,
      baseOutName,
      foregroundOutName,
      model,
      audio,
      videoBitrate
    });
    setSidebarCollapsedState({ left: null, right: "expanded" });
    (0,_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .persistSelectedOptionsSidebarPanel */ .Gd8)("renders");
    _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionsSidebarTabs */ .nm0.current?.selectRendersPanel();
    setSelectedModal(null);
  }, [
    addVideoMattingJob,
    audio,
    baseOutName,
    canSubmit,
    displayName,
    foregroundOutName,
    model,
    setSelectedModal,
    setSidebarCollapsedState,
    src,
    videoBitrate
  ]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .DismissableModal */ .sbH, {
    ariaLabel: `Track matting ${displayName}`,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
      style: modalStyle,
      children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ModalHeader */ .rQ0, {
          title: `Track matting ${displayName}`
        }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .container */ .kL,
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
              style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .flexer */ .lw
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$nd, {
              disabled: !canSubmit,
              onClick: submit,
              title: support.type === "unsupported" ? support.message : undefined,
              style: {
                ..._index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .buttonStyle */ .i9,
                backgroundColor: canSubmit ? _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .buttonStyle */ .i9.backgroundColor : _index_k426ye99_mjs__WEBPACK_IMPORTED_MODULE_9__/* .BLUE_DISABLED */ .er
              },
              children: "Separate"
            })
          ]
        }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          style: modalLayout,
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .leftSidebar */ .K8,
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .VerticalTab */ .sMJ, {
                  autoFocus: true,
                  onClick: () => setTab("separate"),
                  renderIcon: (color) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                    style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .iconContainer */ .zc,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SeparationIcon */ .Ud, {
                      color,
                      style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .icon */ .Kk
                    })
                  }),
                  selected: tab === "separate",
                  style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .horizontalTab */ .So,
                  children: "Separate"
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .VerticalTab */ .sMJ, {
                  onClick: () => setTab("models"),
                  renderIcon: (color) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                    style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .iconContainer */ .zc,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ModelsIcon */ .oiI, {
                      color,
                      style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .icon */ .Kk
                    })
                  }),
                  selected: tab === "models",
                  style: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .horizontalTab */ .So,
                  children: "Models"
                })
              ]
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              style: tab === "separate" ? panelStyle : hiddenPanel,
              className: _index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .VERTICAL_SCROLLBAR_CLASSNAME */ .uV,
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_mww32xc8_mjs__WEBPACK_IMPORTED_MODULE_1__/* .RenderModalOutputName */ .O, {
                  ariaLabel: "Base video output file",
                  existingOutputPath: window.remotion_publicFolderExists ? `${window.remotion_publicFolderExists}/${baseOutName}` : null,
                  existence: baseExists,
                  inputStyle: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .input */ .hFB,
                  label: "Base output in public/",
                  onValueChange: (event) => setBaseOutName(event.target.value),
                  outName: baseOutName,
                  validationMessage: baseError
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_mww32xc8_mjs__WEBPACK_IMPORTED_MODULE_1__/* .RenderModalOutputName */ .O, {
                  ariaLabel: "Foreground video output file",
                  existingOutputPath: window.remotion_publicFolderExists ? `${window.remotion_publicFolderExists}/${foregroundOutName}` : null,
                  existence: foregroundExists,
                  inputStyle: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .input */ .hFB,
                  label: "Foreground output in public/",
                  onValueChange: (event) => setForegroundOutName(event.target.value),
                  outName: foregroundOutName,
                  validationMessage: foregroundError
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .RenderModalHr */ .YbN, {}),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                  style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
                  children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                      style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
                      children: "Model"
                    }),
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                      style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Combobox */ .G3_, {
                        values: modelOptions,
                        selectedId: model,
                        title: "Model",
                        style: controlStyle
                      })
                    })
                  ]
                }),
                support.type === "unsupported" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  style: validationStyle,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_0x13f28h_mjs__WEBPACK_IMPORTED_MODULE_7__/* .ValidationMessage */ .Xl, {
                    align: "flex-end",
                    message: support.message,
                    type: "error"
                  })
                }) : null,
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                  style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
                  children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                      style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
                      children: "Audio"
                    }),
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                      style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Combobox */ .G3_, {
                        values: audioOptions,
                        selectedId: audio,
                        title: "Audio",
                        style: controlStyle
                      })
                    })
                  ]
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                  style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
                  children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                      style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
                      children: "Video quality"
                    }),
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                      style: _index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
                      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_ggqpre9v_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Combobox */ .G3_, {
                        values: qualityOptions,
                        selectedId: String(videoBitrate),
                        title: "Video quality",
                        style: controlStyle
                      })
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_index_hbezgbbq_mjs__WEBPACK_IMPORTED_MODULE_5__/* .Models */ .B, {
              description: `Models are downloaded automatically when needed.
You can also manage the browser cache here.`,
              indent: true,
              visible: tab === "models"
            })
          ]
        })
      ]
    })
  });
};



/***/ },

/***/ 6429
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ useModelCacheStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
// src/components/use-model-cache-status.ts

var useModelCacheStatus = ({
  isModelCached,
  models,
  refreshKey
}) => {
  const [cachedModels, setCachedModels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Set);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let cancelled = false;
    Promise.all(models.map(async ({ name }) => ({
      cached: await isModelCached(name),
      name
    }))).then((results) => {
      if (!cancelled) {
        const nextCachedModels = new Set;
        for (const result of results) {
          if (result.cached) {
            nextCachedModels.add(result.name);
          }
        }
        setCachedModels(nextCachedModels);
      }
    }).catch(() => {
      if (!cancelled) {
        setCachedModels(new Set);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isModelCached, models, refreshKey]);
  return cachedModels;
};




/***/ },

/***/ 5136
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ Models)
/* harmony export */ });
/* harmony import */ var _index_jrw61pkj_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8336);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6540);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4848);


// src/components/VideoMatting/Models.tsx



var AVAILABLE_MODELS = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
var Models = ({ description, indent, visible }) => {
  const isModelCached = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  const loadModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model, onProgress) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
    model,
    onProgress: (progress) => onProgress(progress.progress)
  }), []);
  const removeModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index_jrw61pkj_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ModelManager */ .P, {
    ariaLabel: "Video matting models",
    availableModels: AVAILABLE_MODELS,
    description,
    indent,
    isModelCached,
    loadModel,
    prepare: null,
    removeModel,
    visible
  });
};




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




/***/ }

}]);
//# sourceMappingURL=477.bundle.js.map