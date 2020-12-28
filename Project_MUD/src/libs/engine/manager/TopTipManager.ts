// /**
//  * 屏幕提示管理器，处理自动挂机、自动寻路等文字显示
//  * @author canman
//  *
//  */
// class TopTipManager
// {
//     private static _instance:TopTipManager;
//     public static getInstance():TopTipManager {
//         if(!this._instance) {
//             this._instance = new TopTipManager();
//         }
//         return this._instance;
//     }
//     constructor()
//     {
//         //初始进场景提示
//         this._enterSceneTf.align = "left";
//         this._enterSceneTf.autoSize = true;//TextFieldAutoSize.LEFT;
//         this._enterSceneTf.mouseEnabled = false;
//         // this._enterSceneTf.filters = filter_enterScene;
//         // let enterSceneTFormat:TextFormat = new TextFormat();
//         this._enterSceneTf.fontSize = 35;
//         this._enterSceneTf.bold = true;
// //			enterSceneTFormat.font = LanResManager.getLanFont("com.tgame.manager.TopTipManager#楷体");
//         this._enterSceneTf.color = "#B6FF00";//StaticValue.YELLOW;
//         // _enterSceneTf.defaultTextFormat = enterSceneTFormat;

//         //初始任务文字提示
//         this._taskTipTf.align = "left";
//         this._taskTipTf.autoSize = true;//TextFieldAutoSize.LEFT;
//         this._taskTipTf.mouseEnabled = false;
//         // this._taskTipTf.filters = filter_taskTip;
//         // let taskTipTFormat:TextFormat = new TextFormat();
//         this._taskTipTf.fontSize = 35;
//         this._taskTipTf.bold = true;
// //			taskTipTFormat.font =LanResManager.getLanFont("com.tgame.manager.TopTipManager#楷体");
//         this._taskTipTf.color = "#ffffff";//;
//         // _taskTipTf.defaultTextFormat = taskTipTFormat;

//         //初始滚动公告
//         this.system_roll_box = new Laya.Sprite();
//         this.system_roll_box.name = "system_roll_box";
//         this.system_roll_box.mouseEnabled = true;//Laya中要为true
// //			system_roll_box.mouseChildren = false;
//         this.system_roll_box_mask = new Laya.Sprite();
//         this.system_roll_box.mask = this.system_roll_box_mask;

//         //初始系统切出提示
//         this.system_switch_box = new Laya.Sprite();
//         this.system_switch_box.name = "system_switch_box";
//         this.system_switch_box.mouseEnabled = false;
//         // this.system_switch_box.mouseChildren = false;

//         //初始角色脚下提示
//         this.char_foot_box = new Laya.Sprite();
//         this.char_foot_box.name = "char_foot_box";
//         this.char_foot_box.mouseEnabled = false;
//         // char_foot_box.mouseChildren = false;

//         //初始屏幕中央提示
//         this.center_box = new Laya.Sprite();
//         this.center_box.name = "center_box";
//         this.center_box.mouseEnabled = false;
//         // center_box.mouseChildren = false;
//     }



//     /**位图tip提示容器 */
//     private _tipContainer:Object = new Object();
//     /**文字提示容器 */
//     private _txtTipContainer:Object = new Object();



//     //进场景文字提示**********************************************************************************
//     /**进场景提示描边滤镜 */
//     // private static  filter_enterScene:Array = [new GlowFilter(0x000e07, 1, 6, 6, 2, BitmapFilterQuality.LOW)];
//     /**进场景文字提示 */
//     private _enterSceneTf:Label = new Label();
//     /**进入场景的Tip时间控制*/
//     private _enterSceneTD:TimerData;
//     /**
//      * 增加进入场景提示
//      * @param $value
//      *
//      */
//     public addEnterSceneTip($value:string):void {
//         /**移除进场景提示*/
//         let removeEnterSceneTip=()=>
//         {
//             if(this._enterSceneTD!=null)
//             {
//                 TimerManager.deleteTimer(this._enterSceneTD);
//                 this._enterSceneTD = null;
//             }
//                 this._enterSceneTf.removeSelf();

//             delete this._txtTipContainer["map_name"];
//         }
//         //移除旧的
//         removeEnterSceneTip();
//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;

//         let id:string = "map_name";
//         let scaleX:number = 0.5;
//         let scaleY:number = 0.1;
//         let delay:number = 4*1000;
//         let tt:number = 0.7*1000;//渐现渐隐时间

//         //注意这个
//         this._enterSceneTf.alpha = 0;
// //			_enterSceneTf.text = $value;
//         this._enterSceneTf.font = "楷体";
//         this._enterSceneTf.text = $value;
//         this._enterSceneTf.x = sw * scaleX - this._enterSceneTf.width*.5;
//         this._enterSceneTf.y = sh * scaleY;
//         this._txtTipContainer[id] = [this._enterSceneTf, scaleX, scaleY];
//         GameInstance.uiInstance.letterContainer.addChild(this._enterSceneTf);

//         let duration:number = delay + tt*2;
//         let from:number = 0;
//         let to:number = duration;
//         let onUpdate=($per:number)=>
//         {
//             if($per<tt)//渐现
//             {
//                 this._enterSceneTf.alpha = $per/tt;
//             }
//             else if($per>delay+tt)//渐隐
//             {
//                 this._enterSceneTf.alpha = (tt-($per-delay-tt))/tt;
//             }
//             else//alpha==1显示
//             {
//                 this._enterSceneTf.alpha = 1;
//             }
//         }

//         this._enterSceneTD = TimerManager.createExactTimer(duration, from, to, onUpdate, removeEnterSceneTip);

//     }
//     /**移除进场景提示*/
//     public removeEnterSceneTip():void
//     {
//         if(this._enterSceneTD!=null)
//         {
//             TimerManager.deleteTimer(this._enterSceneTD);
//             this._enterSceneTD = null;
//         }
//         // if(this._enterSceneTf.parent!=null) {
//             this._enterSceneTf.removeSelf();//.removeChild(_enterSceneTf);
//         // }

//         delete this._txtTipContainer["map_name"];
//     }
//     /*******************************任务文字提示*****************************************************/
//     /**任务文字提示描边滤镜 */
//     // private static  filter_taskTip:Array = [new GlowFilter(0xff0000, 0.8, 8, 8, 2, BitmapFilterQuality.MEDIUM)];
//     /**进场景文字提示 */
//     private _taskTipTf:Label = new Label();
//     /**进入场景的Tip时间控制*/
//     private _taskTipTD:TimerData;
//     /**
//      * 增加任务文字提示
//      * @param $value
//      *
//      */
//     public addTaskTip($value:string):void {
//         /**移除进场景提示*/
//         let removeTaskTip=()=>
//         {
//             if(this._taskTipTD!=null)
//             {
//                 TimerManager.deleteTimer(this._taskTipTD);
//                 this._taskTipTD = null;
//             }
//             if(this._taskTipTf.parent!=null) {
//                 this._taskTipTf.parent.removeChild(this._taskTipTf);
//             }

//             delete this._txtTipContainer["task_tip"];
//         }
//         //移除旧的
//         removeTaskTip();

//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;
//         let id:string = "task_tip";
//         let scaleX:number = 0.5;
//         let scaleY:number = 0.85;
//         let delay:number = 8*1000;
//         let tt:number = 0.7*1000;//渐现渐隐时间

//         //注意这个
//         this._taskTipTf.alpha = 0;
// //			_taskTipTf.text = $value;
//         this._taskTipTf.font = "楷体";
//         this._taskTipTf.text = $value;
//         this._taskTipTf.x = sw * scaleX - this._taskTipTf.width*.5;
//         this._taskTipTf.y = sh * scaleY;
//         this._txtTipContainer[id] = [this._taskTipTf, scaleX, scaleY];
//         GameInstance.uiInstance.letterContainer.addChild(this._taskTipTf);
//         let onUpdate=($per:number)=>
//         {
//             if($per<tt)//渐现
//             {
//                 this._taskTipTf.alpha = $per/tt;
//             }
//             else if($per>delay+tt)//渐隐
//             {
//                 this._taskTipTf.alpha = (tt-($per-delay-tt))/tt;
//             }
//             else//alpha==1显示
//             {
//                 this._taskTipTf.alpha = 1;
//             }
//         }
//         let duration:number = delay + tt*2;
//         let from:number = 0;
//         let to:number = duration;
//         this._taskTipTD = TimerManager.createExactTimer(duration,from,to,onUpdate, removeTaskTip);

//     }




//     //系统滚动文字提示(支持HTML，但不支持鼠标事件)**********************************************************************************
//     /**系统滚动提示滚动速度*/
//     private static readonly SYSTEM_ROLL_SPEED:number = 0.55;
//     /**系统滚动提示宽度站主窗口的比率*/
//     private static readonly SYSTEM_ROLL_WIDTH_SCALE:number = 0.55;
//     /**系统滚动提示宽度最小值*/
//     private static readonly SYSTEM_ROLL_WIDTH_MIN:number = 200;
//     /**系统滚动提示位置U*/
//     private static readonly SYSTEM_ROLL_U:number = 0.5;
//     /**系统滚动提示位置V*/
//     private static readonly SYSTEM_ROLL_V:number = 0.12;
//     /**系统滚动提示容器*/
//     private system_roll_box:Laya.Sprite;
//     /**系统滚动提示容器*/
//     private system_roll_box_mask:Laya.Sprite;
//     /**设置滚动文字背景*/
//     private setSystemRollAreaBg($width:number):void
//     {
//         this.system_roll_box.graphics.clear();
//         // this.system_roll_box.graphics.beginFill(0x000000,.3);
//         this.system_roll_box.graphics.setAlpha(0.3);
//         this.system_roll_box.graphics.drawRect(0,0,$width,20,"#000000");
//         // this.system_roll_box.graphics.endFill();
//         this.system_roll_box_mask.graphics.clear();
//         // this.system_roll_box_mask.graphics.beginFill(0x000000,1);
//         this.system_roll_box_mask.graphics.drawRect(0,0,$width,20,"#000000");
//         // this.system_roll_box_mask.graphics.endFill();
//     }
//     /**
//      * 增加一条系统滚动提示
//      * @param $value 支持HTML文本
//      * @param $count 滚动显示次数
//      */
//     public addSystemRollTip($value:string, $count:number=1):void
//     {
//         let sw:number = GameInstance.scene.sceneConfig.width;//GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;//GameInstance.scene.sceneConfig.height;
//         //检查初始化
//         let rollWidth:number;
//         if(!RollText.hasInit())
//         {
//             rollWidth = Math.max(sw*TopTipManager.SYSTEM_ROLL_WIDTH_SCALE, TopTipManager.SYSTEM_ROLL_WIDTH_MIN);
//             //设置背景
//             this.setSystemRollAreaBg(rollWidth);
//             let onComplete=()=>
//             {
//                 this.system_roll_box.removeSelf();//.parent.removeChild(system_roll_box);
//             }
//             //初始滚动器
//             RollText.init(this.system_roll_box, rollWidth, 0, 5, TopTipManager.SYSTEM_ROLL_SPEED,10, onComplete);
//             //重设滚动器最大宽
//             RollText.resetMaxWidth(rollWidth);

//         }
//         //检查父容器
//         if(this.system_roll_box.parent!=GameInstance.uiInstance.letterContainer)
//         {
//             rollWidth = Math.max(sw*TopTipManager.SYSTEM_ROLL_WIDTH_SCALE, TopTipManager.SYSTEM_ROLL_WIDTH_MIN);
//             this.system_roll_box.x = sw*TopTipManager.SYSTEM_ROLL_U - rollWidth/2;;
//             this.system_roll_box.y = sh*TopTipManager.SYSTEM_ROLL_V;
//             GameInstance.uiInstance.letterContainer.addChild(this.system_roll_box);
//         }
//         //添加
//         RollText.pushText($value, $count);
//     }



//     //系统切出文字提示(支持HTML，但不支持鼠标事件)**********************************************************************************
//     /**系统切出提示缓存条数*/
//     private static readonly SYSTEM_SWITCH_NUM:number = 5;
//     /**系统切出提示每条高度*/
//     private static readonly SYSTEM_SWITCH_ONE_HEIGHT:number = 26;
//     /**系统切出提示停留时间(秒)*/
//     private static readonly SYSTEM_SWITCH_ONE_TIME:number = 2.5*1000;
//     /**系统切出提示切出和渐现时间(秒)*/
//     private static readonly SYSTEM_SWITCH_ONE_SWITCH_TIME1:number = 0.2*1000;
//     /**系统切出提示渐隐时间(秒)*/
//     private static readonly SYSTEM_SWITCH_ONE_SWITCH_TIME2:number = 1*1000;
//     /**系统切出提示切出距离)*/
//     private static readonly SYSTEM_SWITCH_ONE_SWITCH_DIS:number = 20;
//     /**系统切出提示位置U*/
//     private static readonly SYSTEM_SWITCH_U:number = 0.5;
//     /**系统切出提示位置V*/
//     private static readonly SYSTEM_SWITCH_V:number = 0.25;
//     /**系统切出提示描边滤镜 */
//     // private static  filter_systemSwitch:Array = [new GlowFilter(0x000e07, 1, 4, 4,4, BitmapFilterQuality.LOW)];
//     /**系统切出提示容器*/
//     private system_switch_box:Laya.Sprite;
//     /**
//      * 增加一条系统切出提示
//      * @param $value 支持HTML文本
//      */
//     public addSystemSwitchTip($value:string):void
//     {
//         //生成文本
//         let systemSwitchTf:Label = new Label();
//         systemSwitchTf.align = "left";
//         systemSwitchTf.autoSize = true;//TextFieldAutoSize.LEFT;
//         systemSwitchTf.mouseEnabled = false;
//         // systemSwitchTf.filters = filter_systemSwitch;
//         // let systemSwitchTFormat:TextFormat = new TextFormat();
//         systemSwitchTf.fontSize = 20;
//         systemSwitchTf.font = "楷体";
//         systemSwitchTf.bold = true;
//         systemSwitchTf.color = StaticValue.YELLOW;
//         // systemSwitchTf.defaultTextFormat = systemSwitchTFormat;
//         //设置文本
//         systemSwitchTf.text = $value;
//         systemSwitchTf.x = -systemSwitchTf.width/2;//保证居中

//         //检查system_switch_box内元素个数,从而采取不同的展示策略
//         let oldNumChildren:number = this.system_switch_box.numChildren;
//         if(oldNumChildren==0)
//         {
//             //添加进容器
//             //初始化y和透明度
//             systemSwitchTf.y = TopTipManager.SYSTEM_SWITCH_ONE_SWITCH_DIS;
//             systemSwitchTf.alpha = 0;
//             this.system_switch_box.addChild(systemSwitchTf);

//             //重置外部位置
//             this.system_switch_box.x = GameInstance.scene.sceneConfig.width*TopTipManager.SYSTEM_SWITCH_U;
//             this.system_switch_box.y = GameInstance.scene.sceneConfig.height*TopTipManager.SYSTEM_SWITCH_V;
//             //将容器添加进场景
//             GameInstance.uiInstance.letterContainer.addChild(this.system_switch_box);
//         }
//         else
//         {
//             //检测条数,如果大于限定条数则移除第一个
//             if(oldNumChildren>=TopTipManager.SYSTEM_SWITCH_NUM)
//             {
//                 let dobj:Laya.Sprite = this.system_switch_box.removeChildAt(0) as Laya.Sprite;
//                 Laya.Tween.clearAll(dobj);
//             }
//             //添加进容器
//             this.system_switch_box.addChild(systemSwitchTf);
//             //设置内部位置
//             this.resizeSystemSwitch();
//         }
//         let onUpdate=($per:number)=>
//         {
//             if($per<tt1)//渐现
//             {
//                 if(oldNumChildren==0)//注意这里给一个元素个数判断
//                 {
//                     if(this.system_switch_box.numChildren==1)//注意这里给一个元素个数判断
//                     {
//                         systemSwitchTf.y = - dis*($per/tt1);
//                     }
//                     systemSwitchTf.alpha = $per/tt1;
//                 }
//             }
//             else if($per>delay+tt1)//渐隐
//             {
//                 systemSwitchTf.alpha = (tt2-($per-delay-tt1))/tt2;
//             }
//             else//alpha==1显示
//             {
//                 systemSwitchTf.alpha = 1;
//             }
//         }
//         let onComplete=()=>
//         {
//             //移除
//             // if(systemSwitchTf.parent!=null)
//             {
//                 systemSwitchTf.removeSelf();// parent.removeChild(systemSwitchTf);
//             }
//             if(this.system_switch_box.numChildren==0)//没有元素了则移除父容器
//             {
//                 // if(this.system_switch_box.parent!=null)
//                 {
//                     this.system_switch_box.removeSelf();// parent.removeChild(this.system_switch_box);
//                 }
//             }
//             else
//             {
//                 //设置内部位置
//                 this.resizeSystemSwitch();
//             }
//         }
//         //设置缓动
//         let delay:number = TopTipManager.SYSTEM_SWITCH_ONE_TIME;
//         let tt1:number = TopTipManager.SYSTEM_SWITCH_ONE_SWITCH_TIME1;//渐现时间
//         let tt2:number = TopTipManager.SYSTEM_SWITCH_ONE_SWITCH_TIME2;//渐隐时间
//         let dis:number = TopTipManager.SYSTEM_SWITCH_ONE_SWITCH_DIS;//动画距离
//         let duration:number = delay + tt1 + tt2;
//         let from:number = 0;
//         let to:number = duration;
//         TimerManager.createOneOffExactTimer(duration,from,to,onUpdate, onComplete);

//     }
//     /**
//      * 设置系统切出内部位置
//      */
//     private resizeSystemSwitch():void
//     {
//         let len:number = this.system_switch_box.numChildren;
//         let child:Label;
//         for(var i:number=len-1; i>=0; i--)
//         {
//             child = this.system_switch_box.getChildAt(i) as Label;
//             child.y = -(len-1-i)*TopTipManager.SYSTEM_SWITCH_ONE_HEIGHT;
//         }
//     }

//     //角色脚下文字提示**********************************************************************************
//     /***角色脚下提示动画时间)*/
//     private static readonly CHAR_FOOT_TIME:number = 5*1000;
//     /***角色脚下提示向上滑动距离)*/
//     private static readonly CHAR_FOOT_DIS:number = 100;
//     /***角色脚下提示位置U*/
//     private static readonly CHAR_FOOT_U:number = 0.55;
//     /***角色脚下提示位置V*/
//     private static readonly CHAR_FOOT_V:number = 0.55;
//     /**角色脚下描边滤镜 */
//     // private static  filter_char:Array = [new GlowFilter(0x000e07, 1, 4, 4,4, BitmapFilterQuality.LOW)];
//     /**角色脚下提示容器*/
//     private char_foot_box:Laya.Sprite;
//     private handlerThread:HandlerThread;
//     /**
//      * 增加角色脚下文字提示
//      * @param $value
//      */
//     public addCharFootTip($value:string):void {
//         if(!this.handlerThread) this.handlerThread = new HandlerThread();
//         this.handlerThread.push(($value:string)=>{
//             this.addFootTip($value);
//         },[$value],200);
//     }

//     private addFootTip($value:string):void{
//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;
//         //生成文本
//         let charTf:Label = new Label();
//         charTf.align = "left";
//         charTf.autoSize = true;//TextFieldAutoSize.LEFT;
//         charTf.mouseEnabled = false;
//         // charTf.filters = filter_char;
//         // let charTFormat:TextFormat = new TextFormat();
//         charTf.fontSize = 14;
//         charTf.font = "楷体";
//         charTf.color = StaticValue.YELLOW;
//         // charTf.defaultTextFormat = charTFormat;

//         //设置文本
//         charTf.text = $value;


//         //检查char_foot_box内元素个数,从而采取不同的展示策略
//         let oldNumChildren:number = this.char_foot_box.numChildren;
//         if(oldNumChildren==0)
//         {
//             //添加进容器
//             this.char_foot_box.addChild(charTf);

//             //重置位置
//             this.char_foot_box.x = sw*TopTipManager.CHAR_FOOT_U;
//             this.char_foot_box.y = sh*TopTipManager.CHAR_FOOT_V;
//             //将容器添加进场景
//             GameInstance.uiInstance.letterContainer.addChild(this.char_foot_box);
//         }
//         else
//         {
//             //添加进容器
//             this.char_foot_box.addChild(charTf);
//         }

//         let onUpdate=($per:number)=>
//         {
//             charTf.y = - dis*($per/to);
//             charTf.alpha = 1-$per/to;
//         }
//         let onComplete=()=>
//         {
//             //移除
//             charTf.removeSelf();
//             if(this.char_foot_box.numChildren==0)//没有元素了则移除父容器
//             {
//                 this.char_foot_box.removeSelf();
//             }
//         }
//         //设置缓动
//         let dis:number = TopTipManager.CHAR_FOOT_DIS;
//         let duration:number = TopTipManager.CHAR_FOOT_TIME;
//         let from:number = 0;
//         let to:number = duration;
//         TimerManager.createOneOffExactTimer(duration,from,to,onUpdate, onComplete);

//     }


//     //位图提示**********************************************************************************
//     /**
//      * 增加一个位图提示
//      * @param $type 类型，通过AttackFace来取
//      * @param $value 显示的值，一般不用填
//      * @param $id 唯一ID
//      * @param $scaleX X比例
//      * @param $scaleY Y比例
//      */
//     public addTip($id:string, $scaleX:number, $scaleY:number, $type:string, $value:number=-1,$selfText:string=""):any {
//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;
// //			if($type==AttackFace.OTHERS_AUTO_SEARCH_PATH||$type==AttackFace.OTHERS_AUTO_AFK){
//             //TODO
//             let attackFace:Laya.Sprite;// = StaticValue.getBitmapByClassName($type);
// //			}
// //			var attackFace:AttackFace = AttackFace.createAttackFace($type, $value,$selfText);
// //			attackFace.mouseEnabled = false;
//         attackFace.x = sw * $scaleX - attackFace.width*.5;
//         attackFace.y = sh * $scaleY;
//         this._tipContainer[$id] = [attackFace, $scaleX, $scaleY];
//         GameInstance.uiInstance.letterContainer.addChild(attackFace);
//         return attackFace;
//     }
//     /**
//      * 删除一个位图提示
//      * @param $id
//      */
//     public removeTip($id:string):void {
//         if(this._tipContainer.hasOwnProperty($id))
//         {
// //				var attackFace:AttackFace = _tipContainer[$id][0] ;
//             let attackFace:Laya.Sprite = this._tipContainer[$id][0] ;
//             if(attackFace!=null && attackFace.parent!=null &&attackFace.parent==GameInstance.uiInstance.letterContainer)
//             {
//                 attackFace.removeSelf();// parent.removeChild(attackFace);
//             }
//             attackFace.texture=null;
//             //回收
// //				AttackFace.recycleAttackFace(attackFace);
//             this._tipContainer[$id] = null;
//             delete this._tipContainer[$id]
//         }
//     }

//     //屏幕中央(BOSS喊话等)**********************************************************************************
//     /**屏幕中央提示停留时间(秒)*/
//     private static readonly CENTER_TIME:number = 1.8*1000;
//     /**屏幕中央提示切出和渐现时间(秒)*/
//     private static readonly CENTER_TIME1:number = 0.4*1000;
//     /**屏幕中央提示渐隐时间(秒)*/
//     private static readonly CENTER_TIME2:number = 0.8*1000;
//     /***屏幕中央提示位置U*/
//     private static readonly CENTER_U:number = 0.5;
//     /***屏幕中央提示位置V*/
//     private static readonly CENTER_V:number = 0.5;
//     /**屏幕中央描边滤镜 */
//     // private static  filter_center:Array = [new GlowFilter(0x000e07, 1, 4, 4,4, BitmapFilterQuality.LOW)];
//     /**角色脚下提示容器*/
//     private center_box:Laya.Sprite;
//     /**缓冲数组*/
//     private huanchongArr:Array<any> = [];
//     /**缓冲数组_向上*/
//     private huanchongArr_up:Array<any> = [];
//     /**是否正在运行中*/
//     private isRunning:boolean=false;
//     /**是否正在运行中_向上*/
//     private isRunning_up:boolean=false;
//     /**
//      * 增加一个屏幕中央提示
//      * @param $value
//      */
//     public addCenterTip($value:string):void {
//         this.huanchongArr.push($value);

//         if(!this.isRunning)
//         {
//             this.doAddCenterTip();
//         }
//     }
//     /**
//      * 增加一个屏幕中央提示
//      * @param $value
//      */
//     private doAddCenterTip():void {
//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;
//         if(this.huanchongArr.length==0)
//         {
//             this.isRunning = false;
//             return;
//         }
//         else
//         {
//             this.isRunning = true;
//         }
//         let $value:string = this.huanchongArr.shift();

//         //文本容器
//         let tfBox:Laya.Sprite = new Laya.Sprite();
//         tfBox.name = "tfBox";
//         tfBox.mouseEnabled = false;
//         // tfBox.mouseChildren = false;
//         tfBox.alpha = 0;//注意这个
//         //生成文本
//         let centerTf:Label = new Label();
//         centerTf.align = "left";
//         centerTf.autoSize = true;//TextFieldAutoSize.LEFT;
//         centerTf.mouseEnabled = false;
//         // centerTf.filters = filter_center;
//         // let centerTFormat:TextFormat = new TextFormat();
//         centerTf.fontSize = 36;
//         centerTf.font = "楷体";
//         centerTf.color = StaticValue.RED;
//         // centerTf.defaultTextFormat = centerTFormat;

//         //设置文本
//         centerTf.text = $value;
//         centerTf.x = -centerTf.width/2;
//         centerTf.y = -centerTf.height/2;
//         //添加
//         tfBox.addChild(centerTf);
//         this.center_box.addChild(tfBox);

//         if(this.center_box.parent!=GameInstance.uiInstance.letterContainer)
//         {
//             //重置位置
//             this.center_box.x = sw*TopTipManager.CENTER_U;
//             this.center_box.y = sh*TopTipManager.CENTER_V;
//             //将容器添加进场景
//             GameInstance.uiInstance.letterContainer.addChild(this.center_box);
//         }
//         let onUpdate=($per:number)=>
//         {
//             if($per<tt1)//渐现
//             {
//                 tfBox.alpha = $per/tt1;
//                 tfBox.scaleX = tfBox.scaleY = 1+$per/tt1*0.5;
//             }
//             else if($per>delay+tt1)//渐隐
//             {
//                 tfBox.alpha = (tt2-($per-delay-tt1))/tt2;
//             }
//             else//alpha==1显示
//             {
//                 tfBox.alpha = 1;
//                 tfBox.scaleX = 1.5;
//             }
//         }
//         let onComplete=()=>
//         {
//             //移除
//             if(tfBox.parent!=null)
//             {
//                 tfBox.parent.removeChild(tfBox);
//             }
//             if(this.center_box.numChildren==0)//没有元素了则移除父容器
//             {
//                 if(this.center_box.parent!=null)
//                 {
//                     this.center_box.parent.removeChild(this.center_box);
//                 }
//             }
//             //执行下一个
//             this.doAddCenterTip();
//         }
//         //设置缓动
//         let delay:number = TopTipManager.CENTER_TIME;
//         let tt1:number = TopTipManager.CENTER_TIME1;//渐现时间
//         let tt2:number = TopTipManager.CENTER_TIME2;//渐隐时间
//         let duration:number = delay + tt1 + tt2;
//         let from:number = 0;
//         let to:number = duration;
//         TimerManager.createOneOffExactTimer(duration,from,to,onUpdate, onComplete);

//     }

//     /**
//      * 增加一个屏幕中央提示（飘出，放大，上漂，隐藏
//      * @param $value
//      */
//     public addCenterTip_up($value:string):void {
//         this.huanchongArr_up.push($value);

//         if(!this.isRunning_up)
//         {
//             this.doAddCenterTip_up();
//         }
//     }
//     /**
//      * 增加一个屏幕中央提示
//      * @param $value
//      */
//     private doAddCenterTip_up():void {
//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;
//         if(this.huanchongArr_up.length==0)
//         {
//             this.isRunning_up = false;
//             return;
//         }
//         else
//         {
//             this.isRunning_up = true;
//         }
//         let $value:string = this.huanchongArr_up.shift();

//         //文本容器
//         let tfBox:egret.Sprite = new egret.Sprite();
//         tfBox.name = "tfBox_up"
//         tfBox.mouseEnabled = false;
//         // tfBox.mouseChildren = false;
//         tfBox.alpha = 0;//注意这个
//         //生成文本
//         let centerTf:Label = new Label();
//         centerTf.align = "left";
//         centerTf.autoSize = true;//TextFieldAutoSize.LEFT;
//         centerTf.mouseEnabled = false;
//         // centerTf.filters = filter_center;
//         // let centerTFormat:TextFormat = new TextFormat();
//         centerTf.fontSize = 50;
//         centerTf.font = "楷体";
//         centerTf.color = StaticValue.ORANGE;
//         // centerTf.defaultTextFormat = centerTFormat;

//         //设置文本
//         centerTf.text = $value;
//         centerTf.x = -centerTf.width/2;
//         centerTf.y = -centerTf.height/2;
//         //添加
//         tfBox.addChild(centerTf);
//         this.center_box.addChild(tfBox);

//         if(this.center_box.parent!=GameInstance.uiInstance.letterContainer)
//         {
//             //重置位置
//             this.center_box.x = sw*TopTipManager.CENTER_U;
//             this.center_box.y = sh*TopTipManager.CENTER_V*0.6;
//             //将容器添加进场景
//             GameInstance.uiInstance.letterContainer.addChild(this.center_box);
//         }
//         let onUpdate=($per:number)=>
//         {
//             if($per<tt1)//渐现
//             {
//                 tfBox.alpha = $per/tt1;
//                 tfBox.scaleX = tfBox.scaleY = 1+$per/tt1*0.5;
//             }
//             else if($per>delay+tt1)//渐隐
//             {
//                 tfBox.alpha = (tt2-($per-delay-tt1))/tt2;
//                 this.center_box.y -=5;
//             }
//             else//alpha==1显示
//             {
//                 tfBox.alpha = 1;
//                 tfBox.scaleX = 1.5;
//             }
//         }
//         let onComplete=()=>
//         {
//             //移除
//             if(tfBox.parent!=null)
//             {
//                 tfBox.parent.removeChild(tfBox);
//             }
//             if(this.center_box.numChildren==0)//没有元素了则移除父容器
//             {
//                 this.center_box.removeSelf();

//             }
//             //执行下一个
//             this.doAddCenterTip_up();
//         }
//         //设置缓动
//         let delay:number = 0.5*1000;
//         let tt1:number = 0.2*1000;//渐现时间
//         let tt2:number = 0.5*1000;//渐隐时间
//         let duration:number = delay + tt1 + tt2;
//         let from:number = 0;
//         let to:number = duration;
//         TimerManager.createOneOffExactTimer(duration,from,to,onUpdate, onComplete);

//     }





//     /**
//      * 更新位置
//      *
//      */
//     public resize():void {
//         let sw:number = GameInstance.scene.sceneConfig.width;
//         let sh:number = GameInstance.scene.sceneConfig.height;
//         let id:string;
//         let arr:Array<any>;
//         let attackFace:Laya.Sprite;

//         //图片提示
//         for(id in this._tipContainer) {
//             arr = this._tipContainer[id];
//             attackFace = arr[0];
//             attackFace.x = sw * arr[1]-attackFace.width*.5;
//             attackFace.y = sh * arr[2];
//         }

//         //普通文字提示
//         let tf:Label;
//         for(id in this._txtTipContainer) {
//             arr = this._txtTipContainer[id];
//             tf = arr[0];
//             tf.x = sw * arr[1] - tf.width*.5;
//             tf.y = sh * arr[2];
//         }

//         //系统滚动公告提示
//         let rollWidth:number = Math.max(sw*TopTipManager.SYSTEM_ROLL_WIDTH_SCALE, TopTipManager.SYSTEM_ROLL_WIDTH_MIN);
//         //设置背景
//         this.setSystemRollAreaBg(rollWidth);
//         //重设滚动器最大宽
//         RollText.resetMaxWidth(rollWidth);
//         //重设容器位置
//         this.system_roll_box.x = sw*TopTipManager.SYSTEM_ROLL_U - rollWidth/2;
//         this.system_roll_box.y = sh*TopTipManager.SYSTEM_ROLL_V ;
//         // this.system_roll_box_mask.x = sw*TopTipManager.SYSTEM_ROLL_U - rollWidth/2;
//         // this.system_roll_box_mask.y = sh*TopTipManager.SYSTEM_ROLL_V;


//         //系统切出公告提示
//         this.system_switch_box.x = sw*TopTipManager.SYSTEM_SWITCH_U;
//         this.system_switch_box.y = sh*TopTipManager.SYSTEM_SWITCH_V;

//         //角色脚下文本提示
//         this.char_foot_box.x = sw*TopTipManager.CHAR_FOOT_U;
//         this.char_foot_box.y = sh*TopTipManager.CHAR_FOOT_V;

//         //屏幕中央提示
//         this.center_box.x = sw*TopTipManager.CENTER_U;
//         this.center_box.y = sh*TopTipManager.CENTER_V;
//     }

//     /**
//      * 显示特殊提示，比如BOSS、精英怪、硕鼠、极品装备等
//      * @param $msg
//      * @param $x
//      * @param $y
//      *
//      */
//     public showSpecialTip($msg:string, $x:number, $y:number):void {
//         return;//暂时屏蔽
//         // let p0:Point = new Point($x, $y);
//         // let p1:Point = new Point(GameInstance.mainChar.tileX, GameInstance.mainChar.tileY);
//         // let angle:number = ZMath.GetTowPointsAngle(p0,p1);
//         // angle = ZMath.GetNearAngel(angle+90);//(angle-90);
//         // let dir:string;
//         // switch(angle) {
//         //     case 0:
//         //         dir = "↑";
//         //         break;
//         //     case 45:
//         //         dir = "↗";
//         //         break;
//         //     case 90:
//         //         dir = "→";
//         //         break;
//         //     case 135:
//         //         dir = "↘";
//         //         break;
//         //     case 180:
//         //         dir = "↓";
//         //         break;
//         //     case 225:
//         //         dir = "↙";
//         //         break;
//         //     case 270:
//         //         dir = "←";
//         //         break;
//         //     case 315:
//         //         dir = "↖";
//         //         break;

//         // }
//         // NoticeManager.notify(NoticeManager.SYSTEM_RIGHT, $msg + "," + "位置:"+ dir, false);
//     }
// }