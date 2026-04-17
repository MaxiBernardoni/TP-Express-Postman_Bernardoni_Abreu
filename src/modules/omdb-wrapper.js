/* Módulo OMDBWrapper */

import axios from "axios";

const APIKEY = "6a0210f1"; // poné la tuya

const OMDBSearchByPage = async (searchText, page = 1) => {

  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const response = await axios.get(url);

    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = parseInt(response.data.totalResults);
      returnObject.datos = response.data.Search;
    }

  } catch (error) {
    console.error("Error en OMDBSearchByPage:", error.message);
  }

  return returnObject;
};


const OMDBSearchComplete = async (searchText) => {

  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
      const response = await axios.get(url);

      if (response.data.Response === "True") {
        returnObject.respuesta = true;

        const totalResults = parseInt(response.data.totalResults);
        returnObject.cantidadTotal = totalResults;

        totalPages = Math.ceil(totalResults / 10);

        returnObject.datos = [
          ...returnObject.datos,
          ...response.data.Search
        ];
      }

      page++;
    }

  } catch (error) {
    console.error("Error en OMDBSearchComplete:", error.message);
  }

  return returnObject;
};


const OMDBGetByImdbID = async (imdbID) => {

  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {}
  };

  try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    const response = await axios.get(url);

    if (response.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = 1;
      returnObject.datos = response.data;
    }

  } catch (error) {
    console.error("Error en OMDBGetByImdbID:", error.message);
  }

  return returnObject;
};


export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };