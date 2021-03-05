module.exports = {
	name: 'emit',
	description: 'dev command!',
	execute(message, args, client) {
		console.log("emiting")
		client.emit("guildMemberAdd", message.member);
		console.log("emited")
	},
};