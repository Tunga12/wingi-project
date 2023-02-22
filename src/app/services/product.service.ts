import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];

  constructor() {
    // Load products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): void {
    // Set product ID to the next available integer
    product.id = this.getNextProductId();
    // Add the new product to the list
    this.products.push(product);
    // Save products to localStorage
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  editProduct(product: Product): void {
    // Find the index of the product with the same ID
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      // Replace the product with the new values
      this.products[index] = product;
      // Save products to localStorage
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  deleteProduct(productId: number): void {
    // Find the index of the product with the same ID
    const index = this.products.findIndex(p => p.id === productId);
    if (index !== -1) {
      // Remove the product from the list
      this.products.splice(index, 1);
      // Save products to localStorage
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  searchProducts(query: string): Product[] {
    // Filter products by name or category containing the query
    return this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterProductsByCategory(category: string): Product[] {
    // Filter products by category
    return this.products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  private getNextProductId(): number {
    // Get the next available ID for a new product
    return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  }

  getUniqueCategories(): string[] {
    const categories = new Set<string>();
    this.products.forEach(p => categories.add(p.category));
    return Array.from(categories);
  }
}
