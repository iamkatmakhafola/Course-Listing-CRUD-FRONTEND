import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../classes/Course';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.scss'
})
export class CourseAddComponent {

  AddCourseForm : FormGroup = new FormGroup({
    name : new FormControl("",[Validators.required]),

    duration: new FormControl("",[Validators.required]),
    
    description: new FormControl("",[Validators.required])

  });

  constructor(private courseService:CourseService, private nav:Router){

  }

  ngOnInit(){
    this.ResetForm();
  }

  ResetForm(){
    this.AddCourseForm.reset();
  }
  
  navToHome(): void {
    this.nav.navigateByUrl("/home");
    window.location.reload;
  }

  Add(): void{
  console.log("Add method called");
    if(this.AddCourseForm.invalid){
      Object.values(this.AddCourseForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true});
        }
      });
    }
    else{
      let course= new Course();
      course.name = this.AddCourseForm.controls["name"].value;
      course.duration = this.AddCourseForm.controls["duration"].value;
      course.description = this.AddCourseForm.controls["description"].value;
      this.courseService.AddCourse(course).subscribe({
        next: result=> {
          console.log(result)
          this.ResetForm()
        },
        error: error => {
          console.log(error);
        }
      });

    }
  }

  Cancel(): void{
    this.nav.navigateByUrl("/home");
  }
}


