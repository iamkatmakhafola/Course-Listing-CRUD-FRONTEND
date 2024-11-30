import { Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseUpdateComponent } from './courses/course-update/course-update.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component:CourseListComponent},
    {path:'add', component:CourseAddComponent},
    {path:'update/:courseId', component:CourseUpdateComponent}
];
