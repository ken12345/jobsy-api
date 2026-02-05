import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bitezy API',
      version: '1.0.0',
      description: 'Bitezy API for both customer and admin',
    },
    servers: [
      {
        url: 'http://localhost:5152/api',
        description: 'Bitezy local erver',
      },
      {
        url: 'https://api.bitezy.online/api',
        description: 'Bitezy DEV Server',
      }
    ],

    components: {
      securitySchemes: {
        ApiKeyAuth: { // Arbitrary name
          type: 'apiKey',
          in: 'header',
          name: 'X-API-KEY', // The header name
        },
      },
    },
    security: [{ ApiKeyAuth: [] }], 
  },

  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
