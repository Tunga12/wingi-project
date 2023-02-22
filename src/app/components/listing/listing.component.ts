import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit{

  searchQuery: string = '';
  selectedCategory: string = '';
  products : Product[] = [];
  categories: string[] = []

  constructor(public productService: ProductService){}

  ngOnInit(){
    this.products = this.productService.getAllProducts();
    this.categories = this.productService.getUniqueCategories();
  }

  filterProducts() {
    let filteredProducts = this.products;
    if (this.selectedCategory !== '') {
      filteredProducts = this.productService.filterProductsByCategory(this.selectedCategory);
    }
    if (this.searchQuery !== '') {
      filteredProducts = this.productService.searchProducts(this.searchQuery);
    }
    return filteredProducts;
  }

  deleteProduct(productId: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId);

    this.products = this.productService.getAllProducts();
  }
}
