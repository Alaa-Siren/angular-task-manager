import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent {
  taskToAdd! : Task;
  addedTask! : Task;
  addForm = new FormGroup({
    userId: new FormControl(),
    id: new FormControl(),
    title: new FormControl(),
    completed: new FormControl(false)
  });
  constructor(private taskService: TasksService, private location : Location) {}

  submitTask(){
    this.taskToAdd = this.addForm.value as Task;
    this.taskService.addTask(this.taskToAdd).subscribe(task => this.addedTask = task);
    this.addForm.reset();
  }

  goBack() : void {
    this.location.back();
  }
}
