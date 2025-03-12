import MainPresenter from './presenters/MainPresenter';
import FlashcardsModel from './model/flashcardsModel';

const flashcardsModel = new FlashcardsModel();


function App() {
  return (
    <div>
      <MainPresenter model={flashcardsModel}/>
    </div>
  )
}

export default App;
