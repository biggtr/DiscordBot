const {Client, Interaction, ApplicationCommandOptionType,PermissionFlagsBits} = require("discord.js") 
const User = require("../../models/User")
const Role = require("../../models/Role")
const Portfolio = require("../../models/Portfolio")

module.exports = 
{
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) =>
    {
        targetUserId = interaction.member.id;
        enteredRole = interaction.options.get("role").value;
        enteredPortfolio = interaction.options.get("portfolio").value;

        const query = 
        {
            userId: targetUserId,
            guildId: interaction.guild.id,
        };
        try
        {
            userObject = await User.findOne(query)
            .populate("role")
            .populate("portfolio");
            let newRole;
            let newPortfolio;
            await interaction.deferReply();
            if(userObject)
            {
                const existingRole = await Role.findOne({ roleName: enteredRole }) ;
                const existingPortfolio = await Portfolio.findOne({ link: enteredPortfolio });

                const newRole = !existingRole ? await Role.create({ roleName: enteredRole }) : existingRole;
                const newPortfolio = !existingPortfolio ? await Portfolio.create({ link: enteredPortfolio }) : existingPortfolio;

                const isRoleSame = userObject.role ? userObject.role.equals(newRole._id) : false;
                const isPortfolioSame = userObject.portfolio ? userObject.portfolio.equals(newPortfolio._id) : false;
            
                if (isRoleSame && isPortfolioSame) {
                    await interaction.editReply("You are already assigned to this role or the provided portfolio link is the same as the old one.");
                    return;
                }
            
                userObject.role = newRole._id;
                userObject.portfolio = newPortfolio._id;
                await userObject.save().catch(e => {
                    console.log(`Error saving updated user data: ${e}`);
                    return;
                });
                
                await interaction.editReply(`You're now Assigned to ${enteredRole} role.`);
            }
            else
            {
                newRole = await Role.create({ roleName: enteredRole });
                newPortfolio = await Portfolio.create({ link: enteredPortfolio });
        
                const newUser = await User.create({
                    userId: targetUserId,
                    username: interaction.member.user.username,
                    guildId: interaction.guild.id,
                    portfolio: newPortfolio,
                    role: newRole
                });
                await interaction.editReply(`You're now assigned to the ${enteredRole} role.`);

                await newUser.save();
            }
        }
        catch(error)
        {
            console.log(`Error assigning role: ${error}`);
        }
        

    },
    name:"role",
    description: "assigns role for member in a discord server",
    options:
    [
        {
            name: "role",
            description: "Choose a role from the list.",
            type:ApplicationCommandOptionType.Role,
            required:true
        },
        {
            name: "portfolio",
            description: "Provide us with a link with your work (github/artstation/behance)",
            type:ApplicationCommandOptionType.String,
            required:true
        },
    ],
    botPermissions: [PermissionFlagsBits.ManageRoles],

}