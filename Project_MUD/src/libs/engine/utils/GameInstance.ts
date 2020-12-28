class GameInstance
{
    private static _instance:GameInstance;
    public static get instance():GameInstance
    {
        if(!this._instance)
        {
            this._instance = new GameInstance();
        }
        return this._instance;
    }

    private static _sceneInstance:SceneInstance;
    public static get sceneInstance():SceneInstance
    {
        if(!this._sceneInstance)
        {
            this._sceneInstance = new SceneInstance();
        }
        return this._sceneInstance;
    }
    
    private static _uIInstance:UIInstance;
    public static get uIInstance():UIInstance
    {
        if(!this._uIInstance)
        {
            this._uIInstance = new UIInstance();
        }
        return this._uIInstance;
    }

    private static _clientSocket:ClientSocket;
    public static get clientSocket():ClientSocket
    {
        if(!this._clientSocket)
        {
            this._clientSocket = new ClientSocket();
        }
        return this._clientSocket;
    }
    
    public main:eui.UILayer
    public initLayer():void{                 
        // //背景层
        // UITools.createBitmapByName(this.main, "bg_jpg", 0, 0,GameConfig.stageWidth, GameConfig.stageHeight);
        // //场景层
        // this.main.addChild(GameInstance.sceneInstance.sceneContainer);
        // GameInstance.uIInstance.uiContainer.touchThrough = true;
        //UI层
        this.main.addChild(GameInstance.uIInstance.uiContainer)   
    }
}