import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {CommonModule} from '@angular/common';
import {Product} from '../../services/types';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'primeng/rating';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonModule, FormsModule, RatingModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() header!: string;
  @Input() isVisible: boolean = false;
  @Input() product: Product = {name: '', rating: '', image: '', price: ''};

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter();


  onConfirm() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.cancel.emit();
  }

}
