import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import MoviesInterface from '../../models/movies';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-listing',
  imports: [HttpClientModule, RouterModule, CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
  providers: [MoviesService]
})
export class MovieDetailComponent {
  movie: MoviesInterface = {
    id: 0,
    name : '',
    synopsis: '',
    imageLink: '',
    year: 0
  };
  modal = false;
  headOutModal = false;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.moviesService.getMovieById(`${id}`).subscribe(data => {
      this.movie = data;
    });
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  deleteMovie() {
    this.moviesService.delete(`${this.movie.id}`).subscribe(data => {
      this.movie = data;
    });
    this.modal = false;
    this.headOutModal = true;
  }

  goBack() {
    this.router.navigate(['/catalog-listing']);
  }
}
