import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workImg'
})
export class WorkImgPipe implements PipeTransform {
  transform(value: any): any {
    let base = '../../../../../../assets/images/';
    switch(value){
      case 1 : return base+'1 (5).png';
      case 2 : return base+'1 (10).png';
      case 3 : return base+'1 (8).png';
      default:return base+'1 (5).png';
    }
  }
}
