const Discord = require('discord.js');

module.exports = {
	category: 'Fun',
	name: 'cipa',
	description: 'Cipa',
	callback: ({ message, args }) => {
        const omegaKekw = message.guild.emojis.cache.find(emoji => emoji.name === 'OmegaKEKW');

		(async () => {
			const soltysEmbed = new Discord.MessageEmbed()
                .setTitle('Ale cipa')
				.setImage('https://i.imgur.com/qs17Hey.jpg')
			message.channel.send({ embeds: [soltysEmbed] });
		})();
		return
	},
};