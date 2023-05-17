import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})

export class SearchBoxComponent  {

  //tomar una referencia local y view children es un arreglo
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  // con el ViewChild ya tengo el elemento y no necesita abajo
  searchTag():void{
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = ''; //esto es para limpiar
  }
}
