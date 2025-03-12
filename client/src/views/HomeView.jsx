import React from 'react';
import { observer } from "mobx-react-lite";

const HeaderView = observer(({ model }) => {
    const [originalString, setOriginalString] = React.useState("");
    const [translationString, setTranslationString] = React.useState("");
    
    const [showAddCardModal, setShowAddCardModal] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [showTranslation, setShowTranslation] = React.useState(false);

    // -- API calls (same as before) --
    const fetchFlashcards = async () => {
        try {
            //const response = await fetch("https://langauge-flashcards-31c55d8f1c2f.herokuapp.com/api/getAllFlashcards", {            
            const response = await fetch("http://localhost:5005/api/getAllFlashcards", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch flashcards.");
            }

            console.log("Response:", data);
            model.setFlashcards(data);
            return data;
        } catch (error) {
            return { error: error.message }; 
        }
    };

    const createFlashcard = async () => {
        try {
            const response = await fetch("http://localhost:5005/api/createFlashcard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    original: originalString,
                    translation: translationString,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to create flashcard.");
            }

            console.log("Response:", data);
            model.setFlashcards(data);

            // Reset form fields and close modal
            setOriginalString("");
            setTranslationString("");
            setShowAddCardModal(false);
            return data;
        } catch (error) {
            return { error: error.message };
        }
    }

    const deleteFlashcard = async (id) => {
        try {
            const response = await fetch(`http://localhost:5005/api/deleteFlashcard/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete flashcard.");
            }

            console.log("Response:", data);
            model.setFlashcards(data);

            // If we delete the currently displayed card, we may need to adjust index
            if (currentIndex >= data.length) {
                setCurrentIndex(0);
            }

            return data;
        } catch (error) {
            return { error: error.message };
        }
    }

    // Fetch flashcards on mount (optional; depends on your flow)
    React.useEffect(() => {
        fetchFlashcards();
    }, []);

    // Helper to move to previous/next card
    const handleNextCard = () => {
        if (!model.flashcards.length) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % model.flashcards.length);
        setShowTranslation(false);
    }

    const handlePrevCard = () => {
        if (!model.flashcards.length) return;
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? model.flashcards.length - 1 : newIndex;
        });
        setShowTranslation(false);
    }

    // Card flip toggle
    const handleFlipCard = () => {
        setShowTranslation((prev) => !prev);
    }

    const handleDeleteCurrentCard = () => {
        if (!model.flashcards.length) return;
        const currentCard = model.flashcards[currentIndex];
        deleteFlashcard(currentCard._id);
    }

    // If there are no flashcards, show a fallback
    const hasFlashcards = model.flashcards && model.flashcards.length > 0;
    const currentCard = hasFlashcards ? model.flashcards[currentIndex] : null;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            {/* Main flashcard display */}
            {hasFlashcards ? (
                <div 
                    className="relative w-80 h-48 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer perspective"
                    onClick={handleFlipCard}
                >
                    {/* Delete button */}
                    <button
                        className="absolute top-2 left-2 bg-red-400 text-white text-xs px-2 py-1 rounded"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleDeleteCurrentCard();
                        }}
                    >
                        Delete
                    </button>

                    {/* Card content - simple front/back toggle */}
                    <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-800 p-4">
                        {showTranslation ? currentCard.translation : currentCard.original}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        className="absolute bottom-2 left-2 text-gray-600 text-xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrevCard();
                        }}
                    >
                        &larr;
                    </button>
                    <button
                        className="absolute bottom-2 right-2 text-gray-600 text-xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNextCard();
                        }}
                    >
                        &rarr;
                    </button>
                </div>
            ) : (
                <p className="text-lg text-gray-600">No flashcards available.</p>
            )}

            {/* Plus button to open "add card" modal */}
            <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                onClick={() => setShowAddCardModal(true)}
            >
                +
            </button>

            {/* Modal for adding a new flashcard */}
            {showAddCardModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                        <h2 className="text-xl mb-4">Add a new Flashcard</h2>
                        <label className="block mb-2">
                            <span className="text-gray-700">Original</span>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded p-2"
                                value={originalString}
                                onChange={(e) => setOriginalString(e.target.value)}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Translation</span>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded p-2"
                                value={translationString}
                                onChange={(e) => setTranslationString(e.target.value)}
                            />
                        </label>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowAddCardModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createFlashcard}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
});

export default HeaderView;
