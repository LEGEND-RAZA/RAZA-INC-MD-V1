const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    // Function to check if a value represents a "true" boolean state
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["setting", "allvar"],
    desc: "Settings of bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Define the settings message with the correct boolean checks
        let envSettings = `╭━━━〔 *RAZA-INC-MD-V1* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *ENV SETTINGS 🗿*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔 *ENABLES DISABLED* 〕━━┈⊷
┇๏ *STATUS VIEWS:* ${isEnabled(config.AUTO_STATUS_SEEN) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *STATUS REPLY:* ${isEnabled(config.AUTO_STATUS_REPLY) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *AUTO REPLY:* ${isEnabled(config.AUTO_REPLY) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *AUTO STICKER:* ${isEnabled(config.AUTO_STICKER) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *AUTO VOICE:* ${isEnabled(config.AUTO_VOICE) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *CUSTOM REACTS:* ${isEnabled(config.CUSTOM_REACT) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *AUTO REACT:* ${isEnabled(config.AUTO_REACT) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *DELETE LINKS:* ${isEnabled(config.DELETE_LINKS) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *ANTI-LINK:* ${isEnabled(config.ANTI_LINK) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *ANTI-BAD WORDS:* ${isEnabled(config.ANTI_BAD) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *AUTO TYPING:* ${isEnabled(config.AUTO_TYPING) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *AUTO RECORDING:* ${isEnabled(config.AUTO_RECORDING) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *ALWAYS ONLINE:* ${isEnabled(config.ALWAYS_ONLINE) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *PUBLIC MODE:* ${isEnabled(config.PUBLIC_MODE) ? "ENABLED ✅" : "DISABLED ❌"}
┇๏ *READ MESSAGE:* ${isEnabled(config.READ_MESSAGE) ? "ENABLED ✅" : "DISABLED ❌"}
╰━━━━━━━━━━━━──┈⊷
> ${config.DESCRIPTION}`;

        // Send message with an image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/49fy8k' }, // Image URL
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: "LEGEND-RAZA",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send an audio file
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/LEGEND-RAZA/RAZA-DATA/raw/refs/heads/main/autovoice/menunew.m4a' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.log(error);
        reply(`ERROR: ${error.message}`);
    }
});
