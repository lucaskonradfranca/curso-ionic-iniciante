import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

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

  public nomeUsuario : String = "Lucas";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private movieProvider: MoovieProvider) {
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    alert(num1+num2);
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMoovies().subscribe(data=>{
      const objetoRetorno = JSON.parse(data['_body']);
      this.listaFilmes = objetoRetorno.results;
      console.log(objetoRetorno);
    },
    error => {
      console.log(error);
    });
  }

}
