const {
    MessageEmbed
} = require('discord.js');

module.exports = (client, message, queue, track) => {
    var sembed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`${client.emotes.music} Dodano do kolejki`)
    .setDescription(`**${track.title}**`)
    .setThumbnail(track.thumbnail)
    .addFields(
		{ name: 'Autor', value: track.author },
		//{ name: 'Długość', value: track.lengthSeconds + 's', inline: true },
		//{ name: 'Wyświetlenia', value: track.views, inline: true },
	)
    //message.channel.send(`${client.emotes.music} - **${track.title}** - dodano do kolejki.`);
    message.channel.send(sembed);
};