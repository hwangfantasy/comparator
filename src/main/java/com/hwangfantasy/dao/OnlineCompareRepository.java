package com.hwangfantasy.dao;

import com.hwangfantasy.bean.OnlineCompare;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/22 <br/>
 * @方法描述: OnlineCompareRepository. <br/>
 */
@Repository
public interface OnlineCompareRepository extends CrudRepository<OnlineCompare,Long> {
}
