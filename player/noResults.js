module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - Nie znaleziono wyniku na YouTubie dla **${query}**`);
};