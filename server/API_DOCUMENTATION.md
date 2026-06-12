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
