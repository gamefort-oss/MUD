// class TimerManager {

// 	private static _timerArr:Array<any> = [];

// 	public constructor() {
// 		throw Error("静态类");
// 	}

// 	//对外方法
// 		//=======================================================================================================
// 		/**
// 		 * 获取计时器的数量
// 		 * 
// 		 */			
// 		public static getTimersNum():number
// 		{
// 			return this._timerArr.length;
// 		}
// 		/**
// 		 * 创建一个一次性Timer 
// 		 * @param $delay 每次执行的延时 单位：毫秒
// 		 * @param $repeat 循环次数
// 		 * @param $timerHandler 回调
// 		 * @param $timerHandlerParameters 回调参数
// 		 * @param $timerCompleteHandler 完成回调
// 		 * @param $timerCompleteHandlerParameters 完成回调参数
// 		 * @param $autoStart 是否自动开始
// 		 * 
// 		 */			
// 		public static createOneOffTimer($delay:number, $repeat:number,$timerHandler:Function, $timerHandlerParameters:Array<any>=null,$timerCompleteHandler:Function=null, $timerCompleteHandlerParameters:Array<any>=null,$autoStart:Boolean=true):void {
// 			TimerHelper.createTimer($delay,$repeat,$timerHandler,$timerHandlerParameters,$timerCompleteHandler,$timerCompleteHandlerParameters,$autoStart);
// 			return;
// 		}
// 		/**
// 		 * 创建一个Timer （此方法会将返回的timerData自动存入数组）
// 		 * @param $delay 每次执行的延时  单位：毫秒
// 		 * @param $repeat 循环次数
// 		 * @param $timerHandler 回调
// 		 * @param $timerHandlerParameters 回调参数
// 		 * @param $timerCompleteHandler 完成回调
// 		 * @param $timerCompleteHandlerParameters 完成回调参数
// 		 * @param $autoStart 是否自动开始
// 		 * 
// 		 */			
// 		public static createTimer($delay:number, $repeat:number,$timerHandler:Function, $timerHandlerParameters:Array<any>=null,$timerCompleteHandler:Function=null, $timerCompleteHandlerParameters:Array<any>=null,$autoStart:Boolean=true):TimerData {
// 			var timerData:TimerData = TimerHelper.createTimer($delay,$repeat,$timerHandler,$timerHandlerParameters,$timerCompleteHandler,$timerCompleteHandlerParameters,$autoStart);
// 			this._timerArr[this._timerArr.length] = timerData;
// 			// ZLog.add("TimerManager.createTimer::_timerArr.length:"+getTimersNum());	
// 			return timerData;
// 		}
// 		/**
// 		 * 创建一个一次性ExactTimer 
// 		 * @param $duration 时长 单位：秒
// 		 * @param $from 开始的参数
// 		 * @param $to 结束的参数
// 		 * @param $onUpdate 回调函数
// 		 * @param $updateStep 回调步伐
// 		 * 
// 		 */		
// 		public static createOneOffExactTimer($duration:number, $from:number, $to:number, $onUpdate:Function=null, $onComplete:Function=null, $updateStep:number = 0):void {
// 			TimerHelper.createExactTimer($duration, $from, $to, $onUpdate, $onComplete, $updateStep);
// 			return;
// 		}
// 		/**
// 		 * 创建一个ExactTimer（此方法会将返回的timerData自动存入数组）
// 		 * @param $duration 时长 单位：秒
// 		 * @param $from 开始的参数
// 		 * @param $to 结束的参数
// 		 * @param $onUpdate 回调函数
// 		 * @param $updateStep 回调步伐
// 		 * 
// 		 */			
// 		public static createExactTimer($duration:number, $from:number, $to:number, $onUpdate:Function=null, $onComplete:Function=null, $updateStep:number = 0):TimerData {
// 			var timerData:TimerData = TimerHelper.createExactTimer($duration, $from, $to, $onUpdate,$onComplete, $updateStep);
// 			this._timerArr[this._timerArr.length] = timerData;
// 			// ZLog.add("TimerManager.createTimer::_timerArr.length:"+getTimersNum());	
// 			return timerData;
// 		}
// 		/**
// 		 * 删除一个Timer 
// 		 * 此函数只负责清除掉缓动动画, 但是不负责清除 timerData 的句柄, 需要调用者在执行此函数的后面 写上 timerData = null 来防止内存泄漏 			-NICK
// 		 * @param $timerData
// 		 * 
// 		 */			
// 		public static deleteTimer($timerData:TimerData):void {
// 			var timerData:TimerData;
// 			var len:number = this._timerArr.length;
// 			while(len-->0)
// 			{
// 				timerData = this._timerArr[len];
// 				if(timerData==$timerData)
// 				{
// 					//从数组中移除
// 					this._timerArr.splice(len,1);
// 					// ZLog.add("TimerManager.deleteTimer::_timerArr.length:"+getTimersNum());	
// 					//强制执行销毁
// 					(timerData.destroy)();
// 					break;
// 				}
// 			}
// 			//			var i:number;
// 			//			for(i=0; i<_timerArr.length; i++)
// 			//			{
// 			//				timerData = _timerArr[i];
// 			//				if(timerData==$timerData)
// 			//				{
// 			//					//从数组中移除
// 			//					_timerArr.splice(i,1);
// 			//					ZLog.add("TimerManager.deleteTimer::_timerArr.length:"+getTimersNum());	
// 			//					//强制执行销毁
// 			//					(timerData.destroy)();
// 			//					break;
// 			//				}
// 			//			}		
// 			return;
// 		}
// 		/**
// 		 * 删除所有Timer 
// 		 * @param delay
// 		 * @param callBack
// 		 * 
// 		 */			
// 		public static deleteAllTimers():void {
// 			var timerData:TimerData;


// 			this._timerArr.forEach(element => {
// 				(element.destroy)();
// 			});
// 			this._timerArr = [];
// 			// ZLog.add("TimerManager.deleteAllTimers::_timerArr.length:0");	
// 			return;
// 		}	
		
		
// 		//延时回调池
// 		//----------------------------------------------------------------------------------------------------------------
// 		/**
// 		 * 添加一个延时回调
// 		 * 注意： 如果是较长的delay，建议用createTimer或createOneOffTimer代替此方法
// 		 * @param $delay 时长 单位：毫秒
// 		 * @param $callBack 回调函数
// 		 * 
// 		 */	
// 		public static addDelayCallBack($delay:number, $callBack:Function):void {
// 			TimerHelper.addDelayCallBack($delay, $callBack);
// 			return;
// 		}
// 		/**
// 		 * 移除一个延时回调
// 		 * @param $callBack 回调函数
// 		 * 
// 		 */	
// 		public static removeDelayCallBack($callBack:Function):void {
// 			TimerHelper.removeDelayCallBack($callBack);
// 			return;
// 		}
// }