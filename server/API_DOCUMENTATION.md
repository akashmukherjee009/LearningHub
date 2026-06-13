# LearningHub API Documentation

Base URL:

```text
http://localhost:5000
```

## Health Check

URL:

```text
/
```

Method:

```text
GET
```

Demo response:

```json
{
  "message": "LearningHub API is running"
}
```

## Create Student User

Creates only the second user type: `student`.

URL:

```text
/api/users
```

Method:

```text
POST
```

Demo payload:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "password123",
  "collegeName": "ABC College",
  "class": "BCA 2nd Year",
  "address": "Salt Lake Sector V",
  "city": "Kolkata"
}
```

Demo response:

```json
{
  "_id": "user_id_here",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "role": "student",
  "collegeName": "ABC College",
  "class": "BCA 2nd Year",
  "address": "Salt Lake Sector V",
  "city": "Kolkata",
  "createdAt": "2026-06-12T00:00:00.000Z",
  "updatedAt": "2026-06-12T00:00:00.000Z"
}
```

## Login User

Logs in with email and password, then returns a JWT token.

URL:

```text
/api/users/login
```

Method:

```text
POST
```

Demo payload:

```json
{
  "email": "rahul@example.com",
  "password": "password123"
}
```

Demo response:

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "student",
    "collegeName": "ABC College",
    "class": "BCA 2nd Year",
    "address": "Salt Lake Sector V",
    "city": "Kolkata",
    "createdAt": "2026-06-12T00:00:00.000Z",
    "updatedAt": "2026-06-12T00:00:00.000Z"
  }
}
```

## Get Student Users

Returns all users with the `student` role.

URL:

```text
/api/users
```

Method:

```text
GET
```

Demo response:

```json
[
  {
    "_id": "user_id_here",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "student",
    "collegeName": "ABC College",
    "class": "BCA 2nd Year",
    "address": "Salt Lake Sector V",
    "city": "Kolkata",
    "createdAt": "2026-06-12T00:00:00.000Z",
    "updatedAt": "2026-06-12T00:00:00.000Z"
  }
]
```

## Update Logged-In User

Updates the authenticated user. Email and password cannot be changed from this API.

URL:

```text
/api/users/me
```

Method:

```text
PATCH
```

Headers:

```text
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

Allowed fields:

```text
name, collegeName, class, address, city
```

Demo payload:

```json
{
  "name": "Rahul Kumar Sharma",
  "collegeName": "XYZ College",
  "class": "BCA 3rd Year",
  "address": "New Town",
  "city": "Kolkata"
}
```

Demo response:

```json
{
  "_id": "user_id_here",
  "name": "Rahul Kumar Sharma",
  "email": "rahul@example.com",
  "role": "student",
  "collegeName": "XYZ College",
  "class": "BCA 3rd Year",
  "address": "New Town",
  "city": "Kolkata",
  "createdAt": "2026-06-12T00:00:00.000Z",
  "updatedAt": "2026-06-12T00:00:00.000Z"
}
```

## Create Course

Creates a course with optional modules.

URL:

```text
/api/courses
```

Method:

```text
POST
```

Demo payload:

```json
{
  "slug": "aiml",
  "title": "AI & Machine Learning",
  "description": "Master the fundamentals of Artificial Intelligence and Machine Learning.",
  "instructor": "Dr. Alan Turing",
  "duration": "10 hours",
  "level": "Advanced",
  "rating": 4.9,
  "img": "https://cdn3d.iconscout.com/3d/premium/thumb/artificial-intelligence-4996165-4159521.png",
  "modules": [
    {
      "title": "Introduction to AI",
      "description": "Learn the foundations of AI.",
      "duration": "45 min",
      "videoUrl": "https://example.com/video",
      "content": "Module notes",
      "order": 1
    }
  ]
}
```

## Get Courses

Returns all courses.

URL:

```text
/api/courses
```

Method:

```text
GET
```

## Get Course

Fetches one course by Mongo `_id` or `slug`.

URL:

```text
/api/courses/:courseId
```

Method:

```text
GET
```

Example:

```text
/api/courses/aiml
```

## Update Course

Updates one course by Mongo `_id` or `slug`.

URL:

```text
/api/courses/:courseId
```

Method:

```text
PATCH
```

Allowed fields:

```text
slug, title, description, instructor, duration, level, rating, img, modules
```

## Delete Course

Deletes one course by Mongo `_id` or `slug`.

URL:

```text
/api/courses/:courseId
```

Method:

```text
DELETE
```

## Add Course Module

Adds a module inside a course.

URL:

```text
/api/courses/:courseId/modules
```

Method:

```text
POST
```

Demo payload:

```json
{
  "title": "Supervised Learning",
  "description": "Regression and classification basics.",
  "duration": "60 min",
  "videoUrl": "https://example.com/video",
  "content": "Module notes",
  "order": 2
}
```

## Get Course Modules

Returns all modules for a course.

URL:

```text
/api/courses/:courseId/modules
```

Method:

```text
GET
```

## Get Course Module

Fetches one module inside a course.

URL:

```text
/api/courses/:courseId/modules/:moduleId
```

Method:

```text
GET
```

## Update Course Module

Updates one module inside a course.

URL:

```text
/api/courses/:courseId/modules/:moduleId
```

Method:

```text
PATCH
```

Allowed fields:

```text
title, description, duration, videoUrl, content, order
```

## Delete Course Module

Deletes one module inside a course.

URL:

```text
/api/courses/:courseId/modules/:moduleId
```

Method:

```text
DELETE
```

## Create Course Quiz

Creates one quiz for a course. A course can have only 2 quizzes. Each quiz must have exactly 10 questions, each question must have exactly 4 answers, and exactly 1 answer must be marked as correct.

URL:

```text
/api/courses/:courseId/quizzes
```

Method:

```text
POST
```

Demo payload:

```json
{
  "title": "AI Basics Quiz",
  "description": "Checks the basics of AI and ML.",
  "order": 1,
  "questions": [
    {
      "text": "What does AI stand for?",
      "order": 1,
      "answers": [
        { "text": "Artificial Intelligence", "isCorrect": true },
        { "text": "Automated Internet", "isCorrect": false },
        { "text": "Applied Interface", "isCorrect": false },
        { "text": "Advanced Input", "isCorrect": false }
      ]
    }
  ]
}
```

Note: the demo shows 1 question only to keep the example short. The real payload must include 10 questions.

## Get Course Quizzes

Fetches quizzes for a course by Mongo `_id` or `slug`. Correct answers are hidden in this response.

URL:

```text
/api/courses/:courseId/quizzes
```

Method:

```text
GET
```

## Get Quiz Questions

Fetches questions for one quiz. Correct answers are hidden so students cannot see the answers before submitting.

URL:

```text
/api/quizzes/:quizId/questions
```

Method:

```text
GET
```

Demo response:

```json
[
  {
    "_id": "question_id_here",
    "text": "What does AI stand for?",
    "order": 1,
    "answers": [
      { "_id": "answer_id_here", "text": "Artificial Intelligence" },
      { "_id": "answer_id_here", "text": "Automated Internet" },
      { "_id": "answer_id_here", "text": "Applied Interface" },
      { "_id": "answer_id_here", "text": "Advanced Input" }
    ]
  }
]
```

## Submit Quiz

Submits a student's selected answers, evaluates the score, and stores the attempt.

URL:

```text
/api/quizzes/:quizId/submit
```

Method:

```text
POST
```

Headers:

```text
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

Demo payload:

```json
{
  "answers": [
    {
      "questionId": "question_id_here",
      "answerId": "answer_id_here"
    }
  ]
}
```

Demo response:

```json
{
  "_id": "attempt_id_here",
  "course": "course_id_here",
  "quiz": "quiz_id_here",
  "student": "student_id_here",
  "score": 8,
  "totalQuestions": 10,
  "percentage": 80,
  "answers": [
    {
      "question": "question_id_here",
      "selectedAnswer": "answer_id_here",
      "isCorrect": true
    }
  ],
  "createdAt": "2026-06-12T00:00:00.000Z",
  "updatedAt": "2026-06-12T00:00:00.000Z"
}
```

## Update Quiz

Updates quiz title, description, order, or full questions array.

URL:

```text
/api/quizzes/:quizId
```

Method:

```text
PATCH
```

Allowed fields:

```text
title, description, order, questions
```

## Delete Quiz

Deletes a quiz and its saved attempts.

URL:

```text
/api/quizzes/:quizId
```

Method:

```text
DELETE
```

## Enroll In Course

Enrolls the logged-in student in a course. If the student is already enrolled, the existing enrollment is returned.

URL:

```text
/api/courses/:courseId/enroll
```

Method:

```text
POST
```

Headers:

```text
Authorization: Bearer jwt_token_here
```

## Fetch My Enrolled Courses

Fetches the logged-in student's enrolled courses, completion percentage, and a `certificateAvailable` flag when completion reaches 100%.

URL:

```text
/api/enrollments/me/courses
```

Method:

```text
GET
```

Headers:

```text
Authorization: Bearer jwt_token_here
```

Demo response:

```json
[
  {
    "enrollmentId": "enrollment_id_here",
    "enrollmentNo": "ENR-1234567890-ABCDEFGH",
    "course": {
      "_id": "course_id_here",
      "title": "AI & Machine Learning"
    },
    "completedModules": ["module_id_here"],
    "completionPercentage": 20,
    "certificateAvailable": false,
    "certificateNo": "",
    "certificateIssuedAt": null,
    "enrolledAt": "2026-06-12T00:00:00.000Z"
  }
]
```

## Update Course Progress

Updates the logged-in student's completed modules for an enrollment. When all course modules are completed, `completionPercentage` becomes `100` and certificate data is generated.

URL:

```text
/api/enrollments/:enrollmentId/progress
```

Method:

```text
PATCH
```

Headers:

```text
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

Demo payload:

```json
{
  "completedModules": ["module_id_1", "module_id_2"]
}
```

## Fetch Certificate Data

Fetches certificate data for an enrollment. Students can fetch only their own certificates. Admins can fetch any certificate. The certificate is available only after course completion reaches 100%.

URL:

```text
/api/certificates/:enrollmentId
```

Method:

```text
GET
```

Headers:

```text
Authorization: Bearer jwt_token_here
```

Demo response:

```json
{
  "certificateNo": "CERT-1234567890-ABCDEFGH",
  "issuedAt": "2026-06-12T00:00:00.000Z",
  "enrollmentNo": "ENR-1234567890-ABCDEFGH",
  "completionPercentage": 100,
  "student": {
    "_id": "student_id_here",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "collegeName": "ABC College",
    "class": "BCA 2nd Year",
    "city": "Kolkata"
  },
  "course": {
    "_id": "course_id_here",
    "title": "AI & Machine Learning",
    "duration": "10 hours",
    "level": "Advanced"
  }
}
```

## Admin Course Report

Returns each course with enrolled students, enrollment numbers, completion percentage, certificate details, and quiz attempts.

URL:

```text
/api/admin/reports/courses
```

Method:

```text
GET
```

Headers:

```text
Authorization: Bearer admin_jwt_token_here
```

Demo response:

```json
[
  {
    "course": {
      "_id": "course_id_here",
      "title": "AI & Machine Learning"
    },
    "totalStudents": 1,
    "certificatesIssued": 1,
    "students": [
      {
        "student": {
          "_id": "student_id_here",
          "name": "Rahul Sharma",
          "email": "rahul@example.com"
        },
        "enrollmentId": "enrollment_id_here",
        "enrollmentNo": "ENR-1234567890-ABCDEFGH",
        "completionPercentage": 100,
        "certificateAvailable": true,
        "certificateNo": "CERT-1234567890-ABCDEFGH",
        "certificateIssuedAt": "2026-06-12T00:00:00.000Z",
        "enrolledAt": "2026-06-12T00:00:00.000Z",
        "quizAttempts": [
          {
            "quiz": {
              "_id": "quiz_id_here",
              "title": "AI Basics Quiz"
            },
            "score": 8,
            "totalQuestions": 10,
            "percentage": 80,
            "submittedAt": "2026-06-12T00:00:00.000Z"
          }
        ]
      }
    ]
  }
]
```
