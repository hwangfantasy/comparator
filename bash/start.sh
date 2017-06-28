#!/usr/bin/env bash
java -verbose:gc -Dfile.encoding=UTF-8 -Dserver.port=9527 -Xms128m -Xmx1024m -XX:PermSize=64M -XX:MaxNewSize=256m -XX:MaxPermSize=512m -jar comparator.jar > /dev/null 2>&1 &