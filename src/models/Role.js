const {model,Schema} = require("mongoose")


const roleSchema = new Schema
(
    {
        roleName:
        {
            type: String,
            required: true,
            unique: true,
        }
    }
)

module.exports = model("Role",roleSchema);
