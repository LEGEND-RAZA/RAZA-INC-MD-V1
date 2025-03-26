const { sleep } = require('../lib/functions');
const config = require('../config')
const { cmd, commands } = require('../command')


// LEGEND-RAZA

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {

        if (!isGroup) {
            return reply("_*THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");
        }
        

        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply("_*ONLY THE BOT OWNER CAN USE THIS COMMAND.*_");
        }

        reply("_*LEAVING GROUP...*_");
        await sleep(1500);
        await conn.groupLeave(from);
        reply("_*GOOD-BYE! 👋*_");
    } catch (e) {
        console.error(e);
        reply(_*`❌ ERROR: ${e}`*_);
    }
});

