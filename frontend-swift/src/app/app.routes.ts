import { Routes } from '@angular/router';
import { ListComponent } from './swift-codes/list/list.component';
import { DetailsComponent } from './swift-codes/details/details.component';
import { AddComponent } from './swift-codes/add/add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/swift-codes', pathMatch: 'full' },
  { path: 'swift-codes', component: ListComponent },
  { path: 'swift-codes/:swiftCode', component: DetailsComponent },
  { path: 'add-swift-code', component: AddComponent }
];
