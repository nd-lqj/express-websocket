var express = require('express');
var expressWs = require('express-ws');

var router = express.Router();
expressWs(router);

/* GET webscoket page. */
router.get('/', function(req, res) {
  res.render('websocket', { title: 'WebSocket' });
}).ws('/', function (ws, req, res, next) {
  console.log('Connection open ...')
  ws.on('message', function (msg) {
    // 业务代码
    const recTime = new Date();
    const recMsg = JSON.parse(msg) || {};
    recMsg.key = recTime.getTime();
    recMsg.message = `${recMsg.message || ''}(${recTime})`
    console.log("Received Message: " + JSON.stringify(recMsg));
    ws.send(JSON.stringify(recMsg));
    setTimeout(() => {
      const sendTime = new Date();
      const sendMsg = {from: 'system', key: sendTime.getTime(), message: `hello boy!(${sendTime})`}
      console.log("Send Message: " + JSON.stringify(sendMsg));
      ws.send(JSON.stringify(sendMsg));
    }, 500,)
  });
  ws.on('close', function (msg) {
    // 业务代码
    console.log( "Connection close ..." + JSON.stringify(msg));
  });
  // res.send('respond with a resource');
});

module.exports = router;
