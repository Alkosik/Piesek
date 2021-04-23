module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - Żadna muzyka nie leci na tym serwerze`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Nie jesteś połączony z kanałem głosowym`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Nie jestem w stanie dołączyć na twój kanał głosowy, sprawdź moje permisje`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${client.emotes.error} - ${args[0].title} nie jest dostępny w twoim regionie! Pomijanie...`);
            break;
        case 'MusicStarting':
            message.channel.send(`Trwa uruchamianie... poczekaj i spróbuj ponownie`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Coś poszło nie tak... Error: ${error}`);
    };
};
