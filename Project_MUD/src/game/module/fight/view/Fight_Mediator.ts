/*
* gkf;
*/
class Fight_Mediator extends puremvc.Mediator{

    private _senderProxy:any;
    private get senderProxy():Fight_MsgSenderProxy
    {
        if(this._senderProxy == null) {
            this._senderProxy = this.facade().retrieveProxy(Fight_MsgSenderProxy.NAME);
        }
        return this._senderProxy;
    }

    public get panel():FightPanel
    {
        if(this.viewComponent==null)
        {
            this.setViewComponent(GameInstance.uIInstance.fightPanel);
        }
        return this.viewComponent;
    }

    public listNotificationInterests():Array<string>
    {
        return [
            PipeConstants.SHOW_FIGHT_PANEL
        ];
    }

    public handleNotification(note:puremvc.INotification):void
    {
        let noteBody:Object = note.getBody();
        switch ( note.getName() )
        {
            case PipeConstants.SHOW_FIGHT_PANEL:
                GameInstance.uIInstance.uiContainer.addChild(this.panel);
                this.panel.x = 20;
                this.panel.y= 165;
                break;
        }
    }

    public onRegister():void {
        this.initEvents();
    }

    private initEvents():void
    {
        UIEventManager.registerEvent("FightPanel",[
            // FightPanel.SHOW_FIGHT_PANEL
            egret.Event.ENTER_FRAME
            ], this, this.panel, this.handler);
    }

    public handler(event:egret.Event):void
	{
        let data:any = event.data;
		switch(event.type)
        {
            case egret.Event.ENTER_FRAME:
                this.onEnterFrame(event);
                break;
        }
    }

    private onEnterFrame(event:egret.Event):void
	{
        // this.panel.onEnterFrame(event);
    }
    
}