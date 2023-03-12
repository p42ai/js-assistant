import { createDiff } from "./createDiff";

it("should create a diff with no newline at the end", () => {
  expect(
    createDiff("filename", "line1\nline2", "line1andContent\nline2")
  ).toEqual(
    `--- /filename
+++ /filename
@@ -1,2 +1,2 @@
-line1
+line1andContent
 line2
\\ No newline at end of file
`
  );
});

it("should create a diff with existing newline at the end", () => {
  expect(
    createDiff("filename", "line1\nline2\n", "line1andContent\nline2\n")
  ).toEqual(
    `--- /filename
+++ /filename
@@ -1,2 +1,2 @@
-line1
+line1andContent
 line2
`
  );
});

it("should create a diff with removed newline at the end", () => {
  expect(createDiff("filename", "line1\nline2\n", "line1\nline2")).toEqual(
    `--- /filename
+++ /filename
@@ -1,2 +1,2 @@
 line1
-line2
+line2
\\ No newline at end of file
`
  );
});

it("should create a diff with added newline at the end", () => {
  expect(createDiff("filename", "line1\nline2", "line1\nline2\n")).toEqual(
    `--- /filename
+++ /filename
@@ -1,2 +1,2 @@
 line1
-line2
\\ No newline at end of file
+line2
`
  );
});

it("should mark all lines with operations", () => {
  expect(createDiff("filename", "a\nb\n", "c\nd\n")).toEqual(
    `--- /filename
+++ /filename
@@ -1,2 +1,2 @@
-a
-b
+c
+d
`
  );
});

it("should not produce overlapping hunks or larger than specified contexts", () => {
  expect(
    createDiff(
      "filename",
      "1\n2\nA\n4\nB\n6\nY\n8\n9\n10\nA\n14\nB\n16\nY\n18\n19\n20\n",
      "1\n2\nA\n4\nB\n6\nX\nX\n8\n9\n10\nA\n14\nB\n16\nX\nX\n18\n19\n20\n",
      3
    )
  ).toEqual(
    `--- /filename
+++ /filename
@@ -4,7 +4,8 @@
 4
 B
 6
-Y
+X
+X
 8
 9
 10
@@ -13,7 +13,8 @@
 14
 B
 16
-Y
+X
+X
 18
 19
 20
`
  );
});

it("should not cleanup hunk if it has no context in the beginning", () => {
  expect(
    createDiff(
      "filename",
      "1\n2\n3\n4\n5\n6\n6\n7\n8\n9\n10",
      "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\n10",
      3
    )
  ).toEqual(
    `--- /filename
+++ /filename
@@ -1,11 +1,11 @@
-1
-2
-3
-4
-5
-6
-6
-7
-8
-9
+A
+B
+C
+D
+E
+F
+G
+H
+I
+J
 10
\\ No newline at end of file
`
  );
});

it("should not cleanup hunk if it has no context in the end", () => {
  expect(
    createDiff(
      "filename",
      "1\n2\n3\n4\n5\n6\n6\n7\n8\n9\n10",
      "1\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK",
      3
    )
  ).toEqual(
    `--- /filename
+++ /filename
@@ -1,11 +1,11 @@
 1
-2
-3
-4
-5
-6
-6
-7
-8
-9
-10
\\ No newline at end of file
+B
+C
+D
+E
+F
+G
+H
+I
+J
+K
\\ No newline at end of file
`
  );
});
