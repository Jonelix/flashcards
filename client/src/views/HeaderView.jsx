import React from "react";
import { observer } from "mobx-react-lite";

const HeaderView = observer(({ model }) => {
    return (
        <div className="w-full h-16 bg-emerald-300 text-white font-mono text-2xl flex items-center justify-center font-semibold tracking-wide shadow-md">
            Clem's Flashcards
        </div>
    );
});

export default HeaderView;
