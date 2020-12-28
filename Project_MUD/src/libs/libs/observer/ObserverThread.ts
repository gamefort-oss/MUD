module tlibs
{
    /*
    * gkf;
    */
    export class ObserverThread{

        /**
         * @private
         * 观察者集
         */		
        private _observerMap: Object = {};

        constructor(){

        }

        /**
         * 清除所有观察者
         */
        public clear():void
        {
            this._observerMap = {};
        }
        /**
         * 注册观察者
         * 注意应保证同一notificationName注册的Observer的notifyContext的唯一性
         * @param $notificationName
         * @param $observer
         * 
         */	
        public registerObserver ($notificationName:any, $observer:puremvc.Observer) : void
        {
            if( this._observerMap[ $notificationName ] != null ) {
                this._observerMap[ $notificationName ].push( $observer );
            } else {
                this._observerMap[ $notificationName ] = [ $observer ];	
            }
        }
        /**
         * 移除观察者
         * @param $notificationName
         * @param $notifyContext
         * 
         */	
        public removeObserver($notificationName:any, $notifyContext:any) : void
        {
            let observers:Array<puremvc.Observer> = this._observerMap[ $notificationName ] as Array<puremvc.Observer>;
            
            //查找并移除
            let i:number;
            for (i = 0; i<observers.length; i++ ) 
            {
                // let observer:Observer = new Observer(observers[i].compareNotifyContext, $notifyContext);
                if ( (observers[i] as puremvc.Observer).compareNotifyContext( $notifyContext ) ) {
                    observers.splice(i,1);
                    break;
                }
            }
            
            //如果没有观察者再注意此通知，则移除对于这个通知的观察数组
            if ( observers.length == 0 ) {
                delete this._observerMap[ $notificationName ];
            }
        }
        
        
        
        /**
         * 将数据通知观察者
         * @param $notification
         * @param $parameters 复合观察者回调参数的参数数组
         */
        public notifyObservers($notification:puremvc.Notification) : void
        {
            let observers_ref:Array<puremvc.Observer> = this._observerMap[ $notification.getName() ] as Array<puremvc.Observer>;
            if( observers_ref != null ) {
                let observers:Array<puremvc.Observer> = new Array(); 
                let observer:puremvc.Observer;
                let i:number;
                
                //检索出所有观察此消息号的回调函数,因为在执行回调的过程中observers_ref这个数组可能发生改变，所以需要这样操作
                for (i = 0; i < observers_ref.length; i++) { 
                    observer = observers_ref[ i ];
                    observers.push( observer );
                }
                
                //执行所有观察此消息号的回调函数
                for (i = 0; i < observers.length; i++) {
                    observer = observers[ i ] as puremvc.Observer;
                    observer.notifyObserver($notification);
                }
            }
        }


    }
}