package com.hwangfantasy.mybatis;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import java.util.Properties;

/**
 * @author hwangfantasy
 * @创建时间: 2017/3/7 17:22 <br/>
 * @方法描述: MyBatisMapperScannerConfig. <br/>
 */
@Configuration
@AutoConfigureAfter(MyBatisConfig.class)
public class MyBatisMapperScannerConfig {

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        mapperScannerConfigurer.setBasePackage("com.hwangfantasy.dao");
        Properties properties = new Properties();
        properties.setProperty("dialect", "mysql");
        mapperScannerConfigurer.setProperties(properties);
        return mapperScannerConfigurer;
    }

}
