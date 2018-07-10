import { Component, OnInit, Input } from '@angular/core';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';

@Component({
  selector: 'tme-exchange-result',
  templateUrl: './exchange-result.component.html',
  styles: [
    `
    .color-money {
      color: #015b9d;
    }
    `
  ],
  animations: [
    trigger('show', [
      state('visible', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }), animate('500ms ease-out')
      ]),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class ExchangeResultComponent {


  @Input() baseSymbol: string;
  @Input() targetSymbol: string;

  @Input() rate: number;

  @Input() convertedAmount: number;
  @Input() amount: number;

}
