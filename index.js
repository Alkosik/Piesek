const Discord = require('discord.js');
const client = new Discord.Client();
//const config = require("./")
const token = process.env.TOKEN;
const http = require("http");
const utf8 = require('utf8');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "www5056_gsmaindb"
  });

let levelup = 15; // Level Up EXP
let purple = `RANDOM`;

function generateXp() { //Generating EXP
    return Math.floor(Math.random() * (10 - 5 + 1))+ 5; // Amount of EXP
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
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(utf8.encode("Gang Słoni Dev Team"));
    response.end();
  })
  .listen(process.env.PORT);
console.log("Server listening on port:" + process.env.PORT);


client.on('message', message => {

connection.query(`SELECT * FROM account WHERE id = '${message.author.id}'`, function (err, rows) { //selecting user id
    if (err) throw err;

    //let createTables = `CREATE TABLE IF NOT EXISTS account`;

    if(rows.length < 1) { //if the user has no info in table | no id it inserts ID - XP - LEVEL 
        let lvl = 0;
        sql = `INSERT INTO account (id, xp, level) VALUES ('${message.author.id}', '${generateXp()}', ${lvl})`
    } else {
            let xp = rows[0].xp; //xp = the amount xp in database

            sql = `UPDATE account SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`; //update xp

            let nxtLvl = rows[0].level * levelup;  //how many +1 level per xp points

            if(nxtLvl <= rows[0].xp){ //If level supass that amount it 
            connection.query(`UPDATE account SET level = ${rows[0].level + 1} WHERE id = '${message.author.id}'`) //updates level
            }

            //levelup message 
            if(nxtLvl <= rows[0].xp){
            const lvlup = new RichEmbed()
            .setDescription(`muj boze, ${message.author.username} levelowales na ${rows[0].level + 1}`)
            .setColor(purple)
            message.channel.send(lvlup)
            }
    }

connection.query(sql)
})
});