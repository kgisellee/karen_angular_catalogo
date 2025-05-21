import { Routes } from '@angular/router';
import { CatalogListingComponent } from './views/catalog-listing/catalog-listing.component';
import { LandingComponent } from './views/landing/landing.component';
import { MovieFormComponent } from './views/movie-form/movie-form.component';
import { MovieDetailComponent } from './views/movie-detail/movie-detail.component';

export const routes: Routes = [
    {path: 'movie-form/:id', component: MovieFormComponent},
    {path: 'movie-detail/:id', component: MovieDetailComponent},
    {path: 'catalog-listing', component: CatalogListingComponent},
    {path: '', component: LandingComponent}
];
