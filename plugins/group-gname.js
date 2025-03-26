const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "updategname",
    alias: ["upgname", "gname"],
    react: "📝",
    desc: "Change the group name.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        if (!isAdmins) return reply("_*❌ ONLY GROUP ADMINS CAN USE THIS COMMAND.*_");
        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO UPDATE THE GROUP NAME.*_");
        if (!q) return reply("_*❌ PLEASE PROVIDE A NEW GROUP NAME.*_");

        await conn.groupUpdateSubject(from, q);
        reply(`_*✅ GROUP NAME HAS BEEN UPDATED TO: *${q}*`*_);
    } catch (e) {
        console.error("Error updating group name:", e);
        reply("_*❌ FAILED TO UPDATE THE GROUP NAME. PLEASE TRY AGAIN.*_");
    }
});
