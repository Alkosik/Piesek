module.exports = {
	category: 'Utility',
	name: 'ping',
	description: 'Ping!',
	callback: ({ message }) => {
		message.channel.send('Pong.');
	},
};