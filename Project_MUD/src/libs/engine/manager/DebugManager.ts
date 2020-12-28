class DebugManager {
	public constructor() {

	}

	public static sendClientInstruct(instruct:string):void
	{
		switch(instruct)
		{
			// case "#active ed 1":
			// 	GameInstance.uIInstance.mapEditpr.visible = true;
			// 	break;
			// case "#active ed 0":
			// 	GameInstance.uIInstance.mapEditpr.visible = false;
			// 	break;
			// case "#555555":
			// 	PipeManager.sendMsg(PipeConstants.SHOW_MAINUI_GM_INSTRUCT, instruct.substr(1));
			// 	break;
			// default:
			// 	//命令说明：
			// 	//断线重连            #reconnect 用户名 密码
			// 	//读指定名称地图：     #map zd1
			// 	//心跳关：            #heart 0
			// 	//心跳开：            #heart 1
			// 	//金币：              #jb 99999
			// 	//粮食：              #ls 99999
			// 	//药材：              #yc 99999
			// 	//木材：              #mc 99999
			// 	//金属：              #js 99999
			// 	//矿石：              #ks 99999
				
			// 	PipeManager.sendMsg(PipeConstants.SHOW_MAINUI_GM_INSTRUCT, instruct.substr(1));
			// 	break;
		}
	}
	
}