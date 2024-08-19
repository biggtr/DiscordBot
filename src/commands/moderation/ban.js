const { SlashCommandBuilder,PermissionFlagsBits  } = require('discord.js');

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans a member!')
        .addUserOption(option => 
            option.setName("member")
                .setDescription("Member to ban")
                .setRequired(true)
        ).addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban")
                .setRequired(false)
        ).setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ,
	async execute(client, interaction) {
		await interaction.reply('ban!');
	},
};
