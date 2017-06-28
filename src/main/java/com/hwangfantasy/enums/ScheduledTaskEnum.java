package com.hwangfantasy.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: ScheduledTaskEnum. <br/>
 */

public enum  ScheduledTaskEnum {
    ONLINECOMPARETASK("OnlineCompareTask")
    ;
    private String taskName;

    ScheduledTaskEnum(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    private static Map<String, ScheduledTaskEnum> taskMap = new HashMap<String, ScheduledTaskEnum>();

    static {
        for (ScheduledTaskEnum type : EnumSet.allOf(ScheduledTaskEnum.class)) {
            taskMap.put(type.toString(), type);
        }
    }

    public static ScheduledTaskEnum getTaskName(String taskName) {
        return taskMap.get(taskName.toUpperCase());
    }
}
