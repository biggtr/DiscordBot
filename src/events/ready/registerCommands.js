const getApplicationCommnads = require("../../utils/getApplicationCommnads");
const getLocalCommands = require("../../utils/getLocalCommands")
const dotenv =  require('dotenv'); 

dotenv.config();
module.exports = (client) => 
{
    try 
    {    
        const localCommands =  getLocalCommands()
        const applicationCommands = getApplicationCommnads(client,process.env.GUILD_ID)
        for(localCommand of localCommands)
        {
            const {name, description, options} = localCommand.data;
            console.log('Command Name:', name);
            console.log('Description:', description);
            console.log('Options:', options);
        }
    }

    catch (error)
    {
        console.log(`There was an error : ${error}`);
    }
}