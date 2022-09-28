/*
登录验证
http://localhost:3000/www/list.html
http://localhost:3000/www/data.xml
http://localhost:3000/www/about.html
http://localhost:3000/www/login.html
http://localhost:3000/www/logo.png
*/
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const ss = require('./tool.js'); //引入文件

http
  .createServer((req, res) => {
    //启动静态资源服务
    if (req.url.startsWith('/www')) {
      ss.staticServer(req, res, __dirname);
    } else if (req.url.startsWith('/login')) {
      //动态资源
      //get请求
      if (req.method == 'GET') {
        let param = url.parse(req.url, true).query; //获取的是对象
        if (param.username == 'admin' && param.password == '123') {
          res.end('get login success');
        } else {
          res.end('get login fail');
        }
      }
      //post 请求
      if (req.method == 'POST') {
        let pdata = '';
        req.on('data', (chunk) => {
          pdata += chunk;
        });
        req.on('end', () => {
          let obj = querystring.parse(pdata);
          console.log('obj:', obj);
          if (obj.username == 'admin' && obj.password == '123') {
            res.end('post login success');
          } else {
            res.end('post login fail');
          }
        });
      }
    }
    console.log(req.url);
  })
  .listen(3000, () => {
    console.log('success running......');
  });
