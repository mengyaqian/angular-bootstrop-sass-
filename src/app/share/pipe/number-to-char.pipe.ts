import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToChar'
})
export class NumberToCharPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data;
    switch(value){
      case 1:data='一';break;
      case 2:data='二';break;
      case 3:data='三';break;
      case 4:data='四';break;
      case 5:data='五';break;
      case 6:data='六';break;
      case 7:data='七';break;
      case 8:data='八';break;
      case 9:data='九';break;
      case 10:data='十';break;
      case 11:data='十一';break;
      case 12:data='十二';break;
      case '1':data='一';break;
      case '2':data='二';break;
      case '3':data='三';break;
      case '4':data='四';break;
      case '5':data='五';break;
      case '6':data='六';break;
      case '7':data='七';break;
      case '8':data='八';break;
      case '9':data='九';break;
      case '10':data='十';break;
      case '11':data='十一';break;
      case '12':data='十二';break;
      case '01':data='一';break;
      case '02':data='二';break;
      case '03':data='三';break;
      case '04':data='四';break;
      case '05':data='五';break;
      case '06':data='六';break;
      case '07':data='七';break;
      case '08':data='八';break;
      case '09':data='九';break;
    }
    return data;
  }

}
