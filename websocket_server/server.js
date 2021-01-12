const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

wss.on('connection', function connection(ws) {  //클라이언트 접속
  ws.on('message', function incoming(data) {  //메세지 받음
    wss.clients.forEach(function each(client) {

      //A client WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
        //console.log(data,'client.send(data)')

      }
    });
  });
});
