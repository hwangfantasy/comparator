package com.hwangfantasy.task;

import com.hwangfantasy.dao.bean.ScheduledTask;
import com.hwangfantasy.service.CoreService;
import com.hwangfantasy.service.ScheduledTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @作者 yunfeiyang
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: LaunchTask. <br/>
 */

@Component
public class LaunchTask implements InitializingBean {
    private static final Logger logger = LoggerFactory.getLogger(LaunchTask.class);
    @Autowired
    private ScheduledTaskService scheduledTaskService;
    @Autowired
    private CoreService coreService;

    @Override
    public void afterPropertiesSet() throws Exception {
        startAllAvailableScheduledTask();
    }

    /**
     * 启动所有可用的定时任务
     */
    private void startAllAvailableScheduledTask() {
        List<ScheduledTask> taskList = scheduledTaskService.selectAvailabeTask();
        for (ScheduledTask task : taskList) {
            try {
                DynamicScheduledTask dynamicScheduledTask = coreService.getInstance(task.getTaskName());
                dynamicScheduledTask.startCron(task.getCron());
                scheduledTaskService.updateTaskStarted(task.getId());
            } catch (Exception e) {
                logger.info("初始化启动定时任务：{} 任务启动异常", task.getTaskName());
                scheduledTaskService.updateTaskFinish(task.getId());
            }
        }
        logger.info("初始化启动所有定时任务：{} 项任务", taskList.size());
    }
}
