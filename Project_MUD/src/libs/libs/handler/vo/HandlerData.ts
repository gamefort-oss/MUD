/*
* gkf;
*/
class HandlerData{

    private _handler:Function;
    private _parameters:Array<any>;
    private _delay:number;
    private _doNext:boolean;

    constructor($handler:Function, $parameters:Array<any>=null,$delay:number=0,$doNext:boolean=true){
        this._handler = $handler;
        this._parameters = $parameters;
        this._delay = $delay;
        this._doNext = $doNext;
    }

    public get handler():Function
    {
        return this._handler;
    }
    public get parameters():Array<any>
    {
        return this._parameters;
    }
    public get delay():number
    {
        return this._delay;
    }
    public get doNext():boolean
    {
        return this._doNext;
    }	

}