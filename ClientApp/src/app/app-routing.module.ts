import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AnswersEditComponent } from './admin/answers/answers-edit.component';
import { QuestionsEditComponent } from './admin/questions/questions.component';
import { TestEditComponent } from './admin/tests/test-edit.component';
import { CategoriesEditComponent } from './admin/categories/categories-edit.component';
import { ResultComponent } from './result/result.component';
import { PlayTestComponent } from './play-test/play-test.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { TestListComponent } from './test-list/test-list.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'addlogin', component: RegComponent },
  {
    path: 'test-list/:id',
    component: TestListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  { path: 'play/:id', component: PlayTestComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
