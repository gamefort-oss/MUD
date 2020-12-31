class FightPanel extends eui.Component implements  eui.UIComponent {		

	private monsterContainer:egret.Sprite;

	// private _cellSizeX:number = 100;
	// private _cellSizeY:number = 70;
	private _grid:astar.Grid;
	private _player:Monster;
	private _index:number;
	private _path:Array<any>;


	private _aStar:astar.AStar;

	private  arr:Array<Array<any>> = [ [1, 0, 1, 0, 0, 1],
					[0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0],
					[1, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0],
					[1, 0, 0, 0, 0, 1] ]; 

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
		this.monsterContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

		this._aStar = new astar.AStar();
		this._grid = new astar.Grid(6,6);
		this.init();
	}

	private init():void
	{
		let i = 0;
		let j = 0;
		for (i = 0; i < this.arr.length; i++) 
		{
			for (j = 0; j < this.arr[i].length; j++) 
			{
				if(this.arr[i][j] == 1)
				{
					let monsterRes:MonsterRes = new MonsterRes();
					monsterRes._x = j * 100;
					monsterRes._y = i * 70;
					monsterRes._state = 1;//活着

					let monster:Monster = new Monster();
					monster.res = monsterRes;
					monster.x = monsterRes._x;
					monster.y = monsterRes._y;
					this.monsterContainer.addChild(monster);
					// monster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
					this._grid.setWalkable(j, i, false);
				}
				else if(this.arr[i][j] == -1)
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

	private onClickHandler(e:egret.TouchEvent):void
	{
		this.monsterMove();
	}

	private monsterMove():void
	{
		let leng:number = this.monsterContainer.numChildren;
		let m:number = 0;
		for(m = 0; m < leng; m++)
		{
			let monster:Monster = this.monsterContainer.getChildAt(m) as Monster;
			if(monster.res._state == 1)
			{
				let xpos = Math.floor(monster.res._x / monster.res._cellSizeX);
				let ypos = Math.floor(monster.res._y  / monster.res._cellSizeY);
				// this._grid.setStartNode(xpos, ypos);

				let _attack_range:number = monster.res._attack_range;
				var aroundNode:Array<astar.Node> = new Array<astar.Node>();
				let node:astar.Node;
				let i = 0;
				let j = 0;
				for (i = xpos - _attack_range; i <= xpos + _attack_range; i++) 
				{
					for (j = ypos - _attack_range; j <= ypos + _attack_range; j++) 
					{
						//寻路应该在6*6的范围内进行
						if(i < 0 || j < 0 || i > 5 || j > 5) continue;
						node =this._grid.getNode(i, j);
						if(node && node.walkable)
						{
							aroundNode.push(node);
						}
						else if(!node.walkable)
						{
							
						}
					}
				}
				console.log(">>>>>>>>>>>>>>>>>>"+aroundNode.length);
				let _index:number = Math.floor(Math.random() * aroundNode.length);
				node = aroundNode[_index];
				this._grid.setWalkable(xpos, ypos, true);
				monster.res._x = node.x * monster.res._cellSizeX;
				monster.res._y = node.y * monster.res._cellSizeY;
				egret.setTimeout(function () {              
					egret.Tween.get(monster).to({x : monster.res._x, y : monster.res._y}, 250, egret.Ease.backOut);
				}, m, 200 * m);     
				this._grid.setWalkable(node.x, node.y, false);
				
			}
		}
	}	

	// private _targetMonster:Monster;
	// private onTapHandler(event:egret.TouchEvent):void
	// {
	// 	if(this.isPathing) return;

	// 	let m:Monster = event.currentTarget as Monster;
	// 	this._targetMonster = m;
	// 	// let xpos = Math.floor(m.x / this._cellSizeX);
	// 	// let ypos = Math.floor(m.y  / this._cellSizeY);		
	// 	let xpos = 2;
	// 	let ypos = 3;			
		
	// 	let xposp = Math.floor(this._player.x / this._cellSizeX);
	// 	let yposp = Math.floor(this._player.y / this._cellSizeY);
	// 	this._grid.setStartNode(xposp, yposp);

		
	// 	//获取点击点周围所有可行走点
	// 	var aroundPath:Array<any> = new Array<any>();
	// 	let i = 0;
	// 	let j = 0;
	// 	for (i = xpos - 1; i <= xpos + 1; i++) 
	// 	{
	// 		for (j = ypos - 1; j <= ypos + 1; j++) 
	// 		{
	// 			//寻路应该在6*6的范围内进行
	// 			if(i < 0 || j < 0 || i > 5 || j > 5) continue;
	// 			var node:astar.Node =this._grid.getNode(i, j);
	// 			if(node && node.walkable)
	// 			{
	// 				this._grid.setEndNode(i, j);
	// 				aStar.findPath(this._grid);
	// 				this._path = aStar.path;
	// 				aroundPath.push(this._path);
	// 			}
	// 		}
	// 	}
	// 	//路径从小到大排序
	// 	aroundPath.sort(function (m, n) {
	// 		if (m < n) return -1
	// 		else if (m > n) return 1
	// 		else return 0
	// 	});
		
	// 	this.startTime = egret.getTimer();
	// 	if(aroundPath.length > 0) this.findPath(aroundPath);		
	// 	console.log("耗时:", egret.getTimer() - this.startTime);
	// }

	private startTime = 0;
	private isPathing:boolean;
	private findPath(_path:Array<any>):void
	{
			this.isPathing = true;
			this._index = 0;
			// this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	
	public onEnterFrame(event:egret.Event = null):void
	{
		// if(this.isPathing == true)
		// {
		// 	var targetX = this._path[this._index].x * this._cellSizeX;
		// 	var targetY = this._path[this._index].y * this._cellSizeY;
		// 	var dx = targetX - this._player.x;
		// 	var dy = targetY - this._player.y;
		// 	var dist = Math.sqrt(dx * dx + dy * dy);
		// 	if(dist < 1)
		// 	{
		// 		this._index++;
		// 		if(this._index >= this._path.length)
		// 		{
		// 			this.isPathing = false;
		// 		}
		// 	}
		// 	else
		// 	{
		// 		console.log("x >> " + dx + "*****" + "y >> " + dy);
		// 		this._player.x += dx;
		// 		this._player.y += dy;
		// 	}
		// }		
	}	

	// private beginFight():void
	// {
	// 	let timer:egret.Timer = new egret.Timer(2000);
	// 	timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
	// 	timer.start();	
	// }

	// private onTimerHandler(event:egret.TimerEvent):void
	// {
	// 	let p:egret.Point = new egret.Point(200 , 210);
	// 	egret.Tween.get(this._player).to({x : (200 - 5), y : (210 - 5)}, 50, egret.Ease.backOut).wait(50).to({x : p.x, y : p.y}, 50, egret.Ease.backOut);
	// }
	
}