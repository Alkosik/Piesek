const WOKCommands = require('wokcommands')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Discord connection estabilished.');
		console.log(`Logged in as ${client.user.tag}.`);

		const guildId = '510941195267080214';
		const getApp = (guildId) => {
			const app = client.api.applications(client.user.id);
			if (guildId) {
				app.guilds(guildId)
			}
			return app
		}

		if (client.user.tag !== "Piesek BETA#0702") {
			//const fortnite = client.emojis.cache.find(emoji => emoji.name === "tftf");
			//client.channels.cache.get("747933354468573194").send(`Siema, wróciłem ${fortnite}`);

			client.user.setPresence({
				status: 'online',
				activity: {
					name: "Gang Słoni",
					type: "STREAMING",
					url: "https://www.twitch.tv/alkosik_"
				}
			});
		} else {
			client.user.setPresence({
				status: 'online',
				activity: {
					name: "jestem w becie jak coś",
					type: "PLAYING",
					url: "https://www.twitch.tv/alkosik_"
				}
			});
		}

		// Registering commands
		console.log(`Attempting to register commands at guild: ${guildId}`);
		(async () => {

			const commands = await getApp(guildId).commands.get()
			console.log(commands)

			new WOKCommands(client, {
				commandsDir: 'commands',
				testServers: [guildId],
				showWarns: false,
				del: 5,
			}).setDefaultPrefix('gs')

			//await getApp(guildId).commands('829978324045398057').delete()

		})();

		// console.log(`Attempting to download administration avatars...`);
		// (async () => {
		// 	var fs = require('fs'),
		// 		request = require('request');

		// 	var download = function (uri, filename, callback) {
		// 		request.head(uri, function (err, res, body) {
		// 			//console.log('content-type:', res.headers['content-type']);
		// 			//console.log('content-length:', res.headers['content-length']);

		// 			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		// 		});
		// 	};

		// 	const ownerId = "224487361394769920";
		// 	const networkadminId = "284366115348414466";
		// 	const mainadminId = "284989520087220226";
		// 	const stadminId = "365848974093189120";


		// 	const {
		// 		ownerAvatarURL
		// 	} = await client.users.fetch(ownerId)
		// 		.catch(console.error);
		// 	console.log(ownerAvatarURL);
		// 	const {
		// 		networkadminAvatarURL
		// 	} = await client.users.fetch(networkadminId)
		// 		.catch(console.error);
		// 	const {
		// 		mainadminAvatarURL
		// 	} = await client.users.fetch(mainadminId)
		// 		.catch(console.error);
		// 	const {
		// 		stadminAvatarURL
		// 	} = await client.users.fetch(stadminId)
		// 		.catch(console.error);


		// 	console.log('Downloading Owner avatar...')
		// 	download(ownerAvatarURL, 'owner.gif', function () {
		// 		console.log('Owner Avatar Downloaded.');
		// 	});
		// })();

	},
};