import axios from "axios";

const walletApi = axios.create({
   baseURL: "http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com",
});

export default walletApi;
