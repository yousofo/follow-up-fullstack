import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/ProductType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  getProducts(shopPrarms: ShopParams) {
    let params = new HttpParams();

    if (shopPrarms.brandId !== 0) {
      params = params.append('brandId', shopPrarms.brandId.toString());
    }

    if (shopPrarms.typeId !== 0) {
      params = params.append('typeId', shopPrarms.typeId.toString());
    }
    if (shopPrarms.search) {
      params = params.append('search', shopPrarms.search);
    }

    params = params.append('sort', shopPrarms.sort);
    params = params.append('pageIndex', shopPrarms.pageNumber.toString());
    params = params.append('pageIndex', shopPrarms.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
