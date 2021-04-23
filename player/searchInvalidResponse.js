module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${client.emotes.success} - Zaznaczenie zostało **anulowane**`);
    } else message.channel.send(`${client.emotes.error} - Musisz wysłać poprawny numer między **1**, a **${tracks.length}**`);
};