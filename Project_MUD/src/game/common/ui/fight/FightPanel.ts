class FightPanel extends eui.Component implements  eui.UIComponent {
	
	

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

		// this.btnFIght.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
	}

	private onTapHandler(evt:egret.TouchEvent):void
	{
		switch(evt.target)
		{
			// case this.btnFIght:
			// 	this.dispatchEvent(new BaseEvent(MainUIPanel.MAINUI_SHOW_FIGHTING));
			// 	break;
		}
	}
	
}