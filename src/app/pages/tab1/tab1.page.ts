import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Peliculas, RespuestaMDB } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Peliculas[] = [];
  populares: Peliculas[] = [];

  /*slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  }*/

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getFeature()
      .subscribe(res => {
        //console.log(res);
        this.peliculasRecientes = res.results;
      });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe(populares => {
        //console.log(populares);

        const arrTemp = [...this.populares, ...populares.results];

        this.populares = arrTemp;
        //this.populares.push(...populares.results);//para anadir los nuevos resultados sin caerle encima al arreglo anterios
      });
  }

}
