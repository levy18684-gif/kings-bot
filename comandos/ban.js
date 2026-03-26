module.exports = {
  name: 'ban',
  async execute(sock, from, msg) {
    // Lógica simplificada de resposta, o bot enviará isso se não houver marcação
    const replyText = `⊱─────── { *𝗞𝐈𝗡𝐆'𝐒* 𝐁𝐎𝐓 } ───────⊰
         「 🛡️ *SISTEMA DE BAN* 🛡️ 」

┌──────────────────────┐
│ ⚠️ *Ação necessária:*
│ 
│ • Mencione o membro com @
│ • Ou responda à mensagem dele
│
│ 📌 *Exemplo:* /ban @usuario
└──────────────────────┘
⊱─────── { *𝗞𝐈𝗡𝐆'𝐒* 𝐁𝐎𝐓 } ───────⊰`;

    await sock.sendMessage(from, { text: replyText });
  }
};
