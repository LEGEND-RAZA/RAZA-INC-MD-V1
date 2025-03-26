const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  'pattern': "couplepp",
  'alias': ["couple", "cpp"],
  'react': '💑',
  'desc': "_*GET A MALE AND FEMALE COUPLE PROFILE PICTURE.*_",
  'category': "image",
  'use': ".couplepp",
  'filename': __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  try {
    reply("*💑 FETCHING COUPLE PROFILE PICTURES...*");
    
    const response = await axios.get("https://api.davidcyriltech.my.id/couplepp");

    if (!response.data || !response.data.success) {
      return reply("_*❌ FAILED TO FETCH COUPLE PROFILE PICTURES. PLEASE TRY AGAIN LATER.*_");
    }

    const malePp = response.data.male;
    const femalePp = response.data.female;

    if (malePp) {
      await conn.sendMessage(from, {
        'image': { 'url': malePp },
        'caption': "_*👨 MALE COUPLE PROFILE PICTURES*_"
      }, { 'quoted': m }); 
    }

    if (femalePp) {
      await conn.sendMessage(from, {
        'image': { 'url': femalePp },
        'caption': "_*👩 FEMALE COUPLE PROFILE PICTURE*_"
      }, { 'quoted': m });
    }

  } catch (error) {
    console.error(error);
    reply("_*❌ AN ERROR OCCURRED WHILE FETCHING THE COUPLE PROFILE PICTURES.*_");
  }
});
