class FightPanel extends eui.Component implements  eui.UIComponent {		

	private monsterContainer:egret.Sprite;

	private _cellSizeX:number = 100;
	private _cellSizeY:number = 70;
	private _grid:astar.Grid;
	private _player:Monster;
	private _index:number;
	private _path:Array<any>;

	public constructor() {
		super();		
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		this[partName] = instance;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.monsterContainer = new egret.Sprite();
		this.addChild(this.monsterContainer);
		this.addMonster();
	}

	public addMonster():void
	{
		this._grid = new astar.Grid(6,6);

		let arr = [ [1, 1, 0, 0, 0, 1],
					[0, 0, 0, 1, 0, 0],
					[0, 1, 0, 1, 0, 0],
					[1, 0, 0, 0, 0, 0],
					[0, 0, 0, 1, 0, 0],
					[1, 0, -1, 0, 0, 1] ]; 

		let i = 0;
		let j = 0;
		for (i = 0; i < arr.length; i++) 
		{
			for (j = 0; j < arr[i].length; j++) 
			{
				if(arr[i][j] == 1)
				{
					let monster:Monster = new Monster();
					monster.x = j * 100;
					monster.y = i * 70;
					this.monsterContainer.addChild(monster);
					monster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
					this._grid.setWalkable(j, i, false);
				}
				else if(arr[i][j] == -1)
				{
					this._player = new Monster();
					this._player.x = j * 100;
					this._player.y = i * 70;
					this._player.setName("慕容");
					this.addChild(this._player);
				}
			}
		}
	}

	private _targetMonster:Monster;
	private onTapHandler(event:egret.TouchEvent):void
	{
		if(this.isPathing) return;

		let m:Monster = event.currentTarget as Monster;
		this._targetMonster = m;
		let xpos = Math.floor(m.x / this._cellSizeX);
		let ypos = Math.floor(m.y  / this._cellSizeY);				
		
		let xposp = Math.floor(this._player.x / this._cellSizeX);
		let yposp = Math.floor(this._player.y / this._cellSizeY);
		this._grid.setStartNode(xposp, yposp);

		let aStar:astar.AStar = new astar.AStar();
		//获取点击点周围所有可行走点
		var aroundPath:Array<any> = new Array<any>();
		let i = 0;
		let j = 0;
		for (i = xpos - 1; i <= xpos + 1; i++) 
		{
			for (j = ypos - 1; j <= ypos + 1; j++) 
			{
				//寻路应该在6*6的范围内进行
				if(i < 0 || j < 0 || i > 5 || j > 5) continue;
				var node:astar.Node =this._grid.getNode(i, j);
				if(node && node.walkable)
				{
					this._grid.setEndNode(i, j);
					aStar.findPath(this._grid);
					this._path = aStar.path;
					aroundPath.push(this._path);
				}
			}
		}
		//路径从小到大排序
		aroundPath.sort(function (m, n) {
			if (m < n) return -1
			else if (m > n) return 1
			else return 0
		});
		
		this.startTime = egret.getTimer();
		if(aroundPath.length > 0) this.findPath(aroundPath);		
		console.log("耗时:", egret.getTimer() - this.startTime);
	}

	private startTime = 0;
	private isPathing:boolean;
	private findPath(_path:Array<any>):void
	{
			this.isPathing = true;
			this._index = 0;
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	
	private onEnterFrame(event:egret.Event):void
	{
		if(this.isPathing == true)
		{
			var targetX = this._path[this._index].x * this._cellSizeX;
			var targetY = this._path[this._index].y * this._cellSizeY;
			var dx = targetX - this._player.x;
			var dy = targetY - this._player.y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if(dist < 1)
			{
				this._index++;
				if(this._index >= this._path.length)
				{
					this.isPathing = false;
					this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
					this.beginFight();
				}
			}
			else
			{
				console.log("x >> " + dx + "*****" + "y >> " + dy);
				this._player.x += dx;
				this._player.y += dy;
			}
		}
		
	}	

	private beginFight():void
	{
		let timer:egret.Timer = new egret.Timer(2000);
		timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
		timer.start();	
	}

	private onTimerHandler(event:egret.TimerEvent):void
	{
		let p:egret.Point = new egret.Point(200 , 210);
		egret.Tween.get(this._player).to({x : (200 - 5), y : (210 - 5)}, 50, egret.Ease.backOut).wait(50).to({x : p.x, y : p.y}, 50, egret.Ease.backOut);
	}

	// private getAttackDirection(target:egret.DisplayObjectContainer, self:egret.DisplayObjectContainer):number
	// {
	// 	if(self.x == target.x && self.y < target.x)
	// 		return 0;
	// 	else if(self.x > target.x && self.y < target.x)
	// 		return 1;
	// 	else if(self.x > target.x && self.y == target.x)
	// 		return 2;
	// 	else if(self.x > target.x && self.y > target.x)
	// 		return 3;
	// 	else if(self.x == target.x && self.y < target.x)
	// 		return 4;
	// 	else if(self.x == target.x && self.y < target.x)
	// 		return 5;
	// 	else if(self.x == target.x && self.y < target.x)
	// 		return 6;
	// 		else if(self.x == target.x && self.y < target.x)
	// 		return 7;
	// 	return 0;
	// }
	
}