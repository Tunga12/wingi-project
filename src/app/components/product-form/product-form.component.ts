import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {id: 0, name: '', image: '', category: '', price: 0, description: '', quantity: 0};
  isNewProduct: boolean = true;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Check if we are editing an existing product
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.productService.getProductById(Number(productId))!;
      this.isNewProduct = false;
    }
  }

  onSubmit(): void {
    if (this.isNewProduct) {
      this.productService.addProduct(this.product);
    } else {
      this.productService.editProduct(this.product);
    }
    this.router.navigate(['/products']);
  }

}
