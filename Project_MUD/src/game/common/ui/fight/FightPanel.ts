class FightPanel extends eui.Component implements  eui.UIComponent {		

	private monsterContainer:egret.Sprite;

	private _grid:astar.Grid;
	private _player:Player;
	private _index:number;
	private _path:Array<any>;


	private _aStar:astar.AStar;

	private  arr:Array<Array<number>> = [ 	[1, 0, 0, 0, 0, 0],
											[0, 1, 0, 0, 0, 0],
											[0, 0, 0, 1, 1, 0],
											[0, 0, 2, 0, 0, 0],
											[0, 0, 0, 0, 1, 0],
											[0, 0, 0, 0, 0, 1] 	]; 

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
		//将怪物排列为纵向
		let path:Array<Array<number>> = [];
		for (i = 0; i < 6; i++) 
		{
			path[i] = [];
			for (j = 0; j < 6; j++) 
			{
				path[i][j] = this.arr[j][i];
			}
		}

		for (i = 0; i < path.length; i++) 
		{
			for (j = 0; j < path[i].length; j++) 
			{
				if(path[i][j] == 1)
				{
					let monsterRes:MonsterRes = new MonsterRes();
					let monster:Monster = new Monster();
					monster.res = monsterRes;
					monster.x = monster._x = i * 100;
					monster.y = monster._y = j * 70;
					monster._state = 1;//活着
					this.monsterContainer.addChild(monster);
					// monster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
					this._grid.setWalkable(i, j, false, 1);
				}
				else if(path[i][j] == 2)
				{
					let playerRes:PlayerRes = new PlayerRes();
					this._player = new Player();					
					this._player.res = playerRes;
					this._player.x = this._player._x = i * 100;
					this._player.y = this._player._y = j * 70;
					this._player._state = 1;//活着
					this._player.setName("慕容");
					this.addChild(this._player);
					this._grid.setWalkable(i, j, false, 2);
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
		let aroundNode:Array<astar.Node>;
		let leng:number = this.monsterContainer.numChildren;
		let m:number = 0;
		for(m = 0; m < leng; m++)
		{
			let monster:Monster = this.monsterContainer.getChildAt(m) as Monster;
			if(monster._state == 1)
			{
				//获取当前怪所处区域坐标
				let xpos = Math.floor(monster._x / monster.res._cellSizeX);
				let ypos = Math.floor(monster._y  / monster.res._cellSizeY);
				//可行走点数组
				aroundNode = new Array<astar.Node>();
				let node:astar.Node;
				let _field_range:number = monster.res._field_range;
				let i:number = 0;
				let j:number = 0;
				for (i = xpos - _field_range; i <= xpos + _field_range; i++) 
				{
					for (j = ypos - _field_range; j <= ypos + _field_range; j++) 
					{
						//寻路应该在6*6的范围内进行
						if(i < 0 || j < 0 || i > 5 || j > 5) continue;
						//获取当前怪周围Node
						node =this._grid.getNode(i, j);						
						//如果不可行走						
						if(!node.walkable)
						{							
							//如果是2玩家导致不可行走
							if(node.type == 2)
							{
								// let _attack_range:number = monster.res._attack_range;
								// //如果超出攻击范围
								// if(Math.abs(i - xpos) >= _attack_range || Math.abs(j - ypos) >= _attack_range)
								// {
									
								// }
								// //进入战斗状态，攻击玩家
								// else
								// {
									monster._state = 3;
								// }							
							}
						}	
						//如果可行走添加进数组aroundNode				
						else if(node && node.walkable)
						{
							//寻路不走斜线
							if(xpos != node.x && ypos != node.y) continue;
							aroundNode.push(node);
						}					
					}
				}
				//如果怪状态为战斗3，不能移动
				if(monster._state == 3 ) continue;
				//确认有可以行走的点
				if(aroundNode.length > 0)
				{
					//随机获取一个可行走的点
					let _index:number = Math.floor(Math.random() * aroundNode.length);
					node = aroundNode[_index];
					//移动前将当前点设置可行走
					this._grid.setWalkable(xpos, ypos, true, 0);
					monster._x = node.x * monster.res._cellSizeX;
					monster._y = node.y * monster.res._cellSizeY;
					egret.setTimeout(function () {              
						egret.Tween.get(monster).to({x : monster._x, y : monster._y}, 1000, egret.Ease.backOut);
					}, m, 500 * m);  
					//移动后将目的点设置不可行走   
					this._grid.setWalkable(node.x, node.y, false, 1);
				}				
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