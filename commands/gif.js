const giphyRandom = require("giphy-random");
const Discord = require('discord.js');

module.exports = {
	category: 'Fun',
	name: 'gif',
	description: 'Ale gif',
	execute(message, args) {
		(async () => {
			const API_KEY = "BpdjjPXkq4YMkNOKT4iTQAfV9g2gO4DX";

			const {
				data
			} = await giphyRandom(API_KEY, {
				rating: "r"
			});
			console.log(data.url);
			const gifEmbed = new Discord.MessageEmbed()
				.setImage(data.image_url)
			message.channel.send(gifEmbed);
		})();
	},
};