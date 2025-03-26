const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "_*DOWNLOAD FACEBOOK VIDEOS*_",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    // Check if a URL is provided
    if (!q || !q.startsWith("http")) {
      return reply("*`NEED A VALID FACEBOOK URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    // Add a loading react
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Fetch video URL from the API
    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!data.status || !data.data || !data.data.url) {
      return reply("_*❌ FAILED TO FETCH THE VIDEO. PLEASE TRY ANOTHER LINK.*_");
    }

    // Send the video to the user
    const videoUrl = data.data.url;
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *FACEBOOK VIDEO DOWNLOADED*\n\n- _*POWERED BY LEGEND RAZA ✅*_",
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    reply("_*❌ ERROR FETCHING THE VIDEO. PLEASE TRY AGAIN.*_");
  }
});
