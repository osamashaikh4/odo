import axios from "./axios";

export const getCountries = () =>
  axios.get("/enums/countries").then((res) => res.data);

export const getStates = () =>
  axios.get("/enums/states?countryCode=SA").then((res) => res.data);

export const getCities = () =>
  axios.get("/enums/cities?countryCode=SA").then((res) => res.data);

export const uploadImage = (formData: FormData) =>
  axios
    .post("/users/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
