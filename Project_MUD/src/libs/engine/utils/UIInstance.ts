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

    private  _testUI:TestUI;
    /**测试面板*/
    public get testUI():TestUI{
        if(this._testUI==null)
        {
            this._testUI = new TestUI();
            UIEventManager.registerUI(this._testUI, "TestUI");
        }
        return this._testUI;
    }
}