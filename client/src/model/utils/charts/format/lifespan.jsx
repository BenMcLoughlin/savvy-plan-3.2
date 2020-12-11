import lifespanData from "data/LifeSpanData.json";
/**  format.lifespan
 * takes data in json format showing the survival rates of men and women, estimated for 2025  and
 * converts it into data that the area chart can read. To be read it must have a year for each object
 * and to make it stacked the higher number must have the lower value subtracted from it.
 *@param none lifespan data is held in the data json folder
 *@returns an array of objects with year and values that can be used in a stacked area chart
 **/

export const lifespan = (state, user) => {
  //data retrieved from https://www.osfi-bsif.gc.ca/Eng/oca-bac/as-ea/Pages/mpsspc.aspx

  const data = lifespanData.map((d) => {
    return {
      year: d.age,
      male: d.men2025,
      female: d.women2025 - d.men2025,
    };
  });

  return { chartData: data, rawData: lifespanData, state, user };
};
