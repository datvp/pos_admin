// Simple React Native specific changes

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  api: {
    host: '192.168.1.4',
    port: 3000,
    protocol: 'http',
    version: '',
  },
  sessionTimeout: 45 * 60 * 1000,
  connectTimeout: 20 * 60 * 1000,
};
