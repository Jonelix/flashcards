import React from 'react';
import { observer } from "mobx-react-lite";

const HeaderView = observer(({ model }) => {

    return (
        <div className="flex flex-grow items-center justify-center">
            <h1>Flashcards</h1>
        </div>
    );
});

export default HeaderView;