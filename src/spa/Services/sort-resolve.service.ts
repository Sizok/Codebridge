import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortResolveService {
  private _key = [];
  private _strKey: string;
  private _resultData: any[];
  constructor() { }

  private sortArray(value: any[]){
    let index: number;
    let sortValue = value.sort((a,b) => a.coincidence.title < b.coincidence.title ? 1 : -1);
    for(let i = 0; i < sortValue.length; i++) {
      if(sortValue[i].coincidence.title == 0){
        index = i;
        break;
      }
    }
    let secondArr = sortValue.splice(index).sort((a,b) => a.coincidence.summary < b.coincidence.summary ? 1 : -1);
    let arr = sortValue.concat(secondArr);
    this._resultData = arr;
    return arr;
  }

  private trimText(value:any){
    if(value.title.length > 100) value.title = value.title.substring(0, 100).concat('...');
    if(value.summary.length > 100) value.summary = value.summary.substring(0, 100).concat('...');
    return value;
  }

  private countCoincidence(value:string, key:string) {
    const re = new RegExp("\\b("+key+"\\b)", 'igm');
    let count = (value.match(re) || []).length;
    return count;
  }

  private transform(value: any, args: any): unknown {
    if(!args) return value;
      const re = new RegExp("\\b("+args+"\\b)", 'igm');
      value = value.replace(re, '<span class="highlighted-text">$1</span>');
      return value;
  }

  sortAndSarchKeyArr (resolve: any[]){
    for(let value of resolve){
      let countTitle = 0;
      let countSummary = 0
      for(let key of this._key){
        countTitle += this.countCoincidence(value.title, key);
        countSummary += this.countCoincidence(value.summary, key);
        // value.title = this.transform(value.title, key);
        // value.summary = this.transform(value.summary, key);
      }
      value['coincidence'] = {title: countTitle ,
        summary: countSummary};
      value = this.trimText(value);
      for(let key of this._key){
        value.title = this.transform(value.title, key);
        value.summary = this.transform(value.summary, key);
      }
    }
    let result = this.sortArray(resolve);
    return result;
  }

  private trimStringToArray(value: string) {
    const words: string[] = value
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
    return words;

  }

  setKey(value: string):void{
    this._strKey = value;
    this._key = this.trimStringToArray(value);
  }
  getKey(){
    if(this._strKey)return this._strKey;
    return '';
  }
  getData(){
    if(this._resultData) return this._resultData;
    return [];
  }


}
