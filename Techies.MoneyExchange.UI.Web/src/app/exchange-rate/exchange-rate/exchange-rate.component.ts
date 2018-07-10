import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { ExchangeState, CurrencyState } from '../store';
import * as fromActions from '../store/actions';
import * as fromSelectors from '../store/selectors';

@Component({
  selector: 'tme-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeRateComponent implements OnInit {

  constructor(private store: Store<CurrencyState>) { }

  currencies$: Observable<string[]>;

  rate$: Observable<number>;
  base$: Observable<string>;
  target$: Observable<string>;
  convertedAmount$: Observable<number>;
  amount$: Observable<number>;

  ngOnInit() {
    this.rate$ = this.store.select(fromSelectors.getExchangeRate);
    this.currencies$ = this.store.select(fromSelectors.getCurrencies);

    this.base$ = this.store.select(fromSelectors.getBaseSymbol);
    this.target$ = this.store.select(fromSelectors.getTargetSymbol);
    this.amount$ = this.store.select(fromSelectors.getCurrentAmount);
    this.convertedAmount$ = this.store.select(fromSelectors.getConvertedAmount);

    this.store.dispatch(new fromActions.LoadCurrencies());
  }

  onBaseChange(base) {
    this.store.dispatch(new fromActions.SetBaseSymbol(base));
  }

  onTargetChange(base) {
    this.store.dispatch(new fromActions.SetTargetSymbol(base));
  }

  onAmountChange(amount) {
    this.store.dispatch(new fromActions.SetAmount(amount));
  }

  onCurrenciesSwitched() {
    this.store.dispatch(new fromActions.SwitchCurrencies());
  }

}
