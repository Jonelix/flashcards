import HeaderView from "../views/HeaderView.jsx";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";

const HeaderPresenter = observer(({ model }) => {
    return (
        <HeaderView model={model}/>
    );
});

export default HeaderPresenter;