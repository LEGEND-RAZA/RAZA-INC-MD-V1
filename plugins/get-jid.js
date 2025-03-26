const { cmd } = require('../command');

cmd({
    pattern: "jid1",
    desc: "_*GET THE JID OF THE USER OR GROUP.*_",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user has the necessary permissions (Owner or Admin)
        if (!isGroup && !isOwner) {
            return reply("_*⚠️ ONLY THE BOT OWNER OR GROUP ADMINS CAN USE THIS COMMAND.*_");
        }

        // If it's a group, reply with the group JID
        if (isGroup) {
            return reply(`GROUP JID: *${from}@g.us*`);
        }

        // If it's a personal chat, reply with the user's JID
        if (!isGroup) {
            return reply(`User JID: *${sender}@s.whatsapp.net*`);
        }

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ AN ERROR OCCURRED: ${e.message}`);
    }
});


// jid2

cmd({
    pattern: "jid2",
    desc: "Get the JID of the user or group.",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the command is being used in a group or personal chat and the user has necessary permissions
        if (!isGroup && !isOwner) {
            return reply("_Z⚠️ ONLY THE BOT OWNER OR GROUP ADMINS CAN USE THIS COMMAND.*_");
        }

        // If the message is from a group
        if (isGroup) {
            // Respond with the group JID
            return reply(`Group JID: *${from}@g.us*`);
        }

        // If it's a personal chat, respond with the user's JID
        if (!isGroup) {
            return reply(`USER JID: *${sender}@s.whatsapp.net*`);
        }

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ AN ERROR OCCURRED: ${e.message}`);
    }
});
