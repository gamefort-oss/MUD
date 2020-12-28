
class TScoket extends egret.WebSocket{


	/**服务器消息数组,格式[[消息号:number, 消息体:egret.ByteArray]*] */
	public static serverMsgArr:Array<any> = [];
	public host:string=null;
	public port:number=0;
	
	private static BUFFER_MAX_LENGTH:number=100000;//缓冲区最大长度
	private static MSG_HEAD_MARK:number=127;//与服务器约定的消息头
	
	private msgHead:egret.ByteArray=new egret.ByteArray();
	private bufferByteArray:egret.ByteArray = new egret.ByteArray();//接受数据的缓冲区

	public constructor($host:string=null, $port:number=0,$msgHeadMask:number=127) {
		super();

		//初始化信息头
		TScoket.MSG_HEAD_MARK = $msgHeadMask;
		this.msgHead.writeShort(TScoket.MSG_HEAD_MARK);
		
		this.addListeners();
		if(this.host!=null)
		{
			super();
			this.doConnect($host,$port);
		}
	}
	
	//对外方法
	//=====================================
	/**
	 * 连接服务器
	 */ 
	public doConnect($host:string, $port:number=0):void
	{
		this.host=$host;
		this.port=$port;
		this.connect(this.host, this.port);
	}
	/**
	 * 发送数据
	 * @param $msgCode	消息号
	 * @param $dataArr	消息体
	 */ 
	public doSend($msgCode:number,$dataArr:egret.ByteArray):void
	{
		$dataArr.position = 0;
		
		var sendBytes:egret.ByteArray=new egret.ByteArray();
		this.writeMsgHead(2+2+4+$dataArr.length);//填写包头信息：头标识short+信息长度short+消息号int+正文长度dataArr.length
		sendBytes.writeBytes(this.msgHead);//填写包头
		sendBytes.writeInt($msgCode);//填写消息号
		sendBytes.writeBytes($dataArr);//填写消息内容
		
		try
		{
			this.writeBytes(sendBytes);
			this.flush();
		}
		catch(error) {
			// ZLog.add(e.toString());
		}
		return;
	}
	//=====================================
	
	
	//======================================
	//填写包长
	private writeMsgHead(msgLength:number):void
	{
		this.msgHead.position=2;
		this.msgHead.writeShort(msgLength);
	}
	
	//事件配置
	private addListeners():void 
	{
		if(!this.hasEventListener(egret.Event.CLOSE)) {
			this.addEventListener(egret.Event.CLOSE, this.closeHandler, this);
			this.addEventListener(egret.Event.CONNECT, this.connectHandler, this);
			this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
			// this.addEventListener(egret.SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.socketDataHandler, this);
		}
	}
	//======================================
	
	
	//回调
	//======================================
	//关闭回调
	private closeHandler(e:egret.Event):void {
		// var evt:TSocketEvent = new TSocketEvent(TSocketEvent.CLOSE);
		// dispatchEvent(evt);
	}
	//连接回调
	private connectHandler(e:egret.Event):void {
		// var evt:TSocketEvent = new TSocketEvent(TSocketEvent.LOGIN_SUCCESS);
		// dispatchEvent(evt);
	}
	//io错误回调
	private ioErrorHandler(e:egret.IOErrorEvent):void {
		// var evt:TSocketEvent = new TSocketEvent(TSocketEvent.LOGIN_FAILURE);
		// dispatchEvent(evt);
	}
	//安全错误回调
	// private securityErrorHandler(e:SecurityErrorEvent):void {
	// 	var evt:TSocketEvent = new TSocketEvent(TSocketEvent.LOGIN_FAILURE);
	// 	dispatchEvent(evt);
	// }
	//======================================
	
	
	//接收数据 
	//======================================
	/**
	 * 接收服务器传来的数据
	 * 
	 */		
	private socketDataHandler(event:ProgressEvent):void {
		//将数据写入缓冲区
		this.readBytes(this.bufferByteArray, this.bufferByteArray.length);
		//清除掉读过的数据，防止bufferegret.ByteArray过长
		if(this.bufferByteArray.length > TScoket.BUFFER_MAX_LENGTH) {
			var tempBA:egret.ByteArray = new egret.ByteArray();
				//bufferegret.ByteArray 的 position 决定了 bytesAvailable 肯定是未读取的数据的长度  ---nick
			this.bufferByteArray.readBytes(tempBA, 0, this.bufferByteArray.bytesAvailable);
			this.bufferByteArray.position = 0;
			this.bufferByteArray.length = 0;
			tempBA.readBytes(this.bufferByteArray, 0, tempBA.bytesAvailable);
		}
		//读取缓冲区数据
		this.readSocketData();
	}
	/**
	 * 读取缓冲区数据
	 * 说明：
	 * 利用一个BA来不停的接收数据包，然后每次读的时候用while(bufferByteArray.bytesAvailable > 4)
	 * 来判断是否可以读取正常包，然后可以读头再读长度，再用长度进行判断是否可以取出完整包，如果不行，就
	 * 继续等下一次数据包过来，来依次循环的读取就可以了，不会出现断包文件尾错误了
	 */		
	private readSocketData():void {
		var bufferPosition:number;//记录当前缓冲区的指针
		var msgHeadMark:number;//取出消息头标识
		var msgLen:number;//得到该数据包的包体长度
		
		while(this.bufferByteArray.bytesAvailable>4) {//这里如果网速过慢，会不会等待超过15毫秒？？  不会的！
			bufferPosition = this.bufferByteArray.position
			msgHeadMark = this.bufferByteArray.readShort();
			if(msgHeadMark == TScoket.MSG_HEAD_MARK) {
				msgLen = this.bufferByteArray.readShort();
				if(msgLen-4 > this.bufferByteArray.bytesAvailable) {//长度不够，等待缓冲区下一次读取
					this.bufferByteArray.position = bufferPosition;//还原指针
					return;
				} else {
					var dataBuf:egret.ByteArray = new egret.ByteArray();
						//根据数据流中存储的包长度 减去文件头2和长度数据自身2,剩下的就是包的主体长度  ---nick
					this.bufferByteArray.readBytes(dataBuf, 0, msgLen - 4);
					
					var msgCode:number = dataBuf.readInt();
					//检查消息,如果是重要消息就直接执行了，否则才添加到队列中
					// if(NetWorkManager.checkImportantMsg(msgCode, dataBuf))
					// {
						//存入服务器消息数组
						// 此时的 dataBuf 中的 position 已经是4了, 传递到别的函数中, pos不变 ---nick
						TScoket.serverMsgArr.push([msgCode, dataBuf]);
					// }
				}
			}
			else
			{
				//头错误
			}
		}
	}
}