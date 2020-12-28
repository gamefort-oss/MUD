/**
 *提示消息管理器
 * @author zcp
 */
class NoticeManager
{
    /**将消息存储到个人信息面板的方法，一个参数string*/
    public static myMsgFun:Function;

    /**ALERT 弹出ALERT消息*/
    public static readonly ALERT:number = 1;

    /**
     * 系统公告 打印在聊天狂内
     */
    public static readonly SYSTEM_CHAT:number = 2;

    /**
     * 系统提示(右侧)
     */
    public static readonly SYSTEM_RIGHT:number = 3;

    /**
     * 系统公告(滚动)
     */
    public static readonly SYSTEM_ROLL:number = 4;
    /**
     * 中间明显提示区(角色脚下)
     */
    public static readonly FOOT:number = 5;

    /**
     * 系统公告(切出)
     */
    public static readonly SYSTEM_SWITCH:number = 6;


    /**
     * 中间明显提示区(BOSS喊话等)
     */
    public static readonly CENTER:number = 7;

    /**
     *  中间明显提示区 竞技场开战倒计时
     */
    public static readonly CENTER_COUNTDOWN:number = 10;

    public static addedToConcernMsgPanelFun:Function;
    /**
     * 提示消息
     * @param $type 类型
     * @param $msg 信息
     * @param $getLan 是否检测国际化(默认为true)
     * @param $time 时间(默认为空)
     */
    public static notify($type:number,$msg:string,$getLan:boolean=true, $time:string = ""):void
    {
        //国际化
        if($getLan)
        {
            var tempStr:string = $msg;
            if(tempStr!="")
            {
                $msg = tempStr;
            }
        }


        switch($type)
        {
            case this.SYSTEM_CHAT:
                // GameInstance.uiInstance.mainUI.receiveMessage(1,"",-100,"",-1,$msg);
                break;
            case this.SYSTEM_RIGHT:
                // GameInstance.uiInstance.mainUI.setSysTip($msg);
                // if(this.myMsgFun!=null) myMsgFun($msg);
                break;
            case this.FOOT:
                //新增角色脚下提示
                // if(GameState.enableTishiMsg)
                {
                    // TopTipManager.getInstance().addCharFootTip($msg);
                }
                break;
            case this.SYSTEM_ROLL://公告要同时在聊天面板显示
                //GameInstance.uiInstance.mainUI.setAffiche($msg);
                // GameInstance.uiInstance.mainUI.receiveMessage(1,("公告"),-100,"",-1,$msg,false,("公告"));
                //新增系统滚动提示
                // TopTipManager.getInstance().addSystemRollTip($msg);
                if(this.addedToConcernMsgPanelFun!=null) this.addedToConcernMsgPanelFun($msg,$time);
                break;
            case this.SYSTEM_SWITCH:
                //系统切出提示
                // TopTipManager.getInstance().addSystemSwitchTip($msg);
                break;
            case this.CENTER:
                //屏幕中央大提示
                // TopTipManager.getInstance().addCenterTip($msg);
                break;
            case this.CENTER_COUNTDOWN:
                //屏幕中央大提示
                // TopTipManager.getInstance().addCenterTip_up($msg);
                break;
            case this.ALERT:
                //临时给搞成白色111111111111
                if($msg.indexOf("</font>")==-1)
                {
                    $msg = "<font color='#FFFFFF'>"+$msg+"</font>";
                }
                // FAlert.show($msg);

                break;
        }
    }
}