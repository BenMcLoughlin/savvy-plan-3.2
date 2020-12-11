import { assumptions } from "controller/assumptions/assumptions.controller";
import { store } from "index";

export const assumptions_props = () => {
  const state = store.getState();
  const { isMarried } = state.ui_reducer;
  const q = [];

  return q;
};
