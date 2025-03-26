const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "define",
    desc: "📖 GET THE DEFINITION OF A WORD",
    react: "🔍",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("PLEASE PROVIDE A WORD TO DEFINE.\n\n📌 *Usage:* .define [word]");

        const word = q.trim();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await axios.get(url);
        const definitionData = response.data[0];

        const definition = definitionData.meanings[0].definitions[0].definition;
        const example = definitionData.meanings[0].definitions[0].example || '_*❌ NO EXAMPLE AVAILABLE*_';
        const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || '_*❌ NO SYNONYMS AVAILABLE*_';
        const phonetics = definitionData.phonetics[0]?.text || '_*🔇 NO PHONETICS AVAILABLE*_';
        const audio = definitionData.phonetics[0]?.audio || null;

        const wordInfo = `
📖 *WORD*: *${definitionData.word}*  
🗣️ *PRONUNCIATION*: _${phonetics}_  
📚 *DEFINITION*: ${definition}  
✍️ *EXAMPLE*: ${example}  
📝 *SYNONYMS*: ${synonyms}  

🔗 `*POWERED BY LEGEND RAZA*`;

        if (audio) {
            await conn.sendMessage(from, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: mek });
        }

        return reply(wordInfo);
    } catch (e) {
        console.error("❌ ERROR:", e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 *Word not found.* Please check the spelling and try again.");
        }
        return reply("_*⚠️ AN ERROR OCCURRED WHILE FETCHING THE DEFINITION. PLEASE TRY AGAIN LATER.*_");
    }
});
