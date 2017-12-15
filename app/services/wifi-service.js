const Connection = require('./connection');
const Devices = require('./devices');
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

      let gInfo = null;

      const authorizeConnection = authorize => {
        if(authorize) {
          let device = new WifiDevice(gInfo.id, gInfo.name, client);
          Devices.addConnectedDevice(device);
        }
      };

      const fAuth = info => {
        if(info === null || typeof info !== "object" || !info.name) {
          client.emit('error', i18n.__('Invalid name or object'))
        }else if(info.id && info.id.length >= 10 &&  this.blocked(info.id)) {
          client.emit('error', i18n.__('Device is blocked'))
        }else if(info.id && info.id.length >= 10 &&  this.paired(info.id)) {
          authorizeConnection(true);
        }else{

          gInfo = info;

          let rdn = crypto.randomBytes(20).toString('hex');
          info.id = crypto.createHash('sha1').update(rdn).digest('hex');
          info.callback = authorizeConnection;

          this.emit(WifiService.EVENT_REQUEST_CONNECTION, info);

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

  static get EVENT_REQUEST_CONNECTION() {
    return 'event-request-connection';
  }

}

module.exports = new WifiService();
