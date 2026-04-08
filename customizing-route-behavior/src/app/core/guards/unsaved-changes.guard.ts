import { CanDeactivateFn } from '@angular/router';
import { HasUnsavedChanges } from '../interfaces/unsaved-changes.interface';

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
    if (component.hasUnsavedChanges()) {
        return window.confirm('You have unsaved changes! Are you sure you want to leave and lose your work?');
    }
    return true;
};