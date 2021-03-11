module.exports = {
	name: 'shardError',
	execute(client) {
		client.channels.cache.get("510941195929649153").send(`Ojoj, errorek sharda <@224487361394769920>`);
        //console.error(error)
	},
};