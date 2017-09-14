import { Directive, Output, Input, ElementRef, EventEmitter,OnInit} from '@angular/core';

declare var $:any;
@Directive({
  selector: '[appDateDirective]'
})
export class DateDirectiveDirective implements OnInit  {

  @Input() public datePickerOptions:any;

  @Output() selected: any = new EventEmitter();


  constructor(private _elementRef: ElementRef) {
    this.selected;
  }

  ngOnInit(){
    if(!this.datePickerOptions){
      this.datePickerOptions={
        format: 'yyyy-mm-dd'
      }
    }
    let call=this.selected;
    
      $(this._elementRef.nativeElement).fdatepicker(this.datePickerOptions).on('changeDate', function(){
        call.emit($(this).val());
      });
  }

}
