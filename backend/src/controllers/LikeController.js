const Developer = require('../models/Developer');

module.exports = {
    async store(request, response) {
        const { userid: loggedDeveloperID } = request.headers;
        const { likedDeveloperID } = request.params;

        const loggedDeveloper = await Developer.findById(loggedDeveloperID);
        const likedDeveloper = await Developer.findById(likedDeveloperID);

        if (likedDeveloper) {
            if (likedDeveloper.likes.includes(loggedDeveloper._id))
                console.log('DEU MATCH!');
            loggedDeveloper.likes.push(likedDeveloper._id);
            await loggedDeveloper.save();
            return response.status(200).json(loggedDeveloper);
        } else {
            return response.status(404).json({ error: `No developer under ${likedDeveloperID} ID` });
        }
    }
}