const {Schema,model} = require("mongoose")


const levelSchema = new Schema
(
    {
        xp:
        {
            type:Number,
            default:0
        },
        level:
        {
            type:Number,
            default:1
        }
    }
);

module.exports = model("Level",levelSchema);