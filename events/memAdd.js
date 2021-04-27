module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
		console.log(`**${member.tag}** joined the server.`);

		//#region MemCount
		const guild = client.guilds.cache.get("510941195267080214");
      	var memberCountChannel = client.channels.cache.get("726734001347231784");
		let memCount = guild.memberCount;
      	memberCountChannel.setName(`Ludzie: ${memCount} 👤`);
        //#endregion
	},
};