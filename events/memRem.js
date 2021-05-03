module.exports = {
	name: 'guildMemberRemove',
	execute(member, client) {
		console.log("kurwa")
		//client.channels.cache.get('511224486545326100')
		console.log(`**${member.displayName}** left the server.`);

        //#region MemCount
		const guild = client.guilds.cache.get("510941195267080214");
      	var memberCountChannel = client.channels.cache.get("726734001347231784");
		let memCount = guild.memberCount;
      	memberCountChannel.setName(`Ludzie: ${memCount} 👤`);
        //#endregion
	
        const channel = member.guild.channels.cache.find(ch => ch.id === '511224486545326100');
        if (!channel) return;

        channel.send(`**${member.displayName}** opuścił serwer, albo został wyjebany.`);
    },
};