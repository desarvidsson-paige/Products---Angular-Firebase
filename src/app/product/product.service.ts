import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList, AngularFireObject
} from '@angular/fire/compat/database';
import { Product } from './product-interface';

@Injectable()
export class ProductService {
  productList: Product[] = [];
  product$: Observable<Product>;
  private dbPath = '/';
  productsRef: AngularFireList<Product>;
  

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/db.json');
  }
  getAll(): AngularFireList<Product> {
    return this.productsRef;
  }
  get(key: string): any {
    const getPath =  `${this.dbPath}/${key}`;
    return this.db.object(getPath);
  }
  getBySKU(key: string){
    return this.db.list('/', ref => ref.orderByChild('sku').equalTo(key));
  }
  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }
  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }
  getProduct(id: string): Observable<Product> {
    this.product$ = this.http
      .get<Product[]>('assets/db.json')
      .pipe(map((item) => item.filter((x) => x.sku === id)[0]));
    return this.product$;
  }
  getProductBySKU(sku) {
    let product: Product;

    this.getProducts().subscribe((data: Product[]) => {
      this.productList = data;
      this.productList.map((item) => {
        if (item.sku == sku) product = item;
      });
      //console.log(product);
    });

    return product;
  }
  updateProduct(item) {
    let selected: Boolean = false;
    this.productList.map((val, index) => {
      if (val.id == item.id) {
        this.productList[index] = item;
        selected = true;
      }
    });
    return selected;
  }
  
}
