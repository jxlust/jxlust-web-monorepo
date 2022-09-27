/*
根据服务器发送的网址，匹配mime的编码格式
*/
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');

exports.staticServer = (req, res, root) => {
  fs.readFile(path.join(root, req.url), (err, fileContent) => {
    if (err) {
      //没有找到文件
      res.writeHead(404, {
        'Content-Type': 'text/plain;charset=utf8',
      });
      res.end('服务器已经搬家了，请联系管理员.....');
    } else {
      let dtype = 'text/html';
      //获得请求文件的后缀
      let ext = path.extname(req.url);
      //如果请求的文件后缀能在minme.json文件中找到，就会获取准确的响应格式
      if (mime[ext]) {
        dtype = mime[ext];
      }
      //如果文件内容是文本，就设置utf8编码
      if (dtype.startsWith('text')) {
        dtype += ';charset=utf8';
      }
      //设置响应头信息
      res.writeHead(200, {
        'content-Type': dtype,
      });
      res.end(fileContent); //输出文件内容
    }
  });
};
