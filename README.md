## Backend - Auto Power Management System

This repo contains the backend structure for the web app of the Automatic Power Management System, with Multi-Grid Power Supply: a final year project for Group 1, Computer Engineering, University of Ilorin.

Live Link - https://autopms.onrender.com/api/v1

### Entities

1. User - A user would have a **name**, **meter-number**, **email**, and **password**.

### Schema of Entities

1. **User:**

```
name:{
    type: String,
    required: true
},
meterNumber:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
}
```

### API Endpoints

1. **Users**

   _NOTE_: that no 2 users are allowed to have the same email address

```
POST /api/v1/auth/register  - Create a new user
{
    "email": "abc@gmail.com",
    "password": "test123"
}

POST /api/v1/auth/login     - Login a user
{
    "email": "abc@gmail.com",
    "password": "test123"
}
```

### Authors

- Damilare Taofeek O. : 17/30GR023
- Eniojukan Daniel O. : 17/30GR028
- Johnson, Goodness O. : 17/30GR032
- Owoleke Victor F. : 15/30GR069
- Sodiq Farihan A. : 17/30GR058
- Tella Goodness O. : 17/30GR060
