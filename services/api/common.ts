import axios from "./axios";

export const uploadImage = (formData: FormData) =>
  axios
    .post("/users/upload.php?justUpload=true", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
