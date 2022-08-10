import axiosClient from './axiosClient';

const locationApi = {
    getAll() {
        const url = 'api/locations';
        return axiosClient.get(url);
    },
}

export default locationApi;