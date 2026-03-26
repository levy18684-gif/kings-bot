const fs = require('fs');
module.exports = {
    name: 'key',
    async execute(sock, from, msg) {
        if (!msg.key.remoteJid.includes("557588203804")) return;
        const novaKey = Math.random().toString(36).substring(2, 10).toUpperCase();
        let db = { keys: [] };
        if (fs.existsSync('./database.json')) db = JSON.parse(fs.readFileSync('./database.json'));
        db.keys.push(novaKey);
        fs.writeFileSync('./database.json', JSON.stringify(db, null, 2));
        await sock.sendMessage(from, { text: "🔑 *KEY GERADA:* " + novaKey + "\n\nUse */ativar " + novaKey + "*" });
    }
};
