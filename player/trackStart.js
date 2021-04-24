const {
    MessageEmbed
} = require('discord.js');

module.exports = (client, message, track) => {
    var sembed = new MessageEmbed()
    .setColor("RED")
    .setTitle(`${client.emotes.music} Teraz leci`)
    .setDescription(`**${track.title}**`)
    .setThumbnail(track.thumbnail)
    .addFields(
		{ name: 'Autor', value: track.author },
		//{ name: 'Długość', value: track.lengthSeconds + 's', inline: true },
		//{ name: 'Wyświetlenia', value: track.views, inline: true },
	)
    //message.channel.send(`${client.emotes.music} - Teraz leci **${track.title}** na kanale ${message.member.voice.channel.name}`);
    message.channel.send(sembed);
};