const {Client,Message} = require("discord.js")
const Level = require("../../models/Level")
const User = require("../../models/User")
const cooldowns = new Set();
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
    if(!message.inGuild() || message.author.bot || cooldowns.has(message.author.id))
        return;

    const xpToGive = getRandomXp(20,30);

    const query = 
    {
        userId:message.author.id,
        username: message.author.username,
        guildId: message.guild.id,
    };
    try
    {

        const userObject = await User.findOne(query).populate("level");
        if(userObject)
        {
            userObject.level.xp += xpToGive;
            if(userObject.level.xp >= MAX_XP)
            {
                userObject.level.xp = 0;
                userObject.level.level +=1;
                await message.author.send(`Congratulations! You have leveled up to **level ${newLevel}**.`);
            }
            userObject.save().catch(e =>
                {
                console.log(`Error saving updated level ${e}`);
                return;
                });
            cooldowns.add(message.author.id);
            setTimeout(()=>{
                cooldowns.delete(message.author.id);
            },60000)
        }

        else
        {
            const newLevel = await Level.create
            (
                {
                    xp:0,
                    level:1,
                }
            );
            const newUser = await User.create({
                userId: message.author.id,
                username: message.author.username,
                guildId: message.guild.id,
                level: newLevel, 
            });

            await newUser.save();
            cooldowns.add(message.author.id);
            setTimeout(()=>{
                cooldowns.delete(message.author.id);
            },60000)

        }
    }
    catch (error) 
    {
        console.log(`Error giving xp: ${error}`);
    }
}