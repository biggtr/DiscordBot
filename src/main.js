const dotenv =  require('dotenv'); 
dotenv.config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const getAllFiles = require('./utils/getAllFiles');
const eventHandler = require('./handlers/eventHandler');


const client = new Client({intents :[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});

//add commands property to client to store the commands retrieved;
client.commands = new Collection();


eventHandler(client);

client.login(process.env.DISCORD_TOKEN);