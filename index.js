const { default: makeWASocket, useMultiFileAuthState, delay, DisconnectReason } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const http = require('http')

// CORES E LOGO
const verde = '\x1b[32m'; const azul = '\x1b[34m'; const reset = '\x1b[0m';

// SERVIDOR PARA O RENDER NÃO DESLIGAR
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('KING BOT ONLINE');
}).listen(process.env.PORT || 3000);

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    // GERAÇÃO DO CÓDIGO POR NÚMERO
    if (!sock.authState.creds.registered) {
        const meuNumero = "5575992317833" 
        await delay(10000) // Espera o Render estabilizar
        try {
            let code = await sock.requestPairingCode(meuNumero)
            console.log(`\n${verde}👑 SEU CÓDIGO DE PAREAMENTO: ${code}${reset}\n`)
        } catch (err) {
            console.log("Erro ao pedir código, tentando novamente...")
        }
    }

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (u) => {
        const { connection, lastDisconnect } = u
        if (connection === 'open') {
            console.clear()
            console.log(`${verde}
██╗  ██╗██╗███╗   ██╗ ██████╗ ███████╗    ██████╗  ██████╗ ████████╗
██║ ██╔╝██║████╗  ██║██╔════╝ ██╔════╝    ██╔══██╗██╔═══██╗╚══██╔══╝
█████╔╝ ██║██╔██╗ ██║██║  ███╗███████╗    ██████╔╝██║   ██║   ██║   
██╔═██╗ ██║██║╚██╗██║██║   ██║╚════██║    ██╔══██╗██║   ██║   ██║   
██║  ██╗██║██║ ╚████║╚██████╔╝███████║    ██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝    ╚═════╝  ╚═════╝    ╚═╝   
                                                                    
> KING'S BOT CONECTADO COM SUCESSO! 👑
> STATUS: ONLINE NO RENDER
------------------------------------------------------------------${reset}`)
        }
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) startBot()
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]; if (!msg.message || msg.key.fromMe) return
        const from = msg.key.remoteJid; 
        const pushName = msg.pushName || "Usuário"
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        
        console.log(`${azul}[MSG]${reset} De: ${verde}${pushName}${reset} | Conteúdo: ${body}`)

        if (body.startsWith('/')) {
            const cmd = body.slice(1).trim().split(' ')[0].toLowerCase()
            const path = "./comandos/" + cmd + ".js"
            if (fs.existsSync(path)) { 
                try { require(path).execute(sock, from, msg) } catch (e) {
                    console.log(`${azul}[ERRO]${reset} Falha no comando /${cmd}`)
                } 
            }
        }
    })
}

startBot()

