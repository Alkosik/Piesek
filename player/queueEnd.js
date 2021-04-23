module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Muzyka została zatrzymana ze względu na brak piosenek w kolejce`);
};