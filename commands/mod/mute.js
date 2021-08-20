module.exports = {
    category: 'Moderation',
    name: 'mute',
    description: 'Mute',
    minArgs: 2,
    expectedArgs: '<Osoba> <Powód>',
    slash: false,
    testOnly: false,
    callback: async ({
        message,
        args
    }) => {
        if (!message.member.roles.cache.some(r => r.name === "Administracja")) return message.channel.send('**Nie masz permisji do mutowania - [Administracja]**');

        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**Nie mam permisji do mutowania - [MANAGE_GUILD]**")
        if (!args[0]) return message.channel.send("**Podaj osobę do zmutowania**");

        var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send("**Podaj poprawną osobę do zmutowania**");

        if (mutee === message.member) return message.channel.send("**Nie możesz zmutować sam siebie**")
        if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Nie można zmutować tej osoby**')

        let reason = args.slice(1).join(" ");
        if (mutee.user.bot) return message.channel.send("**Nie możesz mutować botów**");
        const userRoles = mutee.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r.id)

        let muterole;
        //let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "Muted")

        // if (!message.guild.roles.cache.has(dbmute)) {
        //     muterole = muteerole
        // } else {
        //     muterole = message.guild.roles.cache.get(dbmute)
        // }

        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#514f48",
                        permissions: []
                    }
                })
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false,
                        CONNECT: false,
                    })
                })
            } catch (e) {
                console.log(e);
            }
        };

        if (mutee.roles.cache.has(muterole.id)) return message.channel.send("**Ta osoba jest już zmutowana**")

        //db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
        try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**Elo, Zostałeś zmutowany w ${message.guild.name} za - ${reason || "Brak powodu"}`).catch(() => null)
            })
        } catch {
            mutee.roles.set([muterole.id])
        }
        if (reason) {
            const sembed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`${mutee.user.username} został wyciszony za ${reason}`)
            message.channel.send(sembed);
        } else {
            const sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${mutee.user.username} został wyciszony`)
            message.channel.send(sembed2);
        }

        let embed = new MessageEmbed()
            .setColor('RED')
            .setThumbnail(mutee.user.displayAvatarURL({
                dynamic: true
            }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "mute")
            .addField("**Mutee**", mutee.user.username)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason || "**No Reason**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()

        var sChannel = message.guild.channels.cache.get('510944563091996673')
        if (!sChannel) return;
        sChannel.send(embed)
    }
}