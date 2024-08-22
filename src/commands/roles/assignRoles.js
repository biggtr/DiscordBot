const {Client, Interaction, ApplicationCommandOptionType,PermissionFlagsBits} = require("discord.js") 
const User = require("../../models/User")
const Role = require("../../models/Role")
const Portfolio = require("../../models/Portfolio")
const cooldowns = new Map();
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
        enteredRole = interaction.options.get("role").role;
        enteredPortfolio = interaction.options.get("portfolio").value;
        const cooldownPeriod = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds

        const now = Date.now();
        await interaction.deferReply();

        if (cooldowns.has(targetUserId)) {
            const expirationTime = cooldowns.get(targetUserId);
            if (now < expirationTime) {
                const remainingTime = Math.ceil((expirationTime - now) / (cooldownPeriod /7)); // convert to days
                await interaction.editReply(`Please wait ${remainingTime} day(s) before using this command again.`);
                return;
            }
        }

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
            if(userObject)
            {
                const existingRole = await Role.findOne({ roleName: enteredRole.name }) ;
                const existingPortfolio = await Portfolio.findOne({ link: enteredPortfolio });

                const newRole = !existingRole ? await Role.create({ roleName: enteredRole.name }) : existingRole;
                const newPortfolio = !existingPortfolio ? await Portfolio.create({ link: enteredRole.name }) : existingPortfolio;

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
                
                await interaction.editReply(`You're now Assigned to ${enteredRole.name} role.`);
            }
            else
            {
                newRole = await Role.create({ roleName: enteredRole.name });
                newPortfolio = await Portfolio.create({ link: enteredPortfolio });
        
                const newUser = await User.create({
                    userId: targetUserId,
                    username: interaction.member.user.username,
                    guildId: interaction.guild.id,
                    portfolio: newPortfolio,
                    role: newRole
                });
                await interaction.editReply(`You're now assigned to the ${enteredRole.name} role.`);

                await newUser.save();
            }
            cooldowns.set(targetUserId, now + cooldownPeriod);
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