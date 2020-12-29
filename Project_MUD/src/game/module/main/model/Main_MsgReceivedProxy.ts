/*
* gkf;
*/
class Main_MsgReceivedProxy extends puremvc.Proxy{
    
    private _mediator:any;
    public get mediator():Main_Mediator
    {
        if ( ! this._mediator )
        {
            this._mediator = this.facade().retrieveMediator("Main_Mediator");
        }
        return this._mediator;
    }

    public onRegister():void
    {

    }

    public onRemove():void
    {

    }

}