// Initial
const fs = require('fs');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log(`Current environment: ${process.env.NODE_ENV}`)
}
var path = require('path');

// Discord
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
});
const prefix = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

// Web Server
var express = require('express');
var app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var path = require('path');
var favicon = require('serve-favicon');
const http = require("http");
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);
const token = process.env.TOKEN;
const test_channel_id = '879456954232209508';
const mysql = require('mysql');
const talkedRecently = new Set();
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
var schedule = require('node-schedule');

//#region Player vars
const {
    Player
} = require('discord-player');
client.player = new Player(client);
client.player.use("YOUTUBE_DL", require("@discord-player/downloader").Downloader);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
//#endregion

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'))
const sessionMiddleware = session({
    secret: "gs",
    resave: false,
    saveUninitialized: false
});
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));
app.use(express.static('public'))
var DiscordStrategy = require('passport-discord').Strategy;

//var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

// const socketSever = require('./app/controllers/socketServer');
// socketSever(io);

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "www5056_gsmaindb"
});

let levelup = 500; // Level Up EXP
let purple = `RANDOM`;
//#endregion

const DUMMY_USER = {
    id: 1,
    username: "alkosik",
};

passport.use(
    new LocalStrategy((username, password, done) => {
        if (username === "alkosik" && password === "dupa") {
            console.log("authentication OK");
            return done(null, DUMMY_USER);
        } else {
            console.log("wrong credentials");
            return done(null, false);
        }
    })
);

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

// Player
for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

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

app.get('/', function (req, res) {
    var ua = req.header('user-agent');
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
        console.log("Mobile device detected. Redirecting to mobile.ejs")
        console.log(ua);
        res.render('mobile/m-menu.ejs');
    } else {
        res.render('pages/main.ejs')
    }
});

app.get('/ranking', function (req, res) {
    connection.query(`SELECT username, points FROM acc_event ORDER BY points DESC LIMIT 5`, function (err, rows) {
        if (err) throw err;

        var acc_top1 = rows[0].username + ` (${rows[0].points})`;
        var acc_top2 = rows[1].username + ` (${rows[1].points})`;
        var acc_top3 = rows[2].username + ` (${rows[2].points})`;

        connection.query(`SELECT username, level FROM account ORDER BY level DESC LIMIT 5`, function (err, rows) {
            if (err) throw err;

            var lvl_top1 = rows[0].username + ` (${rows[0].level})`;
            var lvl_top2 = rows[1].username + ` (${rows[1].level})`;
            var lvl_top3 = rows[2].username + ` (${rows[2].level})`;

            res.render('pages/ranking.ejs', {
                acc_top1: acc_top1,
                acc_top2: acc_top2,
                acc_top3: acc_top3,
                lvl_top1: lvl_top1,
                lvl_top2: lvl_top2,
                lvl_top3: lvl_top3
            });
        })
    })
})

app.get('/stats', function (req, res) {
    const guild = client.guilds.cache.get("510941195267080214");
    var userCount = guild.memberCount;

    console.log('Członków: ' + userCount)

    res.render('pages/stats.ejs', {
        userCount: userCount,
        //onlineCount: onlineCount
    });
});

app.get('/admins', function (req, res) {
    res.render('pages/admins.ejs', {

    });
});

app.get('/mods', function (req, res) {
    res.render('pages/mods.ejs', {

    });
});

app.get('/test', function (req, res) {
    res.render('pages/test.ejs', {

    });
});

app.get('/chess', function (req, res) {
    res.render('chess/index.hbs', {

    });
});

app.get('/mobile', function (req, res) {
    res.render('mobile/m-menu.ejs', {

    });
});

app.get('/auth', function (req, res) {
    const isAuthenticated = !!req.user;
    if (isAuthenticated) {
        console.log(`user is authenticated, session is ${req.session.id}`);
    } else {
        console.log("unknown user");
    }
    res.render(isAuthenticated ? "dashboard/main.ejs" : "pages/login.ejs", {
        root: __dirname
    });
})

app.get('/login', function (req, res) {
    res.render('pages/login.ejs', {

    })
})

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/auth",
        failureRedirect: "/auth",
    })
);

app.post("/logout", (req, res) => {
    console.log(`logout ${req.session.id}`);
    const socketId = req.session.socketId;
    if (socketId && io.of("/").sockets.get(socketId)) {
        console.log(`forcefully closing socket ${socketId}`);
        io.of("/").sockets.get(socketId).disconnect(true);
    }
    req.logout();
    res.cookie("connect.sid", "", {
        expires: new Date()
    });
    res.redirect("/");
});

passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user.id}`);
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    console.log(`deserializeUser ${id}`);
    cb(null, DUMMY_USER);
});

app.post('/testme', (req, res) => {
    console.log(client.user.tag);
    client.channels.cache.get(test_channel_id).send(`API Test initiated.`);
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    if (socket.request.user) {
        next();
    } else {
        next(new Error('unauthorized'))
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('whoami', (cb) => {
        cb(socket.request.user ? socket.request.user.username : '');
    });

    const session = socket.request.session;
    console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();
});

server.listen(process.env.PORT, () => {
    console.log('Server listening on port: ' + process.env.PORT);
});

//#region client.on('message)
client.on('message', message => {
    //#region Link detection
    (async () => {
        if (message.content.includes('discord.gg/' || 'discordapp.com/invite/')) {
            const warnmsg = new Discord.MessageEmbed()
                .setThumbnail('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
                .setTitle(`Link usunięty.`)
                .setDescription(`Regulamin Art. 4 §6`)
                .setColor('RED');
            message.delete() //delete the message
                .then(sentwarnmsg = await message.channel.send(warnmsg))
                await snooze(5000);
                sentwarnmsg.delete().catch(error => {
                    // Only log the error if it is not an Unknown Message error
                    if (error.code !== 10008) {
                        console.error('Failed to delete the message:', error);
                    }
                });
        }
    })();
    //#endregion

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

                    if (rows[0].level >= 100) {
                        const role = message.member.guild.roles.cache.find(role => role.name === "Elitarne Słonie");
                        message.member.roles.add(role);
                    } else if (rows[0].level >= 50) {
                        const role = message.member.guild.roles.cache.find(role => role.name === "Best Słonie Ever <3");
                        message.member.roles.add(role);
                    } else if (rows[0].level >= 30) {
                        const role = message.member.guild.roles.cache.find(role => role.name === "Zaawansowane Słonie");
                        message.member.roles.add(role);
                    } else if (rows[0].level >= 15) {
                        const role = message.member.guild.roles.cache.find(role => role.name === "Fajne Słonie");
                        message.member.roles.add(role);
                    } else if (rows[0].level >= 5) {
                        const role = message.member.guild.roles.cache.find(role => role.name === "Dobre Słonie");
                        message.member.roles.add(role);
                    } else if (rows[0].level >= 1) {
                        const role = message.member.guild.roles.cache.find(role => role.name === "Słoniki");
                        message.member.roles.add(role);
                    }
                }
            }

            if (message.author.id != client.user.id) {
                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                });
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
                                message.updatedPoints += 5;
                                console.log("Points booster role detected.")
                            }

                            loggedPoints = updatedPoints - originalPoints;

                            sql = `UPDATE acc_event SET points = ${updatedPoints} WHERE id = '${message.author.id}'`;
                            console.log(`Adding ${loggedPoints} to ${message.author.username}`);

                            connection.query(sql, function (error) {
                                if (error) throw error;
                                client.channels.cache.get(test_channel_id).send(`**A database error detected:**`);
                                client.channels.cache.get(test_channel_id).send(error);
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
            client.channels.cache.get(test_channel_id).send(`**A command execution error detected:**`);
            client.channels.cache.get(test_channel_id).send(error);
        }
        (async () => {
            await snooze(3000);
            message.delete().catch(error => {
                // Only log the error if it is not an Unknown Message error
                if (error.code !== 10008) {
                    console.error('Failed to delete the message:', error);
                    client.channels.cache.get(test_channel_id).send(`**A message removal error detected:**`);
                    client.channels.cache.get(test_channel_id).send(error);
                }
            });
        })();
    }

    connection.query(`SELECT * FROM acc_event WHERE id = ${message.author.id}`, function (err, rows) {
        if (err) throw err;

        if (rows.length <= 0) return;

        if (rows[0].username != message.author.username) {
            sql = `UPDATE acc_event SET username = '${message.author.username}' WHERE id = ${message.author.id}`
            connection.query(sql);
        }
    })

})

client.on('message', message => {
    if (message.content === '!join') {
        client.emit('guildMemberAdd', message.member);
    }

    connection.query(`SELECT username, level FROM account ORDER BY level DESC LIMIT 5`,
        function (err, rows) {
            if (err) throw err;

            var lvl_top1 = rows[0].username + ` (${rows[0].level})`;
            var lvl_top2 = rows[1].username + ` (${rows[1].level})`;
            var lvl_top3 = rows[2].username + ` (${rows[2].level})`;


            connection.query(`SELECT username, points FROM acc_event ORDER BY points DESC LIMIT 5`, function (err, rows) {
                if (err) throw err;
                var acc_top1 = rows[0].username + ` (${rows[0].points})`;
                var acc_top2 = rows[1].username + ` (${rows[1].points})`;
                var acc_top3 = rows[2].username + ` (${rows[2].points})`;
                io.emit('web_update', acc_top1, acc_top2, acc_top3, lvl_top1, lvl_top2, lvl_top3);
            })
        })
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

var main_event = schedule.scheduleJob('0 12 1 * *', function () {
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

var Erratas = schedule.scheduleJob('0 0 1 1 *', function () {
    (async () => {


        client.channels.cache.get('510941195929649153').send(`Erratas, Erratum, Eratas`);


    })();
});

var JanusChamp = schedule.scheduleJob('1 1 * * *', function () {
    (async () => {
        let main_channel_id = '510941195929649153';

        const janus = client.emojis.cache.find(emoji => emoji.name === "JanusChamp");
        const pepo_love = client.emojis.cache.find(emoji => emoji.name === "PepoLove");

        let mood = Math.random() * (10 - 1) + 1;
        if (mood >= 5) {
            client.channels.cache.get(main_channel_id).send(`<@430140838345965595>, kocham cie ${pepo_love}`);
        } else {
            client.channels.cache.get(main_channel_id).send(`<@430140838345965595>, nienawidze cie ${janus}`);
        }
    })();
});

var BanHealth = schedule.scheduleJob('0 0 1 * *', function () {
    (async () => {

        connection.query(`SELECT * FROM m_bans WHERE id='549223740228108288' OR id='284366115348414466'`, function (err, rows) {
            if (err) throw err;

            if (rows.length < 1) {
                sql = `INSERT INTO m_bans (bans) VALUES ('549223740228108288', 1)`;
            } else {
                sql = `UPDATE m_bans SET bans = 1 WHERE id = '549223740228108288'`
            }
            console.log(rows)
            client.channels.cache.get('510941195929649153').send(`Liczba banów została zresetowana.`)
        })
        connection.query(sql);

    })();
});

// var StreamCheck = schedule.scheduleJob('* * * * *', function () {
//     (async () => {
//         console.log('sprawdzam czy jes');
//         getJSON("https://api.twitch.tv/helix/streams?user_id=mychannel", function(err, res) {
//             if (res.stream_type == "live") {
//                 console.log('jest strim')
//                 const guild = client.guilds.cache.get("510941195267080214");
//                 client.channels.cache.get("747933354468573194").send(`Who wants to play chess? :D`);
//             }
//         });
//     })();
// });