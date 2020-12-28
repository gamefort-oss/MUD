class FacadeManager{
    constructor(){

    }

    /**
     * 启动一个facade模块
     * @parm $facadeName 目标facade的完整包路径
     * @parm $data 参数
     *
     */
    public static startupFacade($facade:Function, $data:any=null) :void
    {
        let $facadeName = $facade["NAME"];// Z.N($facade);
        // ZLog.add("启动模块："+$facadeName);
        //调用一遍单例，保证目标facade一定存在
        var facade:puremvc.IFacade = FacadeManager.getFacade($facadeName, $facade);
        if(facade==null)
        {
            throw new Error("模块"+$facadeName+"不存在");
        }
        //发送启动消息
        PipeManager.sendMsg($facadeName, $data);
    }
    /**
     * 卸载一个facade模块
     * @parm $facadeName 目标facade的完整包路径
     *
     */
    public static killFacade($facade:Function) :void
    {
        let $facadeName:string = $facade["NAME"];//Z.N($facade);
        // ZLog.add("移除模块："+$facadeName);
        //调用一遍单例，保证目标facade一定存在
        var facade:puremvc.IFacade = FacadeManager.getFacade($facadeName, $facade);
        if(facade!=null)
        {
            // (facade as Object).dispose();
            facade = null;
        }
    }
    /**
     * 通用取Facade方法
     * 如果找不到，则通过$FacadeClass类创建，如果$FacadeClass==null, 则通过$key字符串反射创建，如果创建不成功，则则返回空
     * 区别于Facade.get.getInstance方法，Facade.get.getInstance在没有找到的情况下，将创建一个最基本的Facade ,而不是我们期望的
     * @parm $key
     * @parm $FacadeClass
     */
    public static getFacade( $key:string ,$FacadeClass:Function=null) :puremvc.IFacade
    {
        return TempFacade.getFacade($key, $FacadeClass);
    }
    /**
     * 是否存在指定的Facade
     * 此方法只判断有无，不反射创建
     * @parm $key
     */
    public static hasFacade( $key:string):boolean
    {
        return TempFacade.hasFacade($key);
    }
}

class TempFacade extends puremvc.Facade{

    public constructor($key:string){
        super($key);
    }

    public static getFacade( $key:string ,$FacadeClass:any=null) :puremvc.IFacade
	{        
		if ( this.instanceMap[ $key ] == null )
        {
            //TODO null部分待处理
            this.instanceMap[ $key ] = ($FacadeClass!=null)?new $FacadeClass($key):null;//($FacadeClass!=null)?new $FacadeClass($key):$FacadeClass($key).getInstance();//: RslLoaderManager.getInstance( $key, $key  );
        }
		return this.instanceMap[ $key ];
	}

	public static hasFacade( $key:string ) :boolean
	{
		return ( this.instanceMap[ $key ] != null );
	}

}