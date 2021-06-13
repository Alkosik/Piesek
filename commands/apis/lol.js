const https = require('https');

module.exports = {
    category: 'APIs',
    name: 'lol',
    description: 'Liga legend',
    callback: async ({
        message
    }) => {

        const getSummonerId = new Promise((resolve, reject) => {
            https.get('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Julxxis?api_key=RGAPI-6d20adaf-b3bf-4b5b-a28c-99b7ee3d5e15', (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    console.log(JSON.parse(data).name);
                    console.log(JSON.parse(data).id);
                    resolve(JSON.parse(data).id);
                    //return JSON.parse(data).id;
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            })
        });

        const getMatchInfo = async () => {
            sumId = await getSummonerId;
            console.log(sumId);

            https.get(`https://eun1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${sumId}?api_key=RGAPI-6d20adaf-b3bf-4b5b-a28c-99b7ee3d5e15`, (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    if(JSON.parse(data).status_code == '404'){
                        message.channel.send('ale że grisza nie gra w lige????????????')
                    }
                    console.log(JSON.parse(data));
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }

        getMatchInfo();
    },
};