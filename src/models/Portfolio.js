const {model,Schema} = require("mongoose")


const portfolioSchema = new Schema
(
    {
        link:
        {
            type: String,
            required: true,
            unique: true,
        }
    }
)

module.exports = model("Portfolio",portfolioSchema);
