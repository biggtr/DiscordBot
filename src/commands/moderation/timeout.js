const { Client, Interaction,ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")
const ms = require('ms');

const MAX_TIME = 2.419e9; //28 days in ms

module.exports = 
{
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) =>
    {

        const targetUserId = interaction.options.get("target-user").value;
        const duration = interaction.options.get("duration").value;
        const reason = interaction.options.get("reason")?.value || "No reason provided";

        const memberToTimeout = await interaction.guild.members.fetch(targetUserId);
        await interaction.deferReply();
        if(!memberToTimeout)
        {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }
        if(memberToTimeout.id === interaction.guild.ownerId)
        {
            await interaction.editReply("You can't ban that user because they're the server owner.");
            return;
        }
        console.log(memberToTimeout.user.bot);

        if(memberToTimeout.user.bot)
        {
            await interaction.editReply("I Can't timeout a bot.");
            return;
        }

        msDuration = ms(duration);
        if(isNaN(msDuration))
        {
            await interaction.editReply('Please provide a valid timeout duration.');
            return;
        }
        if(msDuration < 5000 || msDuration > MAX_TIME)
        {
            await interaction.editReply('Timeout duration cannot be less than 5 seconds or more than 28 days.');
            return;
        }
      
        const targetUserRolePosition = memberToKick.roles.highest.position; // Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
        if (targetUserRolePosition >= requestUserRolePosition) 
        {
          await interaction.editReply(
            "You can't kick that user because they have the same/higher role than you."
          );
          return;
        }
        if (targetUserRolePosition >= botRolePosition) 
        {
          await interaction.editReply(
            "I can't kick that user because they have the same/higher role than me."
          );
          return;
        }
        try 
        {

            const { default: prettyMs } = await import('pretty-ms');
            if (targetUser.isCommunicationDisabled())
                {
                    await targetUser.timeout(msDuration, reason);
                    await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}\nReason: ${reason}`);
                    return;
                } 
            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}.\nReason: ${reason}`);
        }
        catch (error) 
        {
            console.log(`There was an error when timing out: ${error}`);
        }

    },
    name: "timeout",
    description: "timeout Members in a Discord Server",
    options:
    [
        {
            name: "target-user",
            description: 'The user you want to timeout.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: "duration",
            description: 'Timeout duration (30m, 1h, 1 day).',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason you want to timeout.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    PermissionRequired: [PermissionFlagsBits.MuteMembers],
    botPermission: [PermissionFlagsBits.MuteMembers],


}