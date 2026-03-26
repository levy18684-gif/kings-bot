const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const http = require('http')

// ENGANANDO O RENDER (CRIANDO UM SERVIDOR SIMPLES)
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('KING BOT ONLINE');
}).listen(process.env.PORT || 3000);

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true, 
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    console.log("=== AGUARDANDO QR CODE NOS LOGS ===");

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (u) => {
        const { connection, lastDisconnect, qr } = u
        if (qr) console.log("QR CODE GERADO! ESCANEIE:");
        if (connection === 'open') console.log("=== BOT CONECTADO COM SUCESSO! 👑 ===");
        if (connection === 'close') startBot()
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        const from = msg.key.remoteJid
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase()
        const path = "./comandos/" + cmd + ".js"
        if (fs.existsSync(path)) {
            try { require(path).execute(sock, from, msg) } catch (e) {}
        }
    })
}

startBot()

