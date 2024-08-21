const {Client,Message} = require("discord.js")
const Level = require("../../models/Level")

const MAX_XP = 100;

const getRandomXp = (min, max) => 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client,message) =>
{
    if(!message.inGuild() || message.author.bot)
        return;

    const xpToGive = getRandomXp(20,30);

    const query = 
    {
        userId:message.author.id,
        guildId: message.guild.id,
    };
    try
    {

        const levelModel = await Level.findOne(query);
        if(levelModel)
        {
            levelModel.xp += xpToGive;
            
            if(levelModel.xp >= MAX_XP)
            {
                levelModel.xp = 0;
                levelModel.level +=1;
                newLevel = levelModel.level;
                await message.author.send(`Congratulations! You have leveled up to **level ${newLevel}**.`);
            }
            levelModel.save().catch(e =>
                {
                console.log(`Error saving updated level ${e}`);
                return;
                });
        }
        else
        {
            const newLevel = await Level.create({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
                level: 1, // Initialize level to 1
            });

            await newLevel.save(); // Save the new level document


        }
    }
    catch (error) 
    {
        console.log(`Error giving xp: ${error}`);
    }
}