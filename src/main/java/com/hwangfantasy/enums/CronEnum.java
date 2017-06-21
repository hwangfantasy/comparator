package com.hwangfantasy.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * @作者 yunfeiyang
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: CronEnum. <br/>
 */

public enum CronEnum {
    EVERYTENSECOND("*/10 * * * * ?","每10秒"),
    EVERYFIVEMINUTE("0 0/5 * * * ?","每5分钟"),
    EVERYONEHOUR("0 0 0/1 * * ?","每1小时"),
    EVERYDAYONECLOCK("0 0 1 * * ?","每天1点");

    private String cron;
    private String desc;

    CronEnum(String cron, String desc) {
        this.cron = cron;
        this.desc = desc;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    private static Map<String, CronEnum> cronDescMap = new HashMap<String, CronEnum>();

    static {
        for (CronEnum type : EnumSet.allOf(CronEnum.class)) {
            cronDescMap.put(type.getDesc(), type);
        }
    }

    public static CronEnum getCronEnumByDesc(String cronDesc) {
        return cronDescMap.get(cronDesc);
    }
}
