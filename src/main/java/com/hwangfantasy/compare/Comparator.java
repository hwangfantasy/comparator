package com.hwangfantasy.compare;

import com.hwangfantasy.util.DateUtil;
import com.hwangfantasy.util.HttpUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MarkerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/21 <br/>
 * @方法描述: Comparator. <br/>
 */
@Component
public class Comparator {
    private static final Logger LOGGER = LoggerFactory.getLogger(Comparator.class);
    private static final String DIR = System.getProperty("user.dir") + File.separator + "files" + File.separator;

    public boolean compare(String url) {
        try {
            File file = new File(DIR + DateUtil.getYMDTheDayBeforeYesterday() + getNameFromUrl(url));
            if (file.exists()) {
                file.delete();
            }
            HttpUtil.downloadFile(DIR + DateUtil.getYMD() + getNameFromUrl(url), url);

            if (compareSize(url) && compareFile(url)) {
                return true;
            }
        } catch (IOException e) {
            e.printStackTrace();
            LOGGER.error(MarkerFactory.getMarker("NOTIFY_ADMIN"), "{} 文件下载异常：{}", url, e.getMessage());
        }
        return false;
    }

    private boolean compareSize(String url) {
        File file = new File(DIR + DateUtil.getYMD() + getNameFromUrl(url));
        File yesterdayFile = new File(DIR + DateUtil.getYMDYesterday() + getNameFromUrl(url));
        if (!yesterdayFile.exists()) {
            LOGGER.error(MarkerFactory.getMarker("NOTIFY_ADMIN"), "{}的{}不存在", DateUtil.getYMDYesterday(),
                            getNameFromUrl(url));
            return false;
        } else {
            return file.length() == yesterdayFile.length();
        }
    }

    private boolean compareFile(String url) {
        String fileName1 = DIR + DateUtil.getYMD() + getNameFromUrl(url);
        String fileName2 = DIR + DateUtil.getYMDYesterday() + getNameFromUrl(url);
        return compareFile(fileName1, fileName2);
    }

    private boolean compareFile(String fileName1, String fileName2) {
        FileInputStream fis1 = null;
        FileInputStream fis2 = null;
        try {
            fis1 = new FileInputStream(fileName1);
            fis2 = new FileInputStream(fileName2);

            int len1 = fis1.available();// 返回总的字节数
            int len2 = fis2.available();

            if (len1 == len2) {// 长度相同，则比较具体内容
                // 建立两个字节缓冲区
                byte[] data1 = new byte[len1];
                byte[] data2 = new byte[len2];

                // 分别将两个文件的内容读入缓冲区
                fis1.read(data1);
                fis2.read(data2);

                // 依次比较文件中的每一个字节
                for (int i = 0; i < len1; i++) {
                    // 只要有一个字节不同，两个文件就不一样
                    if (data1[i] != data2[i]) {
                        System.out.println("文件内容不一样");
                        return false;
                    }
                }
                System.out.println("两个文件完全相同");
                return true;
            } else {
                // 长度不一样，文件肯定不同
                return false;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {// 关闭文件流，防止内存泄漏
            if (fis1 != null) {
                try {
                    fis1.close();
                } catch (IOException e) {
                    // 忽略
                    e.printStackTrace();
                }
            }
            if (fis2 != null) {
                try {
                    fis2.close();
                } catch (IOException e) {
                    // 忽略
                    e.printStackTrace();
                }
            }
        }
        return false;
    }

    private String getNameFromUrl(String url) {
        String[] urls = url.split("/");
        return urls[urls.length - 1];
    }
}
