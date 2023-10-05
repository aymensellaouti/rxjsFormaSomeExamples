import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatMapComponent, Product, Settings } from './concat-map.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Spy, provideAutoSpy } from 'jasmine-auto-spies';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';

function getFakeProducts() {
  return [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      ],
    },
    {
      id: 2,
      title: 'iPhone X',
      description:
        'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/2/1.jpg',
        'https://i.dummyjson.com/data/products/2/2.jpg',
        'https://i.dummyjson.com/data/products/2/3.jpg',
        'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
      ],
    },
    {
      id: 3,
      title: 'Samsung Universe 9',
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: 'Samsung',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
      images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
    },
    {
      id: 4,
      title: 'OPPOF19',
      description: 'OPPO F19 is officially announced on April 2021.',
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: 'OPPO',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/4/1.jpg',
        'https://i.dummyjson.com/data/products/4/2.jpg',
        'https://i.dummyjson.com/data/products/4/3.jpg',
        'https://i.dummyjson.com/data/products/4/4.jpg',
        'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
      ],
    },
    {
      id: 5,
      title: 'Huawei P30',
      description:
        'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: 'Huawei',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/5/1.jpg',
        'https://i.dummyjson.com/data/products/5/2.jpg',
        'https://i.dummyjson.com/data/products/5/3.jpg',
      ],
    },
    {
      id: 6,
      title: 'MacBook Pro',
      description:
        'MacBook Pro 2021 with mini-LED display may launch between September, November',
      price: 1749,
      discountPercentage: 11.02,
      rating: 4.57,
      stock: 83,
      brand: 'Apple',
      category: 'laptops',
      thumbnail: 'https://i.dummyjson.com/data/products/6/thumbnail.png',
      images: [
        'https://i.dummyjson.com/data/products/6/1.png',
        'https://i.dummyjson.com/data/products/6/2.jpg',
        'https://i.dummyjson.com/data/products/6/3.png',
        'https://i.dummyjson.com/data/products/6/4.jpg',
      ],
    },
    {
      id: 7,
      title: 'Samsung Galaxy Book',
      description:
        'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
      price: 1499,
      discountPercentage: 4.15,
      rating: 4.25,
      stock: 50,
      brand: 'Samsung',
      category: 'laptops',
      thumbnail: 'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/7/1.jpg',
        'https://i.dummyjson.com/data/products/7/2.jpg',
        'https://i.dummyjson.com/data/products/7/3.jpg',
        'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
      ],
    },
    {
      id: 8,
      title: 'Microsoft Surface Laptop 4',
      description:
        'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
      price: 1499,
      discountPercentage: 10.23,
      rating: 4.43,
      stock: 68,
      brand: 'Microsoft Surface',
      category: 'laptops',
      thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/8/1.jpg',
        'https://i.dummyjson.com/data/products/8/2.jpg',
        'https://i.dummyjson.com/data/products/8/3.jpg',
        'https://i.dummyjson.com/data/products/8/4.jpg',
        'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
      ],
    },
    {
      id: 9,
      title: 'Infinix INBOOK',
      description:
        'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
      price: 1099,
      discountPercentage: 11.83,
      rating: 4.54,
      stock: 96,
      brand: 'Infinix',
      category: 'laptops',
      thumbnail: 'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/9/1.jpg',
        'https://i.dummyjson.com/data/products/9/2.png',
        'https://i.dummyjson.com/data/products/9/3.png',
        'https://i.dummyjson.com/data/products/9/4.jpg',
        'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
      ],
    },
    {
      id: 10,
      title: 'HP Pavilion 15-DK1056WM',
      description:
        'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
      price: 1099,
      discountPercentage: 6.18,
      rating: 4.43,
      stock: 89,
      brand: 'HP Pavilion',
      category: 'laptops',
      thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
      images: [
        'https://i.dummyjson.com/data/products/10/1.jpg',
        'https://i.dummyjson.com/data/products/10/2.jpg',
        'https://i.dummyjson.com/data/products/10/3.jpg',
        'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
      ],
    },
  ];
}

fdescribe('ConcatMapComponent', () => {
  let component: ConcatMapComponent;
  let fixture: ComponentFixture<ConcatMapComponent>;
  let productServiceSpy: Spy<ProductService>;

  let products: Product[] ;
  let fakeSetting : Settings = {limit: 3, skip: 0}
  function fakeGetProducts(/*setting: Settings*/) {
    console.log('In fakeGetProducts with settings :', fakeSetting);

    const extractedProducts = products.slice(
      fakeSetting.skip,
      fakeSetting.limit + fakeSetting.skip
    );
    console.log({extractedProducts});

    const response = {
      limit: fakeSetting.limit,
      skip: fakeSetting.skip,
      total: extractedProducts.length,
      products: extractedProducts,
    };
    fakeSetting = {
      skip: fakeSetting.skip + fakeSetting.limit,
      limit: fakeSetting.limit,
    };
    return of(response);

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcatMapComponent ],
      providers: [ provideAutoSpy(ProductService) ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    productServiceSpy = TestBed.inject<any>(ProductService);
    fixture = TestBed.createComponent(ConcatMapComponent);
    component = fixture.componentInstance;
    products = getFakeProducts()
    fakeSetting = { limit: 3, skip: 0 };
    console.log({setting: component.setting});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract first the setting products', () => {
    productServiceSpy.getProducts.and.callFake(fakeGetProducts);
    const observerSpy = subscribeSpyTo(component.getProducts());
    const firstProducts = products.slice(0, 3);
    console.log({ firstProducts });
    expect(observerSpy.getFirstValue()).toEqual(firstProducts);
  });
  it('should extract 6 products after calling more()', () => {
    productServiceSpy.getProducts.and.callFake(fakeGetProducts);
    const observerSpy = subscribeSpyTo(component.getProducts());
    const firstProducts = products.slice(0, 3);
    console.log({ firstProducts });
    expect(observerSpy.getFirstValue()).toEqual(firstProducts);
    console.log('1st call to getProducts');
    console.log({ getFirstValue: observerSpy.getFirstValue() });
    console.log({ receivedNext: observerSpy.receivedNext() });
    console.log({ getValues: observerSpy.getValues() });
    console.log({ getValuesLength: observerSpy.getValuesLength() });
    console.log({ getValueAt: observerSpy.getValueAt(1) });
    console.log({ getLastValue: observerSpy.getLastValue() });

    component.more();
    console.log('Call more(1)');
    // première valeur émise
    console.log({ getFirstValue: observerSpy.getFirstValue() });

    // Toutes les valeurs émises
    console.log({ getValues: observerSpy.getValues() });

    // Nombre des valeurs émises
    console.log({ getValuesLength: observerSpy.getValuesLength() });

    // La iéme valeure émise
    console.log({ getValueAt: observerSpy.getValueAt(1) });

    // La dernière valeure émise
    console.log({ getLastValue: observerSpy.getLastValue() });
    expect(observerSpy.getLastValue()?.length).toBe(6);
    component.more();
    expect(observerSpy.getLastValue()?.length).toBe(9);
    component.more();
    expect(observerSpy.getLastValue()?.length).toBe(10);
    component.more();
    expect(observerSpy.receivedComplete()).toBeTruthy();
  });
});
// cvServiceSpy.getCvs.and.nextWithValues([
//   { value: fakeItemsList },
//   { value: fakeItemsList, delay: 1000 },
//   { errorValue: someError }, // <- will throw this error, you can also add a "delay"
//   { complete: true }, // <- you can add a "delay" as well
// ]);


  // // EXPECTATIONS:
  // expect(observerSpy.getFirstValue()).toEqual('first');
  // expect(observerSpy.receivedNext()).toBe(true);
  // expect(observerSpy.getValues()).toEqual(fakeValues);
  // expect(observerSpy.getValuesLength()).toEqual(3);
  // expect(observerSpy.getValueAt(1)).toEqual('second');
  // expect(observerSpy.getLastValue()).toEqual('third');
  // expect(observerSpy.receivedComplete()).toBe(true);
