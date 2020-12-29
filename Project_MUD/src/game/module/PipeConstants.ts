/*
* name;
*/
class PipeConstants{    

    /** 通知服务器，客户端准备完毕，通知服务器可以发送数据过来了*/
    public static readonly CLIENT_READY:string = "CLIENT_READY";
    /*******************************************************************************界面***********************************************************************************/
    /**测试面板*/
    public static readonly GET_TEST_PANEL:string = "GET_TEST_PANEL";

    /**启动主界面*/
    public static readonly STARTUP_MAIN_PANEL:string = Main_ApplicationFacade.NAME;
    /**展示主界面*/
    public static readonly SHOW_MAIN_PANEL:string = "SHOW_MAIN_PANEL";
    
}