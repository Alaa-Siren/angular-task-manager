import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  taskToEdit! : Task;
  editedTask! : boolean;

  constructor(private location: Location, private taskService: TasksService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getTask();
  }

  getTask(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe(task => this.taskToEdit = task);
  }

  goBack(){
    this.location.back();
  }

  editTask(){
    this.taskService.editTask(this.taskToEdit).subscribe(task => this.editedTask = true);
  }
}
