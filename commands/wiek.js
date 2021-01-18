module.exports = {
	name: 'wiek',
	description: 'Twój wiek.',
	execute(message, args) {
			let age = Math.random() * (120 - 1) + 1;
			let rounded_age = Number(age.toFixed(1))
			message.channel.send(`<@${message.author.id}>, Masz ` + rounded_age + ' lat.');
	},
};