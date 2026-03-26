const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
const readline = require('readline')

// Cores para o terminal
const verde = '\x1b[32m'
const azul = '\x1b[34m'
const reset = '\x1b[0m'

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
        console.clear()
        console.log(`${azul}┏═•✭･ﾟ| ⊱✿⊰ |*✭･ﾟ┓\n┃ ESCOLHA A CONEXÃO ┃\n┗═•✭･ﾟ| ⊱✿⊰ |*✭･ﾟ┛${reset}`);
        console.log("❶ - CÓDIGO DE PAREAMENTO\n❷ - QR CODE\n❸ - CRIADOR (BN_157)");

        const opcao = await question('\n➩ Escolha uma opção: ');
        let num;
        if (opcao === '1') num = await question('➩ Digite o número (Ex: 557599...): ');
        if (opcao === '3') num = "5575992317833"; 

        if (num) {
            let code = await sock.requestPairingCode(num.replace(/[^0-9]/g, ''));
            console.log(`\n${verde}👑 SEU CÓDIGO: ${code}${reset}\n`);
        }
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
                                                                    
> BOT CONECTADO COM SUCESSO! 👑
> VERSÃO: 2.0 (KING'S SYSTEM)
> STATUS: ONLINE 24H
------------------------------------------------------------------${reset}`)
        }
        if (connection === 'close') startBot()
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        
        const from = msg.key.remoteJid
        const pushName = msg.pushName || "Usuário"
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
        
        // Mostra a mensagem chegando no terminal
        console.log(`${azul}[MSG]${reset} De: ${verde}${pushName}${reset} | Conteúdo: ${body}`)

        if (!body.startsWith('/')) return

        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase()
        console.log(`${verde}[CMD]${reset} Executando: /${cmd}`)

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

