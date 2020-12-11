import { merge } from "model/utils";

const initialState = {
  colorIndex: 0,
  changeRateAssumptions: false,
  changeRetirementAssumptions: false,
  chartStartYear: 2007,
  chartEndYear: 2095,
  dualSelectValue: true,
  hasChildren: true,
  isMarried: true,
  progress: 0,
  selectedAccount: "tfsa",
  selectedId: "dummy",
  selectedScenario: 1,
  selectedPage: "savings",
  showTargetIncome: true,
  selectedUser: "user1",
  scenarios: {
    [1]: "basic",
  },
  users: ["user1"],
};

export default function ui_reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "ui_reducer/SET":
      return merge({}, state, { ...payload });
    default:
      return state;
  }
}
