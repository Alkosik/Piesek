const { MessageEmbed } = require("discord.js")

module.exports = {
    category: 'Moderation',
    name: 'unban',
    description: 'Unban',
    minArgs: 1,
	expectedArgs: '<Osoba> <Powód>',
    callback: async ({ message, args }) => {
        if (!message.member.roles.cache.some(r => r.name === "Administracja")) return message.channel.send("**Nie masz permisji do odbanowywania - [Administracja]**")

        if (!args[0]) return message.channel.send("**Podaj osobę do odbanowania**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**Podaj prawidłowy Nick, Tag Albo ID / Ta osoba nie jest zbanowana**")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**Nie mam permisji do banowania - [BAN_MEMBERS**")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag}** zostal odbanowany za **${reason}**`)
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag}** zostal odbanowany`)
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unban")
            .addField("**Unbanned**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason}` || "**No Reason**")
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get('510944563091996673')
        if (!sChannel) return;
        sChannel.send(embed)
    }
}