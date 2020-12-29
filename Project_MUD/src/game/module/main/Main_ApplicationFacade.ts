
/*
* gkf;
*/
class Main_ApplicationFacade extends puremvc.Facade
{

    public static readonly NAME:string = "Main_ApplicationFacade";

    constructor($key:string=null) {
        super($key);
        PipeManager.registerMsgs( [
            PipeConstants.STARTUP_MAIN_PANEL,
            PipeConstants.SHOW_MAIN_PANEL
			], this.handlePipeMessage, this);
    }

    public static getInstance() : Main_ApplicationFacade
    {
        let n:string = Main_ApplicationFacade["NAME"];
        if ( this.instanceMap[ n ] == null )
            this.instanceMap[ n ] = new Main_ApplicationFacade(n);
        return this.instanceMap[ n ];
    }

    public initializeController():void
    {
        super.initializeController();
        this.registerCommand("STARTUP", Main_StartupCommand);
    }

    /**
     * 处理管道消息
     * @param	$notification
     */
    public handlePipeMessage( $notification:puremvc.Notification ):void
    {
        let key:string = $notification.getName();
        let data:Object = $notification.getBody();
        switch ( key )
        {
            case PipeConstants.STARTUP_MAIN_PANEL:
                this.startup();
                break;
            case PipeConstants.SHOW_MAIN_PANEL:
                this.sendNotification(key, data);
                break;
        }
    }

    public startup():void
    {
        this.sendNotification("STARTUP");
    }

}