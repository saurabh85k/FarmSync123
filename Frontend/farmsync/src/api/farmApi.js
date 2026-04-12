import { apiGet, apiPost, apiDelete, apiPut } from './apiClient';

export const getMyFarms = async () => {
  return await apiGet('/api/v1/farms/my');
};

export const createFarm = async (farm) => {
  return await apiPost('/api/v1/farms', farm);
};

export const updateFarm = async (id, farm) => {
  return await apiPut(`/api/v1/farms/${id}`, farm);
};

export const deleteFarm = async (id) => {
  return await apiDelete(`/api/v1/farms/${id}`);
};