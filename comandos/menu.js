module.exports = {
  name: 'menu',
  async execute(sock, from, msg) {
    const menuTexto = `⊱─────── { *𝗞𝐈𝗡𝐆'𝐒 𝐁𝐎𝐓* } ───────⊰

        「 ✧ *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧Ṏ𝐄𝐒* ✧ 」
┌──────────────────────┐
│ ✦ /menu (Lista completa)
│ ✦ /ping (Latência)
│ ✦ /dono (Contato)
│ ✦ /infobot (Specs)
│ ✦ /uptime (Tempo online)
│ ✦ /regras (Normas do bot)
│ ✦ /status (Sistema)
└──────────────────────┘

        「 🛠️ *𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂̧𝐀̃O* 🛠️ 」
┌──────────────────────┐
│ ⚙️ /ban (Banir usuário)
│ ⚙️ /kick (Remover usuário)
│ ⚙️ /promote (Dar ADM)
│ ⚙️ /demote (Tirar ADM)
│ ⚙️ /gp [abrir/fechar]
│ ⚙️ /link (Link do grupo)
│ ⚙️ /revogar (Resetar link)
│ ⚙️ /totag (Marcar todos)
│ ⚙️ /hidetag (Tag invisível)
│ ⚙️ /antilink [on/off]
│ ⚙️ /antifake [on/off]
│ ⚙️ /bemvindo [on/off]
│ ⚙️ /infogp (Dados do grupo)
│ ⚙️ /unban (Desbanir no GP)
└──────────────────────┘

        「 📥 *𝐃𝐎𝐖𝐍𝐋Ｏ𝐀𝐃𝐒* 📥 」
┌──────────────────────┐
│ 📥 /play (Música YouTube)
│ 📥 /video (Vídeo YouTube)
│ 📥 /tiktok (Sem marca d'água)
│ 📥 /ig (Instagram Story/Post)
│ 📥 /fb (Facebook Video)
│ 📥 /tw (Twitter/X)
│ 📥 /spotify (Música/Playlist)
│ 📥 /pinterest (Baixar imagem)
└──────────────────────┘

         「 🤖 *𝐈.𝐀 & 𝐁𝐔𝐒𝐂𝐀𝐒* 🤖 」
┌──────────────────────┐
│ 🧠 /gemini (IA Google)
│ 💬 /gpt (ChatGPT)
│ 🎨 /imagine (Criar imagem)
│
cat <<EOF > ~/KingsBot/comandos/ban.js
module.exports = {
  name: 'ban',
  async execute(sock, from, msg) {
    const replyText = `⊱─────── { *𝗞𝐈𝗡𝐆'𝐒 𝐁𝐎𝐓* } ───────⊰
         「 🛡️ *SISTEMA DE BAN* 🛡️ 」

┌──────────────────────┐
│ ⚠️ *Ação necessária:*
│ 
│ • Mencione o membro com @
│ • Ou responda à mensagem dele
│
│ 📌 *Exemplo:* /ban @usuario
└──────────────────────┘
⊱─────── { *𝗞𝐈𝗡𝐆'𝐒 𝐁𝐎𝐓* } ───────⊰`;

    await sock.sendMessage(from, { text: replyText });
  }
};
module.exports = {
    execute: async (sock, from, msg) => {
        await sock.sendMessage(from, { text: '👑 *KING\'S BOT MENU* 👑\n\n/menu - Mostra esta lista\n/criador - Info do Bruno' })
    }
}


