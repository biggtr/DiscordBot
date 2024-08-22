const {model,Schema} = require("mongoose")



const userSchema = new Schema
(
    {
        userId:
        {
            type: String,
            required:true
        },
        username:
        {
            type:String,
            required:true
        },
        guildId:
        {
            type:String,
            required:true
        },
        role: 
        { 
            type: Schema.Types.ObjectId,
            ref: 'Role',
            default:null

        },
        portfolio:
        {
            type: Schema.Types.ObjectId,
            ref: "Portfolio",
            default:null
        },
        level:
        {
            type: Schema.Types.ObjectId,
            ref: "Level",
            default:null
        }

    }
);

module.exports = model('User', userSchema);
