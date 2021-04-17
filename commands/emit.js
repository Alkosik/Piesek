module.exports = {
	category: 'Utility',
	name: 'emit',
	description: 'dev command!',
	callback: ({ client, message }) => {
		console.log("emiting")
		client.emit("guildMemberAdd", message.member);
		console.log("emited")
	},
};	