import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product} from '../product-interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styles: [ `` ]
})
export class ProductDetailComponent implements OnInit  {
  product: Product;
  productForm = {} as FormGroup;
  submitted = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){}

    ngOnInit(){
     this.createProductForm();
      this.getProductSKU();
    }
    get f() { return this.productForm.controls; }

    getProductNoKey(id): void{
      this.productService.getBySKUNoKey(id).valueChanges()
      .subscribe((data: Product[])=> {
        console.log(data[0]);
        this.productForm.setValue(data[0]);
        //console.log(this.productForm.value);
      });
    }
    getProduct(id): void{
      this.productService.getBySKU(id)
      .subscribe((data: Product[])=> {
        console.log(data[0]);
        this.productForm.setValue(data[0]);
        //console.log(this.productForm.value);
      });
    }
    getProductSKU(){
      this.route.params.subscribe(param => {
        if(param){
         this.getProduct(param.id);
        }
      })
    }
    getProductSKUNoKey(){
      this.route.params.subscribe(param => {
        if(param){
         this.getProductNoKey(param.id);
        }
      })
    }
    
    createProductForm(){
      this.productForm = this.fb.group({
        id: [''],
        sku: [''],
        key: [''],
        name: ['', Validators.required],
        type: ['',Validators.required],
        description: ['', Validators.required],
        color: ['', Validators.required],
        price: ['', Validators.pattern(/^[0-9]\d*$/) ]
      });
    }
    onSubmit() {
      this.submitted = true;

      // if form is invalid
      if (this.productForm.invalid) {
          return;
      }
      this.update(this.productForm.get('key').value, this.productForm.value)
    }
    update(key: string, value: Product): void {
        this.productService.update(key, value)
        .then(() => {
        console.log(`Key: ${key} updated.`);
        })
        .catch(err => console.log(err));
      }
    }
