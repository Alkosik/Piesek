const { MessageEmbed } = require('discord.js')
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
	category: 'Ranking',
	name: 'ranking',
	description: 'Ranking!',
	callback: ({ message }) => {
		(async () => {
			connection.query(`SELECT username, points FROM acc_event ORDER BY points DESC LIMIT 5`, function (err, rows) {
				if (err) throw err;

				(async () => {
					msg = await message.channel.send("Pobieranie danych z bazy...");
					setTimeout(() => {
						/// Edit msg 20 seconds later
						//msg.edit("Wygenerowano: Wiek - " + role_age + " lat, Wzrost - " + role_height + "cm, Płeć - " + randomValue + ", Waga - " + role_weight + "kg.");
						const LeaderboardEmbed = new MessageEmbed()
							.setColor('#4d33de')
							.setTitle('Aktualny ranking w konkursie')
							.setThumbnail('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
							.addFields({
								name: 'Miejsce 1.',
								value: rows[0].username + ' - ' + rows[0].points,
								inline: true
							}, {
								name: 'Miejsce 2.',
								value: rows[1].username + ' - ' + rows[1].points,
								inline: true
							}, {
								name: 'Miejsce 3.',
								value: rows[2].username + ' - ' + rows[2].points,
								inline: true
							}, {
								name: 'Miejsce 4.',
								value: rows[3].username + ' - ' + rows[3].points,
								inline: true
							}, {
								name: 'Miejsce 5.',
								value: rows[4].username + ' - ' + rows[4].points,
								inline: true
							}, )
						msg.delete;
						message.channel.send(LeaderboardEmbed);
						console.log(rows)
					}, 2000);
				})();
			});
		})();
	},
};