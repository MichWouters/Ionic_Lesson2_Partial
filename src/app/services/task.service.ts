import { Injectable } from '@angular/core'
import { ITask } from '../../models/ITask'
import { Filter } from '../../models/filter'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // The list of task that will be displayed in the application.
  #taskList: ITask[] = []

  constructor() {
    // Uncomment to generate a collection of demo tasks for testing the UI.
    for (let i = 0; i < 5; i++) {
      this.#taskList.push({
        name: 'Task ' + i,
        done: i % 2 === 0,
        id: window.crypto.randomUUID(),
      })
    }
  }

  get tasks(): ITask[] {
    /**  The structuredClone methode created a deep copy of every element in the array.
    * This way, the only possible changes that affect the tasks, must be made through the TaskService.
    * If we don't use this, the pages would be able to perform all CRUD operations on the array and the effects would
    * be visible on other pages.
    * Because we return a copy that shares no references with the #taskList instance variable, all changes must go
    * through this service.
    * This is a rather academical safety feature, especially in the small-scale apps that we build in this course,
    * but it is included as an extra for those who which to gain a deeper understanding of programming.
    * For more info, see https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy.
    */
    return window.structuredClone(this.#taskList)
  }

  /**
   * Retrieve a task based on its id and return it.
   *
   * @param id The task with the matching id or undefined if no task can be found.
   */
  getTask(id: string): ITask | undefined {
    return window.structuredClone(this.#taskList.find(t => t.id === id))
  }

  /**
   * Create a new uncompleted task with a given name.
   *
   * @param name The name of the new task.
   * @param description A longer description for the task.
   * @param deadline The deadline by which the task must be finished. Is optional, defaults to undefined.
   */
  createTask(name: string, description: string, deadline?: string): void {
    this.#taskList.push({
      name,
      id: window.crypto.randomUUID(),
      done: false,
      description,
      deadline,
    })
  }

  /**
   * Change the status of a task from done to not done or the reverse.
   *
   * @param id The id of the task for which the status must be changed.
   */
  toggleTaskStatus(id: string): void {
    const task = this.#taskList.find(t => t.id === id)
    if (task) {
      task.done = !task.done
    }
  }

  updateTask(updatedTask: Partial<ITask> & { id: string }): void {
    const task = this.#taskList.find(x => x.id === updatedTask.id)

    if (task === undefined) {
      console.error('Trying to update a non-existant task.')
      return
    }

    Object.assign(task, updatedTask)
  }

  /**
   * Delete a task from the task list.
   *
   * @param id The id of the task that is to be deleted.
   */
  deleteTask(id: string): void {
    this.#taskList = this.#taskList.filter(t => t.id !== id)
  }

  /**
   * Check if a given filter matches a given task.
   *
   * @param task The task to compare with the filter.
   * @param filter The filter that is to be applied to the task.
   * @return True if the filter matches the task, false otherwise.
   */
  private static taskMatchesFilter(task: ITask, filter: Filter): boolean {
    if (Filter.all === filter) {
      return true
    }

    return filter === Filter.completed && task.done || filter === Filter.toDo && !task.done
  }

  /**
   * Filters the list of tasks based on the currently selected filter.
   *
   * @param filter The filter used to filter the tasks.
   * @return The tasks that match the currently selected filter.
   */
  getFilteredTasks(filter: Filter): ITask[] {
    return this.#taskList
      .filter(t => TaskService.taskMatchesFilter(t, filter))
  }
}
