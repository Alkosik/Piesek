module.exports = {
	category: 'Moderation',
	name: 'bans',
	description: 'ban!',
	category: 'moderation',
	slash: true,
	testOnly: true,
	minArgs: 2,
	expectedArgs: '<Osoba> <Powód>',
	callback: ({
		args,
		message
	}) => {
		const ownerID = '1';
		if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID.includes(message.author.id)) return '**Nie masz permisji do banowania! - [Administracja]**';
		return 'maybe'
	}
};