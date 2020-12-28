/*
* gkf;
*/
class Test_Mediator extends puremvc.Mediator{

    private _senderProxy:any;
    private get senderProxy():Test_MsgSenderProxy
    {
        if(this._senderProxy == null) {
            this._senderProxy = this.facade().retrieveProxy("Test_MsgSenderProxy");
        }
        return this._senderProxy;
    }

    public get panel():TestUI
    {
        //第一次执行
        if(this.viewComponent==null)
        {
            //设置中介器数据
            this.setViewComponent(GameInstance.uIInstance.testUI);
        }
        return this.viewComponent;
    }
    public listNotificationInterests():Array<string>
    {
        return [
            PipeConstants.GET_TEST_PANEL
        ];
    }

    public handleNotification(note:puremvc.INotification):void
    {
        let noteBody:Object = note.getBody();
        switch ( note.getName() )
        {
            case PipeConstants.GET_TEST_PANEL:
                // UITools.showPanel(this.panel);
                GameInstance.uIInstance.uiContainer.addChild(this.panel);
                break;
        }
    }

    public onRegister():void {
        //注册事件
        this.initEvents();
    }

    private initEvents():void
    {
        UIEventManager.registerEvent("TestUI",[
            TestUI.BTN_1_CLICK,
            TestUI.BTN_2_CLICK
            ], this, this.panel, this.handler);
    }

    public handler(event:string, data:any):void
	{
		switch(event)
        {
            case TestUI.BTN_1_CLICK:
                this.panel.setData1();
                break;
            case TestUI.BTN_2_CLICK:
                this.panel.setData2();
                break;
        }
	}
}