import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from 'src/app/admin/admin.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [{
		path: 'courses',
		component: CoursesListComponent
	},
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent
  },
	{ path: '', redirectTo: '/courses', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}