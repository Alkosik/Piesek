module.exports = {
    category: 'Utility',
	name: 'help',
	description: 'Help Menu',
	slash: false,
	testOnly: false,
    // callback: ({ message, args, text, client, prefix, instance }) => {
    //   instance.commandHandler.commands.forEach((command) => {
    //     //console.log(command)
    //     console.log('dziala')
    //   })
    //   return 'Wydupcaj sebastian'
    // },
    callback: ({ message, args }) => {
        message.channel.send('Nie');
    }
  }