import axios from "axios";

const fetchWalletApi = () => {
    const defaultOptions = {
        baseURL: process.env.REACT_APP_API_URL,
    };

    // axios instance
    let walletApiInstance = axios.create(defaultOptions);

    // Set auth token for any request
    walletApiInstance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return walletApiInstance;
};

export default fetchWalletApi();
