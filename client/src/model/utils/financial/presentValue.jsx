/** present value 
* formula PV = FutureValue / (1 + rate) to the power of number
 *@param number number of periods
 *@param rate rate used in calculation
 *@param futureValue rate used in calculation

 *@returns 
**/

export const presentValue = (number, rate, futureValue) => futureValue / (1 + rate) ** number;
