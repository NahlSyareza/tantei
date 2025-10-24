import axios from "axios";

// Development
// const URL = axios.create({ baseURL: "http://localhost:3001" });

// Production
// const URL = axios.create({ baseURL: "http://192.168.18.131:3001" });

const URL = axios.create({ baseURL: "http://100.117.82.121:3001" });
// const URL = axios.create({ baseURL: "http://tantei_be:3001" });

export { URL };
