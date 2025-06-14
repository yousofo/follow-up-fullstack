import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';

export const routes: Routes = [
  { path: '', component: ShopComponent },
  {
    path: ':id',
    component: ProductDetailsComponent,
    data: { breadcrumb: { alias: 'productDetails' } },
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
