import {Component, inject} from '@angular/core'
import {Filter} from '../../models/filter'
import {TaskService} from '../services/task.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // The vertical position of the FAB.
  // This is only placed in the logic file in order to demonstrate databinding.
  verticalFabPosition: 'bottom' | 'top' = 'bottom'

  // Tracks whether the FAB should be shown to the user.
  fabIsVisible = true

  // The filters are defined in an enum, the enum must first be converted to an
  // array because enums aren't iterable.
  filters: Filter[] = Object.values(Filter)
  selectedFilter = this.filters[0]

  taskService = inject(TaskService)

  constructor() {
    // Uncomment the following code to demonstrate the power of databinding.
    // The position will switch between bottom and top every 1/4 of a second.
    // A change in an instance variable is immediately visible in the UI, thanks to databinding.
    // setInterval(
    //   () => {
    //     this.verticalFabPosition =
    //       this.verticalFabPosition === 'bottom' ? 'top' : 'bottom'
    //   },
    //   250
    // )
  }

  /**
   * A handler that ensures that the floating action button is hidden when the
   * user scrolls through the task list.
   */
  logScrollStart(): void {
    this.fabIsVisible = false
  }

  /**
   * A handler that shows the FAB after scrolling has stopped and 1.5 seconds
   * have passed.
   */
  logScrollEnd(): void {
    setTimeout(() => this.fabIsVisible = true, 1500)
  }

  /**
   * Change selected filter.
   *
   * @param $event The event that is fired when a user selects a filter.
   */
  changeFilter($event: any) {
    this.selectedFilter = $event.target.value
  }
}
