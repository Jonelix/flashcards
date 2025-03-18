import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import ArrowUpSVG from "../assets/arrow_up.svg";
import ArrowDownSVG from "../assets/arrow_down.svg";
import EyeSVG from "../assets/eye.svg";
import EyeDashSVG from "../assets/eye_dash.svg";
import TrashSVG from "../assets/trash.svg";
import PlusSVG from "../assets/plus.svg";
import { set } from "mobx";

const Flashcard = observer(({ id, original, translation, hidden, allTags, onGetAllTags, onRefresh, apiURL }) => {
  const [flashcardTags, setFlashcardTags] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [expanded, setExpanded] = useState(false); // For expanding/collapsing tags
  const [showTagSelector, setShowTagSelector] = useState(false); // Show/hide dropdown of all tags
  const [currentVisibility, setCurrentVisibility] = useState(hidden);

  const [editOriginal, setEditOriginal] = useState(original);
  const [editTranslation, setEditTranslation] = useState(translation);
  const [showEditCardModal, setShowEditCardModal] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    setCurrentVisibility(hidden);
  }, [hidden]);

  useEffect(() => {
    fetchFlashcardTags();
  }, [id]);

  // --------------------------------
  // API calls
  // --------------------------------
  const fetchFlashcardTags = async () => {
    try {
      const response = await fetch(`${apiURL}/api/getFlashcardTags/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to get flashcard tags.");
      }

      // Extract the tag_id values into an array
      const tagIds = data.map(tag => tag.tag_id);

      setFlashcardTags(tagIds);  // Store extracted tag IDs
      return tagIds;
    } catch (error) {
      console.error("Get flashcard tags Error:", error.message);
    }
  };

  const createFlashcardTag = async (tag_id) => {
    try {
      const response = await fetch(`${apiURL}/api/createFlashcardTag/${id}/${tag_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add tag to flashcard.");
      }
      fetchFlashcardTags();
    } catch (error) {
      console.error("Add Tag to Flashcard Error:", error.message);
    }
  };

  const deleteFlashcardTag = async (tag_id) => {
    try {
      const response = await fetch(`${apiURL}/api/deleteFlashcardTag/${id}/${tag_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete tag from flashcard.");
      }
      fetchFlashcardTags();
    } catch (error) {
      console.error("Delete Tag from Flashcard Error:", error.message);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${apiURL}/api/deleteFlashcard/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete flashcard.");
      }
      onRefresh();
    } catch (error) {
      console.error("Delete Error:", error.message);
    }
  };

  const fetchToggleVisibility = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${apiURL}/api/toggleHideFlashcard/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle flashcard visibility.");
      }
      onRefresh();
    } catch (error) {
      console.error("Toggle Visibility Error:", error.message);
    }
  };

  const updateFlashcard = async () => {
    try {
      const response = await fetch(`${apiURL}/api/updateFlashcard/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            original: editOriginal,
            translation: editTranslation,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update flashcard.");
      }
      setShowEditCardModal(false);
      onRefresh();
    } catch (error) {
      console.error("Update Error:", error.message);
    }
  };


  // --------------------------------
  // UI Handlers
  // --------------------------------
  const handleFlip = (e) => {
    const clickedId = e.target.id || e.target.closest("button")?.id;
    if (clickedId === "eyeBtn" || clickedId === "trashBtn" || clickedId === "arrowBtn") {
      if (clickedId === "eyeBtn"){
        console.log("Eye button clicked");
      }
      if (clickedId === "trashBtn"){
        console.log("Trash button clicked");
      }
      if (clickedId === "arrowBtn"){
        console.log("Arrow button clicked");
      }
      return;
    }
    console.log("Card clicked");
    setShowTranslation((prev) => !prev);
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handlePlusClick = async (e) => {
    e.stopPropagation();
    if (!showTagSelector) {
      if (allTags.length === 0) {
        await onGetAllTags();
      }
    }
    setShowTagSelector((prev) => !prev);
  };

  const handleSelectTag = (tagId) => {
    createFlashcardTag(tagId);
    setShowTagSelector(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-80 bg-white rounded-lg shadow-md p-3 cursor-pointer select-none"
      onClick={handleFlip}
      onDoubleClick={() => setShowEditCardModal(true)}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-2">
        <button
          id="eyeBtn"
          onClick={fetchToggleVisibility}
          className="w-8 h-8 p-1 border-2 border-gray-200 rounded-lg"
        >
          {currentVisibility ? <img src={EyeDashSVG} alt="Eye Dash" /> : <img src={EyeSVG} alt="Eye" />}
        </button>

        <div className="text-lg font-semibold text-gray-700">
          {showTranslation ? "English" : "Norwegian"}
        </div>

        <button
          id="trashBtn"
          onClick={handleDelete}
          className="w-8 h-8 p-1 border-2 border-gray-200 rounded-lg"
        >
          <img src={TrashSVG} alt="Trash" />
        </button>
      </div>

      {/* Main Content */}
      <div className="text-xl font-semibold text-center py-4 min-h-[64px]">
        {showTranslation ? translation : original}
      </div>

      {/* Modal for editing existing */}
      {showEditCardModal && (
        <div className="fixed inset-0 bg-blue-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h2 className="text-xl mb-4">Edit Flashcard</h2>
            <label className="block mb-2">
              <span className="text-gray-700">{"Original (Norwegian)"}</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                value={editOriginal}
                onChange={(e) => setEditOriginal(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">{"Translation (English)"}</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
                value={editTranslation}
                onChange={(e) => setEditTranslation(e.target.value)}
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditCardModal(false)}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={updateFlashcard}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tags Section */}
      <div className="flex flex-col">
        <div className="flex justify-center">
          <button id="arrowBtn" onClick={toggleExpand} className="w-8 h-8 p-1 border-2 border-gray-200 rounded-lg">
            {expanded ? <img src={ArrowDownSVG} alt="Arrow Down" /> : <img src={ArrowUpSVG} alt="Arrow Up" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {allTags
                .filter(tag => flashcardTags.includes(tag.id)) // Filter tags by matching IDs
                .map((tag) => (
                  <div
                    key={tag.id}
                    className="relative group px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center"
                  >
                    <span>{tag.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFlashcardTag(tag.id);
                      }}
                      className="absolute right-0 top-0 w-4 h-4 hidden group-hover:block"
                    >
                      <img src={TrashSVG} alt="Delete Tag" />
                    </button>
                  </div>
              ))}

              <button
                className="px-2 py-1 bg-blue-200 rounded-full text-sm text-blue-700"
                onClick={handlePlusClick}
              >
                <img src={PlusSVG} alt="Plus Tag" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Flashcard;
