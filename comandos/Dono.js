const infoDono = (from, sender, mek, client) => {
    const ownerNumber = '5575XXXXXXXXX'; // COLOQUE SEU NÚMERO AQUI
    const mensagem = `┏═•✭･ﾟ✧*･ﾟ| ⊱✿⊰ |*✭˚･ﾟ✧･ﾟ•═┓
┝⋆⃟ۣۜ᭪➣ 𖡦 𝐈𝐍𝐅𝐎 𝐃𝐎𝐍𝐎 【👑】
┗═•✭･ﾟ✧*･ﾟ| ⊱✿⊰ |*✭˚･ﾟ✧･ﾟ•═┛
┃╭━━─ ≪ •❈• ≫ ─━━╮
┃╎ ✫✫✫✫✫
┃╎   𝐋𝐢𝐝𝐞𝐫𝐞𝐬 𝐝𝐚 𝗞𝐈𝗡𝗚'𝐒
┃╎
┃╎᭪➣ 𝐃𝐨𝐧𝐨 𝐨𝐟𝐢𝐜𝐢𝐚𝐥: -〘 𝗕𝗡_𝟭𝟱𝟳 〙-
┃╎↳ 𝐍𝐮𝐦𝐞𝐫𝐨: 〘 ${ownerNumber} 〙
┃╎
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❶: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❷: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❸: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❹: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❺: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❻: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎᭪➣ 𝐿𝑖𝑑𝑒𝑟 ❼: -〘 𝓥𝓐𝓖𝓞 〙-
┃╎
┃╎ ✫✫✫✫✫
┃╰━━─ ≪ •❈• ≫ ─━━╯
┗═•✭･ﾟ✧*･ﾟ| ⊱✿⊰ |*✭˚･ﾟ✧･ﾟ•═┛`;

    client.sendMessage(from, { text: mensagem }, { quoted: mek });
}

module.exports = { infoDono };

