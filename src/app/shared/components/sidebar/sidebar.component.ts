import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService:GifsService){}

  get tags():string[]{
    return this.gifsService.tagsHistory;
  }
    // con el ViewChild ya tengo el elemento y no necesita abajo
  catchTag(tag:string):void{
    this.gifsService.searchTag(tag);
  }

}
