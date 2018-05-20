// Simple React Native specific changes

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  api: {
    host: '192.168.1.3',
    port: 5000,
    protocol: 'http',
    version: '',
  },
  sessionTimeout: 45 * 60 * 1000,
  connectTimeout: 20 * 60 * 1000,
};
