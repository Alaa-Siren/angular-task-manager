import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks';
import { TasksService } from '../tasks.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  
  tasks: Task[] = [];
  pagedTasks: Task[] = []; // current page
  pageSize = 10;
  pageIndex = 0;
  isLoading = true;
  constructor(private tasksService : TasksService, public dialog: MatDialog) {}

  getTasks() {
    this.isLoading = true;
    this.tasksService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.updatePagedTasks();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.isLoading = false;
      }
    });
  }

  // Uncomment to test loading
  // getTasks() {
  //   this.isLoading = true; // start loading

  //   setTimeout(() => {
  //     this.tasksService.getAllTasks().subscribe({
  //       next: (tasks) => {
  //         this.tasks = tasks;
  //         this.updatePagedTasks();
  //         this.isLoading = false; // stop loading
  //       },
  //       error: (err) => {
  //         console.error('Failed to load tasks', err);
  //         this.isLoading = false; // stop loading even on error
  //       }
  //     });
  //   }, 2000); // 2-second delay to simulate loading
  // }

  delete(task: Task) : void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

     dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks = this.tasks.filter(t => t !== task);
        this.tasksService.deleteTask(task.id).subscribe(() => this.updatePagedTasks());
      }
    });
  }
  
  ngOnInit(): void {
    this.getTasks();
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedTasks();
  }

  updatePagedTasks() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTasks = this.tasks.slice(start, end);
  }
}
