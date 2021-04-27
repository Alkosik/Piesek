module.exports = {
	category: 'Utility',
	name: 'emit',
	description: 'dev command!',
	callback: ({ client, message, args }) => {
		console.log("emiting")
		client.emit(`${args[0]}`, message.member);
		console.log("emited")
	},
};	