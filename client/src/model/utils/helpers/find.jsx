/** find
 * Iterates over an array to find the object with the same properties as the object given as the second argument
 *@param array an array that contains objects
 *@param queryObject an object containing the values for which you'd like to search
 *@returns the object found
 **/

// export function find(arr: , obj: Partial): T {
//   return arr.find((d) =>
//     Object.entries(obj)
//       .map(([k, v]) => d[k] === v)
//       .every((b) => b)
//   );
// }

function find(collection, query) {
  const filterArray = (arr) =>
    arr.find((d) =>
      Object.entries(query)
        .map(([k, v]) => d[k] === v)
        .every((b) => b)
    );

  if (Array.isArray(collection)) {
    return filterArray(collection);
  }
  if (typeof collection === "object") {
    return filterArray(Object.values(collection));
  }
}

export { find };

// export { find }
