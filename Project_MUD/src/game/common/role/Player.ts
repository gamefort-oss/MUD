class Player extends BaseRole {	

	private _res: PlayerRes;	

	public constructor() {
		super();
	}

	public get res(): PlayerRes {
		return this._res;
	}
	
	public set res(value: PlayerRes) {
		this._res = value;
	}
	
}