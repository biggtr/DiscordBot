const { Client, Interaction,ApplicationCommandOptionType } = require("discord.js")


module.exports = 
{
    /**
     *
     * @param {Client}
     * @param {Interaction}
     */

    callback: (client, interaction) =>
    {

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
    ]


}