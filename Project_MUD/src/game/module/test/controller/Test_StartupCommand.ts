/*
* gkf;
*/
class Test_StartupCommand extends puremvc.SimpleCommand{

    public execute( $note:puremvc.INotification ):void
    {
        this.facade().registerProxy( new Test_MsgReceivedProxy() );
        this.facade().registerProxy( new Test_MsgSenderProxy() );
        this.facade().registerMediator( new Test_Mediator() );
    }

}