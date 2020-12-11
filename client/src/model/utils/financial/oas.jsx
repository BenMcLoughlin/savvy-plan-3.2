import * as u from "model/utils";

/** oas
 * calculates the users potential oas payment using todays oas payment at 65
 *@param fnState the state of he income forcast function which includes redux state as well as the forcast of the users income by year
 *@param user
 *@returns a single number which is the estimated benefits payment at 65
 **/

export const oas = ({ user_reducer }, user) => {
  if (user_reducer) {
    const { oasStartAge } = user_reducer[user];
    const returnValue = u.adjustOas(7200, oasStartAge);
    return { oas: returnValue };
  }
};
