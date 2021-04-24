const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'volume',
    aliases: ['vol'],
    description: 'Volume',
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

        if (!client.player.getQueue(message)) response = `${client.emotes.error} - Ale ty kurwa debilu przecież nic nie leci to co mam ci podgłośnić`;

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') response = `${client.emotes.error} - Podaj prawidłowy numer`;

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) response = `${client.emotes.error} - Podaj prawdiłowy numer (między 1, a 100)`;

        if(!response){
            //
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`${client.emotes.success} - Głośność ustawiona na **${parseInt(args[0])}%**`);
    }
};