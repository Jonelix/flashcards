import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import VocabView from "../views/VocabView.jsx";

const VocabPresenter = observer(({ model }) => {
    return (
        <VocabView model={model}/>
    );
});

export default VocabPresenter;