package com.hwangfantasy.task;

import com.hwangfantasy.bean.OnlineCompare;
import com.hwangfantasy.compare.Comparator;
import com.hwangfantasy.dao.OnlineCompareRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MarkerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ScheduledFuture;


/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: OnlineCompareTask. <br/>
 */
@Service("onlinecomparetask")
public class OnlineCompareTask implements DynamicScheduledTask {

    @Autowired
    public ThreadPoolTaskScheduler threadPoolTaskScheduler;

    public ScheduledFuture<?> future;

    @Autowired
    private OnlineCompareRepository onlineCompareRepository;

    @Autowired
    private Comparator comparator;

    private static Logger Logger = LoggerFactory.getLogger(OnlineCompareTask.class);

    @Override
    public String startCron(String cron) {
        future = threadPoolTaskScheduler.schedule(new OnlineCompareRunnable(), new CronTrigger(cron));
        System.out.println("OnlineCompareTask.startCron()");
        return "start OnlineCompareTask success";
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

    private class OnlineCompareRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("OnlineCompareRunnable,what's up!");
            List<OnlineCompare> onlineCompares = (List<OnlineCompare>) onlineCompareRepository.findAll();
            for (OnlineCompare compare : onlineCompares) {
                if (comparator.compare(compare.getUrl())) {
                    Logger.info(compare.getUrl() + "没变");
                } else {
                    System.out.println(compare.getUrl() + "改变，请及时更新!");
                    Logger.error(MarkerFactory.getMarker("NOTIFY_ADMIN"),compare.getUrl() + "改变，请及时更新!");
                }
            }
        }
    }
}
