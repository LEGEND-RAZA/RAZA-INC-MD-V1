const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu2",
    desc: "menu the bot",
    category: "menu",
    react: "✔️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃★╭──────────────
┃★│ OWNER : *${config.OWNER_NAME}*
┃★│ BAILEYS : *MULTI DEVICE*
┃★│ TYPE : *NodeJs*
┃★│ PLATFORM : *HEROKU*
┃★│ MODE : *[${config.MODE}]*
┃★│ PREFIX : *[${config.PREFIX}]*
┃★│ VERSION : *3.0.0 Bᴇᴛᴀ*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *MENU LIST* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• QURAN MENU 
┃◈┃• PRAYER TIME 
┃◈┃• AI MENU 
┃◈┃• ANIME MENU 
┃◈┃• REACTIONS 
┃◈┃• CONVERT MENU 
┃◈┃• FUN MENU 
┃◈┃• DL MENU 
┃◈┃• LIST MD 
┃◈┃• MAIN MENU 
┃◈┃• GROUP MENU 
┃◈┃• ALL MENU 
┃◈┃• OWNER MENU 
┃◈┃• OTHER MENU 
┃◈┃• LOGO <TEXT>
┃◈┃• REPO 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "Shows the reaction commands",
    category: "menu",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let dec = `╭━━〔 *REACTIONS MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• BULLY 
┃◈┃• CUDDLE 
┃◈┃• CRY 
┃◈┃• HUGE 
┃◈┃• AWOO 
┃◈┃• KISS 
┃◈┃• LICK 
┃◈┃• PAT 
┃◈┃• SMUG 
┃◈┃• BONK 
┃◈┃• YEET
┃◈┃• BLUSH 
┃◈┃• SMILE 
┃◈┃• WAVE 
┃◈┃• HIGH-FIVE 
┃◈┃• HANDHOLD 
┃◈┃• NOM 
┃◈┃• BITE 
┃◈┃• GLIMPSE 
┃◈┃• SLAP 
┃◈┃• KILL 
┃◈┃• HAPPY 
┃◈┃• WINE 
┃◈┃• POKE
┃◈┃• DANCER
┃◈┃• CRINGE 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// dlmenu

cmd({
    pattern: "dlmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *DOWNLOAD MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• FACEBOOK 
┃◈┃• MEDIAFIRE 
┃◈┃• TIKTOK 
┃◈┃• TWITTER 
┃◈┃• INSTA 
┃◈┃• APK 
┃◈┃• IMG 
┃◈┃• TT2
┃◈┃• PINS 
┃◈┃• APK2
┃◈┃• FB2 
┃◈┃• PINTEREST 
┃◈┃• SPOTIFY 
┃◈┃• PLAY 
┃◈┃• PLAY2 
┃◈┃• PLAY3 
┃◈┃• PLAY4 
┃◈┃• PLAY5 
┃◈┃• PLAY6 
┃◈┃• PLAY7 
┃◈┃• PLAY8 
┃◈┃• PLAY9 
┃◈┃• PLAY10 
┃◈┃• AUDIO 
┃◈┃• VIDEO 
┃◈┃• VIDEO2
┃◈┃• VIDEO3 
┃◈┃• VIDEO4
┃◈┃• VIDEO5 
┃◈┃• VIDEO6
┃◈┃• VIDEO7 
┃◈┃• VIDEO8
┃◈┃• VIDEO9 
┃◈┃• VIDEO10 
┃◈┃• YTMP3
┃◈┃• YTMP4 
┃◈┃• SONG 
┃◈┃• DARAMA 
┃◈┃• GDRIVE 
┃◈┃• SSWEB 
┃◈┃• TICKS
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// group menu

cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try
       {
        let dec = `╭━━〔 *GROUP MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• GROUPLINK 
┃◈┃• KICKALL 
┃◈┃• KICKALL2 
┃◈┃• KICKALL3 
┃◈┃• ADD 
┃◈┃• REMOVE 
┃◈┃• KICK 
┃◈┃• PROMOTE 
┃◈┃• DEMOTE 
┃◈┃• DISMISS 
┃◈┃• REVOKE 
┃◈┃• SETGOODBYE 
┃◈┃• SETWELCOME
┃◈┃• DELETE 
┃◈┃• GETPIC 
┃◈┃• GINFO 
┃◈┃• DELETE 
┃◈┃• DISAPPEAR ON 
┃◈┃• DISAPPEAR OFF 
┃◈┃• DISAPPEAR 7D,24H
┃◈┃• ALLREQ 
┃◈┃• UPDATEGNAME 
┃◈┃• UPDATEGDESC
┃◈┃• JOINREQUESTS 
┃◈┃• SENDDM 
┃◈┃• NIKAL 
┃◈┃• MUTE 
┃◈┃• UNMUTE 
┃◈┃• LOCKGC 
┃◈┃• UNLOCKGC 
┃◈┃• INVITE 
┃◈┃• TAG 
┃◈┃• HIDETAG 
┃◈┃• TAGALL 
┃◈┃• TAGADMINS 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        let dec = `╭━━〔 *FUN MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• SHAPAR 
┃◈┃• RATE 
┃◈┃• INSULT 
┃◈┃• HACK 
┃◈┃• SHIP 
┃◈┃• CHARACTER 
┃◈┃• PICKUP 
┃◈┃• JOKE 
┃◈┃• HRT 
┃◈┃• HPY
┃◈┃• SYD 
┃◈┃• ANGER 
┃◈┃• SHY
┃◈┃• KISS 
┃◈┃• MON 
┃◈┃• CONFUZED 
┃◈┃• SETPP 
┃◈┃• HAND 
┃◈┃• NIKAL 
┃◈┃• HOLD 
┃◈┃• HUG
┃◈┃• NIKAL 
┃◈┃• HIFI 
┃◈┃• POKE 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu

cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *OTHER MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• TIMENOW 
┃◈┃• DATE 
┃◈┃• COUNT 
┃◈┃• CALCULATE 
┃◈┃• COUNTX
┃◈┃• FLIP 
┃◈┃• COINFLIP 
┃◈┃• RCOLOR 
┃◈┃• ROLL 
┃◈┃• FACT 
┃◈┃• CPP 
┃◈┃• RW 
┃◈┃• PAIR 
┃◈┃• PAIR2
┃◈┃• PAIR3 
┃◈┃• FANCY 
┃◈┃• LOGO <TEXT>
┃◈┃• DEFINE 
┃◈┃• NEWS 
┃◈┃• MOVIE 
┃◈┃• WEATHER 
┃◈┃• SREPO
┃◈┃• INSULT 
┃◈┃• SAVE 
┃◈┃• WIKIPEDIA 
┃◈┃• GPASS
┃◈┃• GITHUBSTALK 
┃◈┃• YTS
┃◈┃• YTV 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu

cmd({
    pattern: "mainmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *MAIN MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• PING 
┃◈┃• LIVE 
┃◈┃• ALIVE 
┃◈┃• RUNTIME 
┃◈┃• UPTIME 
┃◈┃• REPO 
┃◈┃• OWNER 
┃◈┃• MENU 
┃◈┃• MENU2 
┃◈┃• RESTART 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// owner menu

cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *OWNER MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• OWNER 
┃◈┃• MENU 
┃◈┃• MENU2 
┃◈┃• LISTCMD 
┃◈┃• ALLMENU 
┃◈┃• REPO 
┃◈┃• BLOCK 
┃◈┃• UNBLOCK 
┃◈┃• FULLPP 
┃◈┃• SETPP 
┃◈┃• RESTART 
┃◈┃• SHUTDOWN 
┃◈┃• UPDATECMD
┃◈┃• ALIVE 
┃◈┃• PING 
┃◈┃• GJID
┃◈┃• JID 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// convert menu

cmd({
    pattern: "convertmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *CONVERT MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• STICKER 
┃◈┃• STICKER2
┃◈┃• EMOJIMIX 
┃◈┃• FANCY 
┃◈┃• TAKE 
┃◈┃• TOMP3 
┃◈┃• TTS 
┃◈┃• TRT 
┃◈┃• BASE64 
┃◈┃• UNBASE64
┃◈┃• BINARY 
┃◈┃• DBINARY 
┃◈┃• TINYURL 
┃◈┃• URLDECODE 
┃◈┃• URLENCODE 
┃◈┃• URL 
┃◈┃• REPEAT 
┃◈┃• ASK 
┃◈┃• READMORE 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// anmie menu 

cmd({
    pattern: "animemenu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
          let dec = `╭━━〔 *ANIME MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• FACK 
┃◈┃• DOG 
┃◈┃• AWOO 
┃◈┃• GARL 
┃◈┃• WAIFU
┃◈┃• NEKO 
┃◈┃• MEGNUMIN
┃◈┃• NEKO 
┃◈┃• MAID 
┃◈┃• LOLI 
┃◈┃• ANIMEGIRL
┃◈┃• ANIMEGIRL1
┃◈┃• ANIMEGIRL2
┃◈┃• ANIMEGIRL3
┃◈┃• ANIMEGIRL4
┃◈┃• ANIMEGIRL5
┃◈┃• ANIMEGIRL6
┃◈┃• ANIME
┃◈┃• ANIME1 
┃◈┃• ANIME2
┃◈┃• ANIME3 
┃◈┃• ANIME4
┃◈┃• ANIME5 
┃◈┃• ANIMENEWS 
┃◈┃• FOXGIRL 
┃◈┃• NARUTO 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// ai menu 

cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *AI MENU* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• AI 
┃◈┃• GPT3
┃◈┃• GPT2 
┃◈┃• GPTMINI
┃◈┃• GPT 
┃◈┃• META 
┃◈┃• BLACKBOX 
┃◈┃• LUMA 
┃◈┃• DJ 
┃◈┃• KHAN 
┃◈┃• RAZA
┃◈┃• GPT4 
┃◈┃• BING 
┃◈┃• IMAGINE 
┃◈┃• IMAGINE2
┃◈┃• COPILOT 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3bww2u.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: 'LEGEND-RAZA',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
