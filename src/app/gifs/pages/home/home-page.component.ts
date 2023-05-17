import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-pages-home',
  templateUrl: './home-page.component.html'
  // styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private gifsServices:GifsService){
  }

  get gifs(): Gif[]{
    return this.gifsServices.gifList;
  }

}
