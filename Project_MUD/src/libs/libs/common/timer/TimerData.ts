class TimerData {
	
	private _timer:egret.Timer;
	private _destroy:Function;

	public constructor($timer:egret.Timer, $destroy:Function) {
		this._timer = $timer;
		this._destroy = $destroy;
	}

	public get timer():egret.Timer
	{
		return this._timer;
	}
	public get destroy():Function
	{
		return this._destroy;
	}
}