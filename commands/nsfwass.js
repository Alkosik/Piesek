const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
	name: 'ass',
	description: 'ass!',
	execute(message, args) {
		(async () => {
			let desire = args[0]
			const image = await nsfw.ass();
			const embed = new Discord.MessageEmbed()
				.setTitle(`NSFW`)
				.setColor("RED")
				.setImage(image);
			message.channel.send(embed);
		})();
	},
};