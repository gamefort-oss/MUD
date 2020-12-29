/*
* gkf;
*/
class Main_Mediator extends puremvc.Mediator{

    private _senderProxy:any;
    private get senderProxy():Main_MsgSenderProxy
    {
        if(this._senderProxy == null) {
            this._senderProxy = this.facade().retrieveProxy(Main_MsgSenderProxy.NAME);
        }
        return this._senderProxy;
    }

    public get panel():MainUIPanel
    {
        if(this.viewComponent==null)
        {
            this.setViewComponent(GameInstance.uIInstance.mainUIPanel);
        }
        return this.viewComponent;
    }

    public listNotificationInterests():Array<string>
    {
        return [
            PipeConstants.SHOW_MAIN_PANEL
        ];
    }

    public handleNotification(note:puremvc.INotification):void
    {
        let noteBody:Object = note.getBody();
        switch ( note.getName() )
        {
            case PipeConstants.SHOW_MAIN_PANEL:
                GameInstance.uIInstance.uiContainer.addChild(this.panel);
                break;
        }
    }

    public onRegister():void {
        this.initEvents();
    }

    private initEvents():void
    {
        UIEventManager.registerEvent("MainUIPanel",[
            MainUIPanel.MAINUI_SHOW_FIGHTING,
            MainUIPanel.MAINUI_SHOW_CHARACTER,
            MainUIPanel.MAINUI_SHOW_MALL,
            MainUIPanel.MAINUI_SHOW_ACTIVE
            ], this, this.panel, this.handler);
    }

    public handler(event:egret.Event):void
	{
        let data:any = event.data;
		switch(event.type)
        {
            case MainUIPanel.MAINUI_SHOW_FIGHTING:
                
                break;
            case MainUIPanel.MAINUI_SHOW_CHARACTER:
            
                break;
            case MainUIPanel.MAINUI_SHOW_MALL:
        
                break;
            case MainUIPanel.MAINUI_SHOW_ACTIVE:
    
                break;
        }
	}
}