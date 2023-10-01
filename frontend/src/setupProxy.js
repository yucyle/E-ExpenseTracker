// import { createProxyMiddleware } from 'http-proxy-middleware'
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://expensetracker-backend-foth.onrender.com', // Replace with your backend URL
      changeOrigin: true,
    })
  );
  
};