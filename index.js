const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function startBot() {
const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
const sock = makeWASocket({
logger: P({ level: 'silent' }),
printQRInTerminal: true,
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"]
})

if (!sock.authState.creds.registered) {
console.log("┏═•✭･ﾟ✧*･ﾟ| ⊱✿⊰ |*✭˚･ﾟ✧･ﾟ•═┓");
console.log("┃ ESCOLHA A CONEXÃO (KING'S BOT) ┃");
console.log("┗═•✭･ﾟ✧*･ﾟ| ⊱✿⊰ |*✭˚･ﾟ✧･ﾟ•═┛");
console.log("┃ ❶ - PAREAMENTO POR CÓDIGO");
console.log("┃ ❷ - PAREAMENTO POR QR CODE");
console.log("┃ ❸ - PAREAMENTO COM O CRIADOR");
console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");

const opcao = await question('➩ Escolha uma opção: ');
let num;
if (opcao === '1') {
num = await question('➩ Digite o número com DDI (Ex: 5575...): ');
} else if (opcao === '2') {
console.log("➩ Gerando QR Code...");
num = null;
} else if (opcao === '3') {
num = "5575XXXXXXXXX"; // Troque pelo seu número real depois!
}

if (num) {
let code = await sock.requestPairingCode(num.replace(/[^0-9]/g, ''));
console.log('\n👑 SEU CÓDIGO: ' + code + '\n');
}
}

sock.ev.on('creds.update', saveCreds)
sock.ev.on('connection.update', (u) => {
const { connection } = u
if (connection === 'open') console.log('\n✅ ONLINE! 👑')
if (connection === 'close') startBot()
})
}
startBot()

