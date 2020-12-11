import { merge } from "model/utils";
import { omit } from "lodash";

const initialState = {};

export const stream_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "stream_reducer/SET":
      return merge({}, state, { ...payload });
    case "stream_reducer/REMOVE":
      return omit(state, [action.id]);
    default:
      return state;
  }
};
