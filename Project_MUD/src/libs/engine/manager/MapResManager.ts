class MapResManager {
	public constructor() {

	}

	public static mapRes:Array<Array<any>> = new Array();
	public static modified:boolean = false;
	
	public static setMapRes(arr:any):void
	{
		this.mapRes = arr;
	}

	public static mapBaseRes:Object = new Object(); 
	public static setMapBaseRes(data:any):void
	{
		this.mapBaseRes = JSON.parse(data);
	}

	/**获取所有地基基本属性 */
	public static getMapBaseRes(data:any):Object
	{
		return this.mapBaseRes;
	}

	// /**根据地基类型获取地基基本属性 */
	// public static getMapGridBaseRes(data:any):MapGridBaseRes
	// {
	// 	let d:any = this.mapBaseRes[data];
	// 	let base:MapGridBaseRes = new MapGridBaseRes();
	// 	base.id = d["id"];
	// 	base.link_id = d["link_id"];
	// 	base.max_jinbi = d["max_jinbi"];
	// 	base.min_liangshi = d["min_liangshi"];
	// 	base.hurt = d["hurt"];
	// 	base.type = d["type"];
	// 	base.min_yaocai = d["min_yaocai"];
	// 	base.min_mucai = d["min_mucai"];
	// 	base.min_jinshu = d["min_jinshu"];
	// 	base.move_tili = d["move_tili"];
	// 	base.max_kuangshi = d["max_kuangshi"];
	// 	base.base_id = d["base_id"];
	// 	base.min_kuangshi = d["min_kuangshi"];
	// 	base.name = d["name"];
	// 	base.max_liangshi = d["max_liangshi"];
	// 	base.max_yaocai = d["max_yaocai"];
	// 	base.max_mucai = d["max_mucai"];
	// 	base.max_jinshu = d["max_jinshu"];
	// 	base.caiji_tili = d["caiji_tili"];
	// 	base.min_jinbi = d["min_jinbi"];
	// 	return base;
	// }

}