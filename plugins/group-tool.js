const { cmd } = require('../command');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// remove only member

cmd({
    pattern: "removemembers",
    alias: ["kickall", "endgc", "endgroup"],
    desc: "Remove all non-admin members from the group.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, groupMetadata, groupAdmins, isBotAdmins, senderNumber, reply, isGroup
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("_*THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        }

        // Get the bot owner's number dynamically
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) {
            return reply("_*ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
        }

        if (!isBotAdmins) {
            return reply("_*I NEED TO BE AN ADMIN TO EXECUTE THIS COMMAND.*_");
        }

        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));

        if (nonAdminParticipants.length === 0) {
            return reply("_*THERE ARE NO NON-ADMIN MEMBERS TO REMOVE.*_");
        }

        reply(`_*STARTING TO REMOVE ${nonAdminParticipants.length} NON-ADMIN MEMBERS...*_`);

        for (let participant of nonAdminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000); // 2-second delay between removals
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("_*SUCCESSFULLY REMOVED ALL NON-ADMIN MEMBERS FROM THE GROUP.*_");
    } catch (e) {
        console.error("Error removing non-admin users:", e);
        reply("_*AN ERROR OCCURRED WHILE TRYING TO REMOVE NON-ADMIN MEMBERS. PLEASE TRY AGAIN.*_");
    }
});

// remove only admins
 
cmd({
    pattern: "removeadmins",
    alias: ["kickadmins", "kickall3", "deladmins"],
    desc: "Remove all admin members from the group, excluding the bot and bot owner.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, groupAdmins, isBotAdmins, reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("_*THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        }

        // Get the bot owner's number dynamically
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) {
            return reply("_*ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
        }

        if (!isBotAdmins) {
            return reply("_*I NEED TO BE AN ADMIN TO EXECUTE THIS COMMAND.*_");
        }

        const allParticipants = groupMetadata.participants;
        const adminParticipants = allParticipants.filter(member => groupAdmins.includes(member.id) && member.id !== conn.user.id && member.id !== `${botOwner}@s.whatsapp.net`);

        if (adminParticipants.length === 0) {
            return reply("_*THERE ARE NO ADMIN MEMBERS TO REMOVE.*_");
        }

        reply(_*`STARTING TO REMOVE ${adminParticipants.length} ADMIN MEMBERS, EXCLUDING THE BOT AND BOT OWNER...`*_);

        for (let participant of adminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000); // 2-second delay between removals
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("_*SUCCESSFULLY REMOVED ALL ADMIN MEMBERS FROM THE GROUP, EXCLUDING THE BOT AND BOT OWNER.*_");
    } catch (e) {
        console.error("Error removing admins:", e);
        reply("_*AN ERROR OCCURRED WHILE TRYING TO REMOVE ADMINS. PLEASE TRY AGAIN.*_");
    }
});

// remove admins and memeber both

cmd({
    pattern: "removeall2",
    alias: ["kickall2", "endgc2", "endgroup2"],
    desc: "Remove all members and admins from the group, excluding the bot and bot owner.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, isBotAdmins, reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("_*THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        }

        // Get the bot owner's number dynamically
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) {
            return reply("_*ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
        }

        if (!isBotAdmins) {
            return reply("_*I NEED TO BE AN ADMIN TO EXECUTE THIS COMMAND.*_");
        }

        const allParticipants = groupMetadata.participants;

        if (allParticipants.length === 0) {
            return reply("_*THE GROUP HAS NO MEMBERS TO REMOVE.*_");
        }

        // Filter out the bot and bot owner from the list
        const participantsToRemove = allParticipants.filter(
            participant => participant.id !== conn.user.id && participant.id !== `${botOwner}@s.whatsapp.net`
        );

        if (participantsToRemove.length === 0) {
            return reply("_*NO MEMBERS TO REMOVE AFTER EXCLUDING THE BOT AND BOT OWNER.*_");
        }

        reply(`_*STARTING TO REMOVE ${participantsToRemove.length} MEMBERS, EXCLUDING THE BOT AND BOT OWNER...*_`);

        for (let participant of participantsToRemove) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000); // 2-second delay between removals
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("_*SUCCESSFULLY REMOVED ALL MEMBERS, EXCLUDING THE BOT AND BOT OWNER, FROM THE GROUP.*_");
    } catch (e) {
        console.error("Error removing members:", e);
        reply("_*AN ERROR OCCURRED WHILE TRYING TO REMOVE MEMBERS. PLEASE TRY AGAIN.*_");
    }
});