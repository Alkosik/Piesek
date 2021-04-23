module.exports = (client, message, track) => {
    message.channel.send(`${client.emotes.music} - Teraz leci **${track.title}** na kanale ${message.member.voice.channel.name}`);
};