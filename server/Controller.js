const FlashcardsDAO = require('./FlashcardsDAO');

class Controller {
    constructor() {
        this.flashcardsDAO = new FlashcardsDAO();
    }

    async getAllFlashcards() {
        const response = await this.flashcardsDAO.getAllFlashcards();
        return response;
    }

    async createFlashcard(original, translation) {
        const response = await this.flashcardsDAO.createFlashcard(original, translation);
        return response;
    }

    async deleteFlashcard(id) {
        const response = await this.flashcardsDAO.deleteFlashcard(id);
        return response;
    }
}

module.exports = Controller;