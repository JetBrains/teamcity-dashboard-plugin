// flow-typed signature: 5136ea3d3e94ffb83ddb8f6c1046b850
// flow-typed version: c6154227d1/clamp-js_v0.7.x/flow_>=v0.104.x

type npm$clampJs$ClampOptions = {
  clamp?: number | string,
  useNativeClamp?: boolean,
  truncationChar?: string,
  truncationHTML?: string,
  splitOnChars?: Array<string>,
  animate?: boolean,
  ...
};

declare module "clamp-js" {
  declare module.exports: (
    element: HTMLElement,
    options?: npm$clampJs$ClampOptions
  ) => void;
}
