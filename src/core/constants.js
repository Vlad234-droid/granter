// APP CONSTATNS
const app = {
  APP_NAME: 'Angle2 React Boilerplate',

  API_URL: process.env.APP_URL,

  BUGSNAG_KEY: '',
  GOOGLE_MAPS_KEY: '',

  AUTH_KEY: 'auth-key',
  LOCALSTORAGE_EXPIRES_KEY: 'session-token-expiry',
  LOCALSTORAGE_EXPIRES_TIME: 1000, // minutes
};

export const validZero = /^[1-9][0-9]*$/;
export const validWithZero = /^[0-9]+$/;

export default app;
