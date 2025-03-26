const { cmd } = require('../command');

cmd({
    pattern: "block",
    desc: "Blocks a person",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    
    if (m.sender !== botOwner) {
        await react("❌");
        return reply("_*ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender; // If replying to a message, get sender JID
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0]; // If mentioning a user, get their JID
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net"; // If manually typing a JID
    } else {
        await react("❌");
        return reply("_*PLEASE MENTION A USER OR REPLY TO THEIR MESSAGE.*_");
    }

    try {
        await conn.updateBlockStatus(jid, "block");
        await react("✅");
        reply(_*`SUCCESSFULLY BLOCKED @${jid.split("@")[0]}`*_, { mentions: [jid] });
    } catch (error) {
        console.error("_*BLOCK COMMAND ERROR*_:", error);
        await react("❌");
        reply("_*FAILED TO BLOCK THE USER.*_");
    }
});

cmd({
    pattern: "unblock",
    desc: "_*UNBLOCK A PERSON*_",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("_*ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        await react("❌");
        return reply("_*PLEASE MENTION A USER OR REPLY TO THEIR MESSAGE.*_");
    }

    try {
        await conn.updateBlockStatus(jid, "unblock");
        await react("✅");
        reply(`SUCCESSFULLY UNBLOCKED @${jid.split("@")[0]}`, { mentions: [jid] });
    } catch (error) {
        console.error("_*UNBLOCK COMMAND ERROR*_:", error);
        await react("❌");
        reply("_*FAILED TO UNBLOCK THE USER.*_");
    }
});           
