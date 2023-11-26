import { Component, inject, OnInit } from '@angular/core'
import { AlertController, NavController } from '@ionic/angular'
import { TaskService } from '../../services/task.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  id?: string = undefined
  taskName: string | null = null
  deadline: string | null = null
  description: string | null = null
  yearValues: number[] = []

  navController = inject(NavController)
  taskService = inject(TaskService)

  activatedRoute = inject(ActivatedRoute)

  constructor() {
    // The following code generates a list of years that will be passed as options to the date-time picker.
    // Without this list, the date-time picker doesn't allow the user to choose a past date.
    const currentYear: number = (new Date()).getFullYear()
    for (let year = currentYear; year < (currentYear + 50); year++) {
      this.yearValues.push(year)
    }
  }

  ngOnInit(): void {
    this.setData()
  }

  setData(): void {
    // Get param id from route (see routing)
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id === null) {
      return
    }

    this.id = id
    const task = this.taskService.getTask(this.id)

    if (task) {
      this.taskName = task.name
      this.deadline = task.deadline ?? ''
      this.description = task.description ?? ''
    }
  }

  /**
   * Handle a click event on the create/update button and determine which action has
   * to happen.
   * Either a new task will be created or an existing task will be updated.
   */
  handleCreateAndUpdate(): void {
    if (this.id) {
      this.#updateTask()
    }
    else {
      this.#createTask()
    }

    this.navController.back();
  }

  /**
   * Create a new task with the attributes defined in the form.
   */
  #createTask(): void {
    if (this.taskName) {
      this.taskService.createTask(this.taskName, this.description ?? '', this.deadline ?? '')
    }
  }

  /**
   * Update an existing task with the attributes defined in the form.
   */
  #updateTask(): void {
    if (this.id && this.taskName) {
      this.taskService.updateTask({
        id: this.id,
        name: this.taskName,
        description: this.description ?? '',
        deadline: this.deadline ?? undefined,
      })
    }
  }
}
