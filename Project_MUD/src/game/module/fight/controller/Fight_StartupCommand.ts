/*
* gkf;
*/
class Fight_StartupCommand extends puremvc.SimpleCommand{

    public execute( $note:puremvc.INotification ):void
    {
        this.facade().registerProxy( new Fight_MsgReceivedProxy() );
        this.facade().registerProxy( new Fight_MsgSenderProxy() );
        this.facade().registerMediator( new Fight_Mediator() );
    }

}