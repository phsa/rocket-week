const axios = require('axios');

const Developer = require('../models/Developer');

module.exports = {
    async index(request, response) {
        const { userid: loggedDeveloperID } = request.headers;
        const loggedDeveloper = await Developer.findById(loggedDeveloperID);

        const developers = await Developer.find({
            $and: [
                { _id: { $ne: loggedDeveloper._id } },
                { _id: { $nin: loggedDeveloper.likes } },
                { _id: { $nin: loggedDeveloper.dislikes } },
            ],
        });

        return response.json(developers);
    },

    async store(request, response) {

        const { username } = request.body;
        const searchedUser = await Developer.findOne({ username: username });

        if (searchedUser) {
            return response.json(searchedUser);
        } else {

            const githubResponse = await axios.get(`https://api.github.com/users/${username}`);
            const { name, bio, avatar_url: avatar_address } = githubResponse.data;
            const newDeveloper = await Developer.create({
                name,
                username,
                bio,
                avatar_address
            });

            return response.json(newDeveloper);
        }
    }
}