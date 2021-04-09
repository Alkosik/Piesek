const Discord = require('discord.js');

module.exports = {
	category: 'Utility',
	name: 'poll',
	description: 'Poll!',
    args: true,
    usage: '<Nazwa> <Opcja 1> <Opcja 2>',
	execute(message, args) {
        const rafonix = message.guild.emojis.cache.find(emoji => emoji.name === 'uszatyrafonix');
        const delti = message.guild.emojis.cache.find(emoji => emoji.name === 'delti');
        PollTitle = args[0];
        PollOption1 = args[1];
        PollOption2 = args[2];
        (async () => {
		    const PollEmbed = new Discord.MessageEmbed()
							.setColor('#4d33de')
							.setTitle(PollTitle)
							//.setThumbnail('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
							.addFields({
								name: PollOption1,
								value: rafonix,
								inline: true
							}, {
								name: PollOption2,
								value: delti,
								inline: true
							})

            message.channel.send(PollEmbed).then(sentEmbed => {
				sentEmbed.react(rafonix).then(() => sentEmbed.react(delti));
            })
        })();
	},
};