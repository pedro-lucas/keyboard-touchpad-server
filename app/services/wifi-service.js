const Service = require('./service');
const mdns = require('mdns');
const tls = require('tls');
const io = require('socket.io')(9453);


class WifiService extends Service {

  constructor() {
    super();
    this.init();
    this.ad = null;
    this.devices = [];
  }

  init() {

    this.ad = mdns.createAdvertisement(mdns.tcp('kts'), 9453);
    this.ad.start();

    //TODO: O servidor fica ativo.
    //TODO: O Device solicita conexão.
    //TODO: O servidor pegunta se pode conectar, caso ainda não esteja na lista de autorizados
    //TODO: Após conectar pode iniciar o envio de dados. Vamos utilizar o socket IO no projeto
  }

}

module.exports = new WifiService();
