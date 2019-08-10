import API from './API'

export default class DeveloperService {

    getDevelopers(userID) {
        return  API.get('developers', {
            headers: {
                userID
            }
        });
    }

    handleLike(userID, targetID) {
        this.handleButtonClick(userID, targetID, 'likes');
    }

    handleDislike(userID, targetID) {
        this.handleButtonClick(userID, targetID, 'dislikes');
    }

    handleButtonClick(userID, targetID, path) {
        API.post(`developers/${targetID}/${path}`, null, {
            headers: {
                userID,
            }
        })
    }

}