const FlashcardsDAO = require('./FlashcardsDAO');

class Controller {
    constructor() {
        this.flashcardsDAO = new FlashcardsDAO();
    }

    async getAllFlashcards() {
        const response = await this.flashcardsDAO.getAllFlashcards();
        return response;
    }
}

module.exports = Controller;