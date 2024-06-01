import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  _id?: string;
  name: string;
  price: string;
  tags: string[];
  favorite: string;
  starts: string;
  image: string;
  origins: string;
  cookTime: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl =  'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/getbyid/${id}`);
  }

  addProduct(product: Product, image: File): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('tags', product.tags.join(','));
    formData.append('favorite', product.favorite);
    formData.append('starts', product.starts);
    formData.append('image', image);
    formData.append('origins', product.origins);
    formData.append('cookTime', product.cookTime);

    return this.http.post<Product>(`${this.apiUrl}/ajout`, formData);
  }
  // updateProduct(id: string, product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/update/${id}`, product);
  // }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/supprimer/${id}`);
  }
  updateProductStatus(id: string, disponible: boolean): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/updateStatus/${id}`, { disponible });
  }
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, product);
  }

  }

