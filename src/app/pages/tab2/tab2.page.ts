import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Peliculas } from 'src/app/interface/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';
  peliculas: Peliculas[] = [];

  buscando: boolean = false;

  ideas: string[] = [
    'Spiderman',
    'Avengers',
    'El señor de los anillos',
    'La bella y la bestia',
    'Aladdin'
  ]

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) { }

  buscar(event) {
    //console.log(event);
    const valor: string = event.detail.value;

    if (valor.length > 0) {
      this.buscando = true;
      //console.log(valor);
      this.movieService.buscarPeliculas(valor)
        .subscribe(res => {
          //console.log(res);
          this.peliculas = res['results'];
          this.buscando = false;
        })
    } else {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }
}
