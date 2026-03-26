const fs = require('fs');
module.exports = {
    name:
  'ativar',
  async execute(sock, from, msg, args) {
    const fs = require('fs');
    const keyUser = args[0]; // Pega a chave enviada: /ativar CHAVE

    if (!keyUser) return await sock.sendMessage(from, { text: "❌ Por favor, digite a chave. Exemplo: */ativar ABC123*" });

    let db = { keys: [] };
    if (fs.existsSync('./database.json')) {
      db = JSON.parse(fs.readFileSync('./database.json'));
    }

    const keyIndex = db.keys.indexOf(keyUser);

    if (keyIndex !== -1) {
      // Remove a chave para não ser usada de novo
      db.keys.splice(keyIndex, 1);
      fs.writeFileSync('./database.json', JSON.stringify(db, null, 2));

      await sock.sendMessage(from, { text: "✅ *SUCESSO!* Sua licença foi ativada com sucesso. Aproveite o bot!" });
    } else {
      await sock.sendMessage(from, { text: "⚠️ *ERRO:* Essa chave é inválida ou já foi utilizada." });
    }
  }
};
