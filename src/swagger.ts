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
        url: 'http://localhost:3000/api',
        description: 'Bitezy local erver',
      },
      {
        url: 'https://api.bitezy.online/api',
        description: 'Bitezy DEV Server',
      }
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
