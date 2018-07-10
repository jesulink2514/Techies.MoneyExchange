import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tme-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.scss']
})
export class ExchangeRateFormComponent implements OnInit {

  @Input() currencies: string[] = [];

  @Input() set base(value: string) {
    this.form.controls['base'].setValue(value);
  }

  @Input() set target(value: string) {
    this.form.controls['target'].setValue(value);
  }

  @Input() amount: number;

  @Input() convertedAmount: number;

  @Input() rate: number;

  @Output() baseChanged = new EventEmitter<string>();
  @Output() targetChanged = new EventEmitter<string>();
  @Output() amountChanged = new EventEmitter<number>();
  @Output() currenciesSwitched = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'base': [''],
      'target': [''],
      'amount': [0]
    });
  }

  form: FormGroup;

  ngOnInit() {

    this.form.controls['base'].valueChanges.subscribe(v => this.baseChanged.emit(v));
    this.form.controls['target'].valueChanges.subscribe(v => this.targetChanged.emit(v));
    this.form.controls['amount'].valueChanges.subscribe(v => this.amountChanged.emit(v));
  }

}
