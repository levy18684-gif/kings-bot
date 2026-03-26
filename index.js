const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true, 
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    console.log("=== AGUARDANDO QR CODE NO RENDER ===");

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (u) => {
        const { connection, lastDisconnect, qr } = u
        if (qr) {
            console.log("QR CODE GERADO! ESCANEIE ABAIXO:");
        }
        if (connection === 'open') {
            console.log("=== BOT CONECTADO COM SUCESSO! 👑 ===");
        }
        if (connection === 'close') {
            startBot()
        }
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
