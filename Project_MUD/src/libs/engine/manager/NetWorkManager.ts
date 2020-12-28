/*
* name;
*/
class NetWorkManager{

    constructor(){
        
    }

    /**
     * 消息观察线程
     */		
    private static _msgObserverThread:tlibs.ObserverThread = new tlibs.ObserverThread();

    /**
     * 注册消息 
     * @param $msgCode
     * @param $callBack 接收数据回调
     * @param $owner 所有者标识
     */	
    public static registerMsg ($msgCode:number, $callBack:Function, $owner:any) : void
    {
        var observer:puremvc.Observer = new puremvc.Observer($callBack, $owner);
        this._msgObserverThread.registerObserver($msgCode,observer);
    }

    /**
     * 批量注册消息 
     * @param $msgCodeArr
     * @param $callBack 接收数据回调
     * @param $owner 所有者标识
     */	
    public static registerMsgs ($msgCodeArr:Array<number>, $callBack:Function, $owner:any) : void
    {
        var key:number;
        $msgCodeArr.forEach(key => {
            this.registerMsg(key, $callBack, $owner);
        });
    }

    /**
     * 移除消息 
     * @param $msgCode
     * @param $owner
     */	
    public static removeMsg ($msgCode:number, $owner:any) : void
    {
        this._msgObserverThread.removeObserver($msgCode,$owner);
    }
    /**
     * 批量删除消息 
     * @param $msgCodeArr
     * @param $owner 所有者标识
     */	
    public static removeMsgs ($msgCodeArr:Array<number>,  $owner:any) : void
    {
        var key:number;
        $msgCodeArr.forEach(key => {
            this.removeMsg(key, $owner);
        });
    }

    /**
     * 接收消息
     */
    public static receiveMsg($msgCode:number, $data:egret.ByteArray) : void
    {
        // ZLog.add("收到消息："+$msgCode);
        
        // //移除重要消息等待重发
        // MsgReSendManager.removeWaitMsg($msgCode);
        // //解密
        // var newData:ByteArray = ($msgCode>=10000) ? decodeData($data) : $data;//只有协议号大于10000的消息才解密
        //接收处理
        var notification:puremvc.Notification = new puremvc.Notification($msgCode + "", $data);
        this._msgObserverThread.notifyObservers(notification);
    }

    public static sendMsg($msgCode:number, $data:egret.ByteArray, $serverSocket:egret.WebSocket = null):void {
        // ZLog.add("发送消息："+$msgCode);
        //添加重要消息等待重发
        // if(MsgReSendManager.addWaitMsg($msgCode, $data, $serverSocket))
        // {
        //     //加密
            // var socket:TSocket = $serverSocket || lineSocket;
            // var newData:ByteArray = ($msgCode>=10000) ? encodeData($data) : $data;//只有协议号大于10000的消息才加密
            // //发送处理
            // socket.doSend($msgCode, newData);
        // }
        var socket:ClientSocket = GameInstance.clientSocket;
        socket.sendMsg($msgCode, $data);
    }

    /**开始心跳*/
    public static startHeart():void
    {
        GameInstance.instance.main.stage.addEventListener(egret.Event.ENTER_FRAME, this.heartHandle, this);
    }
    /**停止心跳*/
    public static stopHeart():void
    {
        GameInstance.instance.main.stage.removeEventListener(egret.Event.ENTER_FRAME, this.heartHandle, this);
    }

    private static heartHandle(e:egret.Event = null):void {
        
    }
}