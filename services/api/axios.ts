import axios from "axios";
import { deleteCookie } from "cookies-next";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("odo-access-token");
    if (accessToken) {
      config.headers["auth-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.data.message === "Token refresh" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["auth-token"] = token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("odo-refresh-token");

      return new Promise((resolve, reject) => {
        axios
          .get(baseURL + "/users/refresh", {
            headers: {
              "refresh-token": refreshToken,
            },
          })
          .then(({ data }) => {
            localStorage.setItem("odo-access-token", data.accessToken);
            axiosInstance.defaults.headers.common["auth-token"] =
              data.accessToken;
            originalRequest.headers["auth-token"] = data.accessToken;
            processQueue(null, data.accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            if (err.response && err.response.data.message === "Token refresh") {
              localStorage.removeItem("odo-store");
              localStorage.removeItem("odo-access-token");
              localStorage.removeItem("odo-refresh-token");
              deleteCookie("odo-access-token");
              window.location.href = "/";
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
