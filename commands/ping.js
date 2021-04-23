module.exports = {
	category: 'Utility',
	name: 'ping',
	description: 'Ping!',
	callback: ({ message, client }) => {
		message.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms** !`);
	},
};