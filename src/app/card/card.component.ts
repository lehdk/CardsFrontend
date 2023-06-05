import { Component, Input } from '@angular/core';
import { Card } from '../models/card.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() card: Card | null;

    constructor() {
        this.card = null;        
    }

    toggleSelect() {
        if(!this.card) return;

        this.card.selected = !this.card.selected;
    }
}
