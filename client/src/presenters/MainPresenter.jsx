import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import HomePresenter from "./HomePresenter";

const MainPresenter = observer(({ model }) => {

    return (
        <div className="flex flex-grow items-center justify-center">
            <Routes>
                <Route path="/" element={<HomePresenter model={model} />} />
            </Routes>
        </div>
    );
});

export default MainPresenter;