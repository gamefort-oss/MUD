class Monster extends BaseRole {
		
	private _res: MonsterRes;	

	public constructor() {
		super();
	}

	public get res(): MonsterRes {
		return this._res;
	}
	
	public set res(value: MonsterRes) {
		this._res = value;
	}
	
}