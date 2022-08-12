import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
  path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'hours',
    loadChildren: () => import('./pages/hours/hours.module').then( m => m.HoursPageModule)
  },
  {
    path: 'swimming-training',
    loadChildren: () => import('./pages/swimming-training/swimming-training.module').then( m => m.SwimmingTrainingPageModule)
  },
  {
    path: 'musc-training',
    loadChildren: () => import('./pages/musc-training/musc-training.module').then( m => m.MuscTrainingPageModule)
  },
  {
    path: 'completed-training',
    loadChildren: () => import('./pages/completed-training/completed-training.module').then( m => m.CompletedTrainingPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
