module.exports = (client, message, queue, track) => {
    message.channel.send(`${client.emotes.music} - **${track.title}** - dodano do kolejki.`);
};