package com.hwangfantasy.service;

import com.hwangfantasy.dao.bean.ScheduledTask;
import com.hwangfantasy.dao.bean.ScheduledTaskExample;
import com.hwangfantasy.dao.persistence.ScheduledTaskMapper;
import com.hwangfantasy.task.OnlineCompareTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @作者 yunfeiyang
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: ScheduledTaskService. <br/>
 */
@Service
public class ScheduledTaskService {
    @Autowired
    private ScheduledTaskMapper scheduledTaskMapper;

    @Transactional(rollbackFor = Exception.class)
    public boolean addScheduledTask(String taskName,String cron){
        ScheduledTask scheduledTask = new ScheduledTask();
        scheduledTask.withAvailable(true).withTaskName(taskName).withCron(cron).withHasStarted(true);
        return scheduledTaskMapper.insertSelective(scheduledTask) > 0;
    }

    public List<ScheduledTask> selectAvailabeTask(){
        ScheduledTaskExample scheduledTaskExample = new ScheduledTaskExample();
        ScheduledTaskExample.Criteria criteria = scheduledTaskExample.createCriteria();
        criteria.andAvailableEqualTo(true);
        return scheduledTaskMapper.selectByExample(scheduledTaskExample);
    }

    @Transactional(rollbackFor = Exception.class)
    public boolean updateTaskStarted(Integer id){
        ScheduledTask scheduledTask = scheduledTaskMapper.selectByPrimaryKey(id);
        scheduledTask.withHasStarted(true);
        return scheduledTaskMapper.updateByPrimaryKeySelective(scheduledTask) > 0 ;
    }

    @Transactional(rollbackFor = Exception.class)
    public boolean updateTaskFinish(Integer id){
        ScheduledTask scheduledTask = scheduledTaskMapper.selectByPrimaryKey(id);
        scheduledTask.withHasStarted(false);
        return scheduledTaskMapper.updateByPrimaryKeySelective(scheduledTask) > 0 ;
    }

    public List<ScheduledTask> selectUnStartedTask(){
        ScheduledTaskExample scheduledTaskExample = new ScheduledTaskExample();
        ScheduledTaskExample.Criteria criteria = scheduledTaskExample.createCriteria();
        criteria.andAvailableEqualTo(true).andHasStartedEqualTo(false);
        return scheduledTaskMapper.selectByExample(scheduledTaskExample);
    }
}
