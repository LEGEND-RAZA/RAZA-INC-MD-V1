const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "kick",
    react: "🥏",
    alias: ["k", "remove"],
    desc: "To Remove a participant from Group",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m, { from, quoted, isGroup, senderNumber, botNumber, groupAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");

        // Ensure only group admins can use this command
        if (!groupAdmins.includes(senderNumber + "@s.whatsapp.net")) {
            return reply("_*❌ ONLY GROUP ADMINS CAN USE THIS COMMAND.*_");
        }

        if (!isBotAdmins) return reply("_*❌ I NEED TO BE AN ADMIN TO KICK MEMBERS.*_");

        // Fetch mentioned user or replied user
        let users = quoted ? quoted.sender : (m.mentionedJid ? m.mentionedJid[0] : false);
        if (!users) return reply("❌ _*COULDN'T FIND ANY USER IN CONTEXT*_");

        // Prevent kicking bot itself
        if (users === botNumber) return reply("_*❌ I CAN'T KICK MYSELF!*_");

        // Extract bot owner's number
        const botOwner = conn.user.id.split(":")[0];

        // Prevent kicking the owner
        if (users === botOwner + "@s.whatsapp.net") return reply("_*❌ YOU CANNOT KICK THE BOT OWNER!*_");

        // Kick the user
        await conn.groupParticipantsUpdate(from, [users], "remove");
        await conn.sendMessage(from, { text: "_*SUCCESSFULLY REMOVED*_ ✔️" }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.log(e);
        reply(_`❌ *Error Occurred !!*\n\n${e}`_);
    }
});
