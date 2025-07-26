;; Decentralized Report Card Contract
;; Immutable student performance logs on blockchain

;; Data variable to store contract owner (can be transferred)
(define-data-var contract-owner principal tx-sender)

;; Define error constants
(define-constant err-owner-only (err u100))
(define-constant err-unauthorized (err u101))
(define-constant err-invalid-grade (err u102))
(define-constant err-student-not-found (err u103))
(define-constant err-invalid-student-id (err u104))

;; Define data structures
(define-map student-records 
  { student-id: (string-ascii 50) }
  {
    student-name: (string-ascii 100),
    grades: (list 10 uint),
    subjects: (list 10 (string-ascii 30)),
    gpa: uint,
    timestamp: uint,
    academic-year: (string-ascii 10),
    institution: (string-ascii 100)
  }
)

;; Map to track authorized teachers/institutions
(define-map authorized-educators principal bool)

;; Helper function to get contract owner
(define-read-only (get-contract-owner)
  (ok (var-get contract-owner))
)

;; Function to transfer ownership (only current owner can call)
(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (var-set contract-owner new-owner)
    (ok true)
  )
)

;; Function 1: Add Student Record
;; Only authorized educators can add student performance records
(define-public (add-student-record 
  (student-id (string-ascii 50))
  (student-name (string-ascii 100))
  (grades (list 10 uint))
  (subjects (list 10 (string-ascii 30)))
  (gpa uint)
  (academic-year (string-ascii 10))
  (institution (string-ascii 100)))
  
  (begin
    ;; Check if caller is authorized (owner or authorized educator)
    (asserts! 
      (or 
        (is-eq tx-sender (var-get contract-owner))
        (default-to false (map-get? authorized-educators tx-sender))
      ) 
      err-unauthorized
    )
    
    ;; Validate student ID is not empty
    (asserts! (> (len student-id) u0) err-invalid-student-id)
    
    ;; Validate GPA is within reasonable range (0-400, representing 0.00-4.00)
    (asserts! (<= gpa u400) err-invalid-grade)
    
    ;; Store the student record (immutable once stored)
    (map-set student-records
      { student-id: student-id }
      {
        student-name: student-name,
        grades: grades,
        subjects: subjects,
        gpa: gpa,
        timestamp: burn-block-height,
        academic-year: academic-year,
        institution: institution
      }
    )
    
    (ok true)
  )
)

;; Function 2: Get Student Record
;; Anyone can read student records (public transparency)
(define-read-only (get-student-record (student-id (string-ascii 50)))
  (let 
    (
      (record (map-get? student-records { student-id: student-id }))
    )
    (match record
      student-data (ok (some student-data))
      (ok none)
    )
  )
)

;; Helper function to authorize educators (only owner can call)
(define-public (authorize-educator (educator principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (map-set authorized-educators educator true)
    (ok true)
  )
)

;; Helper function to revoke educator authorization (only owner can call)
(define-public (revoke-educator (educator principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) err-owner-only)
    (map-delete authorized-educators educator)
    (ok true)
  )
)

;; Helper function to check if educator is authorized
(define-read-only (is-authorized-educator (educator principal))
  (ok (default-to false (map-get? authorized-educators educator)))
)