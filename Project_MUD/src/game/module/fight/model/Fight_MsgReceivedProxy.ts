/*
* gkf;
*/
class Fight_MsgReceivedProxy extends puremvc.Proxy{
    
    private _mediator:any;
    public get mediator():Fight_Mediator
    {
        if ( ! this._mediator )
        {
            this._mediator = this.facade().retrieveMediator("Fight_Mediator");
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