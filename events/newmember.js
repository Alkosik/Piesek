module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
		console.log("kurwa")
		//client.channels.cache.get('511224486545326100')
		console.log(`**${member.tag}** dołączył na serwer.`);

		//const guild = client.guilds.cache.find(guild => {guild.id == "510941195267080214"});
		const guild = client.guilds.cache.get("510941195267080214");
		//var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
      	var memberCountChannel = client.channels.cache.get("726734001347231784");
		let memCount = guild.memberCount;
      	memberCountChannel.setName(`Ludzie: ${memCount} 👤`);
	},
};