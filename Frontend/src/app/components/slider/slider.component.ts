import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number;
  @Input() captions: boolean;
  @Output() conseguirAutor = new EventEmitter();

  public autor: any;

  constructor() {

    this.autor = {
      nombre: 'Nacho Viano',
      email: 'nviano@hotmail.es',
      linkedIn: '/nacho-viano'
    };
  }

  ngOnInit() {
    $('.galeria').bxSlider({
      auto: true,
      autoControls: true,
      captions: this.captions,
      stopAutoOnClick: true,
      pager: true,
      slideWidth: this.anchura
    });
  }

  lanzar(event) {
    this.conseguirAutor.emit(this.autor);
  }


}
