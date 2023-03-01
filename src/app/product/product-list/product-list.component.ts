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
   // this.getProducts();
    this.getAll();
  }
  getAll(): void{
    this.productService.getAll().valueChanges()
    .subscribe((data: Product[])=> {
      //console.log(data);
      this.productList = data;
    });
  }

  deleteProduct(key: string):void {
    this.productService.delete(key)
    .then(() => {
      console.log(key + ' Deleted');
    })
    .catch(err => console.log(err));
  }
  
}
