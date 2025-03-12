import MainPresenter from './presenters/MainPresenter';
import FlashcardsModel from './model/flashcardsModel';

const flashcardsModel = new FlashcardsModel();


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainPresenter model={flashcardsModel}/>
    </div>
  )
}

export default App;
