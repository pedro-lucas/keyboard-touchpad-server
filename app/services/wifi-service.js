const Connection = require('./connection');
const mdns = require('mdns');
const server = require('http').createServer();
const io = require('socket.io')(server);
const i18n = require("i18n");
const PORT = 9453;
const crypto = require('crypto');

class WifiService extends Connection {

  constructor() {
    super();
    this.ad = mdns.createAdvertisement(mdns.tcp('kts'), PORT);
    this.init();
  }

  init() {

    this.ad.start();
    server.listen(PORT);

    io.on('connection', client => {
      // const address = client.conn.remoteAddress;
      // console.log('client', address);
      const fAuth = info => {
        if(info === null || typeof info !== "object" || !info.name) {
          client.emit('error', i18n.__('Invalid name or object'))
        }else if(info.id && info.id.length >= 10 &&  this.blocked(info.id)) {
          client.emit('error', i18n.__('Device is blocked'))
        }else if(info.id && info.id.length >= 10 &&  this.paired(info.id)) {
          //TODO: Emite evento que um novo dispositivo foi conectado
        }else{
          let rdn = crypto.randomBytes(20).toString('hex');
          info.id = crypto.createHash('sha1').update(rdn).digest('hex');
          
          //TODO: Emite um evento solicitando a autorização de conexão para o dispositivo, se autorizado, adiciona o dispositivo a lista de paired
        }
      };

      const fDisconnect = () => {
        client.removeListener('disconnect', fDisconnect);
        client.removeListener('auth', fAuth);
      };

      client.on('disconnect', fDisconnect);
      client.on('auth', fAuth);

      //Send welcome message
      client.emit('welcome', i18n.__('Welcome to server'));

    });

    //TODO: O servidor fica ativo.
    //TODO: O Device solicita conexão.
    //TODO: O servidor pegunta se pode conectar, caso ainda não esteja na lista de autorizados
    //TODO: Após conectar pode iniciar o envio de dados. Vamos utilizar o socket IO no projeto

  }

}

module.exports = new WifiService();
