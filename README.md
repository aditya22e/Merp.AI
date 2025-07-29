```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── jwt/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts
│   │   ├── roadmap/
│   │   │   ├── generate/
│   │   │   │   └── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── notes/
│   │   │   ├── create/
│   │   │   │   └── route.ts
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts
│   │   │   │   └── questions/
│   │   │   │       └── route.ts
│   │   ├── assessments/
│   │   │   ├── create/
│   │   │   │   └── route.ts
│   │   │   └── [quizId]/
│   │   │       └── route.ts
│   │   ├── chat/
│   │   │   ├── doubt/
│   │   │   │   └── route.ts
│   │   │   ├── mentor/
│   │   │   │   └── route.ts
│   │   │   └── history/
│   │   │       └── route.ts
│   │   ├── dashboard/
│   │   │   ├── learner/
│   │   │   │   └── route.ts
│   │   │   └── analytics/
│   │   │       └── route.ts
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
│   │   ├── NoteEditor.tsx
│   │   ├── QuestionPrompt.tsx
│   │   ├── QuizComponent.tsx
│   │   ├── ChatWindow.tsx
│   │   └── AnalyticsChart.tsx
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Button.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeatureCard.tsx
│   │   └── CallToAction.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Modal.tsx
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
│   ├── utils/
│   │   ├── api.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
├── types/
│   ├── auth.ts
│   ├── roadmap.ts
│   ├── notes.ts
│   ├── assessments.ts
│   ├── chat.ts
│   ├── dashboard.ts
│   ├── user.ts
│   └── home.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useRoadmap.ts
│   ├── useNotes.ts
│   ├── useAssessments.ts
│   ├── useChat.ts
│   ├── useAnalytics.ts
│   └── useHome.ts
├── styles/
│   ├── dashboard.css
│   ├── notes.css
│   ├── assessments.css
│   ├── chat.css
│   └── home.css
├── middleware.ts
└── constants.ts
```