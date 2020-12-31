class Monster extends eui.Component implements  eui.UIComponent {	

	private btn:eui.Button;
	
	

	private _grid:astar.Grid;
	private _player:Monster;
	private _index:number;
	private _path:Array<any>;	

	public constructor() {
		super();
		
		this._player = this;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		this[partName] = instance;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		if(this.mname != "") this.btn.label = this.mname;
	}

	private mname:string = "";
	public setName(name:string):void
	{
		this.mname = name;
	}

	public data():void
	{
		
	}

	private _res: MonsterRes;
	public get res(): MonsterRes {
		return this._res;
	}
	public set res(value: MonsterRes) {
		this._res = value;
	}
	
}