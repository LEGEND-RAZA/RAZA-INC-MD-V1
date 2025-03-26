const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "get",
    alias: ["source", "js"],
    desc: "FETCH THE FULL SOURCE CODE OF A COMMAND",
    category: "owner",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("_*❌ YOU DON'T HAVE PERMISSION TO USE THIS COMMAND!*_");
        if (!args[0]) return reply("_*❌ PLEASE PROVIDE A COMMAND name. EXAMPLE: `.get alive`*_");

        const commandName = args[0].toLowerCase();
        const commandData = commands.find(cmd => cmd.pattern === commandName || (cmd.alias && cmd.alias.includes(commandName)));

        if (!commandData) return reply("_*❌ COMMAND NOT FOUND!*_");

        // Get the command file path
        const commandPath = commandData.filename;

        // Read the full source code
        const fullCode = fs.readFileSync(commandPath, 'utf-8');

        // Truncate long messages for WhatsApp
        let truncatedCode = fullCode;
        if (truncatedCode.length > 4000) {
            truncatedCode = fullCode.substring(0, 4000) + "\n\n// CODE TOO LONG, SENDING FULL FILE 📂";
        }

        // Formatted caption with truncated code
        const formattedCode = `⬤───〔 *📜 COMMAND SOURCE* 〕───⬤
\`\`\`js
${truncatedCode}
\`\`\`
╰──────────⊷  
⚡ FULL FILE SENT BELOW 📂  
POWERED BY *LEGEND RAZA* 💜`;

        // Send image with truncated source code
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/49fy8k` },  // Image URL
            caption: formattedCode,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363354023106228@newsletter',
                    newsletterName: 'JawadTechX',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send full source file
        const fileName = `${commandName}.js`;
        const tempPath = path.join(__dirname, fileName);
        fs.writeFileSync(tempPath, fullCode);

        await conn.sendMessage(from, { 
            document: fs.readFileSync(tempPath),
            mimetype: 'text/javascript',
            fileName: fileName
        }, { quoted: mek });

        // Delete the temporary file
        fs.unlinkSync(tempPath);

    } catch (e) {
        console.error("Error in .get command:", e);
        reply(`❌ ERROR: ${e.message}`);
    }
});
