import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'tme-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.scss']
})
export class ExchangeRateFormComponent implements OnInit {

  @Input() currencies: string[] = [];
  @Input() base: string;
  @Input() target: string;
  @Input() amount: number;
  @Input() convertedAmount: number;
  @Input() rate: number;

  @Output() baseChanged = new EventEmitter<string>();
  @Output() targetChanged = new EventEmitter<string>();
  @Output() amountChanged = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      'base': [''],
      'target': [''],
      'amount': [0]
    });
  }

}
