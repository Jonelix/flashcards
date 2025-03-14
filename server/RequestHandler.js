const Controller = require('./Controller');

class RequestHandler {
    constructor() {
        this.controller = new Controller();
    }

    initializeRoutes(app) {

        app.get('/api/getAllFlashcards', async (req, res) => {
            try {
                const response = await this.controller.getAllFlashcards();
                if (!response) {
                  res.status(404).json({ message: 'Flashcards not found' });
                } else {
                  res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.get('/api/getFlashcard/:id', async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.getFlashcard(id);
                if (!response) {
                    res.status(404).json({ message: 'Flashcard not found' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.post('/api/createFlashcard', async (req, res) => {
            try {
                const { original, translation } = req.body;
                if (!original || !translation) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.createFlashcard(original, translation);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.delete('/api/deleteFlashcard/:id', async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.deleteFlashcard(id);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }});

        app.put('/api/updateFlashcard/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { original, translation } = req.body;
                if (!id || !original || !translation) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.updateFlashcard(id, original, translation);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        //TAG FUNCTIONS

        app.get('/api/getAllTags', async (req, res) => {
            try {
                const response = await this.controller.getAllTags();
                if (!response) {
                  res.status(404).json({ message: 'Tags not found' });
                } else {
                  res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.get('/api/getTag/:id', async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.getTag(id);
                if (!response) {
                    res.status(404).json({ message: 'Tag not found' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.post('/api/createTag', async (req, res) => {
            try {
                const { tag } = req.body;
                if (!tag) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.createTag(tag);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.delete('/api/deleteTag/:id', async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.deleteTag(id);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
        }});

        app.put('/api/updateTag/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { tag } = req.body;
                if (!id || !tag) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.updateTag(id, tag);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        //FLASHCARD TAG FUNCTIONS

        app.get('/api/getFlashcardTags/:flashcard_id', async (req, res) => {
            try {
                const { flashcard_id } = req.params;
                if (!flashcard_id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.getFlashcardTags(flashcard_id);
                if (!response) {
                    res.status(404).json({ message: 'Flashcard Tags not found' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.get('/api/getTagFlashcards/:tag_id', async (req, res) => {
            try {
                const { tag_id } = req.params;
                if (!tag_id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.getTagFlashcards(tag_id);
                if (!response) {
                    res.status(404).json({ message: 'Tag Flashcards not found' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.post('/api/createFlashcardTag', async (req, res) => {
            try {
                const { flashcard_id, tag_id } = req.body;
                if (!flashcard_id || !tag_id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.createFlashcardTag(flashcard_id, tag_id);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

        app.delete('/api/deleteFlashcardTag/:flashcard_id/:tag_id', async (req, res) => {
            try {
                const { flashcard_id, tag_id } = req.params;
                if (!flashcard_id || !tag_id) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                const response = await this.controller.deleteFlashcardTag(flashcard_id, tag_id);
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                } else {
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });

    }
}

module.exports = RequestHandler;