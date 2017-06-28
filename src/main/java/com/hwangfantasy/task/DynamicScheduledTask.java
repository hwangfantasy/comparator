package com.hwangfantasy.task;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: DynamicScheduledTask. <br/>
 */

public interface DynamicScheduledTask {
    public String startCron(String cron);

    public String stopCron();

    public String changeCron(String cron);
}
