module.exports = {
	name: 'profil',
	description: 'Profil!',
	execute(message, args, connection) {
		const genders = require('../json/genders.json');
		const gender_values = Object.values(genders);
		const hobbies = require('../json/hobbies.json');
		const hobbies_values = Object.values(hobbies);
		const Discord = require('discord.js');

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
						let rand1 = Math.random() * (60 - 7) + 7;
						let rounded_rand1 = Number(rand1.toFixed(1));
						role_age = rounded_rand1;

						let rand2 = Math.random() * (220 - 1) + 1;
						let rounded_rand2 = Number(rand2.toFixed(1));
						role_height = rounded_rand2;

						let rand3 = Math.random() * (200 - 30) + 30;
						let rounded_rand3 = Number(rand3.toFixed(1));
						role_weight = rounded_rand3;

						const role_gender = gender_values[parseInt(Math.random() * gender_values.length)]
						console.log(role_gender);

						//if(randomValue !== "Kobieta" && randomValue !== "Podkobieta"){
						let rand4 = Math.random() * (24 - 1) + 1;
						let rounded_rand4 = Number(rand4.toFixed(1));
						role_dicklenght = rounded_rand4 + "cm";
						//} else {
						//role_dicklenght = "Brak"
						//}
						const role_hobbies = hobbies_values[parseInt(Math.random() * hobbies_values.length)]
						console.log(role_hobbies);

						setTimeout(() => {
							/// Edit msg 20 seconds later
							//msg.edit("Wygenerowano: Wiek - " + role_age + " lat, Wzrost - " + role_height + "cm, Płeć - " + randomValue + ", Waga - " + role_weight + "kg.");
							const ProfileEmbed = new Discord.MessageEmbed()
								.setColor('RED')
								.setTitle(message.author.username)
								.setThumbnail(message.author.avatarURL())
								.addFields({
									name: 'Wiek',
									value: role_age + " lat",
									inline: true
								}, {
									name: 'Wzrost',
									value: role_height + "cm",
									inline: true
								}, {
									name: 'Waga',
									value: role_weight + "kg",
									inline: true
								}, {
									name: 'Płeć',
									value: role_gender + "",
									inline: true
								}, {
									name: 'Długość dicka/Szerokość pochwy',
									value: role_dicklenght,
									inline: true
								}, {
									name: 'Hobby',
									value: role_hobbies,
									inline: true
								})
							msg.delete;
							message.channel.send(ProfileEmbed);
							console.log(rows)
						}, 2000);

						//sql = `INSERT INTO account (rp, rp_age, rp_gender, rp_height, rp_dicklenght) VALUES ('1', '${role_age}', '${role_gender}', '${role_height}', '${role_dicklenght}')`
						sqlquery = `UPDATE account SET rp = '1', rp_age = '${role_age}', rp_gender = '${role_gender}', rp_height = '${role_height}', rp_dicklenght = '${role_dicklenght}', rp_weight = '${role_weight}', rp_hobbies = '${role_hobbies}' WHERE id = '${message.author.id}'`
						connection.query(sqlquery);
					})();
				} else {

					(async () => {
						msg = await message.channel.send("Pobieranie danych z bazy...");
						setTimeout(() => {
							/// Edit msg 20 seconds later
							//msg.edit("Wygenerowano: Wiek - " + role_age + " lat, Wzrost - " + role_height + "cm, Płeć - " + randomValue + ", Waga - " + role_weight + "kg.");
							const ProfileEmbed = new Discord.MessageEmbed()
								.setColor('RED')
								.setTitle(message.author.username)
								.setThumbnail(message.author.avatarURL())
								.addFields({
									name: 'Wiek',
									value: rows[0].rp_age + " lat",
									inline: true
								}, {
									name: 'Wzrost',
									value: rows[0].rp_height + "cm",
									inline: true
								}, {
									name: 'Waga',
									value: rows[0].rp_weight + "kg",
									inline: true
								}, {
									name: 'Płeć',
									value: rows[0].rp_gender + "",
									inline: true
								}, {
									name: 'Długość dicka/Szerokość pochwy',
									value: rows[0].rp_dicklenght + 'cm',
									inline: true
								}, {
									name: 'Hobby',
									value: rows[0].rp_hobbies,
									inline: true
								})
							msg.delete;
							message.channel.send(ProfileEmbed);
							console.log(rows)
						}, 2000);
					})();
				}
			});
		})();
	},
};