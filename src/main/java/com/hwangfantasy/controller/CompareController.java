package com.hwangfantasy.controller;

import com.hwangfantasy.bean.OnlineCompare;
import com.hwangfantasy.bean.ScheduledTask;
import com.hwangfantasy.dao.OnlineCompareRepository;
import com.hwangfantasy.dao.ScheduledTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/22 <br/>
 * @方法描述: CompareController. <br/>
 */
@RestController
@RequestMapping("/compare")
public class CompareController {
    @Autowired
    private OnlineCompareRepository onlineCompareRepository;

    @Autowired
    private ScheduledTaskRepository scheduledTaskRepository;

    @RequestMapping("/testOnlineCompare")
    public Object testOnlineCompare() {
        OnlineCompare onlineCompare = onlineCompareRepository.findOne((long) 1);
        return onlineCompare != null ? onlineCompare : "no data!";
    }

    @RequestMapping("/testScheduledTask")
    public Object testScheduledTask() {
        ScheduledTask scheduledTask = scheduledTaskRepository.findOne((long) 1);
        return scheduledTask != null ? scheduledTask : "no data!";
    }
}
