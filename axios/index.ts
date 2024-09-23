import axios from "axios";

import { toast } from "react-toastify";
import { routes } from "../routes";
import { AUTH_SERVICE_BASE_URL, TESTING } from "../utils/constants";
import TokenService from "./tokenservice";

const baseURL = TESTING ? "http://server.skylarklabs.ai:8096" : "http://prodserver.skylarklabs.ai";

const loginEndpoint = AUTH_SERVICE_BASE_URL + "/auth/accounts/token/";
const refreshEndpoint = AUTH_SERVICE_BASE_URL + "/auth/accounts/token/refresh/";

let isRefreshing: boolean = false;
let failedQueue: Array<any> = [];
let consecutiveFailures: number = 0;
let toastTimeout: any = null;

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: baseURL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    consecutiveFailures = 0;
    clearTimeout(toastTimeout);
    return res;
  },
  async (err) => {
    consecutiveFailures++;
    clearTimeout(toastTimeout);

    if (err.code === "ERR_NETWORK") {
      if (consecutiveFailures >= 2) {
        toast.error("Apologies for the inconvenience, we will be back soon.");
        consecutiveFailures = 0;
      } else {
        toastTimeout = setTimeout(() => {
          toast.error("Apologies for the inconvenience, we will be back soon.");
          consecutiveFailures = 0;
        }, 10 * 1000);
      }
    }

    const originalConfig = err.config;

    if (
      originalConfig.url !== loginEndpoint &&
      // originalConfig.url !== registerEndpoint &&
      err.response
    ) {
      // For no permission issues
      // if (err.response.status === 403) {
      //   if (err?.response?.data?.error) {
      //     toast.error(`${err.response.data.error}\nContact Administrator!`);
      //   } else if (Object.keys(err.response.data).length>0) {
      //     const errors: Array<any> = Object.entries(err.response.data);
      //     errors.forEach((errorItem) => {
      //       console.log("errorItem", errorItem);
      //       if (errorItem[0] === "error") {
      //         toast.error(errorItem[1]);
      //       } else if (errorItem[0] === "detail") {
      //         toast.error(errorItem[1]);
      //       } else {
      //         toast.error(`${errorItem[0]}: ${errorItem[1]}`);
      //       }
      //     });
      //   } else {
      //     toast.error("Permission Denied \n Contact Adminstartor");
      //   }
      // }

      if (err.response.status === 403) {
        if (err?.response?.data?.error) {
          toast.error(`${err.response.data.error}\nContact Administrator!`);
        } else {
          toast.error(`Permission Denied, \nContact Administrator!`);
        }
      }

      if (err.response.status === 500) {
        toast.error("Internal Server Issue!");
      }

      // For 400 bas request responses
      // && err?.response?.data?.non_field_errors
      // toast.error(`${err.response.data.non_field_errors}`);
      if (err.response.status === 400) {
        const errors: Array<any> = Object.entries(err.response.data);
        errors.forEach((errorItem) => {
          console.log("errorItem", errorItem);
          if (errorItem[0] === "error") {
            toast.error(errorItem[1]);
          } else if (errorItem[0] === "detail") {
            toast.error(errorItem[1]);
          } else {
            toast.error(`${errorItem[0]}: ${errorItem[1]}`);
          }
        });
      }

      if (err.response.status === 401 && originalConfig.url === refreshEndpoint) {
        // Access Token was expired
        return Promise.reject(err);
      }
      if (err.response.status === 401 && !originalConfig._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;
              return axiosInstance(originalConfig);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalConfig._retry = true;
        isRefreshing = true;
        try {
          const rs = await axiosInstance.post(refreshEndpoint, {
            refresh: TokenService.getLocalRefreshToken(),
          });
          const { access } = rs.data;

          TokenService.updateLocalAccessToken(access);

          processQueue(null, access);
          return axiosInstance(originalConfig);
        } catch (_error) {
          processQueue(_error, null);
          TokenService.removeCurrentUser();
          TokenService.removeToken();
          window.location.pathname = routes.login.path;
          return Promise.reject(_error);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(err);
  }
);
export default axiosInstance;
