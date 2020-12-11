import { adjustOas } from "model/utils";
import _ from "lodash";

/** format.oas
 * formats data to be used in the oas chart.
 * each object has a year and is adjusted for the oas amount
 *@param state
 *@param user
 *@returns array of data formatted for the oas chart
 **/

export const oas = (state, user) => {
  const data = _.range(65, 71).map((age) => ({
    year: age,
    user: user,
    value: adjustOas(7200, age),
  }));
  return { chartData: data, rawData: null, state, user };
};
