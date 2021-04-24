module.exports = (client, message, track) => {
    var sembed = new MessageEmbed()
    .setColor("RED")
    .setTitle(`${client.emotes.music} Teraz leci`)
    .setDescription(`**${track.title}**`)
    //message.channel.send(`${client.emotes.music} - Teraz leci **${track.title}** na kanale ${message.member.voice.channel.name}`);
    message.channel.send(sembed);
};