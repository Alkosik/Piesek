module.exports = {
	name: 'płeć',
	description: 'Twoja płeć',
	execute(message, args, connection) {
		connection.query(`SELECT gender FROM account WHERE id = ${message.author.id}`, function (err, rows) {
			if (err) throw err;
			console.log(rows);
			let saved_gender = rows[0].gender
			if (saved_gender === 0) {
				let rn = Math.random() * (17 - 1) + 1;
				let rounded_rn = Math.floor(rn);
				sql = `UPDATE account SET gender = ${rounded_rn} WHERE id = '${message.author.id}'`;
				let saved_gender = rounded_rn;
				send_response(saved_gender);
				connection.query(sql);
			} else {
				let saved_gender = rows[0].gender
				send_response(saved_gender);
			}


			function send_response() {
				if (err) throw err;
				switch (saved_gender) {
					case 1: {
						let gender = "Helikopter Bojowy";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 2: {
						let gender = "Czołg";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 3: {
						let gender = "Lotniskowiec";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 4: {
						let gender = "Wóz strażacki";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 5: {
						let gender = "SWAT";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 6: {
						let gender = "Transgender";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 7: {
						let gender = "Transsexual";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 8: {
						let gender = "Two-Spirit";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 9: {
						let gender = "Agender";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 10: {
						let gender = "Bigender";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 11: {
						let gender = "Mężczyzna";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 12: {
						let gender = "Kobieta";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 13: {
						let gender = "Nadmężczyzna";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 14: {
						let gender = "Podkobieta";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 15: {
						let gender = "Śmieć";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 16: {
						let gender = "Robak";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
					case 17: {
						let gender = "Dzieciaczek";
						message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
						break;
					}
				}
			}
		});
		let rn = Math.random() * (17 - 1) + 1;
		let rounded_rn = Math.floor(rn);
		switch (rounded_rn) {
			case 1: {
				let gender = "Helikopter Bojowy";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 2: {
				let gender = "Czołg";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 3: {
				let gender = "Lotniskowiec";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 4: {
				let gender = "Wóz strażacki";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 5: {
				let gender = "SWAT";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 6: {
				let gender = "Transgender";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 7: {
				let gender = "Transsexual";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 8: {
				let gender = "Two-Spirit";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 9: {
				let gender = "Agender";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 10: {
				let gender = "Bigender";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 11: {
				let gender = "Mężczyzna";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 12: {
				let gender = "Kobieta";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 13: {
				let gender = "Nadmężczyzna";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 14: {
				let gender = "Podkobieta";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 15: {
				let gender = "Śmieć";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 16: {
				let gender = "Robak";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
			case 17: {
				let gender = "Dzieciaczek";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				break;
			}
		}
		//message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
	},
};