import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthGuard } from 'src/app/admin/guards/auth.guard';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseFormComponent } from 'src/app/courses-list/course-form/course-form.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [{
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    children: [{
        path: '',
        component: CoursesListComponent
      },
      {
        path: 'new',
        component: CourseFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':courseID',
        component: CourseFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
