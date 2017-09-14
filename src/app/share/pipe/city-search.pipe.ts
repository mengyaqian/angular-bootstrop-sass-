import { Pipe, PipeTransform,Injectable } from '@angular/core';

@Pipe({
  name: 'citySearch'
})

@Injectable()

export class CitySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var searchCtrl = ( data: any ) => {
                 var all = false;
                 if ( typeof data === 'object' ) {
      
                     for ( var z in data ) {
      
                         if ( all = searchCtrl( data[z] ) ) {
      
                             break;
      
                         };
      
                     };
      
                 } else {
            
                     if ( typeof data === 'number' ) {
      
                         all = data === args;
      
                     } else {
      
                         all = data.toString().match( new RegExp( args, 'i' ) );
      
                     };
      
                 };
      
                 return all;
      
             };
             return value.filter(searchCtrl);
      
         };
      

}
