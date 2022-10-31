const { createProxyMiddleware } = require("http-proxy-middleware");

// 해당 어플리케이션에서 /api 로 시작되는 endpoint 가 서버에 어떠한 통신을 요청한 경우 
// proxy 서버가 중계 역할을 하며 target으로 지정한 {통신할 서버 주소} 로 통신하면서 서버를 우회함을 의미한다.
module.exports = function(app) {
  app.use(
  '/api',
    createProxyMiddleware({
      target: 'http://3.39.232.96:8080',
      changeOrigin: true,
    })
  );
};