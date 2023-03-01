import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-interface';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  pageNumber = 1;
  color: string = '';
  constructor(private productService: ProductService) {}

  ngOnInit() {
    //console.log(this.productService.getProducts());
    this.getProducts();
  }
  getProducts() {
    this.productService
      .getProducts()
      .subscribe((data: Product[]) => (this.productList = data));
  }
  removeProduct(id: string) {
    let index = this.productList.findIndex((x) => x.id == id);
    this.productList.splice(index, 1);
    this, this.productService.deleteProduct(id);
  }
  
}
