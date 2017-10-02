const Service = require('./service');
const mdns = require('mdns');
const io = require('socket.io')(9453);

class WifiService extends Service {

  constructor() {
    super();
    this.init();
  }

  init() {
    //TODO: O servidor fica ativo.
    //TODO: O Device solicita conexão.
    //TODO: O servidor pegunta se pode conectar, caso ainda não esteja na lista de autorizados
    //TODO: Após conectar pode iniciar o envio de dados. Vamos utilizar o socket IO no projeto
  }

}

module.exports = new WifiService();
