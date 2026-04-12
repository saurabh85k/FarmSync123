import { apiGet, apiPost, apiDelete, apiPut } from './apiClient';

export const getCropsByFarm = async (farmId) => {
  return await apiGet(`/api/v1/crops/farm/${farmId}`);
};

export const createCrop = async (crop) => {
  return await apiPost('/api/v1/crops', crop);
};

export const updateCrop = async (id, crop) => {
  return await apiPut(`/api/v1/crops/${id}`, crop);
};

export const deleteCrop = async (id) => {
  return await apiDelete(`/api/v1/crops/${id}`);
};