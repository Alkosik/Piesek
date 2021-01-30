const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
	name: 'test',
	description: 'tst!',
	execute(message, args, connection, client, Discord) {
		//if (message.author.id != "224487361394769920") {
		//	return message.reply("Dołączanie do konkursu jest akutalnie wyłączone.");
		//}
		(async () => {

			connection.query(`SELECT * FROM acc_event WHERE points=(SELECT MAX(points) FROM acc_event)`, function (err, rows) {

				//id = rows[0].id;
				const embed = new Discord.MessageEmbed()
                            .setImage('https://i.ibb.co/rk0Z6Mb/Grupfdgggdrszga-1.png')
							.setTitle(`Aktualnie najwięcej punktów ma ${rows[0].username}`)
							.setDescription(`Tabela wyników kiedyś będzie dostępna na https://hauhau.herokuapp.com`)
                            .setColor('#4d33de');


                client.channels.cache.get('747933354468573194').send(embed);
				
			})

		})();
	},
};