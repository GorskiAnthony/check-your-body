import axios from "axios";

class AxiosSingleton {
  constructor() {
    if (!AxiosSingleton.instance) {
      this.instance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000",
        withCredentials: true,
      });
    }
  }

  getInstance() {
    return this.instance;
  }
}

const instance = new AxiosSingleton().getInstance();
export default instance;
