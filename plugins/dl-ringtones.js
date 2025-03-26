const axios = require("axios");
const { cmd, commands } = require("../command");

cmd({
    pattern: "ringtone",
    alias: ["ringtones", "ring"],
    desc: "_*GET A RANDOM RINGTONE FROM THE API.*_",
    react: "🎵",
    category: "fun",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("_*PLEASE PROVIDE A SEARCH QUERY! EXAMPLE: .ringtone Suna*_");
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("_*NO RINGTONES FOUND FOR YOUR QUERY. PLEASE TRY A DIFFERENT KEYWORD.*_");
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(
            from,
            {
                audio: { url: randomRingtone.dl_link },
                mimetype: "audio/mpeg",
                fileName: `${randomRingtone.title}.mp3`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error("_*ERROR IN RINGTONE COMMAND:*_", error);
        reply("_*SORRY, SOMETHING WENT WRONG WHILE FETCHING THE RINGTONE. PLEASE TRY AGAIN LATER.*_");
    }
});
