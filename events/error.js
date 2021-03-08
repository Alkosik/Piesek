module.exports = {
	name: 'error',
	execute(client, error) {
		client.channels.cache.get("510941195929649153").send(`Ojoj, errorek <@224487361394769920>`);
        console.error(error)
	},
};