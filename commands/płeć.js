module.exports = {
	name: 'płeć',
	description: 'Twoja płeć',
	execute(message, args) {
		console.log("RUNNING GENDER")
		let rn = Math.random() * (17 - 1) + 1;
		let rounded_rn = Math.floor(rn);
		console.log(rounded_rn);
		switch (rounded_rn) {
			case 1: {
				console.log("CASE" + rn);
				let gender = "Helikopter Bojowy";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 2: {
				console.log("CASE" + rn);
				let gender = "Czołg";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 3: {
				console.log("CASE" + rn);
				let gender = "Lotniskowiec";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 4: {
				console.log("CASE" + rn);
				let gender = "Wóz strażacki";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 5: {
				console.log("CASE" + rn);
				let gender = "SWAT";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 6: {
				console.log("CASE" + rn);
				let gender = "Transgender";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 7: {
				console.log("CASE" + rn);
				let gender = "Transsexual";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 8: {
				console.log("CASE" + rn);
				let gender = "Two-Spirit";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 9: {
				console.log("CASE" + rn);
				let gender = "Agender";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 10: {
				console.log("CASE" + rn);
				let gender = "Bigender";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 11: {
				console.log("CASE" + rn);
				let gender = "Mężczyzna";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 12: {
				console.log("CASE" + rn);
				let gender = "Kobieta";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 13: {
				console.log("CASE" + rn);
				let gender = "Nadmężczyzna";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 14: {
				console.log("CASE" + rn);
				let gender = "Podkobieta";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 15: {
				console.log("CASE" + rn);
				let gender = "Śmieć";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 16: {
				console.log("CASE" + rn);
				let gender = "Robak";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
			case 17: {
				console.log("CASE" + rn);
				let gender = "Dzieciaczek";
				message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
				console.log("CASE" + rn);
				break;
			}
		}
		//message.channel.send(`<@${message.author.id}>, Twoja prawdziwa płeć to ` + gender + '!');
	},
};