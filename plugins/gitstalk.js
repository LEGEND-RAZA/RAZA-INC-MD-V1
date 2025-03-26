const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "githubstalk",
    desc: "FETCH DETAILED GITHUB USER PROFILE INCLUDING PROFILE PICTURES.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("_*PLEASE PROVIDE A GITHUB USERNAME.*_");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *USERNAME*: ${data.name || data.login}
🔗 *GITHUB URL*:(${data.html_url})
📝 *BIO*: ${data.bio || 'Not available'}
🏙️ *LOCATION*: ${data.location || 'Unknown'}
📊 *PUBLIC REPOS*: ${data.public_repos}
👥 *FOLLOWERS*: ${data.followers} | Following: ${data.following}
📅 *CREATED AT*: ${new Date(data.created_at).toDateString()}
🔭 *PUBLIC GISTS*: ${data.public_gists}
> © POWERED BY LEGEND RAZA`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.avatar_url },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});

// LEGEND RAZA
