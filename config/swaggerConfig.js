const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TaskMaster API',
        version: '1.0.0',
        description: 'API documentation for the TaskMaster project',
      },
      servers: [
        {
          url: 'http://localhost:5000/api',
          description: 'Development server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Point to route files for documentation
  };
  
  module.exports = swaggerOptions;
  