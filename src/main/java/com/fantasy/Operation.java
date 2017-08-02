package com.fantasy;

/**
 * The data structure representing a diff is a Linked list of Diff objects:
 * {Diff(Operation.DELETE, "Hello"), Diff(Operation.INSERT, "Goodbye"),
 *  Diff(Operation.EQUAL, " world.")}
 * which means: delete "Hello", add "Goodbye" and keep " world."
 */
public enum Operation {
    /**
     * 删除
     */
    DELETE,
    /**
     * 插入
     */
    INSERT,
    /**
     * 相同
     */
    EQUAL
}
