/*
* name;
*/
class UIEventsRegisterManager{
    constructor(){

    }

    /**
     * 注册UI
     * @param $msgCode
     * @param $callBack 接收数据回调
     * 
     */	
    public static registerUI ($dobj:any, $Class:string) : void
    {
        $dobj.on(egret.Event.ADDED, $dobj, function(e:Event):void
        {
            UIEventsRegisterManager.registerUIEvent($Class);
        });
        $dobj.on(egret.Event.REMOVED, $dobj, function(e:Event):void
        {
            UIEventsRegisterManager.removedUIEvent($Class);
        });

    }	
    
    //事件存储
    //=====================================================================================================================
    /**
     * UI添加事件存储器
     */		
    private static _uiRegisterDict:Object = new Object();
    private static _meRegisterDict:Object = new Object();
    /**
     * UI移除事件存储器
     */		
    private static _uiRemovedDict:Object = new Object();
    private static _meRemovedDict:Object = new Object();
    /**
     * 添加UI添加事件到管理器(只起到存储作用)
     * @param $msgCode
     * @param $callBack 接收数据回调
     * 
     */	
    public static addUIRegisterEvent ($msgCode:string, $callBack:Function, medtior:puremvc.Mediator) : void
    {
        if( this._uiRegisterDict[ $msgCode ] != null ) {
            this._uiRegisterDict[ $msgCode ].push( $callBack );            
        } else {
            this._uiRegisterDict[ $msgCode ] = [ $callBack ];	
        }
        
        this._meRegisterDict[ $msgCode + "me" ] = medtior;
    }
    /**
     * 添加UI移除事件到管理器(只起到存储作用)
     * @param $msgCode
     * @param $callBack 接收数据回调
     * 
     */	
    public static addUIRemovedEvent ($msgCode:string, $callBack:Function, medtior:puremvc.Mediator) : void
    {
        if( this._uiRemovedDict[ $msgCode ] != null ) {
            this._uiRemovedDict[ $msgCode ].push( $callBack );
        } else {
           this. _uiRemovedDict[ $msgCode ] = [ $callBack ];	
        }

         this._meRemovedDict[ $msgCode + "me" ] = medtior;
    }
    /**
     * 注册UI事件
     * @param $msgCode
     * 
     */	
    private static registerUIEvent ($msgCode:string) : void
    {
        var callBackArr:Array<Function> = this._uiRegisterDict[ $msgCode ] as Array<Function>;
        var me:puremvc.Mediator = this._meRegisterDict[ $msgCode + "me" ] as puremvc.Mediator;
        if(callBackArr!=null)
        {
            callBackArr.forEach(callBack => {
                callBack.apply(null, [me]);
            });
        }
    }
    /**
     * 注册UI事件
     * @param $msgCode
     * 
     */	
    private static removedUIEvent ($msgCode:string) : void
    {
        var callBackArr:Array<Function> = this._uiRemovedDict[ $msgCode ] as Array<Function>;
        var me:puremvc.Mediator = this._meRemovedDict[ $msgCode + "me" ] as puremvc.Mediator;
        if(callBackArr!=null)
        {
            callBackArr.forEach(callBack => {
                callBack(null, [me]);
            });
        }
    }
}