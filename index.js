//#region vars
const fs = require('fs');
const Discord = require('discord.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
const {
    prefix
} = require('./config.json');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
});
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
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

app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "www5056_gsmaindb"
});

let levelup = 500; // Level Up EXP
let purple = `RANDOM`;
//#endregion

function generateXp() { //Generating EXP
    return Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Amount of EXP
}

//#region Handlers

// Commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// Events
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

//#endregion

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

// http
//     .createServer((request, response) => {
//         response.writeHead(200, {
//             "Content-Type": "text/plain"
//         });
//         response.write(utf8.encode("Gang Słoni Dev Team"));
//         response.end();
//     })
//     .listen(process.env.PORT);
// console.log("Server listening on port: " + process.env.PORT);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.listen(process.env.PORT);
console.log('Server listening on port: ' + process.env.PORT);

//#region client.on('message)
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

                let nxtLvl = rows[0].level * levelup; // How much xp it takes to levelup.

                if (nxtLvl <= rows[0].xp) { // Update level if xp amout surpasses it.
                    connection.query(`UPDATE account SET level = ${rows[0].level + 1} WHERE id = '${message.author.id}'`) //updates level
                }

                //levelup message 
                if (nxtLvl <= rows[0].xp) {
                    (async () => {
                        const lvlup = new Discord.MessageEmbed()
                            .setThumbnail('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
                            .setDescription(`muj boze, ${message.author.username} wbiles poziom ${rows[0].level + 1}`)
                            .setColor(purple);
                        lvlupmsg = await message.channel.send(lvlup);
                        await snooze(5000);
                        lvlupmsg.delete().catch(error => {
                            // Only log the error if it is not an Unknown Message error
                            if (error.code !== 10008) {
                                console.error('Failed to delete the message:', error);
                            }
                        });
                    })();
                }
            }

            if (message.author.id != client.user.id) {
                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                });
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
                            console.log(originalPoints)
                            updatedPoints = originalPoints + 1;

                            const Guild = client.guilds.cache.get("510941195267080214");
                            const conn_member = Guild.members.cache.get(message.author.id);

                            if (message.content.length <= 2) {
                                return;
                                updatedPoints = originalPoints;
                            } else if (message.content.length >= 60) {
                                return;
                            }
                            if (conn_member.voice.channel) {
                                updatedPoints += 1;
                                console.log('Connected user detected.');
                            }
                            if (message.member.roles.cache.find(r => r.name === "Dusiciele")) {
                                updatedPoints += 5;
                                console.log("Points booster role detected.")
                            }

                            loggedPoints = updatedPoints - originalPoints;

                            sql = `UPDATE acc_event SET points = ${updatedPoints} WHERE id = '${message.author.id}'`;
                            console.log(`Adding ${loggedPoints} to ${message.author.username}`);

                            connection.query(sql, function (error) {
                                if (error) throw error;
                            });

                            // Adds the user to the cooldown set
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

        if (command.args && !args.length) {
            let reply = `Nie podałeś żadnych argumentów, ${message.author}. ~Deemz`;

            if (command.usage) {
                reply += `\nKUBIIIIIIII: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }
        try {
            //command.execute(message, args, connection, client, Discord);
            console.log('Transfering to WOKcommands')
        } catch (error) {
            console.error(error);
            message.reply('Egzekucja komendy zakonczyla sie niepowodzeniem!');
        }
        (async () => {
            await snooze(3000);
            message.delete().catch(error => {
                // Only log the error if it is not an Unknown Message error
                if (error.code !== 10008) {
                    console.error('Failed to delete the message:', error);
                }
            });
        })();
    }
})

client.on('message', message => {
    if (message.content === '!join') {
        client.emit('guildMemberAdd', message.member);
    }
});
//#endregion

//#region guildMemberAdd

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
//#endregion

//////////////////////////////////
//                              //
//        THE MAIN EVENT        //
//                              //
//////////////////////////////////

//#region voiceStateUpdate
let saved_channel;
let user_connected;

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    (async () => {

        if (newVoiceState.channel) { // The member connected to a channel.
            user_connected = true;
            saved_channel = newVoiceState.channel;
            console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
            //start_timer();
        } else if (oldVoiceState.channel) { // The member disconnected from a channel.
            user_connected = false;
            saved_channel = null;
            console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
        };

    })();
});
//#endregion

var j = schedule.scheduleJob('0 12 1 * *', function () {
    (async () => {

        connection.query(`SELECT * FROM acc_event WHERE points=(SELECT MAX(points) FROM acc_event)`, function (err, rows) {
            if (err) throw err;

            const embed = new Discord.MessageEmbed()
                .setImage('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
                .setTitle(`Zwycięzcą konkursu jest ${rows[0].username}`)
                //.setDescription(`Tabela wyników kiedyś będzie dostępna na https://hauhau.herokuapp.com`)
                .setColor('#4d33de');


            client.channels.cache.get('510941195929649153').send(embed);
            console.log(rows);

        })
    })();
});

var j2 = schedule.scheduleJob('0 0 12 * *', function () {
    (async () => {


        client.channels.cache.get('510941195929649153').send(`Erratas, Erratum, Eratas`);


    })();
});

var j3 = schedule.scheduleJob('1 1 * * *', function () {
    (async () => {

        const ayy = client.emojis.cache.find(emoji => emoji.name === "JanusChamp");
        client.channels.cache.get('510941195929649153').send(`<@430140838345965595>, albercik ${ayy}`);


    })();
});

var j4 = schedule.scheduleJob('0 0 1 * *', function () {
    (async () => {

        connection.query(`SELECT * FROM m_bans WHERE id='549223740228108288' OR id='284366115348414466'`, function (err, rows) {
            if (err) throw err;

            if (rows.length < 1) {
                sql = `INSERT INTO m_bans (bans) VALUES ('549223740228108288', 1)`;
            } else {
                sql = `UPDATE m_bans SET bans = 1 WHERE id = '549223740228108288'`
            }
            console.log(rows)
        })
        connection.query(sql);

    })();
});