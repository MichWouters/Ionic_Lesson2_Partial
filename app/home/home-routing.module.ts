import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePage } from './home.page'

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskPageModule),
  },
  {
    path: 'task/:id',
    loadChildren: () => import('./task/task.module').then(m => m.TaskPageModule),
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
