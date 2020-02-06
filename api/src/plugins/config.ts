import * as HapiSwagger from 'hapi-swagger';

export default {
  swagger: {
    info: {
      title: 'Worker API Documentation',
      version: '0.0.2'
    },
    basePath: '/',
    documentationPath: '/docs',
    sortEndpoints: 'ordered'
  } as HapiSwagger.RegisterOptions
};
