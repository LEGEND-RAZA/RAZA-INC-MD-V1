const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  pattern: 'gitclone',
  alias: ["git"],
  desc: "Download GitHub repository as a zip file.",
  react: '📦',
  category: "downloader",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  args,
  reply
}) => {
  if (!args[0]) {
    return reply("_*❌ WHERE IS THE GITHUB LINK?\n\nEXAMPLE:\n.gitclone https://github.com/username/repository*_");
  }

  if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) {
    return reply("_*⚠️ INVALID GITHUB LINK. PLEASE PROVIDE A VALID GITHUB REPOSITORY URL.*_");
  }

  try {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    const match = args[0].match(regex);

    if (!match) {
      throw new Error("Invalid GitHub URL.");
    }

    const [, username, repo] = match;
    const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;

    // Check if repository exists
    const response = await fetch(zipUrl, { method: "HEAD" });
    if (!response.ok) {
      throw new Error("REPOSITORY NOT FOUND.");
    }

    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition ? contentDisposition.match(/filename=(.*)/)[1] : `${repo}.zip`;

    // Notify user of the download
    reply(`📥 *DOWNLOADING REPOSITORY...*\n\n*REPOSITORY:* ${username}/${repo}\n*FILENAME:* ${fileName}\n\n> *POWERED BY LEGEND RAZA*`);

    // Send the zip file to the user with custom contextInfo
    await conn.sendMessage(from, {
      document: { url: zipUrl },
      fileName: fileName,
      mimetype: 'application/zip',
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
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("_*❌ FAILED TO DOWNLOAD THE REPOSITORY. PLEASE TRY AGAIN LATER.*_");
  }
});