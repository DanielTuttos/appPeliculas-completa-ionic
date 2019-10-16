import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Peliculas } from 'src/app/interface/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculasPoster: Peliculas[] = [];
  @Output() refrescaLista = new EventEmitter<string>();

  slideOpts = {
    slidesPerView: 2.9,
    freeMode: true
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.refrescaLista.emit(data.existe);
  }

}
