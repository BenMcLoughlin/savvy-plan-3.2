/**  email
 * checks if it is a valid email
 *@param string
 *@returns boolean
 **/

export const email = (email) => !/\S+@\S+\.\S+/.test(email);

/**  password
 * checks if it is a valid password
 *@param string
 *@returns boolean
 **/
export const password = (password) => password.length < 6 || password.length > 20;

/**  passwordConfirm
 * checks if it is a valid passwordConfirm
 *@param string
 *@returns boolean
 **/
export const passwordConfirm = (formData) => formData.password !== formData.passwordConfirm;
