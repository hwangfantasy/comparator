package com.hwangfantasy.service;

import com.hwangfantasy.dao.ScheduledTaskRepository;
import com.hwangfantasy.bean.ScheduledTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: ScheduledTaskService. <br/>
 */
@Service
public class ScheduledTaskService {
    @Autowired
    private ScheduledTaskRepository scheduledTaskRepository;

    @Transactional(rollbackFor = Exception.class)
    public void addScheduledTask(String taskName,String cron){
        ScheduledTask scheduledTask = new ScheduledTask();
        scheduledTask.setAvailable(true);
        scheduledTask.setTaskName(taskName);
        scheduledTask.setCron(cron);
        scheduledTask.setHasStarted(true);
        scheduledTaskRepository.save(scheduledTask);
    }

    public List<ScheduledTask> selectAvailabeTask(){
        return scheduledTaskRepository.selectAllAvailableTask();
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateTaskStarted(Long id){
        ScheduledTask scheduledTask = scheduledTaskRepository.findOne(id);
        scheduledTask.setHasStarted(true);
        scheduledTaskRepository.save(scheduledTask);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateTaskFinish(Long id){
        ScheduledTask scheduledTask = scheduledTaskRepository.findOne(id);
        scheduledTask.setHasStarted(false);
        scheduledTaskRepository.save(scheduledTask);
    }

    public List<ScheduledTask> selectUnStartedTask(){
        return scheduledTaskRepository.selectUnStartedTask();
    }
}
