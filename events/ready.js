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

			new WOKCommands(client, {
				commandsDir: 'commands',
				testServers: [guildId],
			}).setDefaultPrefix('gs')

		})();

	},
};