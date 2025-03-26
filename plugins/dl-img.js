const { cmd, commands } = require("../command");
const axios = require("axios");

cmd({
    pattern: "img",
    alias: ["pinterest", "image", "searchpin"],
    react: "🚀",
    desc: "_*SEARCH AND DOWNLOAD PINTEREST IMAGES USING THE API.*_",
    category: "fun",
    use: ".pin <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("_*PLEASE PROVIDE A SEARCH QUERY.*_");
        }

        
        await reply(`*🔎 DOWNLOADING IMAGES FOR ${query}...*`);


        const url = `https://api.diioffc.web.id/api/search/pinterest?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data || !response.data.result || response.data.result.length === 0) {
            return reply("_*NO RESULTS FOUND. PLEASE TRY ANOTHER KEYWORD.*_");
        }

        const results = response.data.result;  
        const selectedImages = results.sort(() => 0.5 - Math.random()).slice(0, 5);
      
        for (let i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            await conn.sendMessage(
                from,
                {
                    image: { url: image.src },
                    caption: `*RESULTS FOR:* ${query}\n\n> *BY RAZA-INC-MD-V1 ❤️‍🩹*`
                },
                { quoted: mek }
            );
        }
    } catch (error) {
        console.error(error);
        reply("_*❌ AN ERROR OCCURRED WHILE PROCESSING YOUR REQUEST. PLEASE TRY AGAIN LATER.*_");
    }
});
