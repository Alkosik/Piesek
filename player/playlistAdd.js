module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${client.emotes.music} - **${playlist.title}** zostało dodane do kolejki (**${playlist.tracks.length}** piosenek)`);
};