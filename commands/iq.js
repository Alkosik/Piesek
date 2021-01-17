module.exports = {
	name: 'iq',
	description: 'Ilość iq',
	execute(message, args) {
		if(message.author.username != "Alkosik"){
		let iq = Math.random() * (183 - 1) + 1;
		let rounded_iq = Number(iq.toFixed(1))
		message.channel.send(`<@${message.author.id}>, Masz ` + rounded_iq + ' IQ.');
		} else {
			message.channel.send(`<@${message.author.id}>, Masz ` + '183' + ' IQ.');
		}
	},
};