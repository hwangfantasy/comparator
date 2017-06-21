package com.hwangfantasy.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.util.concurrent.ScheduledFuture;

/**
 * @作者 yunfeiyang
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: OnlineCompareTask. <br/>
 */
@Service("onlinecomparetask")
public class OnlineCompareTask implements DynamicScheduledTask{

    @Autowired
    public ThreadPoolTaskScheduler threadPoolTaskScheduler;

    public ScheduledFuture<?> future;

    @Override
    public String startCron(String cron) {
        future = threadPoolTaskScheduler.schedule(new OnlineCompareRunnable(), new CronTrigger(cron));
        System.out.println("OnlineCompareTask.startCron()");
        return "start OnlineCompareTask  success";
    }

    @Override
    public String stopCron() {
        if (future != null) {
            future.cancel(true);
        }
        System.out.println("OnlineCompareTask.stopCron()");
        return "stop OnlineCompareTask success";
    }

    @Override
    public String changeCron(String cron) {
        stopCron();// 先停止，在开启.
        future = threadPoolTaskScheduler.schedule(new OnlineCompareRunnable(), new CronTrigger(cron));
        System.out.println("OnlineCompareTask.changeCron()");
        return "change OnlineCompareTask success";
    }

    private class OnlineCompareRunnable implements Runnable{
        @Override
        public void run() {
            System.out.println("OnlineCompareRunnable,what's up!");
        }
    }
}
