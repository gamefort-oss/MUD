/*
* gkf;
*/
class PipeManager{

     /**
     * 消息观察线程
     */		
    private static _msgObserverThread:tlibs.ObserverThread = new tlibs.ObserverThread();

    constructor(){
        
    }   
    
    /**
     * 注册消息 
     * @param $msgCode
     * @param $callBack 接收数据回调
     * @param $owner 所有者标识
     * 
     */	
    public static registerMsg ($msgCode:string, $callBack:Function, $owner:any) : void
    {
        var observer:puremvc.Observer = new puremvc.Observer($callBack, $owner);
        PipeManager._msgObserverThread.registerObserver($msgCode,observer);
    }
    /**
     * 批量注册消息 
     * @param $msgCodeArr
     * @param $callBack 接收数据回调
     * @param $owner 所有者标识
     * 
     */	
    public static registerMsgs ($msgCodeArr:Array<string>, $callBack:Function, $owner:any) : void
    {
        $msgCodeArr.forEach(key => {
            PipeManager.registerMsg(key, $callBack, $owner);
        });
    }
    /**
     * 移除消息 
     * @param $msgCode
     * @param $owner
     * 
     */	
    public static removeMsg ($msgCode:string, $owner:any) : void
    {
        PipeManager._msgObserverThread.removeObserver($msgCode,$owner);
    }
    /**
     * 批量删除消息 
     * @param $msgCodeArr
     * @param $owner 所有者标识
     * 
     */	
    public static removeMsgs ($msgCodeArr:Array<string>,  $owner:any) : void
    {
        $msgCodeArr.forEach(key => {
            PipeManager.removeMsg(key, $owner);
        });
    }
    /**
     * 发送消息
     * @param $msgCode
     * @param $data
     */
    public static sendMsg ($msgCode:string, $data:Object=null) : void
    {
        var notification:puremvc.Notification = new puremvc.Notification($msgCode, $data);
        PipeManager._msgObserverThread.notifyObservers(notification);
    }


}