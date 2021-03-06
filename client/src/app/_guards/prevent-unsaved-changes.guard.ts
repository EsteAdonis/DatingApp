import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  
  canDeactivate(component: MemberEditComponent): boolean {
      if (component.editForm.dirty) {
        return confirm('Are you sure you want to continue? And unsaved changes will be lost')
      }
    return true;
  }
  
}
