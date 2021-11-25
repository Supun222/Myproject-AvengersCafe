import axios from "axios";

const instance = axios.create({
    baseURL: "http://avengerscafebackend-env.eba-4k2yn9bw.us-east-2.elasticbeanstalk.com"
})

export default instance;