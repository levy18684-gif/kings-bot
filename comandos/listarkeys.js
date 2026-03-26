const fs = require('fs');

module.exports = {
  name: 'listarkeys',
  async execute(sock, from, msg) {
    // Verifica se é o seu número (Doutor Bruno) para ninguém mais ver suas chaves
    if (!msg.key.remoteJid.includes("557588203804")) return;

    if (!fs.existsSync('./database.json')) {
      return await sock.sendMessage(from, { text: "❌ O arquivo de banco de dados ainda não existe." });
    }

    const db = JSON.parse(fs.readFileSync('./database.json'));

    if (db.keys.length === 0) {
      return await sock.sendMessage(from, { text: "🎫 *LISTA VAZIA:* Não há chaves geradas no momento." });
    }

    let lista = "🎫 *CHAVES DISPONÍVEIS:*\n\n";
    db.keys.forEach((key, index) => {
      lista += "`" + (index + 1) + ".` " + key + "\n";
    });

    lista += "\n*Total:* " + db.keys.length + " chaves.";

    await sock.sendMessage(from, { text: lista });
  }
};
