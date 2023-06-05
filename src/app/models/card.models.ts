import { Pipe, PipeTransform } from "@angular/core";

export enum Suites {
    Hearts = 0,
    Diamonds = 1,
    Clubs = 2,
    Spades = 3,
    None = 4
}

@Pipe({
    name: 'suiteToString',
})
export class SuiteToString implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return Suites[value];
    }
};

export enum Ranks {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Knight = 11,
    Queen = 12,
    King = 13,
    Joker = 14,
}

@Pipe({
    name: 'rankToString',
})
export class RankToString implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return Ranks[value];
    }
};

@Pipe({
    name: 'cardToString',
})
export class CardToString implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return `${Ranks[value.rank]} of ${Suites[value.suite]}`;
    }
};

export class Card {

    constructor(public suite: Suites, public rank: Ranks) { }

    public selected: boolean = false;
    
}

export class Deck {

    public cards: Card[]

    constructor() {
       this.cards = []; 
    }

    shuffle() {
        let n: number = this.cards.length;
        while (n > 1) {
            n--;
            let k: number = Math.floor(Math.random() * n)
            let value = this.cards[k];
            this.cards[k] = this.cards[n];
            this.cards[n] = value;
        }
    }
}