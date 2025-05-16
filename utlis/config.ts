// export const API_URL = "http://202.10.41.202:3000";
// export const API_URL = "https://87kc02hk-3306.asse.devtunnels.ms";
// export const API_URL = "https://87kc02hk-3000.asse.devtunnels.ms";
// export const API_URL = "http://202.10.41.202:80";
export const API_URL = "http://localhost:80";

export const FEATURE = true;

let addMode = false;

export function setAddMode(value: boolean) {
  addMode = value;
}

export function getAddMode() {
  return addMode;
}
