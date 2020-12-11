/** format.nestEgg
 * formates data for a donut chart showing the optimum values for the user to retire with in their savings
 *takes the values that have been stored in the calc_reducer when the income forcast function was fired.
 *@param
 *@returns
 **/

export const nestEgg = (state) => {
  const { calc_reducer, ui_reducer, user_reducer } = state;

  const { users } = ui_reducer;
  const searchValues = ["rrspNestEgg", "tfsaNestEgg", "nregNestEgg"];
  const data = users.reduce(
    (a, user) =>
      a.concat(
        searchValues.map((v) => ({
          owner: user_reducer[user].firstName,
          account: v.slice(0, 4),
          income: calc_reducer[user][v.slice(0, 4) + "Inc"],
          value: calc_reducer[user][v],
        }))
      ),
    []
  );
  return { chartData: data, rawData: null };
};
