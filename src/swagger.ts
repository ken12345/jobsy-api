import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'smartMe API',
      version: '1.0.0',
      description: 'smartMe API for both customer and admin',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'smartMe Dev Server',
      },
      {
        url: 'http://72.61.119.52:5000/api',
        description: 'smartMe Dev Server',
      }
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
