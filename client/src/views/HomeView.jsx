import React, { use } from "react";
import { observer } from "mobx-react-lite";
import Flashcard from "../components/Flashcard.jsx";
import PlusSVG from "../assets/plus.svg";

const HomeView = observer(({ model }) => {
  const debug = false;
  const apiURL = debug ? "http://localhost:5005" : "https://langauge-flashcards-31c55d8f1c2f.herokuapp.com";
  const [originalString, setOriginalString] = React.useState("");
  const [translationString, setTranslationString] = React.useState("");
  const [showAddCardModal, setShowAddCardModal] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {fetchTags()}, []);

  // Fetch all flashcards
  const fetchFlashcards = async () => {
    try {
      const response = await fetch(`${apiURL}/api/getAllFlashcards`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch flashcards.");
      }
      console.log("Fetched Flashcards:", data);
      model.setFlashcards(data);
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };

  //Fetch all tags
  const fetchTags = async () => {
    try {
      const response = await fetch(`${apiURL}/api/getAllTags`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tags.");
      }
      model.setTags(data);
      return data;
    } catch (error) {
      console.error("Fetch All Tags Error:", error.message);
    }
  };

  // Create a new flashcard
  const createFlashcard = async () => {
    try {
        console.log("Creating Flashcard:", originalString, translationString); 
        const response = await fetch(`${apiURL}/api/createFlashcard`, {
      
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original: originalString,
          translation: translationString,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create flashcard.");
      }
      console.log("Created Flashcard:", data);
      fetchFlashcards();
      // Reset fields and close modal to avoid duplicate submissions
      setOriginalString("");
      setTranslationString("");
      setShowAddCardModal(false);

      return data;
    } catch (error) {
      return { error: error.message };
    }
  };

  // Called after a child <Flashcard> successfully deletes a card
  // We receive the updated flashcards array from the server,
  // then we update our model and adjust currentIndex if needed.
  const handleRefresh = () => {
    fetchFlashcards();
  };

  // Fetch flashcards on mount
  React.useEffect(() => {
    fetchFlashcards();
  }, []);

  // Navigation
  const handleNextCard = () => {
    if (!model.flashcards.length) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % model.flashcards.length);
  };

  const handlePrevCard = () => {
    if (!model.flashcards.length) return;
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? model.flashcards.length - 1 : newIndex;
    });
  };

  // Current card
  const hasFlashcards = model.flashcards && model.flashcards.length > 0;
  const currentCard = hasFlashcards ? model.flashcards[currentIndex] : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative bg-emerald-100 p-4 border-r border-red-300">
  {hasFlashcards ? (
    <div className="flex items-center">
      {/* Left Arrow */}
      <button
        className="px-4 py-2 bg-gray-300 rounded mr-4"
        onClick={handlePrevCard}
      >
        &larr; Prev
      </button>

      {/* Flashcard itself */}
      <Flashcard
        id={currentCard.id}
        original={currentCard.original}
        translation={currentCard.translation}
        hidden={currentCard.hidden}
        allTags={model.tags}
        onGetAllTags={fetchTags}
        onRefresh={handleRefresh}
        apiURL={apiURL}
      />

      {/* Right Arrow */}
      <button
        className="px-4 py-2 bg-gray-300 rounded ml-4"
        onClick={handleNextCard}
      >
        Next &rarr;
      </button>
    </div>
  ) : (
    <p className="text-lg text-gray-600">No flashcards available.</p>
  )}

  {/* Plus Button for adding a new card */}
  <button
    className="absolute bottom-4 right-4 bg-blue-200 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl"
    onClick={() => setShowAddCardModal(true)}
  >
    <img src={PlusSVG} alt="Plus Tag" />
  </button>

      {/* Modal for adding a new flashcard */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h2 className="text-xl mb-4">Add a new Flashcard</h2>
            <label className="block mb-2">
              <span className="text-gray-700">{"Original (Norwegian)"}</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                value={originalString}
                onChange={(e) => setOriginalString(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">{"Translation (English)"}</span>
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

export default HomeView;
