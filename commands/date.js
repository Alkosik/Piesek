module.exports = {
	category: 'Utility',
	name: 'date',
	description: 'tst!',
	callback: ({ client, message }) => {
		message.channel.reply(`${message.guild.createdAt.toDateString()}`);
	},
};