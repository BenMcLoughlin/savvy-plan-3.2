import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { stream_reducer } from "model/redux/reducers/stream_reducer";
import user_reducer from "model/redux/reducers/user_reducer";
import ui_reducer from "model/redux/reducers/ui_reducer";
import { auth_reducer } from "model/redux/reducers/auth_reducer";
import { calc_reducer } from "model/redux/reducers/calc_reducer";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth_reducer", "calc_reducer", "stream_reducer", "ui_reducer", "user_reducer"],
  transforms: [
    encryptTransform({
      secretKey: `${process.env.LOCAL_STORAGE_PASSWORD}`,
      onError: function (error) {
        console.log(error.message);
      },
    }),
  ],
};

const root_reducer = combineReducers({
  auth_reducer,
  calc_reducer,
  stream_reducer,
  ui_reducer,
  user_reducer,
});

export default persistReducer(persistConfig, root_reducer);
