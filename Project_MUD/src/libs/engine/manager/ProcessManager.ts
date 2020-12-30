/*
* gkf;
*/
class ProcessManager {
    public static clientStart():void
    {
        LogManager.LogError("ProcessManager:正在启动Start_ApplicationFacade");
        // FacadeManager.startupFacade(Login_ApplicationFacade);
    }

    /**
     * 客户端准备就绪
     */
    public static clientReady(): void {

        function sendMsg($i:number, $msg:string):void
        {
            // PipeManager.sendMsg(PipeConstants.UPDATE_LOADING_PANEL, [($i+1)/len2, "正在启动主界面程序"]);
            PipeManager.sendMsg($msg);
        }

        //第一次进入场景,执行一些操作
        if(GameState.fristEnterScene)
        {
            // TPreLoader.showLoadingUI(LanResManager.getLanCommonTextWords("正在启动程序模块"));
            // PipeManager.sendMsg(PipeConstants.GET_CIENT_INIT);
            LogManager.LogError("ProcessManager:正在启初始化界面和动程序模块");

            let ht: HandlerThread = new HandlerThread();
            let facadeArr: Array<any> = [
                // Scene_ApplicationFacade,
                // Main_ApplicationFacade,
                // Fight_ApplicationFacade,
                // PickUp_ApplicationFacade,
                // Item_ApplicationFacade,
                // Start_ApplicationFacade,
                Main_ApplicationFacade,
                Fight_ApplicationFacade
            ];

            let startupFacade=($i: number, $facade: any)=>{
                // TPreLoader.updateLoadingUI(LanResManager.getLanCommonTextWords("正在启动程序模块"), ($i+1)/len);
                LogManager.LogError("ProcessManager:正在启动" + $facade["NAME"]);
                FacadeManager.startupFacade($facade);
                // (($i + 1)/leng >= 1) ? PipeManager.sendMsg(PipeConstants.CLOSE_LOADING_PANEL) : PipeManager.sendMsg(PipeConstants.UPDATE_LOADING_PANEL, [($i + 1)/leng, "正在启动模块程序"]);
            }

            let facadeName: string;
            let delay: number = 5;
            let leng:number = facadeArr.length;
            for (let i: number = 0; i < leng; i++) {
                ht.push(startupFacade, [i, facadeArr[i]], delay);
            }

            //发送管道消息
            let msgArr:Array<string> = [
                // //展示主界面
                // PipeConstants.GET_CIENT_INIT,
                // PipeConstants.SHOW_MAINUI,
                // //发送客户端准备完毕
                PipeConstants.CLIENT_READY
            ];

            var msg:string;
            var len2:number = msgArr.length;
            for(let i:number=0; i<len2; i++)
            {
                msg = msgArr[i];
                ht.push(sendMsg, [i,msg], delay);
            }

            LogManager.Log("ProcessManager:启动模块和初始化界面完毕");
        }else{
            LogManager.Log("ProcessManager:正在请求进入场景");
            //发送客户端准备完毕
            PipeManager.sendMsg(PipeConstants.CLIENT_READY);
        }
    }
}