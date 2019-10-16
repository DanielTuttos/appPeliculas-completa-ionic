import { Component, OnInit, Input } from '@angular/core';
import { Peliculas } from 'src/app/interface/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Peliculas[] = [];

  slideOpts = {
    slidesPerView: 1.2,
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

    modal.present();

  }

}
