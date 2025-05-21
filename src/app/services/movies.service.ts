import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import MoviesInterface from '../models/movies';
import { apiUrl } from '../../variables';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = apiUrl + '/movie';

  constructor(private http: HttpClient) {}

  createMovie(data: MoviesInterface): Observable<MoviesInterface> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.url, data, {headers});
  }

  getMovies(): Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.url);
  }

  getMovieById(id: string): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(`${this.url}/${id}`);
  }

  updateMovie(data: MoviesInterface): Observable<MoviesInterface> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<any>(`${this.url}/${data.id}`, data, {headers});
  }

   delete(id: string): Observable<MoviesInterface> {
    return this.http.delete<MoviesInterface>(`${this.url}/${id}`);
  }
}
