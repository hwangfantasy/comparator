package com.hwangfantasy.task;

import com.hwangfantasy.bean.OnlineCompare;
import com.hwangfantasy.bean.ScheduledTask;
import com.hwangfantasy.dao.OnlineCompareRepository;
import com.hwangfantasy.dao.ScheduledTaskRepository;
import com.hwangfantasy.enums.CronEnum;
import com.hwangfantasy.enums.ScheduledTaskEnum;
import com.hwangfantasy.service.CoreService;
import com.hwangfantasy.service.ScheduledTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MarkerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @作者 hwangfantasy
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
    @Autowired
    private OnlineCompareRepository onlineCompareRepository;
    @Autowired
    private ScheduledTaskRepository scheduledTaskRepository;

    @Override
    public void afterPropertiesSet() throws Exception {
        logger.error(MarkerFactory.getMarker("NOTIFY_ADMIN"),"项目启动邮件测试正常!");
        initializeDB();
        startAllAvailableScheduledTask();
    }

    private void initializeDB(){
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/car_common.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/car_flow_base_info.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/car_flow_driven_license.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/carDriver.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/citySelect/cityCarIndex.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/common-calendar.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/common.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/getPolicyAddress.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/car_flow_quoted.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/car_flow_insurer_info.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/carProposal/car_flow_confirm.js"));
        onlineCompareRepository.save(new OnlineCompare("https://www.epicc.com.cn/wap/js/integration_push.js"));

        scheduledTaskRepository.save(new ScheduledTask(ScheduledTaskEnum.ONLINECOMPARETASK.getTaskName(), CronEnum.EVERYDAYFIFTEENCLOCK.getCron(),true,true));
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
                logger.error(MarkerFactory.getMarker("NOTIFY_ADMIN"),"初始化启动定时任务：{} 任务启动异常", task.getTaskName());
                scheduledTaskService.updateTaskFinish(task.getId());
            }
        }
        logger.info("初始化启动所有定时任务：{} 项任务", taskList.size());
    }
}
