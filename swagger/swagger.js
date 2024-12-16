import dotenv from 'dotenv';
dotenv.config();
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for my Node.js app',
        },
        servers: [
            {
                url: `${'http://localhost:5000'}`,
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [
        '../backend-application/routes/nav-controller/*.js',
        '../backend-application/routes/logo/*.js',
        '../backend-application/routes/body/*.js',
        '../backend-application/routes/nav-controller/color/*.js',
        '../backend-application/routes/body/pages/*.js',
        '../backend-application/routes/pages/*.js',
        '../docs/*.yaml',
    ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
