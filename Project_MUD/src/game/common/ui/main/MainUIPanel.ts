class MainUIPanel extends eui.Component implements  eui.UIComponent {
	
	public static readonly MAINUI_SHOW_FIGHTING:string = "MAINUI_SHOW_FIGHTING";
	public static readonly MAINUI_SHOW_CHARACTER:string = "MAINUI_SHOW_CHARACTER";
	public static readonly MAINUI_SHOW_MALL:string = "MAINUI_SHOW_MALL";
	public static readonly MAINUI_SHOW_ACTIVE:string = "MAINUI_SHOW_ACTIVE";

	private btnFIght:eui.Button;
	private btnChar:eui.Button;
	private btnMall:eui.Button;
	private btnActive:eui.Button;

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

		this.btnFIght.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
		this.btnChar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
		this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
		this.btnActive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
	}

	private onTapHandler(evt:egret.TouchEvent):void
	{
		switch(evt.target)
		{
			case this.btnFIght:
				this.dispatchEvent(new BaseEvent(MainUIPanel.MAINUI_SHOW_FIGHTING));
				break;
			case this.btnChar:
				this.dispatchEvent(new BaseEvent(MainUIPanel.MAINUI_SHOW_CHARACTER));
				break;
			case this.btnMall:
				this.dispatchEvent(new BaseEvent(MainUIPanel.MAINUI_SHOW_MALL));
				break;
			case this.btnActive:
				this.dispatchEvent(new BaseEvent(MainUIPanel.MAINUI_SHOW_ACTIVE));
				break;
		}
	}
	
}