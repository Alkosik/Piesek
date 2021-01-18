module.exports = {
	name: 'profil',
	description: 'Profil!',
	execute(message, args, connection) {
		const sex = require('../data.json');
		const values = Object.values(sex)

		let msg;
		
		(async () => {
			connection.query(`SELECT * FROM account WHERE id = ${message.author.id}`, function (err, rows) {
				if (err) throw err;
				console.info("Profile query started.");
				console.info("RP Value is " + rows[0].rp)
				if (rows[0].rp === 0) {
					console.info("Profile creation started.");

					(async () => {

						msg = await message.channel.send("Rozpoczynanie kreacji profilu...");
						let rand1 = Math.random() * (60 - 1) + 1;
						let rounded_rand1 = Number(rand1.toFixed(1));
						role_age = rounded_rand1;

						let rand2 = Math.random() * (220 - 1) + 1;
						let rounded_rand2 = Number(rand2.toFixed(1));
						role_height = rounded_rand2;

						const randomValue = values[parseInt(Math.random() * values.length)]
						console.log(randomValue);
						
						setTimeout(() => {
							// Edit msg 20 seconds later
							msg.edit("Wygenerowano: Wiek - " + role_age + " Wzrost - " + role_height + " Płeć - " + randomValue);
						}, 2000);

					})();
				}
			});
		})();
	},
};