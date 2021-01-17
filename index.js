const fs = require('fs');
const Discord = require('discord.js');
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
const {
    connect
} = require('http2');

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
    console.log('READY');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "Gang Słoni",
            type: "STREAMING",
            url: "http://gangsloni.pl"
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
console.log("Server listening on port:" + process.env.PORT);


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
                sql = `UPDATE account SET xp = ${updatedXp} WHERE id = '${message.author.id}'`;

                let nxtLvl = rows[0].level * levelup; //how many +1 level per xp points

                if (nxtLvl <= rows[0].xp) { //If level supass that amount it 
                    connection.query(`UPDATE account SET level = ${rows[0].level + 1} WHERE id = '${message.author.id}'`) //updates level
                }

                //levelup message 
                if (nxtLvl <= rows[0].xp) {
                    const lvlup = new Discord.MessageEmbed()
                        .setDescription(`muj boze, ${message.author.username} wbiles poziom ${rows[0].level + 1}`)
                        .setColor(purple)
                    message.channel.send(lvlup)
                }
            }

            if (message.author.id != client.user.id) {
                connection.query(sql);
            }

            if (originalXp < 500 && updatedXp >= 500) {
                const role = message.member.guild.roles.cache.find(role => role.name === "Elitarne Słonie");
                message.member.roles.add(role);
            }

        })
    } else if (!message.author.bot) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Egzekucja komendy zakonczyla sie niepowodzeniem!');
        }
        message.delete();
    }
})