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
      this.getProduct(); 
    }
    get f() { return this.productForm .controls; }

    getProductByID(id){
      this.productService.getProduct(id).subscribe(
        (data: Product) => { 
          this.productForm.setValue(data);
        } 
      );
    }
    getProduct(){
      this.route.params.subscribe(param => {
        if(param){
          this.getProductByID(param.id);
        }
      })
    }
    createProductForm(){
      this.productForm = this.fb.group({
        id: [''],
        sku: [''],
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

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productForm.value, null, 4));
  }
    
}
