class BaseRes{	

	public _id:number = 0;
	public _name:string = "";	
}

class BaseAliveRes extends BaseRes{	
	public _x:number = 0;
	public _y:number = 0;	
	public _level:number = 0;	
	public _max_HP:number = 0;
	public _max_MP:number = 0;
	public _attack_range:number = 1;
	public _cellSizeX:number = 100;
	public _cellSizeY:number = 70;
	/** 
	 * 0 未显示
	 * 1 活着
	 * 2 死亡
	 */
	public _state:number = 0;
	
}

