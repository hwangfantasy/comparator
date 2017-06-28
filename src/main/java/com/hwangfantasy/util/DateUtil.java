package com.hwangfantasy.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: DateUtil. <br/>
 */

public class DateUtil {
    private static final String YMD = "yyyy-MM-dd";

    private static final SimpleDateFormat SDF_YMD = new SimpleDateFormat(YMD);

    public static String getYMD(){
        Date date = new Date();
        return SDF_YMD.format(date);
    }

    public static String getYMDYesterday(){
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE,-1);
        Date date = cal.getTime();
        return SDF_YMD.format(date);
    }

    public static String getYMDTheDayBeforeYesterday(){
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE,-2);
        Date date = cal.getTime();
        return SDF_YMD.format(date);
    }

    public static void main(String[] args){
        System.out.println(getYMD());
        System.out.println(getYMDYesterday());
    }

}
