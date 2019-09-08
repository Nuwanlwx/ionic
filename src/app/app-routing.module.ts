import { NgModule } from '@angular/core';
import { DataResolverService } from './resolver/data-resolver.service';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   { path: '', redirectTo: 'access', pathMatch: 'full' },
   { path: '', redirectTo: 'survey', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'site-spec', loadChildren: './pages/site-spec/site-spec.module#SiteSpecPageModule' },
  {
    path: 'update-site-stage',
    loadChildren: './pages/update-site-stage/update-site-stage.module#UpdateSiteStagePageModule'
  },
  {
    path: 'update-weather',
    loadChildren: './pages/update-weather/update-weather.module#UpdateWeatherPageModule'
  },
  {
    path: 'update-weather/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './pages/update-weather/update-weather.module#UpdateWeatherPageModule' 
  },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },

  { path: 'survey', loadChildren: './pages/survey/survey.module#SurveyPageModule' },
  { path: 'survey-update', loadChildren: './pages/survey-update/survey-update.module#SurveyUpdatePageModule' },
  {
     path: 'survey-update/:id',
     resolve: {
      special: DataResolverService
     },
      loadChildren: './pages/survey-update/survey-update.module#SurveyUpdatePageModule' },
  { path: 'access', loadChildren: './pages/access/access.module#AccessPageModule' },
  { path: 'update-site-info', loadChildren: './pages/update-site-info/update-site-info.module#UpdateSiteInfoPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'main-dashboard', loadChildren: './pages/main-dashboard/main-dashboard.module#MainDashboardPageModule' },
  { path: 'second-dashboard', loadChildren: './pages/second-dashboard/second-dashboard.module#SecondDashboardPageModule' },
  { path: 'third-dashboard', loadChildren: './pages/third-dashboard/third-dashboard.module#ThirdDashboardPageModule' },
  { path: 'task-update', loadChildren: './pages/task-update/task-update.module#TaskUpdatePageModule' },
  {
    path: 'task-update/:id',
    resolve: {
      special: DataResolverService
     },
    loadChildren: './pages/task-update/task-update.module#TaskUpdatePageModule'
  },
  { path: 'survey-new', loadChildren: './pages/survey-new/survey-new.module#SurveyNewPageModule' },
  {
    path: 'survey-new/:id',
    resolve: {
      special: DataResolverService
     },
     loadChildren: './pages/survey-new/survey-new.module#SurveyNewPageModule'},
  { path: 'tower-list', loadChildren: './pages/tower-list/tower-list.module#TowerListPageModule' },
  {
    path: 'tower-list/:id',
     resolve: {
      special: DataResolverService
     },
     loadChildren: './pages/tower-list/tower-list.module#TowerListPageModule'
  },
  { path: 'second-line-list', loadChildren: './pages/second-line-list/second-line-list.module#SecondLineListPageModule' },
  { path: 'line-list', loadChildren: './pages/line-list/line-list.module#LineListPageModule' },
  { path: 'task-update-modal', loadChildren: './pages/task-update-modal/task-update-modal.module#TaskUpdateModalPageModule' },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },
  {
    path: 'multiple-task-history/:id',
     resolve: {
       special: DataResolverService
     },
    loadChildren: './pages/multiple-task-history/multiple-task-history.module#MultipleTaskHistoryPageModule' 
  },
  { path: 'multiple-task-history', loadChildren: './pages/multiple-task-history/multiple-task-history.module#MultipleTaskHistoryPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
