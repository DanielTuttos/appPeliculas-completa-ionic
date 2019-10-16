import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Peliculas } from 'src/app/interface/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Peliculas[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.9,
    freeMode: true
  }
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onClick() {
    //console.log("cargar mas");
    this.cargarMas.emit();
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
