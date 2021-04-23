module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - Nie zapewniłeś poprawnej odpowiedzi. Użyj komendy ponownie`);
};