import { apiGet, apiPost, apiDelete, apiPut } from './apiClient';

export const getActivitiesByCrop = async (cropId) => {
  return await apiGet(`/api/v1/activities/crop/${cropId}`);
};

export const createActivity = async (activity) => {
  return await apiPost('/api/v1/activities', activity);
};

export const updateActivity = async (id, activity) => {
  return await apiPut(`/api/v1/activities/${id}`, activity);
};

export const deleteActivity = async (id) => {
  return await apiDelete(`/api/v1/activities/${id}`);
};