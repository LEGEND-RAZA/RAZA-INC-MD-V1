const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "mute",
    alias: ["groupmute"],
    react: "🔇",
    desc: "Mute the group (Only admins can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        if (!isAdmins) return reply("_*❌ ONLY GROUP ADMINS CAN USE THIS COMMAND.*_");
        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO MUTE THE GROUP.*_");

        await conn.groupSettingUpdate(from, "announcement");
        reply("_*✅ GROUP HAS BEEN MUTED. ONLY ADMINS CAN SEND MESSAGES.*_");
    } catch (e) {
        console.error("Error muting group:", e);
        reply("_*❌ FAILED TO MUTE THE GROUP. PLEASE TRY AGAIN.*_");
    }
});
