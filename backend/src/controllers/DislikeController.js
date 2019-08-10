const Developer = require('../models/Developer');

module.exports = {
    async store(request, response) {
        const { userid: loggedDeveloperID } = request.headers;
        const { dislikedDeveloperID } = request.params;

        const loggedDeveloper = await Developer.findById(loggedDeveloperID);
        const dislikedDeveloper = await Developer.findById(dislikedDeveloperID);

        if (dislikedDeveloper) {
            loggedDeveloper.dislikes.push(dislikedDeveloper._id);
            await loggedDeveloper.save();
            return response.status(200).json(loggedDeveloper);
        } else {
            return response.status(404).json({ error: `No developer under ${dislikedDeveloperID} ID` });
        }
    }
}