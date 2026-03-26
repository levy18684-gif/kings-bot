module.exports = {
    name: 'criador',
    async execute(sock, from, msg) {
        const numeroDono = "557588203804";
        const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:doutor Bruno 🤴\nTEL;type=CELL;type=VOICE;waid=' + numeroDono + ':+' + numeroDono + '\nEND:VCARD';
        await sock.sendMessage(from, { contacts: { displayName: 'doutor Bruno 🤴', contacts: [{ vcard }] } });
        await sock.sendMessage(from, { text: "👑 *Fale com o meu Criador para suporte ou compras!*" });
    }
};
