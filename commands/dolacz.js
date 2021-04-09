const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
	category: 'Events',
	name: 'dolacz',
	description: 'Dołącz!',
	execute(message, args, connection) {
		//if (message.author.id != "224487361394769920") {
		//	return message.reply("Dołączanie do konkursu jest akutalnie wyłączone.");
		//}
		(async () => {
			msg1 = await message.channel.send("Sprawdzanie danych w bazie...");


			connection.query(`SELECT * FROM acc_event WHERE id = ${message.author.id}`, function (err, rows) {
				if (err) throw err;

				let updatedPoints;

				if (rows.length <= 1) {
					(async () => {
						await snooze(2500);
						msg1.edit("Zapisywanie danych w bazie...");
					})();
					updatedPoints = 0;
					sql = `INSERT INTO acc_event (username, id, points) VALUES ('${message.author.username}', ${message.author.id}, ${updatedPoints})`;
					connection.query(sql);
					(async () => {
						await snooze(2500);
						role = message.guild.roles.cache.find(r => r.name === "FAME");
						message.member.roles.add(role).catch(console.error);
						msg1.edit(`Zostales zarejestrowany w konkursie. - ${message.author}`);
					})();
				} else {
					(async () => {
						await snooze(2500);
						msg1.edit(`Byłeś już zarejestowany. - ${message.author}`);
					})();
				}

			});
		})();
	},
};