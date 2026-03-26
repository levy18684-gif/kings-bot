module.exports = {
  name: 'mute',
  async execute(sock, from, msg) {
    const replyText = `⊱─────── { *𝗞𝐈𝗡𝐆'𝐒 𝐁𝐎𝐓* } ───────⊰
         「 🔇 *MODERAÇÃO: MUTE* 🔇 」

┌──────────────────────┐
│ 🤐 *Atenção, Administrador:*
│ 
│ Para silenciar um usuário, você
│ precisa marcar o contato dele
│ ou responder a uma mensagem.
└──────────────────────┘
⊱─────── { *𝗞𝐈𝗡𝐆'𝐒* 𝐁𝐎𝐓 } ───────⊰`;

    await sock.sendMessage(from, { text: replyText });
  }
};
