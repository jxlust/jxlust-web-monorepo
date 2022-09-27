import { DoubleFlagStatus } from "./status";
export const UPDATE_MODEL_VALUE = "update:modelValue";
export const SURE_EVENT = "sure";
export const CLOSE_EVENT = "close";

export const INJECTION_TAGS = Symbol();

export const WhiteBlackFlagOptions = [
  {
    key: DoubleFlagStatus.NONE,
    value: "无",
  },
  {
    key: DoubleFlagStatus.WHITE,
    value: "白名单",
  },
  {
    key: DoubleFlagStatus.BLACK,
    value: "黑名单",
  },
];
