/*
* gkf;
*/
class HandlerThread{

    /**原始等待执行函数数组(HandlerData数组)*/
    private _handlerDataArr:Array<any>;
    /**进Timer的等待执行函数数组(HandlerData数组)(从_handlerDataArr中移除后，添加到time中等待执行但还未被执行时)*/
    private _handlerDataReadyArr:Array<any>;

    private _isRunning:boolean ;//是否正在运行

    private _canRun:boolean ;//强制开始或停止

    private _isQueue:boolean ;//是否是以队列queue形式（先进先出）执行（否则以栈stack的形式执行）

    private _next:HandlerData;

    constructor($handlerArr:Array<any>=null,$isQueue:boolean=true){
        this._handlerDataArr = $handlerArr || [];
        this._handlerDataReadyArr = [];
        this._isQueue = $isQueue;
        this._isRunning = false;
        this._canRun = true;
        this._next = null;
    }

    /**
     * 线程是否正在运行
     */
    public get isRunning():boolean
    {
        return this._isRunning;
    }
    /**
     * 获取等待执行的函数数量(只返回_handlerDataArr内的，不返回字典内的)
     */
    public getHandlersNum():number
    {
        return this._handlerDataArr.length;
    }

    /**
     * 添加函数到执行队列(执行完一个执行另一个，可设置每个函数的延时延时)（强烈建议保持传进的每个函数唯一,如果不唯一请嵌套一层函数使之唯一,否则在调用移除函数时可能会出现移除不掉的情况，该情况出现在：函数已在等待加载数组中移除，但依旧等待在timer中）
     * 此方法不能获取函数返回值，但可返回一个HandlerData对象
     * @param $handler 函数
     * @param $parameters 参数数组
     * @param $delay 延时（单位：毫秒）
     * @param $doNext 执行完毕是否自动执行下一个
     * @param $autoStart 是否自动开始]
     * @param $priority 是否优先执行
     */
    public push($handler:Function, $parameters:Array<any>=null,$delay:number=0,$doNext:boolean=true,$autoStart:boolean=true,$priority:boolean=false):HandlerData
    {
        //添加进数组
        var handlerData:HandlerData = new HandlerData($handler,$parameters,$delay,$doNext);
        if($priority)
        {
            this._handlerDataArr.unshift(handlerData);
        }
        else
        {
            this._handlerDataArr.push(handlerData);
        }
        //如果处在休息状态，则执行下一个命令
        if(this._canRun && $autoStart && !this._isRunning)
        {
            this.executeNext();
        }
        return handlerData;
    }

    /**
     * 取消所有未执行函数的执行(慎用：将移除与此参数给定的函数有关的所有HandlerData)
     */
    public removeAllHandlers():void
    {
        //清空_handlerDataArr
        this._handlerDataArr.length=0;
        //清空_handlerDataReadyArr
        this._handlerDataReadyArr.length=0;
        //改变标志位
        this._isRunning = false;
        return;
    }

    /**
     * 取消某个未执行函数的执行(慎用：将移除与此参数给定的函数有关的所有HandlerData)
     * @param $handler
     */
    public removeHandler($handler:Function):void
    {
        if($handler==null)return;
        //从_handlerDataArr中移除
        var hData:HandlerData;
        var len:number = this._handlerDataArr.length;
        while(len-->0)
        {
            hData = this._handlerDataArr[len];
            if(hData.handler==$handler)
            {
                this._handlerDataArr.splice(len,1);
                //break;//这里不用break??????111111111111
            }
        }
        //从_handlerDataReadyArr中移除
        len = this._handlerDataReadyArr.length;
        while(len-->0)
        {
            hData = this._handlerDataReadyArr[len];
            if(hData.handler==$handler)
            {
                this._handlerDataReadyArr.splice(len,1);
                //break;//这里不用break??????111111111111
            }
        }
        //改变标志位
        if(this._handlerDataArr.length==0 && this._handlerDataReadyArr.length==0)
        {
            this._isRunning = false;
        }
        return;
    }

    /**
     * 是否存在指定的等待执行的函数
     * @param $handler
     */
    public hasHandler($handler:Function):boolean
    {
        this._handlerDataArr.forEach(hData => {
            if(hData.handler==$handler)
            {
                return true;
            }
        });
        this._handlerDataReadyArr.forEach(hData => {
            if(hData.handler==$handler)
            {
                return true;
            }
        });
        return false;
    }
    /**
     * 开始执行
     */
    public start():void
    {
        this._canRun = true;
        if(!this._isRunning)
        {
            this.executeNext();
        }
        return;
    }
    /**
     * 停止执行
     */
    public stop():void
    {
       this._canRun = false;
        return;
    }
    /**
     * 设置运行状态为未运行
     */
    private setNotRunning():void
    {
        this._isRunning = false;
        return;
    }
    //=======================================================================================================

    //对内方法
    //=======================================================================================================
    /**
     * @private
     * 执行下一条命令
     *
     */
    private executeNext():void
    {
        //是否允许运行
        if(!this._canRun)
        {
            this._isRunning = false;
            return;
        }

        //判断是否到达尾部
        if(this._handlerDataArr.length==0)
        {
            this._isRunning = false;
            return;
        }

        //改变状态标识
        this._isRunning = true;

        //获取最下一个等待执行的事件
        this._next = (this._isQueue ? this._handlerDataArr.shift() : this._handlerDataArr.pop()) as HandlerData;

        //执行
        //如果下一个存在
        if(this._next)
        {
            let newHandler = ()=>{
                //从等待字典移除，同时验证存在性
                if(this.removeReadyHD(this._next))
                {
                    //执行函数
                    this._next.handler.apply(null, this._next.parameters);
                }
                //如果需要执行下一个则执行下一个
                this._next.doNext?this.executeNext():this.setNotRunning();
            }
            //如果是延时函数，则执行延时处理
            if(this._next.delay>0)
            {
                //添加进等待执行字典
                this.addReadyHD(this._next);
                // Laya.timer.once(this._next.delay, this, newHandler);
                //todo
                egret.setTimeout(newHandler, this, this._next.delay);
            }
                //否则直接运行
            else
            {
                this._next.handler.apply(null, this._next.parameters);
                //如果需要执行下一个则执行下一个
                this._next.doNext?this.executeNext():this.setNotRunning();
            }
        }
            //否则直接运行下一个
        else
        {
            this.executeNext();
        }
        return;
    }
    /**
     * @private
     * 向_handlerDataReadyArr中添加
     *  @parm $hd
     */
    private addReadyHD($hd:HandlerData):void
    {
        if(this._handlerDataReadyArr.indexOf($hd)!=-1)return;
        this._handlerDataReadyArr.push($hd);
    }
    /**
     * @private
     * 从_handlerDataReadyArr中移除
     *  @parm $fun 执行函数
     *  @return 移除成功返回true, 移除失败或不存在返回false
     */
    private removeReadyHD($hd:HandlerData):boolean
    {
        var index:number = this._handlerDataReadyArr.indexOf($hd);
        if(index!=-1)
        {
            //从数组中移除
            this._handlerDataReadyArr.splice(index,1);
            return true;
        }
        return false;
    }

}