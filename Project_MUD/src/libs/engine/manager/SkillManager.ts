/*
* gkf;
*/
class SkillManager{

    public static index:number = 0;
    public static useSkill:number = 0;
    public static findCanUseSkill():number
    {
        // let skillArr:Array<Skill> = GameInstance.mainCharData.skillInfo.getWuGong2();

        // if(SkillConst.USESKILL != 0)
        // {
        //     this.useSkill = SkillConst.USESKILL;
        //     // SkillConst.USESKILL = 0;
        //     return this.useSkill;
        // }

        // for(let i:number = this.index; i < skillArr.length; i ++)
        // {
        //     (i >= skillArr.length - 1) ? this.index = 0 : this.index = i + 1;
        //     //检查CD冷却(这里没有检查攻击状态)
        //     if(CDFaceManager.isCooling(skillArr[i].getID()))
        //     {
        //         NoticeManager.notify(NoticeManager.SYSTEM_RIGHT, ("该技能处于冷却时间内"),false);
        //     }
        //     else
        //     {
        //         return skillArr[i].id;
        //     }
        // }
        return 10000;//0;
    }


}