const {model,Schema} = require("mongoose")


const roleSchema = new Schema
(
    {
        roleName:
        {
            type: String,
            required: true,
            enum: ["Game Programmer", "Graphics Engineer", "VFX Artist","Animator","3D Artist",],
        }
    }
)

module.exports = model("Role",roleSchema);
