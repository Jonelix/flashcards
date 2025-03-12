import { makeAutoObservable } from "mobx";

class FlashcardsModel {
  flashcards = [];

  constructor() {
    makeAutoObservable(this);
  }

  setFlashcards(flashcards) {
    this.flashcards = flashcards;
  }
}


export default FlashcardsModel;
