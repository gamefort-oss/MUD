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
    /**测试面板*/
    public get mainUIPanel():MainUIPanel{
        if(this._mainUIPanel==null)
        {
            this._mainUIPanel = new MainUIPanel();
            UIEventManager.registerUI(this._mainUIPanel, "MainUIPanel");
        }
        return this._mainUIPanel;
    }
}