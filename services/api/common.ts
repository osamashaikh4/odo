import axios from "./axios";

export const getCountries = () =>
  axios.get("/enums/countries").then((res) => res.data);

export const getStates = () =>
  axios.get("/enums/states?countryCode=SA").then((res) => res.data);

export const getCities = (state?: string) =>
  axios
    .get("/enums/cities?countryCode=SA" + (state ? `&stateCode=${state}` : ""))
    .then((res) => res.data);

export const getDistricts = (city?: string) =>
  axios.get("/enums/districts?cityName=" + city).then((res) => res.data);

export const uploadImage = (formData: FormData) =>
  axios
    .post("/users/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const getEntityFilters = (entity: string, column: string) =>
  axios.get("/enums/" + entity + "?column=" + column).then((res) => res.data);
