const {
    MessageEmbed
} = require('discord.js');

const mysql = require('mysql');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "www5056_gsmaindb"
});

module.exports = {
    category: 'Moderation',
    name: 'kick',
    description: 'Kick',
    minArgs: 2,
    expectedArgs: '<Osoba> <Powód>',
    slash: false,
    testOnly: false,
    callback: async ({
        message,
        args
    }) => {
        if (!message.member.roles.cache.some(r => r.name === "Administracja")) return message.channel.send('**Nie masz permisji do kickowania - [Administracja]**');
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**Nie mam permisji do kickowania! - [KICK_MEMBERS]**");

        if (!args[0]) return message.channel.send('**Podaj osobę do zkickowania!**')

        var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!kickMember) return message.channel.send("**Tej osoby nie ma na serwerze**");

        if (kickMember.id === message.member.id) return message.channel.send("**Nie możesz wyrzucić sam siebie**")

        if (!kickMember.kickable) return message.channel.send("**Nie możesz wyrzucić tej osoby**")
        if (kickMember.user.bot) return message.channel.send("**Nie możesz wyrzucić bota**")

        var reason = args.slice(1).join(" ");
        try {
            const sembed2 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**Zostałeś wyrzucony z ${message.guild.name} za - ${reason || "Brak powodu"}**`)
                .setFooter(message.guild.name, message.guild.iconURL())
            kickMember.send(sembed2).then(() =>
                kickMember.kick()).catch(() => null)
        } catch {
            kickMember.kick()
        }
        if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** został wyrzucony za ${reason}`)
            message.channel.send(sembed);
        } else {
            var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** został wyrzucony`)
            message.channel.send(sembed2);
        }
        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(kickMember.user.displayAvatarURL({
                dynamic: true
            }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "kick")
            .addField("**User Kicked**", kickMember.user.username)
            .addField("**Kicked By**", message.author.username)
            .addField("**Reason**", `${reason || "**No Reason**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get('510944563091996673')
        if (!sChannel) return;
        sChannel.send(embed)
    }
}