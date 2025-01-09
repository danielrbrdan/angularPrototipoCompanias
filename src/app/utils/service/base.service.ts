import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export abstract class BaseService<T extends { id: number }> {
  constructor(
    protected readonly url: string,
    protected readonly http: HttpClient,
  ) {}

  public findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  public findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  public create(body: T): Observable<T> {
    return this.http.post<T>(this.url, body);
  }

  public update(body: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${body.id}`, body);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
