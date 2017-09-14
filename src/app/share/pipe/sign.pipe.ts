import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sign'
})
export class SignPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let flag =parseInt(value);
    switch (flag) {
      case 6:
        return '正常';
      case 1:
        return '地点异常';
      case 2:
        return '迟到';
      case 3:
        return '未签退';
      case 4:
        return '早退';
      case 5:
        return '迟到早退';
      }
      return '未知';
  }

}
