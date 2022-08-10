import axios from 'axios';

const login = async ({ user_name, password }) => {
    try {
        const data = await axios
            .post('https://lubrytics.com:8443/nadh-api-crm/login', { user_name, password })
            .then((response) => {
                localStorage.setItem('auth', JSON.stringify(response.data));
            });

        return data;
    } catch (error) {
        console.log(error);
    }

};

export { login };
