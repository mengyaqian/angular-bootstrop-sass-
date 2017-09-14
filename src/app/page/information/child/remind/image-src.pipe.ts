import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSrc'
})
export class ImageSrcPipe implements PipeTransform {

  transform(value: any): any {
    let base = '../../../../../../assets/images/';
    switch(value){
      case 0 : return base+'approve-pass.png';
      case 1 : return base+'approve-refuse.png';
      case 2 : return base+'cw-pass.png';
      case 3 : return base+'cw-refuse.png';
      case 4 : return base+'cw-yzf.png';
      case 5 : return base+'cw-ysk.png';
      case 6 : return base+'cw-gg.png';
      case 7 : return base+'cw-ggbg.png';
      case 8 : return base+'cw-rc.png';
      case 9 : return base+'cw-rc.png';
      default:return base+'approve-pass.png';
    }
  }

}


