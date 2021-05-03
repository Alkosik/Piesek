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
	name: 'guildMemberAdd',
	execute(member, client) {
		console.log(`${member.displayName} joined the server.`);

		//#region MemCount
		const guild = client.guilds.cache.get("510941195267080214");
		var memberCountChannel = client.channels.cache.get("726734001347231784");
		let memCount = guild.memberCount;
		memberCountChannel.setName(`Ludzie: ${memCount} 👤`);
		//#endregion

		//Check level roles

		connection.query(`SELECT * FROM account WHERE id = ${member.id}`, function (err, rows) {
			if (err) throw err;

			if (rows.length < 1) return;

			if (rows[0].level >= 100) {
				const role = member.guild.roles.cache.find(role => role.name === "Elitarne Słonie");
				member.roles.add(role);
			} else if (rows[0].level >= 50) {
				const role = member.guild.roles.cache.find(role => role.name === "Best Słonie Ever <3");
				member.roles.add(role);
			} else if (rows[0].level >= 30) {
				const role = member.guild.roles.cache.find(role => role.name === "Zaawansowane Słonie");
				member.roles.add(role);
			} else if (rows[0].level >= 15) {
				const role = member.guild.roles.cache.find(role => role.name === "Fajne Słonie");
				member.roles.add(role);
			} else if (rows[0].level >= 5) {
				const role = member.guild.roles.cache.find(role => role.name === "Dobre Słonie");
				member.roles.add(role);
			} else if (rows[0].level >= 1) {
				const role = member.guild.roles.cache.find(role => role.name === "Słoniki");
				member.roles.add(role);
			}
		})
	},
};