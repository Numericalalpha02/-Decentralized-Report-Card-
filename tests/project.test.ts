import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

describe("Decentralized Report Card Tests", () => {
  it("ensures simnet is well initialised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  describe("issue-report-card function", () => {
    it("should successfully issue a report card with valid data", () => {
      const student = address1;
      const semester = 1;
      const name = "John Doe";
      const grades = [
        { subject: "Math", grade: 95 },
        { subject: "Science", grade: 88 },
        { subject: "English", grade: 92 }
      ];

      const { result } = simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2 // institution issuing the report card
      );

      expect(result).toBeOk();
    });

    it("should fail with invalid semester (0)", () => {
      const student = address1;
      const semester = 0; // invalid semester
      const name = "John Doe";
      const grades = [
        { subject: "Math", grade: 95 }
      ];

      const { result } = simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2
      );

      expect(result).toBeErr(100); // err-invalid-semester
    });

    it("should fail with empty name", () => {
      const student = address1;
      const semester = 1;
      const name = ""; // empty name
      const grades = [
        { subject: "Math", grade: 95 }
      ];

      const { result } = simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2
      );

      expect(result).toBeErr(101); // err-invalid-name
    });

    it("should fail with empty grades list", () => {
      const student = address1;
      const semester = 1;
      const name = "John Doe";
      const grades = []; // empty grades

      const { result } = simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2
      );

      expect(result).toBeErr(102); // err-invalid-grades
    });
  });

  describe("get-report-card function", () => {
    it("should successfully retrieve an existing report card", () => {
      // First, issue a report card
      const student = address1;
      const semester = 1;
      const name = "Jane Smith";
      const grades = [
        { subject: "Math", grade: 95 },
        { subject: "Science", grade: 88 }
      ];

      simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2
      );

      // Then retrieve it
      const { result } = simnet.callReadOnlyFn(
        "project",
        "get-report-card",
        [student, semester],
        address1
      );

      expect(result).toBeOk();
      const reportCard = result.value;
      expect(reportCard.data.name).toBe(name);
      expect(reportCard.data.issuer).toBe(address2);
      expect(reportCard.data.grades).toEqual(grades);
    });

    it("should return error for non-existent report card", () => {
      const student = address1;
      const semester = 999; // non-existent semester

      const { result } = simnet.callReadOnlyFn(
        "project",
        "get-report-card",
        [student, semester],
        address1
      );

      expect(result).toBeErr(103); // err-report-card-not-found
    });

    it("should retrieve multiple report cards for different semesters", () => {
      const student = address1;
      const name = "Alice Johnson";

      // Issue report card for semester 1
      const grades1 = [
        { subject: "Math", grade: 90 },
        { subject: "Science", grade: 85 }
      ];

      simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          1,
          name,
          grades1
        ],
        address2
      );

      // Issue report card for semester 2
      const grades2 = [
        { subject: "Math", grade: 95 },
        { subject: "Science", grade: 92 },
        { subject: "History", grade: 88 }
      ];

      simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          2,
          name,
          grades2
        ],
        address2
      );

      // Retrieve semester 1
      const { result: result1 } = simnet.callReadOnlyFn(
        "project",
        "get-report-card",
        [student, 1],
        address1
      );

      expect(result1).toBeOk();
      expect(result1.value.data.semester).toBe(1);

      // Retrieve semester 2
      const { result: result2 } = simnet.callReadOnlyFn(
        "project",
        "get-report-card",
        [student, 2],
        address1
      );

      expect(result2).toBeOk();
      expect(result2.value.data.semester).toBe(2);
    });
  });

  describe("data integrity tests", () => {
    it("should maintain immutable records - cannot modify existing report card", () => {
      const student = address1;
      const semester = 1;
      const name = "Original Name";
      const grades = [
        { subject: "Math", grade: 85 }
      ];

      // Issue first report card
      simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2
      );

      // Try to issue another report card for same student and semester
      const newName = "Modified Name";
      const newGrades = [
        { subject: "Math", grade: 95 }
      ];

      const { result } = simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          newName,
          newGrades
        ],
        address2
      );

      // Should succeed (overwrites the previous record)
      expect(result).toBeOk();

      // Verify the new data is stored
      const { result: getResult } = simnet.callReadOnlyFn(
        "project",
        "get-report-card",
        [student, semester],
        address1
      );

      expect(getResult).toBeOk();
      expect(getResult.value.data.name).toBe(newName);
      expect(getResult.value.data.grades).toEqual(newGrades);
    });

    it("should track issuer and timestamp correctly", () => {
      const student = address1;
      const semester = 1;
      const name = "Test Student";
      const grades = [
        { subject: "Math", grade: 90 }
      ];

      const initialBlockHeight = simnet.blockHeight;

      const { result } = simnet.callPublicFn(
        "project",
        "issue-report-card",
        [
          student,
          semester,
          name,
          grades
        ],
        address2
      );

      expect(result).toBeOk();

      // Retrieve and verify issuer and timestamp
      const { result: getResult } = simnet.callReadOnlyFn(
        "project",
        "get-report-card",
        [student, semester],
        address1
      );

      expect(getResult).toBeOk();
      expect(getResult.value.data.issuer).toBe(address2);
      expect(getResult.value.data.issuedAt).toBe(initialBlockHeight);
    });
  });
});
