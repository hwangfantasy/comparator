package com.hwangfantasy.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import com.hwangfantasy.task.DynamicScheduledTask;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: CoreService. <br/>
 */
@Service
public class CoreService implements ApplicationContextAware {
    private ApplicationContext applicationContext;

    private static final Logger logger = LoggerFactory.getLogger(CoreService.class);

    public DynamicScheduledTask getInstance(String taskName) {
        try {
            DynamicScheduledTask task = (DynamicScheduledTask) applicationContext.getBean(taskName.toLowerCase());
            return task;
        } catch (Exception e) {
            logger.error("获取DynamicScheduledTask异常", e);
            return null;
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
