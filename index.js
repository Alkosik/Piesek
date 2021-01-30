const fs = require('fs');
const Discord = require('discord.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const {
    prefix
} = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//const config = require("./")
const token = process.env.TOKEN;
const http = require("http");
const utf8 = require('utf8');
const mysql = require('mysql');
const cooldowns = new Discord.Collection();
const talkedRecently = new Set();
const {
    connect
} = require('http2');
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const Canvas = require('canvas');
var schedule = require('node-schedule');
const {
    kill
} = require('process');
//const asyncio = require('asyncio');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "www5056_gsmaindb"
});

let levelup = 100; // Level Up EXP
let purple = `RANDOM`;

function generateXp() { //Generating EXP
    return Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Amount of EXP
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Discord connection established!');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "Gang Słoni",
            type: "STREAMING",
            url: "https://www.twitch.tv/alkosik_"
        }
    });
});

client.login(token);

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channelID === '790343982877900820') {
        const channel = client.channels.cache.get("790343982877900820");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            const dispatcher = connection.play('./bark.mp3');
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        });
    } else {
        const channel = client.channels.cache.get("790343982877900820");
        channel.leave();
    }
});

//client.user.setPresence({ game: { name: 'Gang Słoni', type: "streaming", url: "https://gangsloni.pl"}});

http
    .createServer((request, response) => {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.write(utf8.encode("Gang Słoni Dev Team"));
        response.end();
    })
    .listen(process.env.PORT);
console.log("Server listening on port: " + process.env.PORT);


client.on('message', message => {
    if (!message.content.startsWith(prefix) && !message.author.bot) {
        connection.query(`SELECT * FROM account WHERE id = ${message.author.id}`, function (err, rows) {
            if (err) throw err;

            let sql;
            let originalXp;
            let updatedXp;

            if (rows.length < 1) {
                originalXp = 0;
                updatedXp = generateXp();
                sql = `INSERT INTO account (username, id, xp) VALUES ('${message.author.username}', ${message.author.id}, ${updatedXp})`;
            } else {
                originalXp = rows[0].xp;
                updatedXp = originalXp + generateXp();
                sql = `UPDATE account SET xp = ${updatedXp}, username = '${message.author.username}' WHERE id = '${message.author.id}'`;

                let nxtLvl = rows[0].level * levelup; //how many +1 level per xp points

                if (nxtLvl <= rows[0].xp) { //If level supass that amount it 
                    connection.query(`UPDATE account SET level = ${rows[0].level + 1} WHERE id = '${message.author.id}'`) //updates level
                }

                //levelup message 
                if (nxtLvl <= rows[0].xp) {
                    (async () => {
                        //const attachment = new Discord.Attachment('./images/logo.png', 'logo.png');
                        const lvlup = new Discord.MessageEmbed()
                            .setThumbnail('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
                            .setDescription(`muj boze, ${message.author.username} wbiles poziom ${rows[0].level + 1}`)
                            .setColor(purple);
                        lvlupmsg = await message.channel.send(lvlup);
                        await snooze(10000);
                        lvlupmsg.delete
                    })();
                }
            }

            if (message.author.id != client.user.id) {
                connection.query(sql);
            }

            if (originalXp < 500 && updatedXp >= 500) {
                const role = message.member.guild.roles.cache.find(role => role.name === "Elitarne Słonie");
                message.member.roles.add(role);
            }

            connection.query(`SELECT * FROM acc_event WHERE id = ${message.author.id}`, function (err, rows) {
                if (err) throw err;

                if (rows.length >= 1) {
                    (async () => {

                        if (talkedRecently.has(message.author.id)) {
                            return;
                        } else {

                            console.log(`Signature confirmed. - ${message.author.username}`);

                            originalPoints = rows[0].points;
                            updatedPoints = originalPoints + 1;

                            const Guild = client.guilds.cache.get("510941195267080214");
                            const conn_member = Guild.members.cache.get(message.author.id);

                            if (conn_member.voice.channel) { 
                                updatedPoints + 1;
                                console.log('sex');
                                //console.log(`${Member.user.tag} is connected to ${Member.voice.channel.name}!`);
                            }

                            sql = `UPDATE acc_event SET points = ${updatedPoints} WHERE id = '${message.author.id}'`;
    
                            connection.query(sql);

                            // Adds the user to the set so that they can't talk for a minute
                            talkedRecently.add(message.author.id);
                            setTimeout(() => {
                                
                                talkedRecently.delete(message.author.id);
                            }, 20000);
                        }

                    })();
                }

            })

        })



    } else if (!message.author.bot) {

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args, connection, client, Discord);
        } catch (error) {
            console.error(error);
            message.reply('Egzekucja komendy zakonczyla sie niepowodzeniem!');
        }
        (async () => {
            await snooze(3000);
            message.delete();
        })();
    }
})

client.on('message', message => {
    if (message.content === '!join') {
        client.emit('guildMemberAdd', message.member);
    }
});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === '511224486545326100');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/background.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '38px Cascadia Code';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Witaj na serwerze,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');

        // Declare a base size of the font
        let fontSize = 70;

        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px Cascadia Code`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);

        // Return the result to use in the actual canvas
        return ctx.font;
    };
    ctx.fillStyle = '#ffffff';
    if (member.displayName.length <= 8) {
        ctx.font = '46px Cascadia Code';
    } else {
        ctx.font = '38px Cascadia Code';
    }
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8); //2.5, 1.8

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: 'png'
    }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Witamy na serwerze, ${member}!`, attachment);
});

//////////////////////
//                  //
//  THE MAIN EVENT  //
//                  //
//////////////////////
let saved_channel;
let user_connected;

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    (async () => {
        if (newVoiceState.channel) { // The member connected to a channel.
            user_connected = true;
            saved_channel = newVoiceState.channel;
            console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
            start_timer();
        } else if (oldVoiceState.channel) { // The member disconnected from a channel.
            user_connected = false;
            saved_channel = null;
            console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
        };
    })();
});

// function start_timer(){
//     (async () => {
//         console.log("Timer started.")
//         await snooze(5000);
//         if(user_connected === true){
//             console.log("Points added.")
//         } else {
//             console.log("No points added.")
//         }
//         console.log("time ended");

//     })();
// }




var j = schedule.scheduleJob('0 12 1 * *', function () {
    (async () => {
        connection.query(`SELECT * FROM acc_event WHERE points=(SELECT MAX(points) FROM acc_event)`, function (err, rows) {
                if (err) throw err;

                const embed = new Discord.MessageEmbed()
                            .setImage('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
							.setTitle(`Aktualnie najwięcej punktów ma ${rows[0].username}`)
							.setDescription(`Tabela wyników kiedyś będzie dostępna na https://hauhau.herokuapp.com`)
                            .setColor('#4d33de');


                client.channels.cache.get('510941195929649153').send(embed);
            console.log(rows);



        })
        //console.log("tf")

    })();
});