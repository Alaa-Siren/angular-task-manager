import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  url = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.url}/${id}`
    return this.http.get<Task>(url);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task, this.httpOptions);
  }

  editTask(task: Task): Observable<any> {
    const url = `${this.url}/${task.id}`;
    return this.http.put(url, task, this.httpOptions);
  }

  deleteTask(id: number) : Observable<Task> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions);
  }
}
