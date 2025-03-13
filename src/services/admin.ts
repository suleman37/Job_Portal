import api from './axiosInstance';

// ✅ Fetch all users (Admin)
export const getAllUsers = () => api.get('admin/users/');

// ✅ Delete user by ID (Admin)
export const deleteUser = (id: number) => api.delete(`admin/user/${id}/`);

// ✅ Fetch Admin stats
export const getAdminStats = () => api.get('admin/stats/');
