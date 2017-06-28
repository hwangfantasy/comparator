package com.hwangfantasy.dao;

import com.hwangfantasy.bean.ScheduledTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/22 <br/>
 * @方法描述: ScheduledTaskRepository. <br/>
 */
@Repository
public interface ScheduledTaskRepository extends JpaRepository<ScheduledTask,Long> {

    @Query(value="SELECT *from scheduled_task WHERE available = TRUE ",nativeQuery=true)
    @Modifying
    public List<ScheduledTask> selectAllAvailableTask();

    @Query(value="SELECT *from scheduled_task WHERE available = TRUE AND  has_started = FALSE ",nativeQuery=true)
    @Modifying
    public List<ScheduledTask> selectUnStartedTask();
}
