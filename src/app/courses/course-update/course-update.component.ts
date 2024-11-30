import { Component } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../classes/Course';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.scss'
})
export class CourseUpdateComponent {

  UpdateCourseForm : FormGroup = new FormGroup({
    name : new FormControl("",[Validators.required]),

    duration: new FormControl("",[Validators.required]),
    
    description: new FormControl("",[Validators.required])

  });

  ReceivedData!:Subscription;
  courseId!: number;
  course!:Course;

  constructor(private courseService:CourseService, private nav:Router, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(){

    this.ReceivedData = this.activatedRoute.params.subscribe(params => {
      this.courseId = params["courseId"];
      this.fetchCourse();
    })
  }

  fetchCourse(){
    this.courseService.FetchCourse(this.courseId).subscribe({
      next: x=> {
        console.log(x);
        this.ResetForm();
        this.course = x;
        this.Values();
      },
      error: er => {
        console.log(er);
      }
    });
  }

  Values(){
    this.UpdateCourseForm.controls["name"].setValue(this.course.name);
    this.UpdateCourseForm.controls["duration"].setValue(this.course.duration);
    this.UpdateCourseForm.controls["description"].setValue(this.course.description);
  }

  ResetForm(){
    this.UpdateCourseForm.reset();
  }
  navToHome(): void {
    this.nav.navigateByUrl("/home");
    window.location.reload;
  }

  

  Update(){
    if(this.UpdateCourseForm.invalid){
      Object.values(this.UpdateCourseForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true});
        }
      });
    }
    else{
      let course= new Course();
      course.courseId = this.course.courseId;
      course.name = this.UpdateCourseForm.controls["name"].value;
      course.duration = this.UpdateCourseForm.controls["duration"].value;
      course.description = this.UpdateCourseForm.controls["description"].value;
      this.courseService.UpdateCourse(course).subscribe({
        next: x=> {
          console.log(x);
          this.ResetForm();
        },
        error: er => {
          console.log(er);
        }
      });
    }
  }

  Cancel(){
    this.nav.navigateByUrl("/home");
    window.location.reload;
  }
}
