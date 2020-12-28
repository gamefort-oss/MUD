/*
* gkf;
*/
class Test_MsgReceivedProxy extends puremvc.Proxy{
    private _mediator:any;
    /**
     */
    public get mediator():Test_Mediator
    {
        if ( ! this._mediator )
        {
            this._mediator = this.facade().retrieveMediator("Test_Mediator");
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