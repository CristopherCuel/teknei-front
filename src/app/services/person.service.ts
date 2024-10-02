import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) { }

}
