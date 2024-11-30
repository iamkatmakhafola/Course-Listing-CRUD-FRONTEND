import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../classes/Course';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  constructor(private courseService:CourseService) {}


  courses:Course[] = [];

  ngOnInit()
  {
    this.FetchAllCourses();
  }

  FetchAllCourses(){
    this.courseService.FetchAllCourses().subscribe(x=> {
      this.courses = x;
      console.log(x);
    })
  }

  ReloadList():void{
    window.location.reload();
  }

  DeleteCourse(courseId:number){
    this.courseService.DeleteCourse(courseId).subscribe(result => {
      console.log(result);
      this.FetchAllCourses();
      
    })
  }
}
