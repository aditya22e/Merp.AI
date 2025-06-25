```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── jwt/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── oauth/
│   │   │   │   ├── login/
│   │   │   │   └── callback/
│   │   ├── roadmap/
│   │   │   ├── generate/
│   │   │   └── [id]/
│   │   ├── notes/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │       └── questions/
│   │   ├── assessments/
│   │   │   └── [quizId]/
│   │   ├── chat/
│   │   │   ├── doubt/
│   │   │   ├── mentor/
│   │   │   └── history/
│   │   └── dashboard/
│   │       ├── learner/
│   │       └── analytics/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── roadmap/
│   │   │   └── page.tsx
│   │   ├── notes/
│   │   │   └── page.tsx
│   │   ├── assessments/
│   │   │   └── page.tsx
│   │   ├── chat/
│   │   │   ├── doubt/
│   │   │   │   └── page.tsx
│   │   │   └── mentor/
│   │   │       └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── OAuthButton.tsx
│   ├── dashboard/
│   │   ├── OnboardingForm.tsx
│   │   ├── RoadmapCard.tsx
│   │   ├── NotesList.tsx
│   │   ├── QuizComponent.tsx
│   │   ├── ChatWindow.tsx
│   │   └── AnalyticsChart.tsx
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Button.tsx
│   └── ui/
│       ├── Card.tsx
│       └── Input.tsx
├── lib/
│   ├── auth/
│   │   ├── jwt.ts
│   │   ├── oauth.ts
│   │   └── middleware.ts
│   ├── gemini/
│   │   ├── client.ts
│   │   ├── roadmap.ts
│   │   ├── notes.ts
│   │   ├── assessments.ts
│   │   ├── doubt.ts
│   │   └── mentor.ts
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   └── firestore.ts
│   └── utils/
│       ├── api.ts
│       ├── formatters.ts
│       └── validators.ts
├── types/
│   ├── auth.ts
│   ├── roadmap.ts
│   ├── notes.ts
│   ├── assessments.ts
│   ├── chat.ts
│   ├── dashboard.ts
│   └── user.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useRoadmap.ts
│   ├── useNotes.ts
│   ├── useAssessments.ts
│   ├── useChat.ts
│   └── useAnalytics.ts
├── styles/
│   ├── dashboard.css
│   ├── notes.css
│   └── chat.css
├── middleware.ts
└── constants.ts
```
