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

		// this.btnFIght.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
		this.monsterContainer = new egret.Sprite();
		this.addChild(this.monsterContainer);
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);

		this.addMonster();
	}

	// private onTapHandler(evt:egret.TouchEvent):void
	// {
	// 	switch(evt.target)
	// 	{
			
	// 	}
	// }


	public addMonster():void
	{
		this._grid = new astar.Grid(6,6);

		let arr = [ [0, 1, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0],
					[0, 1, 0, 1, 0, 0],
					[0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0],
					[0, 0, -1, 0, 0, 0] ]; 

		let i = 0;
		let j = 0;
		for (let i = 0; i < arr.length; i++) 
		{
			for (let j = 0; j < arr[i].length; j++) 
			{
				if(arr[i][j] == 1)
				{
					let monster:Monster = new Monster();
					monster.x = j * 100;
					monster.y = i * 70;
					this.monsterContainer.addChild(monster);
					monster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);

					this._grid.setWalkable(i, j, false);
				}
				else if(arr[i][j] == -1)
				{
					this._player = new Monster();
					this._player.x = j * 100;
					this._player.y = i * 70;
					this.addChild(this._player);
				}
			}
		}

		for(let i = 0; i < this._grid.numCols; i++)
		{
			for(let j = 0; j <this._grid.numRows; j++)
			{
				var node:astar.Node =this._grid.getNode(i, j);
			}
		}

	}

	/**
	 * Determines the color of a given node based on its state.
	 */
	private getColor(node:astar.Node)
	{
		if(!node.walkable) return 0;
		if(node == this._grid.startNode) return 0xcccccc;
		if(node == this._grid.endNode) return 0xcccccc;
		return 0xffffff;
	}

	/**
	 * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
	 */
	private onTapHandler(event:egret.TouchEvent):void
	{
		let m:Monster = event.currentTarget as Monster
		var xpos = Math.floor(m.x / this._cellSizeX);
		var ypos = Math.floor(m.y  / this._cellSizeY);
		this._grid.setEndNode(xpos, ypos);
		
		xpos = Math.floor(this._player.x / this._cellSizeX);
		ypos = Math.floor(this._player.y / this._cellSizeY);
		this._grid.setStartNode(xpos, ypos);
		
		// this.drawGrid();

		this.startTime = egret.getTimer();
		this.findPath();
		console.log("耗时:", egret.getTimer() - this.startTime);
	}

	private startTime = 0;
	
	/**
	 * Creates an instance of AStar and uses it to find a path.
	 */
	private findPath():void
	{
		var aStar:astar.AStar = new astar.AStar();
		if(aStar.findPath(this._grid))
		{
			this._path = aStar.path;
			this._index = 0;
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
	}
	
	/**
	 * Finds the next node on the path and eases to it.
	 */
	private onEnterFrame(event:egret.Event):void
	{
		var targetX = this._path[this._index].x * this._cellSizeX +  this._cellSizeX;
		var targetY = this._path[this._index].y * this._cellSizeY + this._cellSizeY;
		var dx = targetX - this._player.x;
		var dy = targetY - this._player.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		if(dist < 1)
		{
			this._index++;
			if(this._index >= this._path.length)
			{
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
		}
		else
		{
			this._player.x += dx;
			this._player.y += dy;
		}
	}
	
}