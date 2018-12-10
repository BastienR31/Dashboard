
export class Test{
	
	private _opened: boolean = false;
	
	public _toggleSidebar() {
		this._opened = !this._opened;
	}
	
	isAuth: boolean;
	
	constructor() { }
	
	ngOnInit() {}

}
