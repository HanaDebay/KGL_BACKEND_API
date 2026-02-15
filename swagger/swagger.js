const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Karibu Groceries LTD API',
      version: '1.0.0',
      description:'API documentation for Karibu Groceries LTD'
    },
    components:{
        securitySchemes:{
            bearerAuth:{
                type:'http',
                scheme:'bearer',
                bearerFormat:'JWT'
            }
        }
    }
},
//tells Swagger to read documentation inside my routes folder
  apis: ['./routes/*.js'], 
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;