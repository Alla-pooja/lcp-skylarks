import { objectToFormData } from "../utils/helper";
import axiosInstance from "./index";

export const postAPI = (url: string, data?: Record<string, any>, config: Record<string, any> = {}, asFormData: boolean = false): Promise<any> => {
  let requestData = {};
  if (asFormData) {
    requestData = objectToFormData(data);
  } else {
    requestData = data || {};
  }
  return axiosInstance.post(`${url}`, requestData, config);
};

export const getAPI = (url: string, ...rest: any[]): Promise<any> => {
  return axiosInstance.get(`${url}`, ...rest);
};

export const deleteAPI = (url: string, ...rest: any[]): Promise<any> => {
  return axiosInstance.delete(`${url}`, ...rest);
};

export const patchAPI = (url: string, data?: Record<string, any>, config: Record<string, any> = {}, asFormData: boolean = false): Promise<any> => {
  let requestData = {};
  if (asFormData) {
    requestData = objectToFormData(data);
  } else {
    requestData = data || {};
  }
  return axiosInstance.patch(`${url}`, requestData, config);
};

