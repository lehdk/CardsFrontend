import { Component } from '@angular/core';
import { Card, Deck, Ranks, Suites } from '../models/card.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent {

    deck: Deck;

    constructor() {
        this.deck = new Deck();
        this.deck.cards.push(new Card(Suites.Clubs, Ranks.Ace));
        this.deck.cards.push(new Card(Suites.Clubs, Ranks.Two));
        this.deck.cards.push(new Card(Suites.Clubs, Ranks.Three));
        this.deck.cards.push(new Card(Suites.Hearts, Ranks.Knight));
        this.deck.cards.push(new Card(Suites.Hearts, Ranks.Queen));
    }

    drop(event: CdkDragDrop<Card[]>) {
        moveItemInArray(this.deck.cards, event.previousIndex, event.currentIndex);
    }

    shuffle() {
        this.deck.shuffle();
    }

    selectAll(select: boolean) {
        this.deck.cards.forEach(c => c.selected = select);
    }
}
