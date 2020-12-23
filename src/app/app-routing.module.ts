import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu1',
    loadChildren: () => import('./menu1/menu1.module').then( m => m.Menu1PageModule)
  },
  {
    path: '',
    redirectTo: 'menu1',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu1',
    loadChildren: () => import('./menu1/menu1.module').then( m => m.Menu1PageModule)
  },
  // {
  //   path: 'menu2',
  //   loadChildren: () => import('./menu2/menu2.module').then( m => m.Menu2PageModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('./assignment/assignment.module').then( m => m.AssignmentPageModule)
  },
  {
    path: 't2202',
    loadChildren: () => import('./t2202/t2202.module').then( m => m.T2202PageModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then( m => m.BooksPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'marksheet',
    loadChildren: () => import('./marksheet/marksheet.module').then( m => m.MarksheetPageModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./referral/referral.module').then( m => m.ReferralPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
