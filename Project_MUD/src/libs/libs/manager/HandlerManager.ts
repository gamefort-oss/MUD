class HandlerManager {

	//给一个默认的函数线程
	private static _defaultHandlerThread:HandlerThread = new HandlerThread(new Array(),true);	
	
	private static _handlerThreadArr:Array<any> = [HandlerManager._defaultHandlerThread];

	public constructor() {
		throw new Error("静态类");
	}


	/**
	 * 获取函数线程数量
	 * 
	 */			
	public static getHandlerThreadsNum():number
	{
		return this._handlerThreadArr.length;
	}
	/**
	 * 获取等待执行的函数数量
	 * 
	 */			
	public static getHandlersNum():number
	{
		var num:number = 0;

		this._handlerThreadArr.forEach(element => {
			num += element.getHandlersNum();
		});

		return num;
	}
	/**
	 * 创建一个新的函数线程
	 * @param $handlerArr	数据类型：handlerData数组
	 * @param $isQueue	是否是以队列queue形式（先进先出）执行（否则以栈stack的形式执行）
	 */	
	public static creatNewHandlerThread($handlerArr:Array<any>=null,$isQueue:boolean=true):HandlerThread
	{
		var ht:HandlerThread = this._handlerThreadArr[this._handlerThreadArr.length] = new HandlerThread($handlerArr,$isQueue);
		try{ //注意这个try catch 因为ZLog中有个静态变量需要调用creatNewHandlerThread方法，所以在ZLog.add被调用前需要执行此creatNewHandlerThread方法
			// ZLog.add("HandlerManager.creatNewHandlerThread::_handlerThreadArr.length:"+getHandlerThreadsNum());	
		}catch(e){}
		return ht;
	}
	/**
	 * 添加函数到执行队列(执行完一个执行另一个，可设置每个函数的延时延时)（强烈建议保持传进的每个函数唯一,如果不唯一请嵌套一层函数使之唯一,否则在调用移除函数时可能会出现移除不掉的情况，该情况出现在：函数已在等待加载数组中移除，但依旧等待在timer中）
	 * 此方法返回线程，并不返回执行函数值
	 * 注意：当$handlerThread传入为null时，自动取_defaultHandlerThread
	 */			
	public static push($handler:Function, $parameters:Array<any>=null,$delay:number=0,$doNext:boolean=true,$autoStart:boolean=true,$priority:boolean=false,$handlerThread:HandlerThread=null):HandlerThread
	{
		//如果线程不存在，则将线程添加进数组
		var handlerThread:HandlerThread;
		if($handlerThread!=null)
		{
			handlerThread = $handlerThread;
			if(!this.hasHandlerThread(handlerThread))
			{
				this._handlerThreadArr.push(handlerThread);
				// ZLog.add("HandlerManager.push::_handlerThreadArr.length:"+getHandlerThreadsNum());						
			}
		}
		else
		{
			handlerThread = this._defaultHandlerThread
		}
		//添加进线程队列
		handlerThread.push($handler,$parameters,$delay,$doNext,$autoStart,$priority);
		return handlerThread;
	}
	/**
	 * 将函数立即执行（不可设置延时）
	 * 此方法可以获取函数返回值
	 */			
	public static execute($handler:Function, $parameters:Array<any>=null):any
	{
		return HandlerHelper.execute($handler,$parameters);
	}
	
	/**
	 * 获取默认线程
	 */			
	public static getDefaultHandlerThread():HandlerThread
	{
		return this._defaultHandlerThread;
	}
	
	
	/**
	 * 清除所有线程
	 * 并取消所有未执行函数的执行
	 */			
	public static removeAllHandlerThreads():void
	{
		this.removeAllHandlers();
		this._handlerThreadArr = [];
		// ZLog.add("HandlerManager.removeAllHandlerThreads::_handlerThreadArr.length:0");	
		return;
	}		
	/**
	 * 取消所有未执行函数的执行(慎用：将移除与此参数给定的函数有关的所有HandlerData)
	 * 不清除线程
	 * 
	 */			
	public static removeAllHandlers():void
	{
		this._handlerThreadArr.forEach(element => {
			element.removeAllHandlers();
		});
		return;
	}
	/**
	 * 清除某个线程
	 * 并取消所有未执行函数的执行
	 */			
	public static removeHandlerThread($handlerThread:HandlerThread):void
	{
		if(!$handlerThread)return;

		for(var i:number = 0; i < this._handlerThreadArr.length; i ++)
		{
			if(this._handlerThreadArr[i]==$handlerThread)
			{
				//清除该线程中的所有函数
				this._handlerThreadArr[i].removeAllHandlers();
				//移除该线程
				this._handlerThreadArr.splice(this._handlerThreadArr.indexOf(this._handlerThreadArr[i]), 1);
				// ZLog.add("HandlerManager.removeHandlerThread::_handlerThreadArr.length:"+getHandlerThreadsNum());	
				break;
			}
		}

		// this._handlerThreadArr.forEach(element => {
		// 	if(element==$handlerThread)
		// 	{
		// 		//清除该线程中的所有函数
		// 		element.removeAllHandlers();
		// 		//移除该线程
		// 		this._handlerThreadArr.splice(this._handlerThreadArr.indexOf(element),1);
		// 		// ZLog.add("HandlerManager.removeHandlerThread::_handlerThreadArr.length:"+getHandlerThreadsNum());	
		// 		break;
		// 	}
		// });
		return;
	}
	/**
	 * 取消某个未执行函数的执行(慎用：将移除与此参数给定的函数有关的所有HandlerData)
	 * 将在所有线程中查找该函数，找到即清除
	 * 
	 */			
	public static removeHandler($handler:Function):void
	{
		if($handler==null)return;

		this._handlerThreadArr.forEach(element => {
			element.removeHandler($handler);
		});
		return;
	}			
	/**
	 * 是否存在指定的等待执行的函数
	 * 
	 */			
	public static hasHandlerThread($handlerThread:HandlerThread):Boolean
	{
		return this._handlerThreadArr.indexOf($handlerThread)!=-1;
	}		
	/**
	 * 是否存在指定的等待执行的函数
	 * 
	 */			
	public static hasHandler($handler:Function):Boolean
	{
		this._handlerThreadArr.forEach(element => {
			if(element.hasHandler($handler))
			{
				return true;
			}
		});
		return false;
	}

}