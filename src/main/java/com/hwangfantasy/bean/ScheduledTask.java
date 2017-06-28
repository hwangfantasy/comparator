package com.hwangfantasy.bean;

import javax.persistence.*;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/22 <br/>
 * @方法描述: ScheduledTask. <br/>
 */
@Entity
public class ScheduledTask {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String taskName;

    @Column
    private String cron;

    @Column
    private Boolean hasStarted;

    @Column
    private Boolean available;

    public ScheduledTask() {
    }

    public ScheduledTask(String taskName, String cron, Boolean hasStarted, Boolean available) {
        this.taskName = taskName;
        this.cron = cron;
        this.hasStarted = hasStarted;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }

    public Boolean getHasStarted() {
        return hasStarted;
    }

    public void setHasStarted(Boolean hasStarted) {
        this.hasStarted = hasStarted;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
