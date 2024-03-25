import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Product} from '../../services/types';
import {RatingModule} from 'primeng/rating';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PopupComponent} from '../popup/popup.component';
import {ButtonModule} from 'primeng/button';
import {ConfirmationService} from 'primeng/api';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TruncateNamePipe} from '../../pipes/truncateName/truncate-name.pipe';
import {AddCurrencySignPipe} from '../../pipes/addCurrencySign/add-currency-sign.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, NgOptimizedImage, FormsModule, PopupComponent, ButtonModule, ConfirmPopupModule, TruncateNamePipe, AddCurrencySignPipe],
  providers:[ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: Product;
  @Output() editProduct =  new EventEmitter<Product>();
  @Output() deleteProduct =  new EventEmitter<number>();

  onEditProduct() {
    this.editProduct.emit(this.product)
  }

  onDeleteProduct () {
    if (this.product.id) {
      this.confirmationService.confirm({
        target: this.deleteButton.nativeElement,
        message: 'Are you sure that you wont to delete this product?',
        accept: () => this.deleteProduct.emit(this.product.id)

      })
    }
  }
}
