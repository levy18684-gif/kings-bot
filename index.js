const { default: makeWASocket, useMultiFileAuthState, delay } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const http = require('http')

// CORES E LOGO
const verde = '\x1b[32m'; const azul = '\x1b[34m'; const reset = '\x1b[0m';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('KING BOT ONLINE');
}).listen(process.env.PORT || 3000);

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({ logger: P({ level: 'silent' }), auth: state, browser: ["Ubuntu", "Chrome", "20.0.04"] })

    if (!sock.authState.creds.registered) {
        const meuNumero = "5575992317833" 
        await delay(5000)
        let code = await sock.requestPairingCode(meuNumero)
        console.log(`\n${verde}👑 SEU CÓDIGO DE PAREAMENTO: ${code}${reset}\n`)
    }

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('connection.update', (u) => {
        const { connection } = u
        if (connection === 'open') {
            console.clear()
            console.log(`${verde}
██╗  ██╗██╗███╗   ██╗ ██████╗ ███████╗    ██████╗  ██████╗ ████████╗
██║ ██╔╝██║████╗  ██║██╔════╝ ██╔════╝    ██╔══██╗██╔═══██╗╚══██╔══╝
█████╔╝ ██║██╔██╗ ██║██║  ███╗███████╗    ██████╔╝██║   ██║   ██║   
██╔═██╗ ██║██║╚██╗██║██║   ██║╚════██║    ██╔══██╗██║   ██║   ██║   
██║  ██╗██║██║ ╚████║╚██████╔╝███████║    ██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝    ╚═════╝  ╚═════╝    ╚═╝   
> KING'S BOT CONECTADO COM SUCESSO! 👑${reset}`)
        }
        if (connection === 'close') startBot()
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        const from = msg.key.remoteJid
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        console.log(`${azul}[MSG]${reset} De: ${verde}${msg.pushName || 'User'}${reset} | Conteúdo: ${body}`)
        
        if (!body.startsWith('/')) return
        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase()
        const path = "./comandos/" + cmd + ".js"
        if (fs.existsSync(path)) {
            try { require(path).execute(sock, from, msg) } catch (e) { console.log("Erro no comando /" + cmd) }
        }
    })
}
startBot()
