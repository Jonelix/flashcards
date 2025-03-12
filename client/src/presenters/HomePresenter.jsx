import HomeView from "../views/HomeView.jsx";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";

const HomePresenter = observer(({ model }) => {
    return (
        <HomeView model={model}/>
    );
});

export default HomePresenter;