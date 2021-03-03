module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Discord connection estabilished.');
        console.log(`Logged in as ${client.user.tag}.`);
	},
};
