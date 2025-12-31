const { default: mongoose } = require("mongoose")

export const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
    }).then(() => console.log("Connected to DB")).catch((err) => console.log(err));
}