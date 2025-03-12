const FlashcardsDAO = require('./FlashcardsDAO');

class Controller {
    constructor() {
        this.flashcardsDAO = new FlashcardsDAO();
    }

    async testFunction() {
        const response = await this.flashcardsDAO.testFunction();
        return response;
    }
}

module.exports = Controller;