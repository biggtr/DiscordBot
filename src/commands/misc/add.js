const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data : new SlashCommandBuilder()
	        .setName('add')
	        .setDescription('Adds two numbers together!')
            .addIntegerOption(
                option =>

                    option.setName("num1")
                        .setDescription("The first number")
                        .setRequired(true)
            )
            .addIntegerOption(
                option =>
                    option.setName("num2")
                        .setDescription("The Second number")
                        .setRequired(true)
            )
            ,
    async execute(interaction)
    {
        const num1 = interaction.options.getInteger('num1');
        const num2 = interaction.options.getInteger('num2');
        const result = num1 + num2;
        await interaction.reply(`The sum of ${num1} and ${num2} is ${result}!`);
    }
};