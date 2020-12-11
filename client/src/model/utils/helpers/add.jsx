import { merge } from "model/utils/index";

export const add = (target, source) => merge({}, target, source);
