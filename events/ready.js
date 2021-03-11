module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Discord connection estabilished.');
		console.log(`Logged in as ${client.user.tag}.`);

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
	},
};