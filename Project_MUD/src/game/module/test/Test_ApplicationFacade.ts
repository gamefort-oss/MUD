
/*
* gkf;
*/
class Test_ApplicationFacade extends puremvc.Facade
{

    public static readonly NAME:string = "Test_ApplicationFacade";

    constructor($key:string=null) {
        super($key);
        PipeManager.registerMsgs( [
            Test_ApplicationFacade["NAME"],
            PipeConstants.GET_TEST_PANEL
			], this.handlePipeMessage, this);
    }

    public static getInstance() : Test_ApplicationFacade
    {
        let n:string = Test_ApplicationFacade["NAME"];
        if ( this.instanceMap[ n ] == null )
            this.instanceMap[ n ] = new Test_ApplicationFacade(n);
        return this.instanceMap[ n ];
    }

    public initializeController():void
    {
        super.initializeController();
        this.registerCommand("STARTUP", Test_StartupCommand);
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
            case "Test_ApplicationFacade":
                this.startup();
                break;
            case PipeConstants.GET_TEST_PANEL:
                this.sendNotification(key, data);
                break;
        }
    }

    public startup():void
    {
        this.sendNotification("STARTUP");
    }

}