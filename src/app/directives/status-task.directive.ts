import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

@Directive({
  selector: '[appStatusTask]'
})

export class StatusTaskDirective implements OnInit{
	
	@Input() name: string;
	
	private colorElement(color: string) {
		this.el.nativeElement.style.backgroundColor = color;
	}
	
	constructor(private el: ElementRef) { }
	
	ngOnInit() {
		
		console.log(this.name);
		
		if(this.name == 'new'){
			this.colorElement('yellow');
		}
		if(this.name == 'current'){
			this.colorElement('cyan');
		}
		if(this.name == 'close'){
			this.colorElement('red');
		}
	}
	
}
	