/** filter
 * Iterates over a collection which could be an object or an array to find the object with the same properties as the query
 *@param collection an array or an object
 *@param queryObject an object containing the values for which you'd like to search
 *@returns the object found
 **/

function filter(collection, query) {
  const filterArray = (arr) =>
    arr.filter((d) =>
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

export { filter };
