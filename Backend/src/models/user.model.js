const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Username is required" ],
        unique: [ true, "Username must be unique" ]
    },
    email: {
        type: String,
        required: [ true, "Email is required" ],
        unique: [ true, "Email must be unique" ]
    },
    password: {
        type: String,
        required: [ true, "Password is required" ],
        select: false
    },
    searchHistory: {
        type: [{
            query: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
}, { timestamps: true })

userSchema.pre("save", async function(next) {

    // check if password is modified
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Keep search history limited to 50 items (most recent first)
userSchema.pre("save", function(next) {
    if(this.searchHistory && this.searchHistory.length > 50) {
        this.searchHistory = this.searchHistory.slice(0, 50);
    }
    next();
});

// POST MIDDLEWARE (after saving)
userSchema.post("save", function(doc) {
    console.log("User created successfully:", doc.username);
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;