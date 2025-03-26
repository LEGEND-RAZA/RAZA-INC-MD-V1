const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');

cmd({
  pattern: "ig",
  alias: ["insta", "Instagram"],
  desc: "_*TO DOWNLOAD INSTAGRAM VIDEOS.*_",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("_*❌ PLEASE PROVIDE A VALID INSTAGRAM LINK.*_");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://api.davidcyriltech.my.id/instagram?url=${q}`);
    const data = response.data;

    if (!data || data.status !== 200 || !data.downloadUrl) {
      return reply("_*⚠️ FAILED TO FETCH INSTAGRAM VIDEO. PLEASE CHECK THE LINK AND TRY AGAIN.*_");
    }

    await conn.sendMessage(from, {
      video: { url: data.downloadUrl },
      mimetype: "video/mp4",
      caption: "📥 _*INSTAGRAM VIDEO DOWNLOADED SUCCESSFULLY!*_"
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("_*❌ AN ERROR OCCURRED WHILE PROCESSING YOUR REQUEST. PLEASE TRY AGAIN.*_");
  }
});


// twitter-dl

cmd({
  pattern: "twitter",
  alias: ["tweet", "twdl"],
  desc: "DOWNLOAD TWITTER VIDEOS",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "_*❌ PLEASE PROVIDE A VALID TWITTER URL.*_" }, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '⏳', key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result) {
      return reply("_*⚠️ FAILED TO RETRIEVE TWITTER VIDEO. PLEASE CHECK THE LINK AND TRY AGAIN.*_");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;

    const caption = `╭━━━〔 *TWITTER DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *DESCRIPTION:* ${desc || "No description"}\n`
      + `╰━━━⪼\n\n`
      + `📹 *DOWNLOAD OPTIONS:*\n`
      + `1️⃣  *SD QUALITY*\n`
      + `2️⃣  *HD QUALITY*\n`
      + `🎵 *AUDIO OPTIONS:*\n`
      + `3️⃣  *AUDIO*\n`
      + `4️⃣  *DOCUMENT*\n`
      + `5️⃣  *VOICE*\n\n`
      + `📌 *REPLY WITH THE NUMBER TO DOWNLOAD YOUR CHOICE.*`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb },
      caption: caption
    }, { quoted: m });

    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, {
          react: { text: '⬇️', key: receivedMsg.key }
        });

        switch (receivedText) {
          case "1":
            await conn.sendMessage(senderID, {
              video: { url: video_sd },
              caption: "📥 _*DOWNLOADED IN SD QUALITY*_"
            }, { quoted: receivedMsg });
            break;

          case "2":
            await conn.sendMessage(senderID, {
              video: { url: video_hd },
              caption: "📥 _*DOWNLOADED IN HD QUALITY*_"
            }, { quoted: receivedMsg });
            break;

          case "3":
            await conn.sendMessage(senderID, {
              audio: { url: video_sd },
              mimetype: "audio/mpeg"
            }, { quoted: receivedMsg });
            break;

          case "4":
            await conn.sendMessage(senderID, {
              document: { url: video_sd },
              mimetype: "audio/mpeg",
              fileName: "Twitter_Audio.mp3",
              caption: "📥 _*AUDIO DOWNLOADED AS DOCUMENT*_"
            }, { quoted: receivedMsg });
            break;

          case "5":
            await conn.sendMessage(senderID, {
              audio: { url: video_sd },
              mimetype: "audio/mp4",
              ptt: true
            }, { quoted: receivedMsg });
            break;

          default:
            reply("_*❌ INVALID OPTION! PLEASE REPLY WITH 1, 2, 3, 4, OR 5.*_");
        }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    reply("_*❌ AN ERROR OCCURRED WHILE PROCESSING YOUR REQUEST. PLEASE TRY AGAIN.*_");
  }
});

// MediaFire-dl

cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "TO DOWNLOAD MEDIAFIRE FILES.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("_*❌ PLEASE PROVIDE A VALID MEDIAFIRE LINK.*_");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.dl_link) {
      return reply("_*⚠️ FAILED TO FETCH MEDIAFIRE DOWNLOAD LINK. ENSURE THE LINK IS VALID AND PUBLIC.*_");
    }

    const { dl_link, fileName, fileType } = data.result;
    const file_name = fileName || "mediafire_download";
    const mime_type = fileType || "application/octet-stream";

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *FILE NAME:* ${file_name}\n`
      + `┃▸ *FILE TYPE:* ${mime_type}\n`
      + `╰━━━⪼\n\n`
      + `📥 *DOWNLOADING YOUR FILE...*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: mime_type,
      fileName: file_name,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("_*❌ AN ERROR OCCURRED WHILE PROCESSING YOUR REQUEST. PLEASE TRY AGAIN.*_");
  }
});

// apk-dl

cmd({
  pattern: "apk",
  desc: "DOWNLOAD APK FROM APTOIDE.",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("F*❌ PLEASE PROVIDE AN APP NAME TO SEARCH.*_");
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("_*⚠️ NO RESULTS FOUND FOR THE GIVEN APP NAME.*_");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2); // Convert bytes to MB

    const caption = `╭━━━〔 *APK Downloader* 〕━━━┈⊷
┃ 📦 *NAME:* ${app.name}
┃ 🏋 *SIZE:* ${appSize} MB
┃ 📦 *PACKAGE:* ${app.package}
┃ 📅 *UPDATED ON:* ${app.updated}
┃ 👨‍💻 *DEVELOPER:* ${app.developer.name}
╰━━━━━━━━━━━━━━━┈⊷
🔗 *POWERED BY LEGEND RAZA*`;

    await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

    await conn.sendMessage(from, {
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    reply("_*❌ AN ERROR OCCURRED WHILE FETCHING THE APK. PLEASE TRY AGAIN.*_");
  }
});

// G-Drive-DL

cmd({
  pattern: "gdrive",
  desc: "DOWNLOAD GOOGLE DRIVE FILES.",
  react: "🌐",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("_*❌ PLEASE PROVIDE A VALID GOOGLE DRIVE LINK.*_");
    }

    await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
    const response = await axios.get(apiUrl);
    const downloadUrl = response.data.result.downloadUrl;

    if (downloadUrl) {
      await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: response.data.result.mimetype,
        fileName: response.data.result.fileName,
        caption: "*© POWERED BY LEGEND RAZA*"
      }, { quoted: m });

      await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    } else {
      return reply("_*⚠️ NO DOWNLOAD URL FOUND. PLEASE CHECK THE LINK AND TRY AGAIN.*_");
    }
  } catch (error) {
    console.error("Error:", error);
    reply("_*❌ AN ERROR OCCURRED 
WHILE FETCHING THE GOOGLE DRIVE FILE. PLEASE TRY AGAIN.");
  }
}); 
