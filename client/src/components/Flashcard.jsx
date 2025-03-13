import React from "react";
import { observer } from "mobx-react-lite";

const Flashcard = observer(({ id, original, translation, onDelete }) => {
  const [showTranslation, setShowTranslation] = React.useState(false);

  // Flip the card to show/hide translation
  const handleFlip = () => {
    setShowTranslation((prev) => !prev);
  };

  // Delete the flashcard via API, then pass
  // updated flashcards array back to parent
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `https://langauge-flashcards-31c55d8f1c2f.herokuapp.com/api/deleteFlashcard/${id}`,
        //`http://localhost:5005/api/deleteFlashcard/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete flashcard.");
      }
      // Notify parent so it can update the model's flashcards
      onDelete(data);
    } catch (error) {
      console.error("Delete Error:", error.message);
    }
  };

  const handlePrint = async (e) => {
    e.stopPropagation();
    console.log("Print prop:", original, translation, id);
  }

  return (
    <div
      className="relative w-80 h-48 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer"
      onClick={handleFlip}
    >
      {/* Delete button */}
      <button
        className="absolute top-2 left-2 bg-red-400 text-white text-xs px-2 py-1 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>

      {/* Print button */}
      <button
        className="absolute top-2 left-20 bg-blue-400 text-white text-xs px-2 py-1 rounded"
        onClick={handlePrint}
      >
        Print prop
      </button>

      {/* Front/Back content */}
      <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-800 p-4">
        {showTranslation ? translation : original}
      </div>
    </div>
  );
});

export default Flashcard;
