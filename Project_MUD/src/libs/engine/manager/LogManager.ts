/**
 * 打印管理器
 */
class LogManager
{
    /**
     * 是否启用打印
     */
    public static enabled:boolean = true;

    /**
     * 输出一段打印
     * @param ___content 内容
     */
    public static Log(__content:string)
    {
        if(this.enabled)
        {
            egret.log(__content);
        }
    }

    public static LogError(__content:string)
    {
        if(this.enabled)
        {
            egret.log(__content);
        }
    }
}