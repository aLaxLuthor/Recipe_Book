import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input() onClick(){
    
  }


  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { 

  }
}
