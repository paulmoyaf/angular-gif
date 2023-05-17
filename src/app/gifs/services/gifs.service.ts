import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'd5NTwd7K2LRc5WlfY82NCK19qclW57uV';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';


  constructor(private http:HttpClient){
    this.loadLocalStorage();

  }


  // el get es ara exponer de lo que se desea y los valores lo pasamos por REFERENCIA
  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void{


    tag = tag.toLowerCase();// javascript es case sensitive

    // si el history incluye entonces elimino ese tag
    // el filter me sirve para hacer un nuevo arreglo pero solo con la funcion veradadera
    //(oldTag ese esta almacenado) old tag si es diferente al tag recibido lo deja pasar
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10); // lo limitamos a 10
    this.saveLocalStorage();
  }

  // METODO PARA GRABAR INFORMACION EN EL NAVEGADOR
  private saveLocalStorage():void{
    // EL JSON LO SERIALIZA EL ARRGELO A UN STRING
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));


  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string):void{
    if (tag.length === 0 ) return; // si no existe nada

    this.organizeHistory(tag);
    // this._tagsHistory.unshift(tag);
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp => {
        this.gifList = resp.data;
        // console.log({gifs: this.gifList});
      });


  }
}




