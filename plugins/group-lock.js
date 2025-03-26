const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "lockgc",
    alias: ["lock"],
    react: "🔒",
    desc: "Lock the group (Prevents new members from joining).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        if (!isAdmins) return reply("_*❌ ONLY GROUP ADMINS CAN USE THIS COMMAND.*_");
        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO LOCK THE GROUP.*_");

        await conn.groupSettingUpdate(from, "locked");
        reply("_*✅ GROUP HAS BEEN LOCKED. NEW MEMBERS CANNOT JOIN.*_");
    } catch (e) {
        console.error("Error locking group:", e);
        reply("_*❌ FAILED TO LOCK THE GROUP. PLEASE TRY AGAIN.*_");
    }
});
    
