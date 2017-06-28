package com.hwangfantasy.bean;

import javax.persistence.*;

/**
 * @作者 hwangfantasy
 * @创建时间: 2017/6/22 <br/>
 * @方法描述: OnlineCompare. <br/>
 */
@Entity(name = "online_compare")
public class OnlineCompare {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "url")
    private String url;

    public OnlineCompare() {}

    public OnlineCompare(String url) {
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
