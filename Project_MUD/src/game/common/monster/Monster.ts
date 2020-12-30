class Monster extends eui.Component implements  eui.UIComponent {	

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

	public data():void
	{
		
	}
	
}