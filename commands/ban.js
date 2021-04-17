const { MessageEmbed } = require('discord.js');

module.exports = {
    category: 'Moderation',
    name: 'ban',
    description: 'Ban',
    minArgs: 2,
	expectedArgs: '<Osoba> <Powód>',
    callback: ({ message, args }) => {
        (async () => {
            if (!message.member.roles.cache.some(r => r.name === "Administracja")) return '**Nie masz permisji do banowania - [Administracja]**';
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**Nie mam permisji do banowania - [BAN_MEMBERS]**");
            if (!args[0]) return message.channel.send("**Podaj osobę do zbanowania**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            let grisza = message.guild.members.cache.get('284419910824624129') || message.guild.members.cache.find(g => g.user.username.toLowerCase() == 'gredży') || message.guild.members.cache.find(gre => gre.displayName.toLowerCase() === 'gredży');
            let nobody = message.guild.members.cache.get('284366115348414466') || message.guild.members.cache.find(g => g.user.username.toLowerCase() == 'nobody') || message.guild.members.cache.find(gre => gre.displayName.toLowerCase() === 'nobody');
            if (!banMember) return message.channel.send("**Tej osoby nie ma na tym serwerze**");
            if (banMember === message.member) return message.channel.send("**Nie możesz zbanować siebie kekw**")
            if (banMember === grisza) return message.channel.send("**Nie ma banowania griszy essa ;)**")
            if (banMember === nobody) return message.channel.send("**Nie ma banowania sebastiana slowika essa ;)**")
            if (banMember.roles.cache.some(r => r.name === "Administracja")) return message.channel.send("**Administracja nie może być banowana**")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**Nie możesz zbanować tej osoby**")
            try {
                message.guild.members.ban(banMember)
                banMember.send(`**Elo, Zostales zbanowany z ${message.guild.name} za - ${reason || "Brak powodu"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${banMember.user.username}** zostal zbanoway za ${reason}`)
                message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${banMember.user.username}** zostal zbanoway`)
                message.channel.send(sembed2)
            }
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#4d33de")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

                var sChannel = message.guild.channels.cache.get('510944563091996673')
                if (!sChannel) return;
                channel.send(embed)
        })();
    }, 
    error: ({ error, command, message, info }) => {
        if (error === 'INVALID ARGUMENTS') {
          const embed = new MessageEmbed()
            .setTitle('Kurwo naucz sie korzystac z tej komeny')
            .addField('najpierw oznaczasz osobe a potem dajesz powód', 'chuj')
            .setColor(0xff0000)
    
          message.reply(embed)
        }
      },
};