const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "add",
    alias: ["aja"],
    react: "➕",
    desc: "Adds A USER TO THE GROUP.",
    category: "group",
    filename: __filename,
    use: '<number>',
},           
async (conn, mek, m, { from, args, q, isGroup, senderNumber, botNumber, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");

        // Extract bot owner's number
        const botOwner = conn.user.id.split(":")[0];

        // Restrict command usage to the bot owner only
        if (senderNumber !== botOwner) {
            return reply("_*❌ ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
        }

        // Ensure the bot is an admin
        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO ADD USERS.*_");

        // Validate user input
        if (!q || isNaN(q)) return reply("_*❌ PLEASE PROVIDE A VALID PHONE NUMBER TO ADD.*_");
        
        const userToAdd = `${q}@s.whatsapp.net`;

        // Attempt to add the user to the group
        let response = await conn.groupParticipantsUpdate(from, [userToAdd], "add");

        // Check if the user was successfully added
        if (response[0].status === 200) {
            reply(_*`✅ USER *${q}* HAS BEEN ADDED TO THE GROUP.`*_);
        } else {
            reply("_*❌ FAILED TO ADD USER. MAKE SURE THE NUMBER IS CORRECT AND THEY ARE NOT ALREADY IN THE GROUP.*_");
        }
    } catch (e) {
        console.error("Error adding user:", e);
        reply("_*❌ AN ERROR OCCURRED WHILE ADDING THE USER. PLEASE TRY AGAIN.*_");
    }
});
