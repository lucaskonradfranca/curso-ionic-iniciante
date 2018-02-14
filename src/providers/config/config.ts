import { Injectable } from '@angular/core';

let CONFIG_KEY_NAME = 'config';

@Injectable()
export class ConfigProvider {
  
  private _config = {
    showSlide: false,
    name: "",
    userName: ""
  }

  constructor() {
    
  }

  getConfigData(): any{
    return localStorage.getItem(CONFIG_KEY_NAME);
  }

  setConfigData(showSlide?: boolean, name?: string, userName?: string){
    if(name){
      this._config.name = name;
    }
    if(showSlide){
      this._config.showSlide = showSlide;
    }
    if(userName){
      this._config.userName = userName;
    }

    localStorage.setItem(CONFIG_KEY_NAME,JSON.stringify(this._config));
  }
 
}
