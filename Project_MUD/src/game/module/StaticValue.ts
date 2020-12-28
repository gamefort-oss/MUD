
/**
 * 常用公用常量
 *
*/
class StaticValue
{
   /**
     *铬黄-ff9912
     金黄-ffd700
     黄色-ffff00
     dodgerblue（蓝色）- 1e90ff
     青色-00ffff
     绿色-00ff00
     湖紫-9933fa
     白色-ffffff
     淡紫色-da70d6
     天蓝-87ceeb
     翠绿-00c957
     桔红-ff4500
     红色-ff0000
     浅灰蓝色-boboe6
     */
    /**坐骑显示颜色*/
    public static rideColors:Array<string> = ["#ffffff","#ffffff","#1e90ff","#00ff00","#9933fa","#ffd700"];
    /**装备显示颜色*/
    public static itemColors:Array<string> = ["#ffffff","#ffffff","#1e90ff","#00ff00","#9933fa","#ffd700","#ff0000"];
    public static itemColors_html:Array<string> = ["#ffffff","#ffffff","#1e90ff","#00ff00","#9933fa","#ffd700","#ff0000"];

    /**
     *灰色
     */
    public static GRAY:string ="#666666";
    /**
     *html灰色
     */
    public static GRAY_HTML:string ="#666666" ;
    /**
     *白色
     */
    public static WHITE:string ="#ffffff";
    /**
     *html白色
     */
    public static WHITE_HTML:string ="#ffffff" ;
    /**
     *蓝色
     */
    public static BLUE:string = "#1e90ff";
    /**
     *html蓝色
     */
    public static BLUE_HTML:string = "#1e90ff";
    /**
     *青色
     */
    public static SKY_BLUE:string = "#00ffff";
    /**
     *html青色
     */
    public static SKY_BLUE_HTML:string = "#00ffff";
    /**
     * 天蓝色
     */
    public static BlUE50:string = "#87ceeb";
    /**
     *html天蓝色
     */
    public static BlUE50_HTML:string = "#87ceeb";
    /**
     * 浅灰蓝色
     */
    public static BlUE20:string = "#b0e0e6";
    /**
     *html浅灰蓝色
     */
    public static BlUE20_HTML:string = "#b0e0e6";
    /**
     *绿色
     */
    public static GREEN:string ="#00ff00" ;
    /**
     *html绿色
     */
    public static GREEN_HTML:string ="#00ff00" ;
    /**
     *翠绿色
     */
    public static GREEN_STRONG:string ="#00C957" ;
    /**
     *html翠绿色
     */
    public static GREEN_STRONG_HTML:string ="#00C957" ;
    /**
     *金黄色
     */
    public static GOLD:number = 0xffd700;
    /**
     *html金黄色
     */
    public static GOLD_HTML:string = "#ffd700";
    /**
     *黄色
     */
    public static YELLOW:string = "#ffff00";
    /**
     *html黄色
     */
    public static YELLOW_HTML:string = "#ffff00";
    /**
     *铬黄
     */
    public static ORANGE:string ="#ff9912";
    /**
     *html铬黄
     */
    public static ORANGE_HTML:string ="#ff9912" ;
    /**
     *桔红色
     */
    public static ORANGE_RED:string = "#ff4500";
    /**
     *html桔红色
     */
    public static ORANGE_RED_HTML:string ="#ff4500";
    /**
     *红色
     */
    public static RED:string = "#ff0000";
    /**
     *html红色
     */
    public static RED_HTML:string ="#ff0000";
    /**
     *紫色
     */
    public static PURPLE:string = "#9933fa";
    /**
     *html紫色
     */
    public static PURPLE_HTML:string = "#9933fa";
    /**
     *淡紫色
     */
    public static PURPLE50:string = "#da70d6";
    /**
     *html淡紫色
     */
    public static PURPLE50_HTML:string = "#da70d6";
    /**
     *html黑色
     */
    public static BLACK_HTML:string = "#000000";

    /**
     * 黑色描边滤镜
     */
    // public static  filter:Array = [new GlowFilter(0x000e07, 1, 3, 3, 15, BitmapFilterQuality.LOW)];


    /**
     * 高亮
     */
    // public static filter6:Array = [new ColorMatrixFilter([1, 0, 0, 0, 45, 0, 1, 0, 0, 45, 0, 0, 1, 0, 45, 0, 0, 0, 1, 0])];

    /**
     * 居中
     */
    // public static format:TextFormat = new TextFormat(null,null,null,null,null,null,null,null,"center");
    // public static eFormat:ElementFormat = new ElementFormat(new FontDescription(LanResManager.getLanFont("TUILib#宋体")),12,0,1,"auto",TextBaseline.IDEOGRAPHIC_CENTER);
    /**
     *文字用的黄色
     */
    public static TarbarYellow:string = "#76f3cb";

    /**
     * 头像人物名称和等级
     */
    public static GreenNameColor :string = "#b4ffb2";


    /**
     *html文字用的黄色
     */
    public static TarbarYellow_HTML:string = "#76f3cb";
    /**
     *包裹字体颜色
     */
    public static backpackTextColor :string = "#ffe764";
    /**
     *摊位字体颜色
     */
    public static sellTextColor :string = "#f1984f";
    /**
     *登陆提示颜色
     */
    public static denglutishiColor:string="#f4ff40";

    /**
     *刷新颜色
     */
    public static refreshColor_HTML:string="#ffb347";
    /**
     *蓝钻礼品说明颜色
     */
    public static lanzuanDec_HTML:string="#2a5997";
    /**
     *蓝钻礼品说明颜色
     */
    public static lanzuanDec:string="#2a5997";
    /**
     *蓝钻礼品欢迎字体颜色
     */
    public static lanzuanWel_HTML:string="#3871a6";

    /**
     * 已完成境界按钮文字颜色
     * */
    public static completeJingjieColor:string = "#a9f094";

    // public static var blackWhiteFilter:Array = [new ColorMatrixFilter([0.5,0.6094, 0.0820, 0, 0,
    //     0.3086, 0.5, 0.0820, 0, 0,
    //     0.3086, 0.6094, 0.5, 0, 0,
    //     0, 0, 0, 1, 0])];

    // public static var blackWhiteFilter2:Array = [new ColorMatrixFilter([0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0,
    //     0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0])];

    public static guojiaName:Array<string> = ["","法国","瑞士","阿尔巴尼亚","德国","意大利","比利时","瑞典","波兰","威尔士","英格兰","斯洛伐克","西班牙","匈牙利","冰岛","葡萄牙","克罗地亚","捷克","北爱尔兰","爱尔兰","奥地利","俄罗斯","罗马尼亚","土耳其","乌克兰"];


    // private static leftGMMenu:GameGMMenu;//左侧gm菜单


//     public static getBitmapByClassName(value:string):Laya.Image{
//         if(value==null)return null;
// //			var $bitmap:Class = RslLoaderManager.getClass(value);
// //			if(!$bitmap) return null;
// //			var bitmap:Bitmap = new Bitmap(new $bitmap(10,10) as BitmapData);
// //			return bitmap;
// //			return new Bitmap(FBitmapDataBufferManager.getBD(value));
//         // if(RESManager.checkResName(value)){
//         //     return new Bitmap(RESManager.getBitmapDataByName(value));
//         // }else{
//         //     var $bitmap:Class = RslLoaderManager.getClass(value);
//         //     if(!$bitmap) return null;
//         //     var bitmap:Bitmap = new Bitmap(new $bitmap(10,10) as BitmapData);
//         //     return bitmap;
//         // }
//     }

    // public static getMCByClassName(value:string):Laya.Sprite{
    //     if(value==null)return null;
    //     var $class:Class = RslLoaderManager.getClass(value);
    //     if(!$class) return null;
    //     return new $class as Laya.Sprite;
    // }

    // public static function setAlert():void{
    //     FAlert.textRect = new Rectangle(12,30,140,70);
    //     FAlert.textColor = 0xffffff;
    //     FAlert.okButton = new MainButton();
    //     FAlert.cancelButton = new MainButton();
//			FAlert.okLabel_default = LanResManager.getLanCommonTextWords("确定");
//			FAlert.cancelLabel_default = LanResManager.getLanCommonTextWords("取消");
//         FTabBar.buttonStyle  = new TabButton();
//     }
//     /**
//      * 显示左侧gm菜单
//      *
//      */
//     public static function showGMMenu():void{
//         if(GameConfig.serverType<=0)return;
//         if(!leftGMMenu){
//             leftGMMenu = new GameGMMenu();
//             leftGMMenu.init(GameConfig.serverType);
//         }
//         GameInstance.uiInstance.alertContainer.addChild(leftGMMenu);
//         leftGMMenu.resize();
//     }

//     public static function reLoadMenuSkin():void{
//         if(!leftGMMenu)return;
//         leftGMMenu.reLoadSkin();
//     }
//     /**
//      * 转换帮旗id为导出类名
//      * @param id
//      * @return
//      *
//      */
//     public static function conversionFlagID(id:int):string{
//         if(id<10){
//             id+=10;
//         }
//         var str:string = id.toString();
//         return "ui.party.flag.lv"+str.charAt(0)+"."+str.charAt(1);
//     }
//     /**
//      * 逻辑点转换成小地图上的像素点
//      * @param value
//      * @return
//      *
//      */
//     public static Point2Pix(value:number):number{
//         if(!value||isNaN(value))return 0;
//         if(GameInstance.scene.mapConfig&&(GameInstance.scene.mapConfig.width>4000||GameInstance.scene.mapConfig.height>4000)){
// //			if(GameInstance.scene.mapConfig&&OtherConst.BIGMAPID.indexOf(GameInstance.scene.mapConfig.mapID)!=-1){
//             value = Math.round(value*25*0.05);//傲剑是0.05，飞升是0.06
//         }else
//         {
//             value = Math.round(value*25*0.1);
//         }
//         return value;
//     }
//     /**
//      * 小地图上的像素点转换成逻辑点
//      * @param value
//      * @return
//      *
//      */
//     public static Pix2Point(value:number):number{
// //			if(GameInstance.scene.mapConfig.mapID==OtherConst.ZHUCHENG_MAP_ID){
// //			if(OtherConst.BIGMAPID.indexOf(GameInstance.scene.mapConfig.mapID)!=-1){
//         if(GameInstance.scene.mapConfig&&(GameInstance.scene.mapConfig.width>4000||GameInstance.scene.mapConfig.height>4000)){
//             value = Math.round(value/0.06/25);//傲剑是0.05，飞升是0.06
//         }else
//         {
//             value = Math.round(value/0.1/25);
//         }
//         return value;
//     }
}