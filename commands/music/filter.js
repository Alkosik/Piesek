const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'filter',
    description: 'Filter',
    //aliases: ['p'],
    slash: false,
    testOnly: false,
    callback: ({
        client,
        message,
        args
    }) => {
        let response;
        if (!message.member.voice.channel) response = `${client.emotes.error} - **Nie jesteś na kanale głosowym**`;

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) response = `${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`;

        if (!client.player.getQueue(message)) response = `${client.emotes.error} - Ale nic nie leci kurwa debilu to na co ci mam ten filtr nałożyć`;

        if (!args[0]) response = `${client.emotes.error} - Podaj prawidłowy filtr.`;

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) response = `${client.emotes.error} - Ten filtr nie istnieje, spróbuj np. (8D, vibrato, pulsator...)`;

        if(!response){
            //
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.music} - Trwa **dodawanie** filtra do muzyki... Alkoschuju: im dłuższa jest muzyka, tym dłużej to potrwa.`);
        else message.channel.send(`${client.emotes.music} - Trwa **usuwanie** filtra z muzyki... Alkoschuju: im dłużej gra muzyka, tym dłużej to potrwa.`);
    }
};