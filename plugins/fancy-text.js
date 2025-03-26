const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convert text into various fonts.",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply("_*❎ PLEASE PROVIDE TEXT TO CONVERT INTO FANCY FONTS.\n\nExample: .fancy Hello*_");
    }

    const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.status) {
      return reply("_*❌ Error fetching fonts. Please try again later.*_");
    }

    const fonts = response.data.result.map(item => `*${item.name}:*\n${item.result}`).join("\n\n");
    const resultText = `✨ *FANCY FONTS CONVERTER* ✨\n\n${fonts}\n\n> *POWERED BY LEGEND RAZA*`;

    await conn.sendMessage(from, { text: resultText }, { quoted: m });
  } catch (error) {
    console.error("_*❌ ERROR IN FANCY COMMAND:*_", error);
    reply("_*⚠️ AN ERROR OCCURRED WHILE FETCHING FONTS.*_");
  }
});