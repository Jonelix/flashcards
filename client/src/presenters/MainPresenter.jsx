import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import HeaderPresenter from "./HeaderPresenter";

const MainPresenter = observer(({ model }) => {

    return (
        
        <div className="flex flex-col min-h-screen"> 
            <HeaderPresenter model={model} />
        
            {/* This div grows to occupy the rest of the screen */}
            <div className="flex-1 border-black border-2">
                <Routes>
                    <Route path="/" element={<HomePresenter model={model} />} />
                {/* other routes here */}
                 </Routes>
            </div>
        </div>
    );
});

export default MainPresenter;