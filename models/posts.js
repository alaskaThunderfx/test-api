const mongoose = require(`mongoose`)

const PostSchema = mongoose.Schema(
    {
        posts: {
            type: Array
        }
        // ,
        // author: {
        //     type: String
        // },
        // authorId: {
        //     type: Number
        // },
        // likes: {
        //     type: Number
        // },
        // popularity: {
        //     type: Number
        // },
        // reads: {
        //     type: Number
        // },
        // tags: {
        //     type: Array
        // }
    }
)

module.exports = mongoose.model("Post", PostSchema)