# JSON Schema Examples

This document provides various JSON schema examples you can use with the Dynamic UI Renderer.

## Basic Examples

### 1. Simple Contact Form

```json
[
  {
    "type": "div",
    "header": "Contact Us",
    "children": [
      {
        "type": "input",
        "name": "name",
        "placeholder": "Your Name"
      },
      {
        "type": "input",
        "name": "email",
        "placeholder": "Your Email"
      },
      {
        "type": "input",
        "name": "message",
        "placeholder": "Your Message"
      },
      {
        "type": "button",
        "label": "Send Message"
      }
    ]
  }
]
```

### 2. Login Form

```json
[
  {
    "type": "div",
    "header": "Login",
    "children": [
      {
        "type": "input",
        "name": "username",
        "placeholder": "Username"
      },
      {
        "type": "input",
        "name": "password",
        "placeholder": "Password"
      },
      {
        "type": "button",
        "label": "Sign In"
      }
    ]
  }
]
```

### 3. Newsletter Signup

```json
[
  {
    "type": "div",
    "header": "Subscribe to Newsletter",
    "children": [
      {
        "type": "input",
        "name": "email",
        "placeholder": "Enter your email"
      },
      {
        "type": "button",
        "label": "Subscribe"
      }
    ]
  }
]
```

## Intermediate Examples

### 4. User Registration Form

```json
[
  {
    "type": "div",
    "header": "Create Account",
    "children": [
      {
        "type": "div",
        "header": "Personal Information",
        "children": [
          {
            "type": "input",
            "name": "firstName",
            "placeholder": "First Name"
          },
          {
            "type": "input",
            "name": "lastName",
            "placeholder": "Last Name"
          },
          {
            "type": "input",
            "name": "email",
            "placeholder": "Email Address"
          }
        ]
      },
      {
        "type": "div",
        "header": "Account Details",
        "children": [
          {
            "type": "input",
            "name": "username",
            "placeholder": "Username"
          },
          {
            "type": "input",
            "name": "password",
            "placeholder": "Password"
          },
          {
            "type": "input",
            "name": "confirmPassword",
            "placeholder": "Confirm Password"
          }
        ]
      },
      {
        "type": "button",
        "label": "Create Account"
      }
    ]
  }
]
```

### 5. Shipping Address Form

```json
[
  {
    "type": "div",
    "header": "Shipping Address",
    "children": [
      {
        "type": "input",
        "name": "fullName",
        "placeholder": "Full Name"
      },
      {
        "type": "input",
        "name": "addressLine1",
        "placeholder": "Address Line 1"
      },
      {
        "type": "input",
        "name": "addressLine2",
        "placeholder": "Address Line 2 (Optional)"
      },
      {
        "type": "div",
        "header": "Location",
        "children": [
          {
            "type": "input",
            "name": "city",
            "placeholder": "City"
          },
          {
            "type": "input",
            "name": "state",
            "placeholder": "State/Province"
          },
          {
            "type": "input",
            "name": "zipCode",
            "placeholder": "ZIP/Postal Code"
          },
          {
            "type": "input",
            "name": "country",
            "placeholder": "Country"
          }
        ]
      },
      {
        "type": "button",
        "label": "Save Address"
      }
    ]
  }
]
```

## Advanced Examples

### 6. Multi-Section Form

```json
[
  {
    "type": "div",
    "header": "Employee Information",
    "children": [
      {
        "type": "div",
        "header": "Personal Details",
        "children": [
          {
            "type": "input",
            "name": "firstName",
            "placeholder": "First Name"
          },
          {
            "type": "input",
            "name": "lastName",
            "placeholder": "Last Name"
          },
          {
            "type": "input",
            "name": "dateOfBirth",
            "placeholder": "Date of Birth"
          }
        ]
      },
      {
        "type": "div",
        "header": "Contact Information",
        "children": [
          {
            "type": "input",
            "name": "email",
            "placeholder": "Email"
          },
          {
            "type": "input",
            "name": "phone",
            "placeholder": "Phone Number"
          },
          {
            "type": "div",
            "header": "Address",
            "children": [
              {
                "type": "input",
                "name": "street",
                "placeholder": "Street Address"
              },
              {
                "type": "input",
                "name": "city",
                "placeholder": "City"
              },
              {
                "type": "input",
                "name": "state",
                "placeholder": "State"
              }
            ]
          }
        ]
      },
      {
        "type": "div",
        "header": "Employment Details",
        "children": [
          {
            "type": "input",
            "name": "employeeId",
            "placeholder": "Employee ID"
          },
          {
            "type": "input",
            "name": "department",
            "placeholder": "Department"
          },
          {
            "type": "input",
            "name": "position",
            "placeholder": "Position"
          },
          {
            "type": "input",
            "name": "startDate",
            "placeholder": "Start Date"
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit Application"
      }
    ]
  }
]
```

### 7. Survey Form

```json
[
  {
    "type": "div",
    "header": "Customer Satisfaction Survey",
    "children": [
      {
        "type": "div",
        "header": "About You",
        "children": [
          {
            "type": "input",
            "name": "name",
            "placeholder": "Your Name"
          },
          {
            "type": "input",
            "name": "email",
            "placeholder": "Your Email"
          }
        ]
      },
      {
        "type": "div",
        "header": "Product Feedback",
        "children": [
          {
            "type": "input",
            "name": "productUsed",
            "placeholder": "Which product did you use?"
          },
          {
            "type": "input",
            "name": "rating",
            "placeholder": "Rating (1-10)"
          },
          {
            "type": "input",
            "name": "experience",
            "placeholder": "Describe your experience"
          }
        ]
      },
      {
        "type": "div",
        "header": "Additional Comments",
        "children": [
          {
            "type": "input",
            "name": "suggestions",
            "placeholder": "Suggestions for improvement"
          },
          {
            "type": "input",
            "name": "wouldRecommend",
            "placeholder": "Would you recommend us?"
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit Survey"
      }
    ]
  }
]
```

### 8. Profile Settings

```json
[
  {
    "type": "div",
    "header": "Profile Settings",
    "children": [
      {
        "type": "div",
        "header": "Basic Information",
        "children": [
          {
            "type": "input",
            "name": "displayName",
            "placeholder": "Display Name"
          },
          {
            "type": "input",
            "name": "bio",
            "placeholder": "Short Bio"
          },
          {
            "type": "input",
            "name": "website",
            "placeholder": "Website URL"
          }
        ]
      },
      {
        "type": "div",
        "header": "Social Media",
        "children": [
          {
            "type": "input",
            "name": "twitter",
            "placeholder": "Twitter Handle"
          },
          {
            "type": "input",
            "name": "linkedin",
            "placeholder": "LinkedIn Profile"
          },
          {
            "type": "input",
            "name": "github",
            "placeholder": "GitHub Username"
          }
        ]
      },
      {
        "type": "div",
        "header": "Privacy Settings",
        "children": [
          {
            "type": "input",
            "name": "profileVisibility",
            "placeholder": "Profile Visibility"
          },
          {
            "type": "input",
            "name": "emailVisibility",
            "placeholder": "Show Email Publicly"
          }
        ]
      },
      {
        "type": "button",
        "label": "Update Profile"
      }
    ]
  }
]
```

## Tips for Creating Schemas

### Best Practices

1. **Group Related Fields**: Use nested `div` elements to group related inputs
2. **Clear Headers**: Use descriptive headers for each section
3. **Helpful Placeholders**: Provide clear placeholder text for inputs
4. **Logical Flow**: Order fields in a logical sequence
5. **Single Submit**: Include one submit button at the end

### Common Patterns

**Two-Column Layout:**
```json
{
  "type": "div",
  "children": [
    { "type": "input", "name": "firstName" },
    { "type": "input", "name": "lastName" }
  ]
}
```

**Section with Subsection:**
```json
{
  "type": "div",
  "header": "Main Section",
  "children": [
    {
      "type": "div",
      "header": "Subsection",
      "children": [...]
    }
  ]
}
```

**Multiple Buttons:**
```json
{
  "type": "div",
  "children": [
    { "type": "button", "label": "Submit" },
    { "type": "button", "label": "Cancel" },
    { "type": "button", "label": "Save Draft" }
  ]
}
```

### Validation Rules

Remember these constraints when creating schemas:
- Must be a valid JSON array
- Root must be an array of elements
- Each element must have a `type` field
- `div` can have optional `header` and `children`
- `input` must have `name` field
- `button` must have `label` field
- Nesting is supported through `children` arrays

## Testing Your Schemas

1. Copy any example above
2. Paste into the JSON input field
3. Watch the live preview update
4. Give it a unique name
5. Click "Save UI Schema"
6. View your rendered UI!

