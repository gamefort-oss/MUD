class ClientSocket {

	public webSocket:egret.WebSocket;

	public constructor() {

	}

    public initWebSocket(onSocketOpen:Function, thisObject:any):void
    {
        this.webSocket = new egret.WebSocket();
        this.webSocket.type = egret.WebSocket.TYPE_BINARY;//重要！！！！！！！！！！！！！
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        this.webSocket.addEventListener(egret.Event.CONNECT, onSocketOpen, thisObject);
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.webSocket.connect("192.168.7.125", 8900);
        console.log("start connect");		
    }

    private onSocketClose():void
    {

    }

	// private onSocketOpen():void {
    //     // console.log("连接成功");
    //     var ba:egret.ByteArray = new egret.ByteArray();
    //     ba.writeUTF("");//默认，服务器取用户IP
    //     GameInstance.clientSocket.sendMsg(JSONTYPE.GETMAP, ba);
    // }

    private onReceiveMessage(e:egret.ProgressEvent):void {  
        var date:Date = new Date();
        date.getHours()
        let dateStr:string =  date.getHours().toString ()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();

        let byte:egret.ByteArray = new egret.ByteArray();
        this.webSocket.readBytes(byte); 
        let msgNo:number = byte.readInt();
        // egret.log(dateStr + "<<<<<<<<<<<<<<" + msgNo);
        NetWorkManager.receiveMsg(msgNo, byte);
    }

    private onIOError(): void {
        console.log("连错错误");
    }

    private msgHead:egret.ByteArray
	public sendMsg(msgNo:number, ba:egret.ByteArray):void 
	{
        var date:Date = new Date();
        date.getHours()
        // let dateStr:string =  date.getHours().toString ()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();

        // egret.log(dateStr + ">>>>>>>>>>>>>>" + msgNo);
        this.msgHead=new egret.ByteArray();
        this.msgHead.writeShort(127);

        var sendBytes:egret.ByteArray=new egret.ByteArray();
        this.writeMsgHead(2+2+4+ba.length);//填写包头信息：头标识short+信息长度short+消息号int+正文长度dataArr.length
        sendBytes.writeBytes(this.msgHead);//填写包头
        sendBytes.writeInt(msgNo);//填写消息号
        sendBytes.writeBytes(ba);//填写消息内容
        sendBytes.position = 0;

        try {
            GameInstance.clientSocket.webSocket.writeBytes(sendBytes, 0, sendBytes.bytesAvailable);
		    GameInstance.clientSocket.webSocket.flush();
        } catch (error) {
            egret.log("!!!!!!!!" + error);
        }
	}

    private writeMsgHead(msgLength:number):void
	{
		this.msgHead.position=2;
		this.msgHead.writeShort(msgLength);
	}

    private hearted:boolean = false;
    private timer:egret.Timer;
    //to do   timer 经常启动失败
    private lefttime:number = 10;
    /**收到心跳包*/
    public onreciveheart():void
    {
        // if(this.timer==null){
        if(this.hearted==false){
            this.hearted = true;
            // this.timer =new egret.Timer(1000);
            // this.timer.addEventListener(egret.TimerEvent.TIMER,this.OnTimer,this);
            // this.timer.start();
            console.log("heart break timer start");  

            //  egret.Tween.get((new egret.Sprite),{ loop: true,onChange: this.OnTimer,onChangeObj: this });
           egret.setTimeout(this.OnTimer, this, 1000);
           
        }
        this.lefttime = 10;       
    }
    
    public OnTimer():void//evt:egret.TimerEvent
    {
        this.lefttime--;
        if(this.lefttime<0){
            console.log("心跳时间不足");
            this.lefttime =18;
            if(GameInstance.clientSocket != null){
                GameInstance.clientSocket.webSocket =null;
                GameInstance.clientSocket.initWebSocket(function(){
                    // PipeManager.sendMsg(PipeConstants.SHOW_MAINUI_GM_INSTRUCT, "#reconnect " + GameConfig.userID + " " + GameConfig.pwd);
                }, this);   
            }else{
                console.log("net inst is null?");
            }
        }
        egret.setTimeout(this.OnTimer, this, 1000);
    }
    
}

class JSONTYPE {		
	public static readonly GETMAP:number = 20001;//
	public static readonly GETLIST:number = 20003;//
    public static readonly SAVEMAP:number = 20005;//


    //特殊消息
    //666666心跳
    //555555gm命令


    //请求登录
    //10001-----UTF(用户名)，UTF（密码）
    //返回登录
    //10002-----byte(0成功1失败-账号密码错误2已存在)

    //请求人物数据
    //20007
    //初始化人物数据
    //20008
    //int 金币
    //int 粮食
    //int 药材
    //int 木材
    //int 金属
    //int 矿石

    //地图采集
    //20009
    //byte（资源类型1金币2粮食3药材4木材5金属6矿石）
    //int （当前人物该资源总量） 
    //返回采集数据
    //20010
    //byte（资源类型1金币2粮食3药材4木材5金属6矿石）
    //int （当前人物该资源总量） 
    //20012
    //byte 资源类型
    //int 具体值

}