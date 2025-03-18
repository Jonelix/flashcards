import React, { use, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Flashcard from "../components/Flashcard.jsx";
import PlusSVG from "../assets/plus.svg";

const VocabView = observer(({ model }) => {
  const debug = model.debug;
  const apiURL = debug ? "http://localhost:5005" : "https://langauge-flashcards-31c55d8f1c2f.herokuapp.com";
  const [gridColumns, setGridColumns] = useState(3); // Default to 3 columns
  const [originalString, setOriginalString] = React.useState("");
  const [translationString, setTranslationString] = React.useState("");
  const [showAddCardModal, setShowAddCardModal] = React.useState(false);
  const [showEditCardModal, setShowEditCardModal] = React.useState(false);

  useEffect(() => {
    fetchFlashcards();
    fetchTags();
  }, []);

  useEffect(() => {
  }, [model.flashcards]);

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
      model.setFlashcards(data);
    } catch (error) {
      console.error("Fetch Flashcards Error:", error.message);
    }
  };

  // Fetch all tags
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
    } catch (error) {
      console.error("Fetch Tags Error:", error.message);
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

  return (
    <div className="flex flex-col w-full items-center justify-center bg-emerald-100 p-4">
      <div className="mb-4">
        <label className="mr-2">Grid Columns:</label>
        <select
          value={gridColumns}
          onChange={(e) => setGridColumns(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded"
        >
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>

      {/* Grid Display */}
      <div
        className={`grid gap-4 w-full max-w-5xl`}
        style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
      >
        {model.flashcards.map((card) => (
          <Flashcard
            key={card.id}
            id={card.id}
            original={card.original}
            translation={card.translation}
            hidden={card.hidden}
            allTags={model.tags}
            onGetAllTags={fetchTags}
            onRefresh={fetchFlashcards}
            apiURL={apiURL}
          />
        ))}
      </div>

      {/* Plus Button for adding a new card */}
      <button
        className="fixed bottom-4 right-4 bg-blue-200 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
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

        

      {/* No Flashcards Message */}
      {model.flashcards.length === 0 && (
        <p className="text-lg text-gray-600">No flashcards available.</p>
      )}
    </div>
  );
});

export default VocabView;