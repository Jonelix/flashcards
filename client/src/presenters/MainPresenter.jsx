import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import HeaderPresenter from "./HeaderPresenter";
import VocabPresenter from "./VocabPresenter";

const MainPresenter = observer(({ model }) => {

    return (
        
        <div className="flex flex-col min-h-screen"> 
            <HeaderPresenter model={model} />
        
            {/* This div grows to occupy the rest of the screen */}
            <div className="flex flex-1 w-full">
                <Routes>
                    <Route path="/" element={<HomePresenter model={model} />} />
                    <Route path="/vocab" element={<VocabPresenter model={model} />} />
                {/* other routes here */}
                 </Routes>
            </div>
        </div>
    );
});

export default MainPresenter;