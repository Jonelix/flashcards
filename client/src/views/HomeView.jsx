import React from 'react';
import { observer } from "mobx-react-lite";

const HeaderView = observer(({ model }) => {

    const fetchFlashcards = async (e) => {
        try {
            const response = await fetch("https://langauge-flashcards-31c55d8f1c2f.herokuapp.com/api/getAllFlashcards", {
            //const response = await fetch("http://localhost:5005/api/getAllFlashcards", {
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
            return data;
        }catch (error) {
            return { error: error.message }; // Return error message instead of throwing
        }
    };

    return (
        <div className="flex flex-grow items-center justify-center">
            <h1>Flashcards</h1>
            <button onClick={fetchFlashcards}> Get some cards </button>
        </div>
    );
});

export default HeaderView;