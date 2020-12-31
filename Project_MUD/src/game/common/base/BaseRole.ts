class BaseRole extends eui.Component implements  eui.UIComponent {	
	
	/** 
	 * 0 未显示
	 * 1 活着
	 * 2 死亡
	 * 3 战斗
	 */
	public _state:number = 0;
	public _x:number = 0;
	public _y:number = 0;	

	private btn:eui.Button;	

	public constructor() {
		super();
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
	
}