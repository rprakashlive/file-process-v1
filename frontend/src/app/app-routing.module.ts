import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileProcessComponent } from './user/file-process/file-process.component';
import { FileViewerComponent } from './user/file-viewer/file-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/file-process', pathMatch: 'full' },
  { path: 'file-process', component: FileProcessComponent },
  { path: 'file-viewer', component: FileViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
