import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HasUnsavedChanges } from '../../../core/interfaces/unsaved-changes.interface';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatCheckboxModule, FormsModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements HasUnsavedChanges {
  isDirty = false;

  hasUnsavedChanges(): boolean {
    return this.isDirty;
  }
}
