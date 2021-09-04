module.exports = {
	category: 'Utility',
	name: 'date',
	description: 'tst!',
	slash: 'both',
	callback: ({
		message,
		interaction
	}) => {
		var reply = message.guild.createdAt.toDateString();

		if (message) {
			message.reply({
				content: reply
			})
			return
		}

		interaction.reply({
			content: reply
		})
	},
};