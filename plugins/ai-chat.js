const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ai",
    alias: ["bot", "dj", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("_*PLEASE PROVIDE A MESSAGE FOR THE AI.\nExample: `.ai Hello*_");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("_*AI FAILED TO RESPOND. PLEASE TRY AGAIN LATER.*_");
        }

        await reply(`🤖 *AI RESPONSE:*\n\n${data.message}`);
        await react("✅");
    } catch (e) {
        console.error("ERROR IN AI COMMAND:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("PLEASE PROVIDE A MESSAGE FOR OPEN AI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OPEN AI FAILED TO RESPOND. PLEASE TRY AGAIN LATER.");
        }

        await reply(`🧠 *OPEN AI RESPONSE:*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("ERROR IN OPEN AI COMMAND:", e);
        await react("❌");
        reply("AN ERROR OCCURRED WHILE COMMUNICATING WITH OPEN AI.");
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("PLEASE PROVIDE A MESSAGE FOR DEEP SEEK AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DEEP SEEK AI FAILED TO RESPOND. PLEASE TRY AGAIN LATER.");
        }

        await reply(`🧠 *DEEP SEEK AI RESPONSE:*\n\n${data.answer}`);
        await react("✅");
    } catch (e) {
        console.error("ERROR IN DEEP SEEK AI COMMAND:", e);
        await react("❌");
        reply("AN ERROR OCCURRED WHILE COMMUNICATING WITH DEEP SEEK AI.");
    }
});


