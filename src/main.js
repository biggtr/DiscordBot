const dotenv =  require('dotenv'); 
dotenv.config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const getAllFiles = require('./utils/getAllFiles');
const eventHandler = require('./handlers/eventHandler');
const { default: mongoose } = require('mongoose');


const client = new Client({intents :[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});


(
    async() => 
    {
        try
        {
            mongoose.set("strictQuery", false);
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Connected To DB...");

            eventHandler(client);
            client.login(process.env.DISCORD_TOKEN);
        }
        catch(error)
        {
            console.log(`There is an error ${error}`)
        }
    }
)();

