qconst { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')

// Cores para o terminal
const verde = '\x1b[32m'
const azul = '\x1b[34m'
const reset = '\x1b[0m'

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true, // ISSO VAI GERAR O QR CODE NOS LOGS DO RENDER
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    // Removemos as perguntas de "Escolha a conexão" para não travar no Render
    if (!sock.authState.creds.registered) {
        console.log(`${azul}--- GERANDO QR CODE PARA O KINGS BOT ---${reset}`);
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
                                                                    
> BOT CONECTADO COM SUCESSO! 👑
> STATUS: ONLINE NO RENDER
------------------------------------------------------------------${reset}`)
        }
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401
            if (shouldReconnect) startBot()
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        
        const from = msg.key.remoteJid
        const pushName = msg.pushName || "Usuário"
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        
        console.log(`${azul}[MSG]${reset} De: ${verde}${pushName}${reset} | Conteúdo: ${body}`)

        if (!body.startsWith('/')) return

        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase()
        const path = "./comandos/" + cmd + ".js"
        
        if (fs.existsSync(path)) {
            try {
                require(path).execute(sock, from, msg)
            } catch (e) {
                console.log(`${azul}[ERRO]${reset} Falha no comando /${cmd}`)
            }
        }
    })
}

startBot()
