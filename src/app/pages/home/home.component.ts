import {Component} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ProductComponent} from '../../components/product/product.component';
import {Product} from '../../services/types';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {PopupComponent} from '../../components/popup/popup.component';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, PopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private productsService: ProductsService) { }

  products: Product[] = [];
  totalProducts: number = 0;
  page: number = 0;
  perPage: number = 5;
  selectedProduct: Product = {name: '', rating: '0', image: '', price: ''}
  isPopupVisible: boolean = false
  isEditMode: boolean = false;

  fetchProducts(page: number , perPage: number ) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {page, perPage})
      .subscribe({
        next: (products) => {
          this.products = products.items;
          this.totalProducts = products.total
          this.page = products.page;
          this.perPage = products.perPage
        },
        error: (error) => console.log(error),
      })

  }

  addProduct(product: Product){
    this.productsService.addProduct('http://localhost:3000/clothes', product).subscribe({
      next: () => {
        this.togglePopup();
        this.fetchProducts(0, this.perPage);
      },
      error: (error) => console.log(error),
    });
  }

  editProduct(product: Product){
    this.productsService.editProduct(`http://localhost:3000/clothes/${product.id}`, product).subscribe({
      next: () => {
        this.togglePopup();
        this.fetchProducts(0, this.perPage);
      },
      error: (error) => console.log(error),
    });
  }

  deleteProduct(id: number){
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe({
      next: () => {
        this.fetchProducts(0, this.perPage);
      },
      error: (error) => console.log(error),
    });
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  ngOnInit() {
   this.fetchProducts(0, this.perPage);
  }

  togglePopup () {
    this.selectedProduct = {name: '', rating: '0', image: '', price: ''}
    this.isPopupVisible = !this.isPopupVisible
  }

  onEditProduct(product: Product) {
    this.togglePopup();
    this.isEditMode = true;
    this.selectedProduct = {...product}
  }

  onConfirm(product: Product) {
    if (this.isEditMode) {
      this.editProduct(product)
      this.isEditMode = false
    } else {
      this.addProduct(product)
    }
  }

  onCancel() {
    this.isPopupVisible = false;
  }
}
