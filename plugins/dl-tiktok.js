const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "_*DOWNLOAD TIKTOK VIDEO WITHOUT WATERMARK*_",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("_*PLEASE PROVIDE A TIKTOK VIDEO LINK.*_");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        reply("_*DOWNLOADING VIDEO, PLEASE WAIT...*_");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("_*FAILED TO FETCH TIKTOK VIDEO.*_");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `🎵 *TIKTOK VIDEO* 🎵\n\n` +
                        `👤 *USER:* ${author.nickname} (@${author.username})\n` +
                        `📖 *TITLE:* ${title}\n` +
                        `👍 *LIKES:* ${like}\n💬 *COMMENTS:* ${comment}\n🔁 *SHARES:* ${share}`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("_*ERROR IN TIKTOK DOWNLOADER COMMAND:*_", e);
        reply(_*`AN ERROR OCCURRED: ${e.message}`*_);
    }
});
          
