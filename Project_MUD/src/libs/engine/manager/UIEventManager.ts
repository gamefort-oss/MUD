/**
 * UI事件注册管理器
 * 此方式有两个缺点：
 * 1.必须一个UI类对应的实例必须只有一个，否则容易出错
 * 2.如果在addUIRegisterEvent之前调用了registerUI，可能会造成事件注册不上
 * @author zcp
 */
class UIEventManager{
    constructor(){

    }

    public static registerUI ($dobj:any, $Class:string) : void
    {
        $dobj.addEventListener(egret.Event.ADDED_TO_STAGE, function(e:Event):void
        {
            if(UIEventManager.registerDict[$Class])
                UIEventManager.registerUIEvent($Class);
        }, $dobj);
        $dobj.addEventListener(egret.Event.REMOVED_FROM_STAGE, function(e:Event):void
        {
            if(UIEventManager.registerDict[$Class])
                UIEventManager.removedUIEvent($Class);
        }, $dobj);
    }

    // private static registerDict:Dictionary = new Dictionary();
    private static registerDict:Object = new Object();
    public static registerEvent ($msgCode:string, $msgCodeArr:Array<string>, meditor:any, eventPanel:any, listener:Function) : void
    {
        this.registerDict[$msgCode] = $msgCodeArr;
        this.registerDict[$msgCode + "me"] = meditor;
        this.registerDict[$msgCode + "ep"] = eventPanel;
        this.registerDict[$msgCode + "lis"] = listener;
    }

    /**
     * 不对外
     * @param
     */
    private static registerUIEvent($msgCode:string):void
    {
        let $msgCodeArr:Array<string> = this.registerDict[$msgCode];
        let medtior:any = this.registerDict[$msgCode + "me"];
        let eventPanel:any = this.registerDict[$msgCode + "ep"];
        let listener:Function = this.registerDict[$msgCode + "lis"];

        $msgCodeArr.forEach(eventType => {            
            eventPanel.addEventListener(eventType, listener, medtior);
        });
    }

    /**
     * 不对外
     * @param
     */
    private static removedUIEvent($msgCode:string):void
    {
        let $msgCodeArr:Array<string> = this.registerDict[$msgCode];
        let medtior:any = this.registerDict[$msgCode + "me"];
        let eventPanel:any = this.registerDict[$msgCode + "ep"];
        let listener:Function = this.registerDict[$msgCode + "lis"];

        $msgCodeArr.forEach(eventType => {
            eventPanel.removeEventListener(eventType, listener, medtior);
        });
    }

}