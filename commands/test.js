const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
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
	category: 'Utility',
	name: 'test',
	description: 'tst!',
	callback: ({ client, message }) => {
		const disbut = require("discord-buttons");
		let button = new disbut.MessageButton()
		.setStyle('url')
		.setURL('https://gangsloni.pl') 
		.setLabel('Gang Sloni'); 

		message.channel.send('test', button);
	},
};