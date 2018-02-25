import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ],
})
export class FeedPage {
  public objetoFeed = {
    titulo: "Lucas França",
    data: "November, 5 1955",
    descricao: "Meu primeiro app.",
    qtdLikes: 10,
    qtdComments: 33,
    time_comment: "11h ago"
  }

  public listaFilmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScrool;

  public nomeUsuario : String = "Lucas";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private movieProvider: MoovieProvider,
              public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    alert(num1+num2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false){
    this.abreCarregando();
    this.movieProvider.getLatestMoovies(this.page).subscribe(data=>{
      const objetoRetorno = JSON.parse(data['_body']);
      console.log(objetoRetorno.results);  
      if(newPage){
        this.listaFilmes = this.listaFilmes.concat(objetoRetorno.results);
        this.infiniteScrool.complete();
      }else{
        this.listaFilmes = objetoRetorno.results;
      }
      
      this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    },
    error => {
      console.log(error);
      this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScrool = infiniteScroll;
    this.carregarFilmes(true);
    
  }

  abrirDetalhes(filme){
    
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

}
