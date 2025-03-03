import axios from "./axios";

export const uploadAsset = (formData: FormData) => {
  return axios
    .post(`/asset-upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
