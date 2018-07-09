import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { ExchangeState, CurrencyState } from '../store';
import * as fromActions from '../store/actions';
import * as fromSelectors from '../store/selectors';

@Component({
  selector: 'tme-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  constructor(private store: Store<CurrencyState>) { }

  currencies$: Observable<string[]>;
  rate$: Observable<number>;

  ngOnInit() {
    this.rate$ = this.store.select(fromSelectors.getExchangeRate);
    this.currencies$ = this.store.select(fromSelectors.getCurrencies);
    this.store.dispatch(new fromActions.LoadCurrencies());
  }

  onBaseChange(base) {
    console.log(base);
  }

  onTargetChange(base) {
    console.log(base);
  }

}
