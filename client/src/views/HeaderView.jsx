import React from "react";
import { observer } from "mobx-react-lite";

const HeaderView = observer(({ model }) => {

    const handleSinglesClick = () => {
        window.location.href = "/";
    }

    const handleVocabClick = () => {
        window.location.href = "#/vocab";
    }

    return (
        <div className="w-full h-16 bg-emerald-300 text-white font-mono text-2xl flex items-center justify-center font-semibold tracking-wide shadow-md">
            <button className="ml-4 mr-4 border-2 p-2 border-green-700 rounded-md" onClick={handleSinglesClick}> Singles </button>
            <button className="ml-4 mr-4 border-2 p-2 border-green-700 rounded-md" onClick={handleVocabClick}> Vocab </button>
            <p>Clem's Flashcards</p>
        </div>
    );
});

export default HeaderView;
