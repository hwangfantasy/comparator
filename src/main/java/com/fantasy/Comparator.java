package com.fantasy;

import java.util.*;
import java.util.regex.Pattern;

/**
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Functions for diff, match and patch.
 * Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 *
 * @author fraser@google.com (Neil Fraser)
 * Class containing the diff, match and patch methods.
 * Also contains the behaviour settings.
 *
 * Created by hwangfantasy on 2017/8/2.
 */
public class Comparator {


    private Pattern BLANKLINEEND
            = Pattern.compile("\\n\\r?\\n\\Z", Pattern.DOTALL);
    private Pattern BLANKLINESTART
            = Pattern.compile("\\A\\r?\\n\\r?\\n", Pattern.DOTALL);

    /**
     * Number of seconds to map a diff before giving up (0 for infinity).
     */
    public float Diff_Timeout = 1.0f;
    /**
     * Cost of an empty edit operation in terms of edit characters.
     */
    public short Diff_EditCost = 4;
    /**
     * The size beyond which the double-ended diff activates.
     * Double-ending is twice as fast, but less accurate.
     */
    public short Diff_DualThreshold = 32;


    /**
     * Find the differences between two texts.
     * Run a faster slightly less optimal diff
     * This method allows the 'checklines' of diff_main() to be optional.
     * Most of the time checklines is wanted, so default to true.
     * @param text1 Old string to be diffed.
     * @param text2 New string to be diffed.
     * @return Linked List of Diff objects.
     */
    public LinkedList<Difference> diff_main(String text1, String text2) {
        return diff_main(text1, text2, true);
    }

    /**
     * Find the differences between two texts.  Simplifies the problem by
     * stripping any common prefix or suffix off the texts before diffing.
     * @param text1 Old string to be diffed.
     * @param text2 New string to be diffed.
     * @param checklines Speedup flag.  If false, then don't run a
     *     line-level diff first to identify the changed areas.
     *     If true, then run a faster slightly less optimal diff
     * @return Linked List of Diff objects.
     */
    public LinkedList<Difference> diff_main(String text1, String text2,
                                      boolean checklines) {
        // Check for null inputs.
        if (text1 == null || text2 == null) {
            throw new IllegalArgumentException("Null inputs. (diff_main)");
        }

        // Check for equality (speedup).
        LinkedList<Difference> diffs;
        if (text1.equals(text2)) {
            diffs = new LinkedList<Difference>();
            diffs.add(new Difference(Operation.EQUAL, text1));
            return diffs;
        }

        // Trim off common prefix (speedup).
        int commonlength = diff_commonPrefix(text1, text2);
        String commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);

        // Trim off common suffix (speedup).
        commonlength = diff_commonSuffix(text1, text2);
        String commonsuffix = text1.substring(text1.length() - commonlength);
        text1 = text1.substring(0, text1.length() - commonlength);
        text2 = text2.substring(0, text2.length() - commonlength);

        // Compute the diff on the middle block.
        diffs = diff_compute(text1, text2, checklines);

        // Restore the prefix and suffix.
        if (commonprefix.length() != 0) {
            diffs.addFirst(new Difference(Operation.EQUAL, commonprefix));
        }
        if (commonsuffix.length() != 0) {
            diffs.addLast(new Difference(Operation.EQUAL, commonsuffix));
        }

        diff_cleanupMerge(diffs);
        return diffs;
    }

    /**
     * Convert a Diff list into a pretty HTML report.
     * @param diffs LinkedList of Diff objects.
     * @return HTML representation.
     */
    public String diff_prettyHtml(LinkedList<Difference> diffs) {
        StringBuilder html = new StringBuilder();
        int i = 0;
        for (Difference aDiff : diffs) {
            String text = aDiff.text.replace("&", "&amp;").replace("<", "&lt;")
                    .replace(">", "&gt;").replace("\n", "<BR>");
            switch (aDiff.operation) {
                case INSERT:
                    html.append("<INS STYLE=\"background:#E6FFE6;\" TITLE=\"i=").append(i)
                            .append("\">").append(text).append("</INS>");
                    break;
                case DELETE:
                    html.append("<DEL STYLE=\"background:#FFE6E6;\" TITLE=\"i=").append(i)
                            .append("\">").append(text).append("</DEL>");
                    break;
                case EQUAL:
                    //不处理相同的部分
                    html.append("<SPAN TITLE=\"i=").append(i).append("\">").append(text)
                            .append("</SPAN>");
                    break;
            }
            if (aDiff.operation != Operation.DELETE) {
                i += aDiff.text.length();
            }
        }
        return html.toString();
    }

    /**
     * Find the differences between two texts.  Assumes that the texts do not
     * have any common prefix or suffix.
     * @param text1 Old string to be diffed.
     * @param text2 New string to be diffed.
     * @param checklines Speedup flag.  If false, then don't run a
     *     line-level diff first to identify the changed areas.
     *     If true, then run a faster slightly less optimal diff
     * @return Linked List of Diff objects.
     */
    protected LinkedList<Difference> diff_compute(String text1, String text2,
                                            boolean checklines) {
        LinkedList<Difference> diffs = new LinkedList<Difference>();

        if (text1.length() == 0) {
            // Just add some text (speedup).
            diffs.add(new Difference(Operation.INSERT, text2));
            return diffs;
        }

        if (text2.length() == 0) {
            // Just delete some text (speedup).
            diffs.add(new Difference(Operation.DELETE, text1));
            return diffs;
        }

        String longtext = text1.length() > text2.length() ? text1 : text2;
        String shorttext = text1.length() > text2.length() ? text2 : text1;
        int i = longtext.indexOf(shorttext);
        if (i != -1) {
            // Shorter text is inside the longer text (speedup).
            Operation op = (text1.length() > text2.length()) ?
                    Operation.DELETE : Operation.INSERT;
            diffs.add(new Difference(op, longtext.substring(0, i)));
            diffs.add(new Difference(Operation.EQUAL, shorttext));
            diffs.add(new Difference(op, longtext.substring(i + shorttext.length())));
            return diffs;
        }
        longtext = shorttext = null;  // Garbage collect.

        // Check to see if the problem can be split in two.
        String[] hm = diff_halfMatch(text1, text2);
        if (hm != null) {
            // A half-match was found, sort out the return data.
            String text1_a = hm[0];
            String text1_b = hm[1];
            String text2_a = hm[2];
            String text2_b = hm[3];
            String mid_common = hm[4];
            // Send both pairs off for separate processing.
            LinkedList<Difference> diffs_a = diff_main(text1_a, text2_a, checklines);
            LinkedList<Difference> diffs_b = diff_main(text1_b, text2_b, checklines);
            // Merge the results.
            diffs = diffs_a;
            diffs.add(new Difference(Operation.EQUAL, mid_common));
            diffs.addAll(diffs_b);
            return diffs;
        }

        // Perform a real diff.
        if (checklines && (text1.length() < 100 || text2.length() < 100)) {
            checklines = false;  // Too trivial for the overhead.
        }
        List<String> linearray = null;
        if (checklines) {
            // Scan the text on a line-by-line basis first.
            LinesToCharsResult b = diff_linesToChars(text1, text2);
            text1 = b.chars1;
            text2 = b.chars2;
            linearray = b.lineArray;
        }

        diffs = diff_map(text1, text2);
        if (diffs == null) {
            // No acceptable result.
            diffs = new LinkedList<Difference>();
            diffs.add(new Difference(Operation.DELETE, text1));
            diffs.add(new Difference(Operation.INSERT, text2));
        }

        if (checklines) {
            // Convert the diff back to original text.
            diff_charsToLines(diffs, linearray);
            // Eliminate freak matches (e.g. blank lines)
            diff_cleanupSemantic(diffs);

            // Rediff any replacement blocks, this time character-by-character.
            // Add a dummy entry at the end.
            diffs.add(new Difference(Operation.EQUAL, ""));
            int count_delete = 0;
            int count_insert = 0;
            String text_delete = "";
            String text_insert = "";
            ListIterator<Difference> pointer = diffs.listIterator();
            Difference thisDiff = pointer.next();
            while (thisDiff != null) {
                switch (thisDiff.operation) {
                    case INSERT:
                        count_insert++;
                        text_insert += thisDiff.text;
                        break;
                    case DELETE:
                        count_delete++;
                        text_delete += thisDiff.text;
                        break;
                    case EQUAL:
                        // Upon reaching an equality, check for prior redundancies.
                        if (count_delete >= 1 && count_insert >= 1) {
                            // Delete the offending records and add the merged ones.
                            pointer.previous();
                            for (int j = 0; j < count_delete + count_insert; j++) {
                                pointer.previous();
                                pointer.remove();
                            }
                            for (Difference newDiff : diff_main(text_delete, text_insert, false)) {
                                pointer.add(newDiff);
                            }
                        }
                        count_insert = 0;
                        count_delete = 0;
                        text_delete = "";
                        text_insert = "";
                        break;
                }
                thisDiff = pointer.hasNext() ? pointer.next() : null;
            }
            diffs.removeLast();  // Remove the dummy entry at the end.
        }
        return diffs;
    }

    /**
     * Explore the intersection points between the two texts.
     * @param text1 Old string to be diffed.
     * @param text2 New string to be diffed.
     * @return LinkedList of Diff objects or null if no diff available.
     */
    protected LinkedList<Difference> diff_map(String text1, String text2) {
        long ms_end = System.currentTimeMillis() + (long) (Diff_Timeout * 1000);
        // Cache the text lengths to prevent multiple calls.
        int text1_length = text1.length();
        int text2_length = text2.length();
        int max_d = text1_length + text2_length - 1;
        boolean doubleEnd = Diff_DualThreshold * 2 < max_d;
        List<Set<Long>> v_map1 = new ArrayList<Set<Long>>();
        List<Set<Long>> v_map2 = new ArrayList<Set<Long>>();
        Map<Integer, Integer> v1 = new HashMap<Integer, Integer>();
        Map<Integer, Integer> v2 = new HashMap<Integer, Integer>();
        v1.put(1, 0);
        v2.put(1, 0);
        int x, y;
        Long footstep = 0L;  // Used to track overlapping paths.
        Map<Long, Integer> footsteps = new HashMap<Long, Integer>();
        boolean done = false;
        // If the total number of characters is odd, then the front path will
        // collide with the reverse path.
        boolean front = ((text1_length + text2_length) % 2 == 1);
        for (int d = 0; d < max_d; d++) {
            // Bail out if timeout reached.
            if (Diff_Timeout > 0 && System.currentTimeMillis() > ms_end) {
                return null;
            }

            // Walk the front path one step.
            v_map1.add(new HashSet<Long>());  // Adds at index 'd'.
            for (int k = -d; k <= d; k += 2) {
                if (k == -d || k != d && v1.get(k - 1) < v1.get(k + 1)) {
                    x = v1.get(k + 1);
                } else {
                    x = v1.get(k - 1) + 1;
                }
                y = x - k;
                if (doubleEnd) {
                    footstep = diff_footprint(x, y);
                    if (front && (footsteps.containsKey(footstep))) {
                        done = true;
                    }
                    if (!front) {
                        footsteps.put(footstep, d);
                    }
                }
                while (!done && x < text1_length && y < text2_length
                        && text1.charAt(x) == text2.charAt(y)) {
                    x++;
                    y++;
                    if (doubleEnd) {
                        footstep = diff_footprint(x, y);
                        if (front && (footsteps.containsKey(footstep))) {
                            done = true;
                        }
                        if (!front) {
                            footsteps.put(footstep, d);
                        }
                    }
                }
                v1.put(k, x);
                v_map1.get(d).add(diff_footprint(x, y));
                if (x == text1_length && y == text2_length) {
                    // Reached the end in single-path mode.
                    return diff_path1(v_map1, text1, text2);
                } else if (done) {
                    // Front path ran over reverse path.
                    v_map2 = v_map2.subList(0, footsteps.get(footstep) + 1);
                    LinkedList<Difference> a = diff_path1(v_map1, text1.substring(0, x),
                            text2.substring(0, y));
                    a.addAll(diff_path2(v_map2, text1.substring(x), text2.substring(y)));
                    return a;
                }
            }

            if (doubleEnd) {
                // Walk the reverse path one step.
                v_map2.add(new HashSet<Long>());  // Adds at index 'd'.
                for (int k = -d; k <= d; k += 2) {
                    if (k == -d || k != d && v2.get(k - 1) < v2.get(k + 1)) {
                        x = v2.get(k + 1);
                    } else {
                        x = v2.get(k - 1) + 1;
                    }
                    y = x - k;
                    footstep = diff_footprint(text1_length - x, text2_length - y);
                    if (!front && (footsteps.containsKey(footstep))) {
                        done = true;
                    }
                    if (front) {
                        footsteps.put(footstep, d);
                    }
                    while (!done && x < text1_length && y < text2_length
                            && text1.charAt(text1_length - x - 1)
                            == text2.charAt(text2_length - y - 1)) {
                        x++;
                        y++;
                        footstep = diff_footprint(text1_length - x, text2_length - y);
                        if (!front && (footsteps.containsKey(footstep))) {
                            done = true;
                        }
                        if (front) {
                            footsteps.put(footstep, d);
                        }
                    }
                    v2.put(k, x);
                    v_map2.get(d).add(diff_footprint(x, y));
                    if (done) {
                        // Reverse path ran over front path.
                        v_map1 = v_map1.subList(0, footsteps.get(footstep) + 1);
                        LinkedList<Difference> a
                                = diff_path1(v_map1, text1.substring(0, text1_length - x),
                                text2.substring(0, text2_length - y));
                        a.addAll(diff_path2(v_map2, text1.substring(text1_length - x),
                                text2.substring(text2_length - y)));
                        return a;
                    }
                }
            }
        }
        // Number of diffs equals number of characters, no commonality at all.
        return null;
    }

    /**
     * Do the two texts share a substring which is at least half the length of
     * the longer text?
     * @param text1 First string.
     * @param text2 Second string.
     * @return Five element String array, containing the prefix of text1, the
     *     suffix of text1, the prefix of text2, the suffix of text2 and the
     *     common middle.  Or null if there was no match.
     */
    protected String[] diff_halfMatch(String text1, String text2) {
        String longtext = text1.length() > text2.length() ? text1 : text2;
        String shorttext = text1.length() > text2.length() ? text2 : text1;
        if (longtext.length() < 10 || shorttext.length() < 1) {
            return null;  // Pointless.
        }

        // First check if the second quarter is the seed for a half-match.
        String[] hm1 = diff_halfMatchI(longtext, shorttext,
                (longtext.length() + 3) / 4);
        // Check again based on the third quarter.
        String[] hm2 = diff_halfMatchI(longtext, shorttext,
                (longtext.length() + 1) / 2);
        String[] hm;
        if (hm1 == null && hm2 == null) {
            return null;
        } else if (hm2 == null) {
            hm = hm1;
        } else if (hm1 == null) {
            hm = hm2;
        } else {
            // Both matched.  Select the longest.
            hm = hm1[4].length() > hm2[4].length() ? hm1 : hm2;
        }

        // A half-match was found, sort out the return data.
        if (text1.length() > text2.length()) {
            return hm;
            //return new String[]{hm[0], hm[1], hm[2], hm[3], hm[4]};
        } else {
            return new String[]{hm[2], hm[3], hm[0], hm[1], hm[4]};
        }
    }


    /**
     * Does a substring of shorttext exist within longtext such that the
     * substring is at least half the length of longtext?
     * @param longtext Longer string.
     * @param shorttext Shorter string.
     * @param i Start index of quarter length substring within longtext.
     * @return Five element String array, containing the prefix of longtext, the
     *     suffix of longtext, the prefix of shorttext, the suffix of shorttext
     *     and the common middle.  Or null if there was no match.
     */
    private String[] diff_halfMatchI(String longtext, String shorttext, int i) {
        // Start with a 1/4 length substring at position i as a seed.
        String seed = longtext.substring(i, i + longtext.length() / 4);
        int j = -1;
        String best_common = "";
        String best_longtext_a = "", best_longtext_b = "";
        String best_shorttext_a = "", best_shorttext_b = "";
        while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
            int prefixLength = diff_commonPrefix(longtext.substring(i),
                    shorttext.substring(j));
            int suffixLength = diff_commonSuffix(longtext.substring(0, i),
                    shorttext.substring(0, j));
            if (best_common.length() < suffixLength + prefixLength) {
                best_common = shorttext.substring(j - suffixLength, j)
                        + shorttext.substring(j, j + prefixLength);
                best_longtext_a = longtext.substring(0, i - suffixLength);
                best_longtext_b = longtext.substring(i + prefixLength);
                best_shorttext_a = shorttext.substring(0, j - suffixLength);
                best_shorttext_b = shorttext.substring(j + prefixLength);
            }
        }
        if (best_common.length() >= longtext.length() / 2) {
            return new String[]{best_longtext_a, best_longtext_b,
                    best_shorttext_a, best_shorttext_b, best_common};
        } else {
            return null;
        }
    }

    /**
     * Reorder and merge like edit sections.  Merge equalities.
     * Any edit section can move as long as it doesn't cross an equality.
     * @param diffs LinkedList of Diff objects.
     */
    public void diff_cleanupMerge(LinkedList<Difference> diffs) {
        diffs.add(new Difference(Operation.EQUAL, ""));  // Add a dummy entry at the end.
        ListIterator<Difference> pointer = diffs.listIterator();
        int count_delete = 0;
        int count_insert = 0;
        String text_delete = "";
        String text_insert = "";
        Difference thisDiff = pointer.next();
        Difference prevEqual = null;
        int commonlength;
        while (thisDiff != null) {
            switch (thisDiff.operation) {
                case INSERT:
                    count_insert++;
                    text_insert += thisDiff.text;
                    prevEqual = null;
                    break;
                case DELETE:
                    count_delete++;
                    text_delete += thisDiff.text;
                    prevEqual = null;
                    break;
                case EQUAL:
                    if (count_delete != 0 || count_insert != 0) {
                        // Delete the offending records.
                        pointer.previous();  // Reverse direction.
                        while (count_delete-- > 0) {
                            pointer.previous();
                            pointer.remove();
                        }
                        while (count_insert-- > 0) {
                            pointer.previous();
                            pointer.remove();
                        }
                        if (count_delete != 0 && count_insert != 0) {
                            // Factor out any common prefixies.
                            commonlength = diff_commonPrefix(text_insert, text_delete);
                            if (commonlength != 0) {
                                if (pointer.hasPrevious()) {
                                    thisDiff = pointer.previous();
                                    assert thisDiff.operation == Operation.EQUAL
                                            : "Previous diff should have been an equality.";
                                    thisDiff.text += text_insert.substring(0, commonlength);
                                    pointer.next();
                                } else {
                                    pointer.add(new Difference(Operation.EQUAL,
                                            text_insert.substring(0, commonlength)));
                                }
                                text_insert = text_insert.substring(commonlength);
                                text_delete = text_delete.substring(commonlength);
                            }
                            // Factor out any common suffixies.
                            commonlength = diff_commonSuffix(text_insert, text_delete);
                            if (commonlength != 0) {
                                thisDiff = pointer.next();
                                thisDiff.text = text_insert.substring(text_insert.length()
                                        - commonlength) + thisDiff.text;
                                text_insert = text_insert.substring(0, text_insert.length()
                                        - commonlength);
                                text_delete = text_delete.substring(0, text_delete.length()
                                        - commonlength);
                                pointer.previous();
                            }
                        }
                        // Insert the merged records.
                        if (text_delete.length() != 0) {
                            pointer.add(new Difference(Operation.DELETE, text_delete));
                        }
                        if (text_insert.length() != 0) {
                            pointer.add(new Difference(Operation.INSERT, text_insert));
                        }
                        // Step forward to the equality.
                        thisDiff = pointer.hasNext() ? pointer.next() : null;
                    } else if (prevEqual != null) {
                        // Merge this equality with the previous one.
                        prevEqual.text += thisDiff.text;
                        pointer.remove();
                        thisDiff = pointer.previous();
                        pointer.next();  // Forward direction
                    }
                    count_insert = 0;
                    count_delete = 0;
                    text_delete = "";
                    text_insert = "";
                    prevEqual = thisDiff;
                    break;
            }
            thisDiff = pointer.hasNext() ? pointer.next() : null;
        }
        // System.out.println(diff);
        if (diffs.getLast().text.length() == 0) {
            diffs.removeLast();  // Remove the dummy entry at the end.
        }

    /*
     * Second pass: look for single edits surrounded on both sides by equalities
     * which can be shifted sideways to eliminate an equality.
     * e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
     */
        boolean changes = false;
        // Create a new iterator at the start.
        // (As opposed to walking the current one back.)
        pointer = diffs.listIterator();
        Difference prevDiff = pointer.hasNext() ? pointer.next() : null;
        thisDiff = pointer.hasNext() ? pointer.next() : null;
        Difference nextDiff = pointer.hasNext() ? pointer.next() : null;
        // Intentionally ignore the first and last element (don't need checking).
        while (nextDiff != null) {
            if (prevDiff.operation == Operation.EQUAL &&
                    nextDiff.operation == Operation.EQUAL) {
                // This is a single edit surrounded by equalities.
                if (thisDiff.text.endsWith(prevDiff.text)) {
                    // Shift the edit over the previous equality.
                    thisDiff.text = prevDiff.text
                            + thisDiff.text.substring(0, thisDiff.text.length()
                            - prevDiff.text.length());
                    nextDiff.text = prevDiff.text + nextDiff.text;
                    pointer.previous(); // Walk past nextDiff.
                    pointer.previous(); // Walk past thisDiff.
                    pointer.previous(); // Walk past prevDiff.
                    pointer.remove(); // Delete prevDiff.
                    pointer.next(); // Walk past thisDiff.
                    thisDiff = pointer.next(); // Walk past nextDiff.
                    nextDiff = pointer.hasNext() ? pointer.next() : null;
                    changes = true;
                } else if (thisDiff.text.startsWith(nextDiff.text)) {
                    // Shift the edit over the next equality.
                    prevDiff.text += nextDiff.text;
                    thisDiff.text = thisDiff.text.substring(nextDiff.text.length())
                            + nextDiff.text;
                    pointer.remove(); // Delete nextDiff.
                    nextDiff = pointer.hasNext() ? pointer.next() : null;
                    changes = true;
                }
            }
            prevDiff = thisDiff;
            thisDiff = nextDiff;
            nextDiff = pointer.hasNext() ? pointer.next() : null;
        }
        // If shifts were made, the diff needs reordering and another shift sweep.
        if (changes) {
            diff_cleanupMerge(diffs);
        }
    }


    /**
     * Determine the common prefix of two strings
     * @param text1 First string.
     * @param text2 Second string.
     * @return The number of characters common to the start of each string.
     */
    public int diff_commonPrefix(String text1, String text2) {
        // Performance analysis: http://neil.fraser.name/news/2007/10/09/
        int n = Math.min(text1.length(), text2.length());
        for (int i = 0; i < n; i++) {
            if (text1.charAt(i) != text2.charAt(i)) {
                return i;
            }
        }
        return n;
    }
    /**
     * Determine the common suffix of two strings
     * @param text1 First string.
     * @param text2 Second string.
     * @return The number of characters common to the end of each string.
     */
    public int diff_commonSuffix(String text1, String text2) {
        // Performance analysis: http://neil.fraser.name/news/2007/10/09/
        int text1_length = text1.length();
        int text2_length = text2.length();
        int n = Math.min(text1_length, text2_length);
        for (int i = 1; i <= n; i++) {
            if (text1.charAt(text1_length - i) != text2.charAt(text2_length - i)) {
                return i - 1;
            }
        }
        return n;
    }

    /**
     * Split two texts into a list of strings.  Reduce the texts to a string of
     * hashes where each Unicode character represents one line.
     * @param text1 First string.
     * @param text2 Second string.
     * @return An object containing the encoded text1, the encoded text2 and
     *     the List of unique strings.  The zeroth element of the List of
     *     unique strings is intentionally blank.
     */
    protected LinesToCharsResult diff_linesToChars(String text1, String text2) {
        List<String> lineArray = new ArrayList<String>();
        Map<String, Integer> lineHash = new HashMap<String, Integer>();
        // e.g. linearray[4] == "Hello\n"
        // e.g. linehash.get("Hello\n") == 4

        // "\x00" is a valid character, but various debuggers don't like it.
        // So we'll insert a junk entry to avoid generating a null character.
        lineArray.add("");

        String chars1 = diff_linesToCharsMunge(text1, lineArray, lineHash);
        String chars2 = diff_linesToCharsMunge(text2, lineArray, lineHash);
        return new LinesToCharsResult(chars1, chars2, lineArray);
    }

    /**
     * Split a text into a list of strings.  Reduce the texts to a string of
     * hashes where each Unicode character represents one line.
     * @param text String to encode.
     * @param lineArray List of unique strings.
     * @param lineHash Map of strings to indices.
     * @return Encoded string.
     */
    private String diff_linesToCharsMunge(String text, List<String> lineArray,
                                          Map<String, Integer> lineHash) {
        int lineStart = 0;
        int lineEnd = -1;
        String line;
        StringBuilder chars = new StringBuilder();
        // Walk the text, pulling out a substring for each line.
        // text.split('\n') would would temporarily double our memory footprint.
        // Modifying text would create many large strings to garbage collect.
        while (lineEnd < text.length() - 1) {
            lineEnd = text.indexOf('\n', lineStart);
            if (lineEnd == -1) {
                lineEnd = text.length() - 1;
            }
            line = text.substring(lineStart, lineEnd + 1);
            lineStart = lineEnd + 1;

            if (lineHash.containsKey(line)) {
                chars.append(String.valueOf((char) (int) lineHash.get(line)));
            } else {
                lineArray.add(line);
                lineHash.put(line, lineArray.size() - 1);
                chars.append(String.valueOf((char) (lineArray.size() - 1)));
            }
        }
        return chars.toString();
    }

    /**
     * Rehydrate the text in a diff from a string of line hashes to real lines of
     * text.
     * @param diffs LinkedList of Diff objects.
     * @param lineArray List of unique strings.
     */
    protected void diff_charsToLines(LinkedList<Difference> diffs,
                                     List<String> lineArray) {
        StringBuilder text;
        for (Difference diff : diffs) {
            text = new StringBuilder();
            for (int y = 0; y < diff.text.length(); y++) {
                text.append(lineArray.get(diff.text.charAt(y)));
            }
            diff.text = text.toString();
        }
    }

    /**
     * Reduce the number of edits by eliminating semantically trivial equalities.
     * @param diffs LinkedList of Diff objects.
     */
    public void diff_cleanupSemantic(LinkedList<Difference> diffs) {
        if (diffs.isEmpty()) {
            return;
        }
        boolean changes = false;
        Stack<Difference> equalities = new Stack<Difference>();  // Stack of qualities.
        String lastequality = null; // Always equal to equalities.lastElement().text
        ListIterator<Difference> pointer = diffs.listIterator();
        // Number of characters that changed prior to the equality.
        int length_changes1 = 0;
        // Number of characters that changed after the equality.
        int length_changes2 = 0;
        Difference thisDiff = pointer.next();
        while (thisDiff != null) {
            if (thisDiff.operation == Operation.EQUAL) {
                // equality found
                equalities.push(thisDiff);
                length_changes1 = length_changes2;
                length_changes2 = 0;
                lastequality = thisDiff.text;
            } else {
                // an insertion or deletion
                length_changes2 += thisDiff.text.length();
                if (lastequality != null && (lastequality.length() <= length_changes1)
                        && (lastequality.length() <= length_changes2)) {
                    //System.out.println("Splitting: '" + lastequality + "'");
                    // Walk back to offending equality.
                    while (thisDiff != equalities.lastElement()) {
                        thisDiff = pointer.previous();
                    }
                    pointer.next();

                    // Replace equality with a delete.
                    pointer.set(new Difference(Operation.DELETE, lastequality));
                    // Insert a corresponding an insert.
                    pointer.add(new Difference(Operation.INSERT, lastequality));

                    equalities.pop();  // Throw away the equality we just deleted.
                    if (!equalities.empty()) {
                        // Throw away the previous equality (it needs to be reevaluated).
                        equalities.pop();
                    }
                    if (equalities.empty()) {
                        // There are no previous equalities, walk back to the start.
                        while (pointer.hasPrevious()) {
                            pointer.previous();
                        }
                    } else {
                        // There is a safe equality we can fall back to.
                        thisDiff = equalities.lastElement();
                        while (thisDiff != pointer.previous()) {
                            // Intentionally empty loop.
                        }
                    }

                    length_changes1 = 0;  // Reset the counters.
                    length_changes2 = 0;
                    lastequality = null;
                    changes = true;
                }
            }
            thisDiff = pointer.hasNext() ? pointer.next() : null;
        }

        if (changes) {
            diff_cleanupMerge(diffs);
        }
        diff_cleanupSemanticLossless(diffs);
    }


    /**
     * Look for single edits surrounded on both sides by equalities
     * which can be shifted sideways to align the edit to a word boundary.
     * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
     * @param diffs LinkedList of Diff objects.
     */
    public void diff_cleanupSemanticLossless(LinkedList<Difference> diffs) {
        String equality1, edit, equality2;
        String commonString;
        int commonOffset;
        int score, bestScore;
        String bestEquality1, bestEdit, bestEquality2;
        // Create a new iterator at the start.
        ListIterator<Difference> pointer = diffs.listIterator();
        Difference prevDiff = pointer.hasNext() ? pointer.next() : null;
        Difference thisDiff = pointer.hasNext() ? pointer.next() : null;
        Difference nextDiff = pointer.hasNext() ? pointer.next() : null;
        // Intentionally ignore the first and last element (don't need checking).
        while (nextDiff != null) {
            if (prevDiff.operation == Operation.EQUAL &&
                    nextDiff.operation == Operation.EQUAL) {
                // This is a single edit surrounded by equalities.
                equality1 = prevDiff.text;
                edit = thisDiff.text;
                equality2 = nextDiff.text;

                // First, shift the edit as far left as possible.
                commonOffset = diff_commonSuffix(equality1, edit);
                if (commonOffset != 0) {
                    commonString = edit.substring(edit.length() - commonOffset);
                    equality1 = equality1.substring(0, equality1.length() - commonOffset);
                    edit = commonString + edit.substring(0, edit.length() - commonOffset);
                    equality2 = commonString + equality2;
                }

                // Second, step character by character right, looking for the best fit.
                bestEquality1 = equality1;
                bestEdit = edit;
                bestEquality2 = equality2;
                bestScore = diff_cleanupSemanticScore(equality1, edit)
                        + diff_cleanupSemanticScore(edit, equality2);
                while (edit.length() != 0 && equality2.length() != 0
                        && edit.charAt(0) == equality2.charAt(0)) {
                    equality1 += edit.charAt(0);
                    edit = edit.substring(1) + equality2.charAt(0);
                    equality2 = equality2.substring(1);
                    score = diff_cleanupSemanticScore(equality1, edit)
                            + diff_cleanupSemanticScore(edit, equality2);
                    // The >= encourages trailing rather than leading whitespace on edits.
                    if (score >= bestScore) {
                        bestScore = score;
                        bestEquality1 = equality1;
                        bestEdit = edit;
                        bestEquality2 = equality2;
                    }
                }

                if (!prevDiff.text.equals(bestEquality1)) {
                    // We have an improvement, save it back to the diff.
                    if (bestEquality1.length() != 0) {
                        prevDiff.text = bestEquality1;
                    } else {
                        pointer.previous(); // Walk past nextDiff.
                        pointer.previous(); // Walk past thisDiff.
                        pointer.previous(); // Walk past prevDiff.
                        pointer.remove(); // Delete prevDiff.
                        pointer.next(); // Walk past thisDiff.
                        pointer.next(); // Walk past nextDiff.
                    }
                    thisDiff.text = bestEdit;
                    if (bestEquality2.length() != 0) {
                        nextDiff.text = bestEquality2;
                    } else {
                        pointer.remove(); // Delete nextDiff.
                        nextDiff = thisDiff;
                        thisDiff = prevDiff;
                    }
                }
            }
            prevDiff = thisDiff;
            thisDiff = nextDiff;
            nextDiff = pointer.hasNext() ? pointer.next() : null;
        }
    }

    /**
     * Compute a good hash of two integers.
     * @param x First int.
     * @param y Second int.
     * @return A long made up of both ints.
     */
    protected long diff_footprint(int x, int y) {
        // The maximum size for a long is 9,223,372,036,854,775,807
        // The maximum size for an int is 2,147,483,647
        // Two ints fit nicely in one long.
        long result = x;
        result = result << 32;
        result += y;
        return result;
    }

    /**
     * Work from the middle back to the start to determine the path.
     * @param v_map List of path sets.
     * @param text1 Old string fragment to be diffed.
     * @param text2 New string fragment to be diffed.
     * @return LinkedList of Diff objects.
     */
    protected LinkedList<Difference> diff_path1(List<Set<Long>> v_map,
                                          String text1, String text2) {
        LinkedList<Difference> path = new LinkedList<Difference>();
        int x = text1.length();
        int y = text2.length();
        Operation last_op = null;
        for (int d = v_map.size() - 2; d >= 0; d--) {
            while (true) {
                if (v_map.get(d).contains(diff_footprint(x - 1, y))) {
                    x--;
                    if (last_op == Operation.DELETE) {
                        path.getFirst().text = text1.charAt(x) + path.getFirst().text;
                    } else {
                        path.addFirst(new Difference(Operation.DELETE,
                                text1.substring(x, x + 1)));
                    }
                    last_op = Operation.DELETE;
                    break;
                } else if (v_map.get(d).contains(diff_footprint(x, y - 1))) {
                    y--;
                    if (last_op == Operation.INSERT) {
                        path.getFirst().text = text2.charAt(y) + path.getFirst().text;
                    } else {
                        path.addFirst(new Difference(Operation.INSERT,
                                text2.substring(y, y + 1)));
                    }
                    last_op = Operation.INSERT;
                    break;
                } else {
                    x--;
                    y--;
                    assert (text1.charAt(x) == text2.charAt(y))
                            : "No diagonal.  Can't happen. (diff_path1)";
                    if (last_op == Operation.EQUAL) {
                        path.getFirst().text = text1.charAt(x) + path.getFirst().text;
                    } else {
                        path.addFirst(new Difference(Operation.EQUAL, text1.substring(x, x + 1)));
                    }
                    last_op = Operation.EQUAL;
                }
            }
        }
        return path;
    }

    /**
     * Work from the middle back to the end to determine the path.
     * @param v_map List of path sets.
     * @param text1 Old string fragment to be diffed.
     * @param text2 New string fragment to be diffed.
     * @return LinkedList of Diff objects.
     */
    protected LinkedList<Difference> diff_path2(List<Set<Long>> v_map,
                                          String text1, String text2) {
        LinkedList<Difference> path = new LinkedList<Difference>();
        int x = text1.length();
        int y = text2.length();
        Operation last_op = null;
        for (int d = v_map.size() - 2; d >= 0; d--) {
            while (true) {
                if (v_map.get(d).contains(diff_footprint(x - 1, y))) {
                    x--;
                    if (last_op == Operation.DELETE) {
                        path.getLast().text += text1.charAt(text1.length() - x - 1);
                    } else {
                        path.addLast(new Difference(Operation.DELETE,
                                text1.substring(text1.length() - x - 1, text1.length() - x)));
                    }
                    last_op = Operation.DELETE;
                    break;
                } else if (v_map.get(d).contains(diff_footprint(x, y - 1))) {
                    y--;
                    if (last_op == Operation.INSERT) {
                        path.getLast().text += text2.charAt(text2.length() - y - 1);
                    } else {
                        path.addLast(new Difference(Operation.INSERT,
                                text2.substring(text2.length() - y - 1, text2.length() - y)));
                    }
                    last_op = Operation.INSERT;
                    break;
                } else {
                    x--;
                    y--;
                    assert (text1.charAt(text1.length() - x - 1)
                            == text2.charAt(text2.length() - y - 1))
                            : "No diagonal.  Can't happen. (diff_path2)";
                    if (last_op == Operation.EQUAL) {
                        path.getLast().text += text1.charAt(text1.length() - x - 1);
                    } else {
                        path.addLast(new Difference(Operation.EQUAL,
                                text1.substring(text1.length() - x - 1, text1.length() - x)));
                    }
                    last_op = Operation.EQUAL;
                }
            }
        }
        return path;
    }

    /**
     * Given two strings, compute a score representing whether the internal
     * boundary falls on logical boundaries.
     * Scores range from 5 (best) to 0 (worst).
     * @param one First string.
     * @param two Second string.
     * @return The score.
     */
    private int diff_cleanupSemanticScore(String one, String two) {
        if (one.length() == 0 || two.length() == 0) {
            // Edges are the best.
            return 5;
        }

        // Each port of this function behaves slightly differently due to
        // subtle differences in each language's definition of things like
        // 'whitespace'.  Since this function's purpose is largely cosmetic,
        // the choice has been made to use each language's native features
        // rather than force total conformity.
        int score = 0;
        // One point for non-alphanumeric.
        if (!Character.isLetterOrDigit(one.charAt(one.length() - 1))
                || !Character.isLetterOrDigit(two.charAt(0))) {
            score++;
            // Two points for whitespace.
            if (Character.isWhitespace(one.charAt(one.length() - 1))
                    || Character.isWhitespace(two.charAt(0))) {
                score++;
                // Three points for line breaks.
                if (Character.getType(one.charAt(one.length() - 1)) == Character.CONTROL
                        || Character.getType(two.charAt(0)) == Character.CONTROL) {
                    score++;
                    // Four points for blank lines.
                    if (BLANKLINEEND.matcher(one).find()
                            || BLANKLINESTART.matcher(two).find()) {
                        score++;
                    }
                }
            }
        }
        return score;
    }

}
