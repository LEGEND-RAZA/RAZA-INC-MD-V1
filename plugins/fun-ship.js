const axios = require("axios");
const fetch = require("node-fetch");
const { sleep } = require('../lib/functions');
const { cmd, commands } = require("../command");
const config = require("../config");

cmd({
  pattern: "ship",
  alias: ["match", "love"],
  desc: "RANDOMLY PAIRS THE COMMAND USER WITH ANOTHER GROUP MEMBER.",
  react: "❤️",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("_*❌ THIS COMMAND CAN ONLY BE USED IN GROUPS.*_");

    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null; // Convert to WhatsApp format
    const participants = groupMetadata.participants.map(user => user.id);
    
    let randomPair;

    if (specialNumber && participants.includes(specialNumber) && sender !== specialNumber) {
      randomPair = specialNumber; // Always pair with this number if available
    } else {
      // Pair randomly but ensure user is not paired with themselves
      do {
        randomPair = participants[Math.floor(Math.random() * participants.length)];
      } while (randomPair === sender);
    }

    const message = `💘 *MATCH FOUND!* 💘\n❤️ @${sender.split("@")[0]} + @${randomPair.split("@")[0]}\n💖 CONGRATULATIONS! 🎉`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [sender, randomPair],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363354023106228@newsletter",
          newsletterName: "LEGEND-RAZA",
          serverMessageId: 143
        }
      }
    });

  } catch (error) {
    console.error("_*❌ ERROR IN SHIP COMMAND:*_", error);
    reply("_*⚠️ AN ERROR OCCURRED WHILE PROCESSING THE COMMAND. PLEASE TRY AGAIN.*_");
  }
});
