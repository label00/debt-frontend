/**
 * Получение env-переменной
 * @throwable
 */
const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || '';
};

export const firebaseConfig = {
  apiKey: getEnvVar('REACT_APP_API_KEY'),
  authDomain: getEnvVar('REACT_APP_AUTH_DOMAIN'),
  projectId: getEnvVar('REACT_APP_PROJECT_ID'),
  storageBucket: getEnvVar('REACT_APP_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('REACT_APP_MESSAGING_SENDER_ID'),
  appId: getEnvVar('REACT_APP_APP_ID'),
};

export const API_URL = getEnvVar('REACT_APP_API_URL')
