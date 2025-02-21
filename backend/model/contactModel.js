const { timeStamp } = require('console');
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "id is required"],
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "name is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true
        },
        phone: {
            type: String,
            required: [true, "phone is required"],
            unique: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", contactSchema);