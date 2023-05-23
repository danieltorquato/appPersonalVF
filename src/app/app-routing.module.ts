import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'initial',
    loadChildren: () => import('./pages/initial/initial.module').then( m => m.InitialPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
    loadChildren: () => import('./pages/professor/schedule/schedule.module').then( m => m.SchedulePageModule)
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
  {
    path: 'swimming-informations',
    loadChildren: () => import('./pages/swimming-informations/swimming-informations.module').then( m => m.SwimmingInformationsPageModule)
  },
  {
    path: 'musc-informations',
    loadChildren: () => import('./pages/musc-informations/musc-informations.module').then( m => m.MuscInformationsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/professor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pupils',
    loadChildren: () => import('./pages/professor/pupils/pupils.module').then( m => m.PupilsPageModule)
  },
  {
    path: 'feedbacks',
    loadChildren: () => import('./pages/professor/feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  },
  {
    path: 'add-exercises/:info',
    loadChildren: () => import('./pages/professor/add-exercises/add-exercises.module').then( m => m.AddExercisesPageModule)
  },
  {
    path: 'student-training-v',
    loadChildren: () => import('./pages/professor/student-training-v/student-training-v.module').then( m => m.StudentTrainingVPageModule)
  },
  {
    path: 'registers',
    loadChildren: () => import('./pages/registers/registers.module').then( m => m.RegistersPageModule)
  },
  {
    path: 'newpupilp',
    loadChildren: () => import('./pages/professor/newpupilp/newpupilp.module').then( m => m.NewpupilpPageModule)
  },
  {
    path: 'history-pupils/:info',
    loadChildren: () => import('./pages/professor/history-pupils/history-pupils.module').then( m => m.HistoryPupilsPageModule)
  },
  {
    path: 'feedbacks-pupils',
    loadChildren: () => import('./pages/feedbacks-pupils/feedbacks-pupils.module').then( m => m.FeedbacksPupilsPageModule)
  },
  {
    path: 'swim-training/:info',
    loadChildren: () => import('./pages/professor/swim-training/swim-training.module').then( m => m.SwimTrainingPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
