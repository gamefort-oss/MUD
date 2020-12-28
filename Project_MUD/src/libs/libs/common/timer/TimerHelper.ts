// class TimerHelper {

// 	/**用于计时的Sprite*/
// 	private static timeSprite:egret.Sprite = new egret.Sprite();
	
// 	/**延时回调池*/
// 	private static delayCallBackList:Array<any> = new Array();

// 	public constructor() {
// 		throw new Error("静态类");
// 	}

// 	/**
// 	 * 创建一个Timer 
// 	 * 说明：此方法优先保证次数，时间不够准确			用new Timer 来实现
// 	 * @param $delay 每次执行的延时
// 	 * @param $repeat 循环次数
// 	 * @param $timerHandler 回调
// 	 * @param $timerHandlerParameters 回调参数
// 	 * @param $timerCompleteHandler 完成回调
// 	 * @param $timerCompleteHandlerParameters 完成回调参数
// 	 * @param $autoStart 是否自动开始
// 	 * 
// 	 */		
// 	public static createTimer($delay:number, $repeat:number,$timerHandler:Function, $timerHandlerParameters:Array<any>=null,$timerCompleteHandler:Function=null, $timerCompleteHandlerParameters:Array<any>=null,$autoStart:Boolean=true):TimerData {
// 		var timer:egret.Timer = new egret.Timer($delay,$repeat);
// 		if($timerHandler!=null)
// 			timer.addEventListener(egret.TimerEvent.TIMER, timerHandler, this);
// 		if($timerCompleteHandler!=null)
// 			timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerCompleteHandler, this);
// 		if($autoStart)
// 			timer.start();
// 		function timerHandler(e:egret.TimerEvent):void
// 		{
// 			//执行回调函数
// 			HandlerManager.execute($timerHandler,$timerHandlerParameters);
// 			return;
// 		}
// 		function timerCompleteHandler(e:egret.TimerEvent):void
// 		{
// 			destroy();

// 			//执行结束回调函数
// 			HandlerManager.execute($timerCompleteHandler,$timerCompleteHandlerParameters);
// 			return;
// 		}
// 		function destroy():void
// 		{
// 			if(timer)
// 			{
// 				timer.stop();
// 				timer.removeEventListener(egret.TimerEvent.TIMER, timerHandler, this);
// 				timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, timerCompleteHandler, this);
// 				timer = null;
// 			}
// 			return;
// 		}
// 		return new TimerData(timer,destroy);
// 	}
// 	/**
// 	 * 创建一个准确的Timer 
// 	 * 说明：此方法优先保证时间，其次保证次数（都很准确） 用 TweenLite.to 来实现
// 	 * @param $duration 时长 单位：秒
// 	 * @param $from 开始的参数
// 	 * @param $to 结束的参数
// 	 * @param $onUpdate 回调函数
// 	 * @param $updateStep 回调步伐
// 	 * 
// 	 */		
// 	public static createExactTimer($duration:number, $from:number, $to:number, $onUpdate:Function=null, $onComplete:Function=null, $updateStep:number = 0):TimerData {
		
// 		var obj:Object = {i:$from};
// 		var onUpdate:Function = ($updateStep!=0) ? onUpdate1 : onUpdate2;
// 		egret.Tween.get(obj,{ onChange:onUpdate, onChangeObj:this }).
// 		TweenLite.to(obj, $duration, {i:$to, onUpdate:onUpdate, onComplete:onComplete});

// 		var i:number = $from;
// 		var absUpdateStep:number = Math.abs($updateStep);
		
// 		//用户设置过回调步伐的话, 会使用该步伐作为回调频率,否则会使用 TweenLite.to 的回调频率来调用
// 		function onUpdate1():void
// 		{
// 			if(Math.abs(obj.i-i) >= absUpdateStep)
// 			{
// 				i = obj.i;
// 				if($onUpdate!=null)
// 				{
// 					$onUpdate(obj.i);
// 				}
// 			}
// 		}
// 		//没有单独设置过步伐的话  会遵循 TweenLite的回调频率
// 		function onUpdate2():void
// 		{
// 			if($onUpdate!=null)
// 			{
// 				$onUpdate(obj.i);
// 			}
// 		}
// 		function onComplete():void
// 		{
// 			if($onUpdate!=null)
// 			{
// 				$onUpdate(obj.i);
// 			}
// 			if($onComplete!=null)
// 			{
// 				$onComplete();
// 			}
// 		}
// 		function destroy():void
// 		{
// 			TweenLite.killTweensOf(obj);
// 			return;
// 		}
// 		return new TimerData(null,destroy);
// 	}
	
// 	//延时回调池
// 	//----------------------------------------------------------------------------------------------------------------
// 	/**
// 	 * 添加一个延时回调
// 	 * 注意： 如果是较长的delay，建议用createTimer代替此方法
// 	 * @param $delay 时长 单位：毫秒
// 	 * @param $callBack 回调函数
// 	 * 
// 	 */	
// 	public static addDelayCallBack($delay:number, $callBack:Function):void {
// 		//如果延时小于等于0则直接执行回调
// 		if($delay<=0)
// 		{
// 			$callBack();
// 			return;
// 		}
		
// 		//添加进数组和字典
// 		var delayData:Array<any> = [$delay, $callBack, egret.getTimer()];
// 		this.delayCallBackList.unshift(delayData);//添加进数组(注意是插在最前面！！！！！)
// 		this.delayCallBackList[$callBack] = delayData;//记录在哈希map内
		
// 		//保证计时器监听存在
// 		if(this.delayCallBackList.length==1)
// 		{
// 			this.timeSprite.addEventListener(egret.Event.ENTER_FRAME, this.updateDelayCallBack, this);
// 		}
// 		return;
// 	}
// 	/**
// 	 * 移除一个延时回调
// 	 * @param $callBack 回调函数
// 	 * 
// 	 */	
// 	public static removeDelayCallBack($callBack:Function):void {
// 		//从数组和字典中移除
// 		var delayData:Array<any> =  this.delayCallBackList[$callBack];
// 		if(delayData!=null)
// 		{
// 			//从字典中移除
// 			this.delayCallBackList[$callBack] = null;
// 			delete this.delayCallBackList[$callBack];
// 			//从数组中移除
// 			var index:number = this.delayCallBackList.indexOf(delayData);
// 			if(index!=-1)
// 			{
// 				this.delayCallBackList.splice(index,1);
// 			}
// 		}
		
// 		//保证计时器被移除
// 		if(this.delayCallBackList.length==0)
// 		{
// 			this.timeSprite.removeEventListener(egret.Event.ENTER_FRAME, this.updateDelayCallBack, this);
// 		}
// 		return;
// 	}
// 	/**
// 	 * 延时回调周期更新
// 	 * 
// 	 */	
// 	private static updateDelayCallBack(e:Event):void {
// 		//取得现在的时间
// 		var nowTime:number = egret.getTimer();
		
// 		//遍历检测
// 		var len:number = this.delayCallBackList.length;
// 		for(var i:number=len-1; i>=0; i--)//保证先添加的被先检测,并且内部可执行callBack操作
// 		{
// 			var delayData:Array<any> = this.delayCallBackList[i];
// 			var delay:number = delayData[0];
// 			var callBack:Function = delayData[1];
// 			var addTime:number = delayData[2];
			
// 			//如果已打到延时
// 			if(nowTime-addTime>=delay)
// 			{
// 				//从字典中移除
// 				this.delayCallBackList[callBack] = null;
// 				delete this.delayCallBackList[callBack];
// 				//从数组中移除
// 				this.delayCallBackList.splice(i,1);
				
// 				//保证计时器被移除（注意这个不能放在最后）
// 				if(this.delayCallBackList.length==0)
// 				{
// 					this.timeSprite.removeEventListener(egret.Event.ENTER_FRAME, this.updateDelayCallBack, this);
// 				}
				
// 				//执行回调
// 				callBack();
// 			}
// 		}
		
// 		return;
// 	}

// }