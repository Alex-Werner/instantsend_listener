const URI = {
    livenet:'https://insight.dashevo.org/',
    testnet:'https://testnet-insight.dashevo.org/'
};

const livesocket = require('socket.io-client')(URI.livenet, {transports: ['websocket']});
const testsocket = require('socket.io-client')(URI.testnet,{transports: ['websocket']});

livesocket.display = display;
livesocket.on('connect', handleConnection);
livesocket.on('tx', handleTx);
livesocket.on('txlock', handleTxlock);
livesocket.on('disconnect', handleDisconnection);

testsocket.display = display;
testsocket.on('connect', handleConnection);
testsocket.on('tx', handleTx);
testsocket.on('txlock', handleTxlock);
testsocket.on('disconnect', handleDisconnection);


function display(data){
    console.log(`${this.io.uri} - ${data}`);
}
function handleDisconnection() {
    this.display(`Just disconnected`);
}

function handleConnection() {
    this.display(`Successfully connected to URI ${this.io.uri}`);
    this.emit('subscribe', 'inv');
    this.display('subscribe to inv');
}

function handleTx(data) {
    this.display(`Had a tx`, data.txid)
}
function handleTxlock(data) {
    this.display(`Had a txlock`, console.log(data))
}
