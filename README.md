## 文本比较
根据 google-diff-match-patch 进行修改
http://code.google.com/p/google-diff-match-patch/

---
## 使用方法
- 在pom文件中先添加仓库
```
 <repository> 
  <id>maven-repo-master</id>  
  <url>https://raw.github.com/hwangfantasy/maven-repo/fantasy-difference/</url>  
  <snapshots> 
    <enabled>true</enabled>  
    <updatePolicy>always</updatePolicy> 
  </snapshots> 
</repository>
```
- 然后再加入依赖
```
<dependency> 
   <groupId>com.hwangfantasy</groupId>
   <artifactId>fantasy-difference</artifactId>
   <version>1.0-SNAPSHOT</version>
</dependency>
```
---