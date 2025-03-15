const FlashcardsDAO = require('./FlashcardsDAO');

class Controller {
    constructor() {
        this.flashcardsDAO = new FlashcardsDAO();
    }

    //FLASHCARD FUNCTIONS
    async getAllFlashcards() {
        const response = await this.flashcardsDAO.getAllFlashcards();
        return response;
    }

    async getFlashcard(id) {
        const response = await this.flashcardsDAO.getFlashcard(id);
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

    async updateFlashcard(id, original, translation) {
        const response = await this.flashcardsDAO.updateFlashcard(id, original, translation);
        return response;
    }

    //TAG FUNCTIONS

    async getAllTags() {
        const response = await this.flashcardsDAO.getAllTags();
        return response;
    }

    async getTag(id) {
        const response = await this.flashcardsDAO.getTag(id);
        return response;
    }

    async createTag(tag) {
        const response = await this.flashcardsDAO.createTag(tag);
        return response;
    }

    async deleteTag(id) {
        const response = await this.flashcardsDAO.deleteTag(id);
        return response;
    }

    async updateTag(id, tag) {
        const response = await this.flashcardsDAO.updateTag(id, tag);
        return response;
    }

    //FLASHCARD TAG FUNCTIONS

    async getFlashcardTags(flashcard_id) {
        const response = await this.flashcardsDAO.getFlashcardTags(flashcard_id);
        return response;
    }

    async getTagFlashcards(tag_id) {
        const response = await this.flashcardsDAO.getTagFlashcards(tag_id);
        return response;
    }

    async createFlashcardTag(flashcard_id, tag_id) {
        const response = await this.flashcardsDAO.createFlashcardTag(flashcard_id, tag_id);
        return response;
    }

    async deleteFlashcardTag(flashcard_id, tag_id) {
        const response = await this.flashcardsDAO.deleteFlashcardTag(flashcard_id, tag_id);
        return response;
    }

    //Hide functions
    async getHiddenStatusFlashcard(id) {
        const response = await this.flashcardsDAO.getHiddenStatusFlashcard(id);
        return response;
    }

    async toggleHideFlashcard(id) {
        const response = await this.flashcardsDAO.toggleHideFlashcard(id);
        return response;
    }
}

module.exports = Controller;