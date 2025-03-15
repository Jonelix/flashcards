import { makeAutoObservable } from "mobx";

class FlashcardsModel {
  flashcards = [];
  tags = [];

  constructor() {
    makeAutoObservable(this);
  }

  setFlashcards(flashcards) {
    this.flashcards = flashcards;
  }

  setTags(tags) {
    this.tags = tags;
  }
}


export default FlashcardsModel;
