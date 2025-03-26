const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "updategdesc",
    alias: ["upgdesc", "gdesc"],
    react: "📜",
    desc: "Change the group description.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        if (!isAdmins) return reply("_*❌ ONLY GROUP ADMINS CAN USE THIS COMMAND.*_");
        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO UPDATE THE GROUP DESCRIPTION.*_");
        if (!q) return reply("_*❌ PLEASE PROVIDE A NEW GROUP DESCRIPTION.*_");

        await conn.groupUpdateDescription(from, q);
        reply("_*✅ GROUP DESCRIPTION HAS BEEN UPDATED.*_");
    } catch (e) {
        console.error("Error updating group description:", e);
        reply("_*❌ FAILED TO UPDATE THE GROUP DESCRIPTION. PLEASE TRY AGAIN.*_");
    }
});

