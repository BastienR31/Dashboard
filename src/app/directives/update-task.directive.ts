import { Directive, Renderer2, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appUpdateTask]'
})

export class UpdateTaskDirective implements OnInit{
	
	@Input() name: string;
	private wasInside = false;
	
	private nodeElement;
	private parentElement;
	private currentElement;
	
	constructor(private renderer: Renderer2, private el: ElementRef) { }
	
	@HostListener('document:click', ['$event', '$event.target'])
	onClick(event: MouseEvent, targetElement: HTMLElement){
		
		if (!targetElement) {
			return;
		}
		
		switch (this.name ) {
			
			case 'nameTask':
				this.generateClickableComponent(this.el.nativeElement, targetElement, 'input', 'text');
				break;
			
			case 'dateTask':
				this.generateClickableComponent(this.el.nativeElement, targetElement, 'input', 'date');
				break;
			
			case 'descriptionTask':
				this.generateClickableComponent(this.el.nativeElement, targetElement, 'textarea', null);
				break;
			
			case 'statusTask':
				this.highlight('cyan');
				break;
			
			default:
				console.log('error switch');
		}
	}
	
	ngOnInit() {}
	
	private setCurrentElement(saveCurrentElement){
		this.currentElement = saveCurrentElement;
	}
	
	private getCurrentElement(){
		return this.currentElement;
	}
	
	private setParentElement(saveParentElement){
		this.parentElement = saveParentElement;
	}
	
	private getParentElement(){
		return this.parentElement;
	}
	
	private setNodeElement(saveNodeElement){
		this.nodeElement = saveNodeElement;
	}
	
	private getNodeElement(){
		return this.nodeElement;
	}
	
	private generateClickableComponent(currentElement, targetElement, domElement, inputElement) {
		
		//currentElement = this.el.nativeElement
		//domElement type
		//inputElement
		
		const clickedInside = currentElement.contains(targetElement);
		
		var parentTarget = currentElement.parentNode;
		
		if(targetElement == this.currentElement ) {
			
			console.log('test');
			//console.log(this.nodeElement);
			
		}
		
		if (!clickedInside) {
			
			var component = this.getNodeElement();
			var parentNode = this.getParentElement();
			var current = this.getCurrentElement();
			
			this.renderer.insertBefore(parentNode, component, current);
			this.renderer.removeChild(parentNode, current);
			
			this.setNodeElement(null);
			this.setParentElement(null);
			this.setCurrentElement(null);
		}
		else {
			this.setNodeElement(targetElement);
			this.setParentElement(parentTarget);
			
			this.createEditableNode(currentElement, domElement, inputElement);
		}
		
	}
	
	private createEditableNode(currentElement, domElement, typeElement){
		
		var parentNode = currentElement.parentNode;
		var textElement = currentElement.innerHTML;
		
		var divElement = this.renderer.createElement(domElement);
		
		if(domElement == 'textarea'){
			divElement.setAttribute('rows',3);
			divElement.innerHTML = textElement;
		}
		else{
			divElement.setAttribute('type',typeElement);
			divElement.setAttribute('value',textElement);
		}
		
		this.renderer.insertBefore(parentNode, divElement, currentElement);
		this.renderer.removeChild(parentNode, currentElement);
		
		this.setCurrentElement(divElement);
	}
	
	private highlight(color: string) {
		this.el.nativeElement.style.backgroundColor = color;
	}
	
}
	