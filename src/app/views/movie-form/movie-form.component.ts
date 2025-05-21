import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import MoviesInterface from '../../models/movies';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css',
  providers: [MoviesService]
})
export class MovieFormComponent {
  movie: MoviesInterface = {
    id: 0,
    name: '',
    synopsis: '',
    imageLink: '',
    year: 0
  }

  modal = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit () {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    const id = Number(idParam);

    if (Number.isInteger(id) && id > 0) {
      this.movie.id = id;

      this.moviesService.getMovieById(`${id}`).subscribe(data => {
      this.movie = data;
    });
    }
  }

  createOrUpdate() {
    if (this.movie.id > 0) {
      this.updateMovie();
    } else {
      this.createMovie();
    }
  }

  createMovie() {
    this.moviesService.createMovie(this.movie).subscribe(
      response => {
        this.message = 'Pelicula enviada correctamente';
        console.log('Pelicula enviada correctamente', response);
        this.modal = true;
      },
      error => {
        this.message = error;
        console.error('Error al crear pelicula', error);
        this.modal = true;
      }
    )
  }

  updateMovie() {
    this.moviesService.updateMovie(this.movie).subscribe(
      response => {
        this.message = 'Pelicula actualizada correctamente';
        console.log('Pelicula actualizada correctamente', response);
        this.modal = true;
      },
      error => {
        this.message = error;
        console.error('Error al crear pelicula', error);
        this.modal = true;
      }
    )
  }

  goBack() {
    this.router.navigate(['/catalog-listing']);
  }
}
