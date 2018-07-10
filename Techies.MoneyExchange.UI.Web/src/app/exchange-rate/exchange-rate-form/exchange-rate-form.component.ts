import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'tme-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styles: [
    `
    .switch-icon {
      height: 2rem;
      margin: .15rem;
    }
    `
  ],
  animations: [
    trigger('notice', [
      state('active', style({
        transform: 'scale(1.04)'
      })),
      state('inactive', style({
        transform: 'scale(1)'
      })),
      transition('active <=> inactive', animate('300ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  animationState = 'inactive';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'base': [''],
      'target': [''],
      'amount': [0, [Validators.required, Validators.min(0)]]
    });
  }

  form: FormGroup;

  ngOnInit() {
    this.form.controls['base'].valueChanges.pipe(filter(_ => this.form.valid))
        .subscribe(v => this.baseChanged.emit(v));
    this.form.controls['target'].valueChanges.pipe(filter(_ => this.form.valid))
        .subscribe(v => this.targetChanged.emit(v));
    this.form.controls['amount'].valueChanges.pipe(debounceTime(300), filter(v => this.form.valid))
        .subscribe(v => this.amountChanged.emit(v != null ? parseFloat(v) : null));
  }
}
