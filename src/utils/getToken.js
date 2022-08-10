function getToken() {
    const accessToken = JSON.parse(localStorage.getItem('auth'));
    return accessToken?.token;
}

export { getToken }