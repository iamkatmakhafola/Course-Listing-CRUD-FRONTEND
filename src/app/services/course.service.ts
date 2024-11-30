import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../classes/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }
  endPoint:string= "https://localhost:7078/api/Course/";

  FetchAllCourses(){
    return this.http.get<Course[]>(this.endPoint + "fetchAllCourses");
  }

  FetchCourse(courseId:number){
    return this.http.get<Course>(`${this.endPoint}fetchAllCourses/${courseId}`);
  }

  AddCourse(course:Course){
    return this.http.post<string>(this.endPoint + "addCourse", course);
  }

  UpdateCourse(course:Course){
    return this.http.post<string>(this.endPoint + "updateCourse", course);
  }

  DeleteCourse(courseId:Number){
    return this.http.get<string>(`${this.endPoint}deleteCourse/${courseId}`);
  }
}
