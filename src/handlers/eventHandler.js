const getAllFiles = require("../utils/getAllFiles");
const path = require('path');


module.exports = (client) => 
    {
        const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);
        for (const eventFolder of eventFolders)
        {
            const eventFiles = getAllFiles(eventFolder);
            const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
            console.log(eventName);
            console.log(eventFiles);

            client.on(eventName, async (arg) => 
            {
                for (const eventFile of eventFiles)  
                {
                    const eventFunction = require(eventFile);
                    await eventFunction(client, arg);

                }
            })
        }
    };