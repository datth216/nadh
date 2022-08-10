import axiosClient from './axiosClient';

const userApi = {
    getAll(params) {
        const url = 'api/candidates';
        return axiosClient.get(url, { params });
    },
    getById(id) {
        const url = `api/candidates/${id}`;
        return axiosClient.get(url);
    },
}

export default userApi;