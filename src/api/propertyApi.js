import axiosClient from './axiosClient';

const propertyApi = {
    getPositionList() {
        const url = 'api/property_values?property_name=position';
        return axiosClient.get(url);
    },

    getNationalityList() {
        const url = 'api/property_values?property_name=nationality';
        return axiosClient.get(url);
    },
}

export default propertyApi;