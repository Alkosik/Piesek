const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
	name: 'ass',
	description: 'ass!',
	Category: 'nsfw',
	execute(message, args) {
		if (message.channel.nsfw) {
			(async () => {
				const image = await nsfw.ass();
				const embed = new Discord.MessageEmbed()
					.setTitle(`Gang Słoni - NSFW`)
					.setColor("RED")
					.setImage(image);
				message.channel.send(embed);
			})();
		} else {
			message.reply("Ta komenda jest dostępna tylko na kanałach NSFW.");
		}
	},
};