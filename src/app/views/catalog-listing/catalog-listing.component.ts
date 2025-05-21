import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import MoviesInterface from '../../models/movies';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog-listing',
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './catalog-listing.component.html',
  styleUrl: './catalog-listing.component.css',
  providers: [MoviesService]
})
export class CatalogListingComponent {
  movies: MoviesInterface[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (error) => {
        console.error('Error al obtener películas:', error);
      }
    });
  }
}
