import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from 'src/app/interface/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {


  @Input() id;

  pelicula: PeliculaDetalle = {};

  actores: Cast[] = [];

  oculto: number = 150;

  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private movieService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    console.log('ID', this.id);

    this.dataLocal.existePelicula(this.id)
      .then(existe => this.estrella = (existe) ? 'star' : 'star-outline');

    this.movieService.getPeliculaDetalle(this.id)
      .subscribe(res => {
        //console.log(res);
        this.pelicula = res;
      });

    this.movieService.getActoresPelicula(this.id)
      .subscribe(res => {
        //console.log(res);
        this.actores = res.cast;
      });
  }

  regresar() {
    let existe = false;
    if (this.estrella === 'star') {
      existe = true;
    }
    this.modalCtrl.dismiss(
      {
        existe
      },
    );
    //console.log('salio con regresar')
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }


}
