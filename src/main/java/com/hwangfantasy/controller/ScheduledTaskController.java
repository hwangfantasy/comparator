package com.hwangfantasy.controller;

import com.hwangfantasy.enums.CronEnum;
import com.hwangfantasy.enums.ScheduledTaskEnum;
import com.hwangfantasy.service.CoreService;
import com.hwangfantasy.service.ScheduledTaskService;
import com.hwangfantasy.task.DynamicScheduledTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @作者 yunfeiyang
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: ScheduledTaskController. <br/>
 */
@RestController
@RequestMapping("comparator")
public class ScheduledTaskController {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledTaskController.class);
    @Autowired
    private ScheduledTaskService scheduledTaskService;
    @Autowired
    private CoreService coreService;

    @RequestMapping("/addScheduledTask")
    public String addScheduledTask(@RequestParam(value = "taskName") String taskName,
                    @RequestParam(value = "cronDesc") String cronDesc) {
        String task = "", cron = "";
        if (ScheduledTaskEnum.getTaskName(taskName) == null) {
            return "任务名不存在";
        } else {
            task = ScheduledTaskEnum.getTaskName(taskName).getTaskName();
        }

        if (CronEnum.getCronEnumByDesc(cronDesc) == null) {
            return "尚未添加此表达式";
        } else {
            cron = CronEnum.getCronEnumByDesc(cronDesc).getCron();
        }

        boolean success = scheduledTaskService.addScheduledTask(task, cron);
        if (success) {
            try {
                DynamicScheduledTask dynamicScheduledTask = coreService.getInstance(taskName);
                dynamicScheduledTask.startCron(cron);
            } catch (Exception e) {
                logger.info("Exception:" + e.getMessage());
                success = false;
            }

        }
        return success ? "成功" : "失败";
    }


}
