import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  scan,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from "rxjs";
import { ProductService } from "src/app/services/product.service";

export interface ApiResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Settings {
  limit: number;
  skip: number;
}

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css'],
})
export class ConcatMapComponent implements  OnInit {
  setting = { limit: 12, skip: 0 };
  products: Product[] = [];
  settings$: BehaviorSubject<Settings> = new BehaviorSubject(this.setting);
  products$!: Observable<Product[]>;
  constructor(
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.products$ = this.getProducts();
  }
  getProducts(): Observable<Product[]> {
    return this.settings$.pipe(
      concatMap((setting) => {
        console.log({setting});
        return this.productService.getProducts(setting)
      }),
      map((response) => response.products),
      takeWhile((response) => !!response.length),
      scan((oldProducts, newProducts) => [...oldProducts, ...newProducts])
    );
  }
  more() {
    this.setting.skip += 12;
    this.settings$.next(this.setting);
  }
}
