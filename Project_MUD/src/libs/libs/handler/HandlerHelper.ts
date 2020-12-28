class HandlerHelper {
	public constructor() {
		throw new Event("静态类");
	}

	/**
	 * 立即执行某函数
	 * 
	 */			
	public static execute($handler:Function, $parameters:Array<any>=null):any
	{
		if($handler==null)return null;
		return $handler.apply(null,$parameters);
	}

}