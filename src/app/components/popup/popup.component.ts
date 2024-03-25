import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {CommonModule} from '@angular/common';
import {Product} from '../../services/types';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import {specialCharactersValidator} from './validators';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonModule, FormsModule, RatingModule, ReactiveFormsModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  @Input() header!: string;
  @Input() isVisible: boolean = false;
  @Input() product: Product = {name: '', rating: '0', image: '', price: ''};

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter();

  productForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, specialCharactersValidator]],
    rating: ['0'],
    image: [''],
    price: ['', [Validators.required, Validators.pattern(/^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/)]]
  })

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    this.confirm.emit(this.productForm.value as Product);
  }

  onCancel() {
    this.cancel.emit();
  }

}
