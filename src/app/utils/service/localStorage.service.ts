import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  setItem(key: string, value: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.localStorage) {
      return this.localStorage.getItem(key);
    }
    return null;
  }

  clear() {
    this.localStorage?.clear();
  }
}
