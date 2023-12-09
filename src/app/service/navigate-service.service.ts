import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigateServiceService {
  previousUrl: string;
  currentUrl: string;
  constructor() {}
}
