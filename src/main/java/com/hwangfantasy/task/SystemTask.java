package com.hwangfantasy.task;


import com.hwangfantasy.bean.ScheduledTask;
import com.hwangfantasy.service.CoreService;
import com.hwangfantasy.service.ScheduledTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: SystemTask. <br/>
 */
@Component
public class SystemTask {
    private static final Logger logger = LoggerFactory.getLogger(SystemTask.class);
    @Autowired
    private ScheduledTaskService scheduledTaskService;
    @Autowired
    private CoreService coreService;
    /***
     * 一小时一次,启动未执行的任务
     */
    @Scheduled(fixedRate = 1000 * 60 * 60)
    public synchronized void startUnStartedTasks() {
        List<ScheduledTask> taskList = scheduledTaskService.selectUnStartedTask();
        for (ScheduledTask task : taskList) {
            try {
                DynamicScheduledTask dynamicScheduledTask = coreService.getInstance(task.getTaskName());
                dynamicScheduledTask.startCron(task.getCron());
                scheduledTaskService.updateTaskStarted(task.getId());
            } catch (Exception e) {
                logger.info("系统定时查看并启动定时任务：{} 任务启动异常", task.getTaskName());
                scheduledTaskService.updateTaskFinish(task.getId());
            }
        }
        logger.info("系统定时查看并启动定时任务：{} 项任务", taskList.size());
    }
}
