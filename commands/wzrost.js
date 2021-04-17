module.exports = {
	category: 'Roleplay',
	name: 'wzrost',
	description: 'Twój wzrost.',
	callback: ({ message }) => {
		let height = Math.random() * (220 - 1) + 1;
		let rounded_height = Number(height.toFixed(1))
		message.channel.send(`<@${message.author.id}>, Masz ` + rounded_height + 'cm wzrostu.');
	},
};