const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        if (!isAdmins) return reply("_*❌ ONLY GROUP ADMINS CAN USE THIS COMMAND.*_");
        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO UN-MUTE THE GROUP.*_");

        await conn.groupSettingUpdate(from, "not_announcement");
        reply("_*✅ GROUP HAS BEEN UN-MUTED. EVERYONE CAN SEND MESSAGES.*_");
    } catch (e) {
        console.error("Error unmuting group:", e);
        reply("_*❌ FAILED TO UN-MUTE THE GROUP. PLEASE TRY AGAIN.*_");
    }
});
