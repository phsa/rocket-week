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

            const githubResponse = await axios.get(`https://api.github.com/users/${username}`)
                .catch(function (error) {
                    var errorMessage = ': Something went wrong in the server.';
                    var clientStatus = 503;
                    var serverStatus = 404;
                    if (error.response) {
                        clientStatus = 400;
                        serverStatus = error.response.status;
                        errorMessage = `: ${error.message}`;
                    } else if (error.request) {
                        errorMessage = `: Request to Github Timed out`;
                        clientStatus = 500;
                    } else {
                        errorMessage = `: ${error.message}`;
                        clientStatus = 500;
                        serverStatus = 500;
                    }
                    console.log('Error', serverStatus, errorMessage);
                    response.status(clientStatus);
                    return response.json({ error: `Code ${clientStatus} ${errorMessage}`});
                });

            if (githubResponse) {
                const { name, bio, avatar_url: avatar_address } = githubResponse.data;

                if (!name) var _name = username;
                else var _name = name;

                const newDeveloper = await Developer.create({
                    name: _name,
                    username,
                    bio,
                    avatar_address
                }).catch(function (error) {
                    var errorMessage = ': Something went wrong in the server.';
                    var serverStatus = 404;
                    if (error.response) {
                        serverStatus = error.response.status;
                        errorMessage = `: ${error.message}`;
                    } else if (error.request)
                        errorMessage = `: Request to Database Timed out`;
                    else
                        errorMessage = error.message;
                    console.log('Error', serverStatus, errorMessage);
                    response.status(500);
                    return response.json();
                });

                return response.json(newDeveloper);
            }
        }
    }
}