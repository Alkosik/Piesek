module.exports = {
	category: 'Fun',
	name: 'dick',
	description: 'Długość dicka',
	execute(message, args) {
		if (message.author.username === 'Alkosik') {
			return message.reply('alkosik muj pan ma 69cm w dicku')
		}
		let dick_lenght = Math.random() * (24 - 0.1) + 0.1;
		let rounded_dick_lenght = Number(dick_lenght.toFixed(1))
		message.channel.send(`<@${message.author.id}>, Twój dick ma długość: ` + rounded_dick_lenght + 'cm.');
	},
};