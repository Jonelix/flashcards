const Controller = require('./Controller');

class RequestHandler {
    constructor() {
        this.controller = new Controller();
    }

    initializeRoutes(app) {

        /*
        app.post('/api/testBody', async (req, res) => {
            try {
                const { input } = req.body;
                
                
                if (!input) {
                    return res.status(400).json({ message: 'Validation failed.' });
                }
                

                const response = await this.controller.testFunction(input);
                
                if (!response) {
                    res.status(404).json({ message: 'Request failed' });
                }else{
                    res.status(200).json(response);
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
        */

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
    }
}

module.exports = RequestHandler;