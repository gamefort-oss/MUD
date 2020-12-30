
/*
* gkf;
*/
class Fight_ApplicationFacade extends puremvc.Facade
{

    public static readonly NAME:string = "Fight_ApplicationFacade";

    constructor($key:string=null) {
        super($key);
        PipeManager.registerMsgs( [
            PipeConstants.STARTUP_FIGHT_PANEL,
            PipeConstants.SHOW_FIGHT_PANEL
			], this.handlePipeMessage, this);
    }

    public static getInstance() : Fight_ApplicationFacade
    {
        let n:string = Fight_ApplicationFacade["NAME"];
        if ( this.instanceMap[ n ] == null )
            this.instanceMap[ n ] = new Fight_ApplicationFacade(n);
        return this.instanceMap[ n ];
    }

    public initializeController():void
    {
        super.initializeController();
        this.registerCommand("STARTUP", Fight_StartupCommand);
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
            case PipeConstants.STARTUP_FIGHT_PANEL:
                this.startup();
                break;
            case PipeConstants.SHOW_FIGHT_PANEL:
                this.sendNotification(key, data);
                break;
        }
    }

    public startup():void
    {
        this.sendNotification("STARTUP");
    }

}