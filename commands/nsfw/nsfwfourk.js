const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
	category: 'NSFW',
	name: 'fourk',
	description: 'fourk!',
	callback: ({ message, args }) => {
		(async () => {
			let desire = args[0]
			const image = await nsfw.fourk();
			const embed = new Discord.MessageEmbed()
				.setTitle(`NSFW`)
				.setColor("RED")
				.setImage(image);
			message.channel.send(embed);
		})();
	},
};