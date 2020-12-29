/*
* gkf;
*/
class Main_StartupCommand extends puremvc.SimpleCommand{

    public execute( $note:puremvc.INotification ):void
    {
        this.facade().registerProxy( new Main_MsgReceivedProxy() );
        this.facade().registerProxy( new Main_MsgSenderProxy() );
        this.facade().registerMediator( new Main_Mediator() );
    }

}