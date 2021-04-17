const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
	category: 'NSFW',
	name: 'hthigh',
	description: 'hthigh!',
	callback: ({ message, args }) => {
		(async () => {
			let desire = args[0]
			const image = await nsfw.hentaithigh();
			const embed = new Discord.MessageEmbed()
				.setTitle(`NSFW`)
				.setColor("RED")
				.setImage(image);
			message.channel.send(embed);
		})();
	},
};