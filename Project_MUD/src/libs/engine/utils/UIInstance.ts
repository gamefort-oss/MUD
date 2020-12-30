class UIInstance 
{
    /**UI容器*/
    private _uiContainer:UIContainer;
    public get uiContainer():UIContainer
    {
        if(!this._uiContainer)
        {
            this._uiContainer = new UIContainer();
        }
        return this._uiContainer;
    }

    private  _mainUIPanel:MainUIPanel;
    /**主界面*/
    public get mainUIPanel():MainUIPanel{
        if(this._mainUIPanel==null)
        {
            this._mainUIPanel = new MainUIPanel();
            UIEventManager.registerUI(this._mainUIPanel, "MainUIPanel");
        }
        return this._mainUIPanel;
    }

    private  _fightPanel:FightPanel;
    /**战斗面板*/
    public get fightPanel():FightPanel{
        if(this._fightPanel==null)
        {
            this._fightPanel = new FightPanel();
            UIEventManager.registerUI(this._fightPanel, "FightPanel");
        }
        return this._fightPanel;
    }
}