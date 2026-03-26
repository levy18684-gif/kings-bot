module.exports = {
    name: 'pix',
    async execute(sock, from, msg) {
        const pixMsg = "🤴 *PAGAMENTO VIA PIX - KING'S BOT* 🤴\n\n💰 *Valor:* R$ 15,00 (Mensal) ou R$ 30,00 (Permanente)\n🔑 *Chave PIX:* 000.000.000-00\n👤 *Nome:* Bruno\n\n⚠️ *Após pagar, mande o comprovante para o Criador!*";
        await sock.sendMessage(from, { text: pixMsg });
    }
};
