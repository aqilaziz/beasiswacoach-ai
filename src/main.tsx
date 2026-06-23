import React, { useMemo, useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  Clipboard,
  Download,
  FileText,
  GraduationCap,
  Loader2,
  Mic,
  RefreshCw,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import "./styles.css";

type StudentProfile = {
  name: string;
  educationLevel: string;
  targetCountry: string;
  field: string;
  gpa: string;
  english: string;
  achievements: string;
  leadership: string;
  financialNeed: string;
  goal: string;
  deadline: string;
};

type Scholarship = {
  name: string;
  fit: number;
  reason: string;
  nextStep: string;
};

type ReadinessScore = {
  label: string;
  value: number;
  note: string;
};

const initialProfile: StudentProfile = {
  name: "Aqil Aziz",
  educationLevel: "SMA kelas 12 / gap year applicant",
  targetCountry:
    "Indonesia, Malaysia, Singapore, and fully funded online programs",
  field: "Artificial Intelligence, Computer Science, and Data Science",
  gpa: "88/100 average with strong math and computer subjects",
  english: "Intermediate English, preparing IELTS or Duolingo English Test",
  achievements:
    "Built small web apps, joined school technology activities, completed machine learning tutorials, and documented projects on GitHub.",
  leadership:
    "Helped classmates learn programming basics and organized small study groups for digital skills.",
  financialNeed:
    "Needs high scholarship coverage because family budget is limited and upfront application costs must be controlled.",
  goal: "Win a scholarship for an AI or Computer Science pathway and build a portfolio strong enough for internship opportunities.",
  deadline:
    "First strong submission package in 30 days, scholarship applications over the next 90 days.",
};

const scholarshipCatalog = [
  {
    name: "Indonesia Future AI Builder Grant",
    fieldBoost: ["artificial intelligence", "data science", "computer science"],
    countryBoost: ["indonesia", "online"],
    baseFit: 72,
    nextStep:
      "Prepare a 2-minute demo video, portfolio link, and one-page motivation statement.",
  },
  {
    name: "ASEAN Digital Talent Scholarship",
    fieldBoost: ["computer science", "data science", "software"],
    countryBoost: ["malaysia", "singapore", "asean"],
    baseFit: 68,
    nextStep:
      "Map achievements to regional impact and collect teacher recommendation letters.",
  },
  {
    name: "Need-Based Tech Access Fellowship",
    fieldBoost: ["technology", "artificial intelligence", "computer science"],
    countryBoost: ["online", "indonesia"],
    baseFit: 70,
    nextStep:
      "Document financial need clearly and show how the scholarship changes access to learning.",
  },
  {
    name: "Open Source Student Builder Award",
    fieldBoost: ["software", "computer science", "artificial intelligence"],
    countryBoost: ["global", "online"],
    baseFit: 64,
    nextStep:
      "Publish project README files, screenshots, and a short technical reflection.",
  },
];

function clamp(value: number, minimum = 0, maximum = 100) {
  return Math.max(minimum, Math.min(maximum, value));
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function calculateReadiness(profile: StudentProfile): ReadinessScore[] {
  const combined = Object.values(profile).join(" ").toLowerCase();
  const hasPortfolio = /github|portfolio|project|app|demo|website/.test(
    combined,
  );
  const hasLeadership = profile.leadership.trim().length > 70;
  const hasNeed = profile.financialNeed.trim().length > 70;
  const hasEnglishPlan =
    /ielts|duolingo|toefl|english|intermediate|advanced/.test(combined);
  const hasClearDeadline = /day|week|month|deadline|submission|90/.test(
    profile.deadline.toLowerCase(),
  );

  return [
    {
      label: "Academic fit",
      value: clamp(
        58 +
          (profile.gpa.length > 20 ? 18 : 8) +
          (profile.field.length > 25 ? 14 : 6),
      ),
      note: "Connect grades to target field with concrete evidence from math, computing, or research work.",
    },
    {
      label: "Portfolio strength",
      value: clamp(
        42 +
          (hasPortfolio ? 32 : 8) +
          (profile.achievements.length > 100 ? 18 : 8),
      ),
      note: "A visible portfolio is the fastest way to make an application credible beyond grades.",
    },
    {
      label: "Leadership story",
      value: clamp(48 + (hasLeadership ? 34 : 10)),
      note: "Scholarship reviewers look for people who create value for others, not only personal ambition.",
    },
    {
      label: "Need clarity",
      value: clamp(54 + (hasNeed ? 32 : 8)),
      note: "Need-based applications should be specific, respectful, and tied to the opportunity gap.",
    },
    {
      label: "Execution readiness",
      value: clamp(
        46 + (hasEnglishPlan ? 20 : 6) + (hasClearDeadline ? 24 : 8),
      ),
      note: "A deadline-backed plan keeps essays, references, test prep, and portfolio polish moving together.",
    },
  ];
}

function matchScholarships(profile: StudentProfile): Scholarship[] {
  const fieldText = profile.field.toLowerCase();
  const countryText = profile.targetCountry.toLowerCase();
  const combined = Object.values(profile).join(" ").toLowerCase();
  const portfolioBoost = /github|portfolio|project|app|demo/.test(combined)
    ? 8
    : 0;
  const needBoost = /limited|need|financial|budget|coverage/.test(combined)
    ? 7
    : 0;

  return scholarshipCatalog
    .map((item) => {
      const fieldBoost = includesAny(fieldText, item.fieldBoost) ? 10 : 0;
      const countryBoost = includesAny(countryText, item.countryBoost) ? 8 : 0;
      const fit = clamp(
        item.baseFit + fieldBoost + countryBoost + portfolioBoost + needBoost,
      );

      return {
        name: item.name,
        fit,
        reason: `${profile.field} aligns with this scholarship and the profile shows ${portfolioBoost ? "portfolio evidence" : "room to add portfolio evidence"}.`,
        nextStep: item.nextStep,
      };
    })
    .sort((first, second) => second.fit - first.fit);
}

function makeRoadmap(profile: StudentProfile) {
  return [
    {
      phase: "Next 7 days",
      actions: [
        `Write one clear scholarship thesis: ${profile.goal}`,
        "Create a portfolio page with 2-3 strongest projects, screenshots, and outcomes.",
        "List required documents, recommendation contacts, and application fees.",
      ],
    },
    {
      phase: "Days 8-30",
      actions: [
        "Draft the main motivation essay and one financial need statement.",
        "Record a 90-second spoken introduction for interview practice.",
        `Prepare proof for target region: ${profile.targetCountry}`,
      ],
    },
    {
      phase: "Days 31-60",
      actions: [
        "Submit the first complete application and ask one mentor for feedback.",
        "Improve English test readiness with weekly mock tests.",
        "Publish one technical reflection that links AI learning to community impact.",
      ],
    },
    {
      phase: "Days 61-90",
      actions: [
        "Apply to 3-5 scholarship tracks with adjusted essays for each audience.",
        "Practice interview answers for leadership, failure, financial need, and long-term goals.",
        "Track every deadline, status, and follow-up in a simple spreadsheet.",
      ],
    },
  ];
}

function makeEssayOutline(profile: StudentProfile) {
  return [
    `Opening: introduce ${profile.name} through a short moment that shows curiosity about ${profile.field}.`,
    `Problem: explain the access gap behind the financial need: ${profile.financialNeed}`,
    `Evidence: connect achievements to readiness: ${profile.achievements}`,
    `Leadership: show community value through this example: ${profile.leadership}`,
    `Future: close with the scholarship outcome and mission: ${profile.goal}`,
  ];
}

function makeInterviewQuestions(profile: StudentProfile) {
  return [
    `Why did you choose ${profile.field}, and what problem do you want to solve with it?`,
    "Tell us about one project that proves you can learn independently.",
    "How have you helped other people through your skills or leadership?",
    "Why do you need scholarship support, and how will you use it responsibly?",
    "What will you complete in the first 90 days after receiving support?",
  ];
}

function makeSubmissionSummary(
  profile: StudentProfile,
  readiness: number,
  topScholarship: Scholarship,
) {
  return `BeasiswaCoach AI helps ${profile.educationLevel} students build a scholarship strategy from scattered profile notes. For ${profile.name}, the app estimates ${readiness}/100 readiness, recommends ${topScholarship.name} as the strongest first target, and generates a roadmap, essay outline, interview practice, and submission checklist.`;
}

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type FeedbackEntry = {
  question: string;
  rating: "up" | "down";
  comment: string;
  timestamp: string;
};

type ApiMetrics = {
  totalRequests: number;
  totalTokens: number;
  averageResponseTime: number;
  cacheHits: number;
  lastResponseTime: number;
  lastTokenCount: number;
  rateLimitWarnings: number;
};

type ResponseQuality = {
  relevance: number;
  coherence: number;
  actionability: number;
  overall: number;
};

// Response cache to reduce redundant API calls (performance tuning)
const responseCache = new Map<string, string>();
const metricsHistory: ApiMetrics = {
  totalRequests: 0,
  totalTokens: 0,
  averageResponseTime: 0,
  cacheHits: 0,
  lastResponseTime: 0,
  lastTokenCount: 0,
  rateLimitWarnings: 0,
};

function cacheKey(profile: StudentProfile, messages: ChatMessage[]) {
  return JSON.stringify({ profile, messages });
}

function evaluateResponseQuality(
  response: string,
  profile: StudentProfile,
): ResponseQuality {
  const responseLower = response.toLowerCase();
  const profileText = Object.values(profile).join(" ").toLowerCase();

  // Relevance: check if response mentions profile-specific terms
  const profileKeywords = profileText
    .split(/\s+/)
    .filter((word) => word.length > 4);
  const mentionedKeywords = profileKeywords.filter((keyword) =>
    responseLower.includes(keyword),
  );
  const relevance = Math.min(
    100,
    Math.round(
      (mentionedKeywords.length / Math.max(profileKeywords.length, 1)) * 100,
    ),
  );

  // Coherence: check for structured content (bullet points, numbered lists, sections)
  const hasStructure = /(\d+\.|[-•]|\*\*|##)/.test(response);
  const hasParagraphs = response.split("\n\n").length > 2;
  const coherence = hasStructure ? 85 : hasParagraphs ? 70 : 50;

  // Actionability: check for actionable language
  const actionWords = [
    "should",
    "must",
    "need to",
    "consider",
    "try",
    "implement",
    "create",
    "build",
    "prepare",
    "submit",
  ];
  const actionCount = actionWords.filter((word) =>
    responseLower.includes(word),
  ).length;
  const actionability = Math.min(
    100,
    Math.round((actionCount / actionWords.length) * 100),
  );

  const overall = Math.round((relevance + coherence + actionability) / 3);

  return { relevance, coherence, actionability, overall };
}

function validateProfileInput(profile: StudentProfile): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!profile.name.trim()) {
    errors.push("Name is required");
  }

  if (!profile.educationLevel.trim()) {
    errors.push("Education level is required");
  }

  if (!profile.field.trim()) {
    errors.push("Target field is required");
  }

  if (profile.gpa.trim() && !/\d/.test(profile.gpa)) {
    errors.push("GPA should contain numbers");
  }

  if (profile.achievements.length < 20) {
    errors.push("Achievements section is too short (minimum 20 characters)");
  }

  if (profile.goal.length < 20) {
    errors.push("Goal section is too short (minimum 20 characters)");
  }

  return { isValid: errors.length === 0, errors };
}

function preprocessInput(text: string): string {
  // Remove extra whitespace and normalize
  return text
    .replace(/\s+/g, " ")
    .replace(/[^\w\s.,!?-]/g, "")
    .trim();
}

async function requestAiReview(
  profile: StudentProfile,
  apiKey: string,
  conversation: ChatMessage[],
  retryCount = 0,
): Promise<string> {
  const key = cacheKey(profile, conversation);
  const cached = responseCache.get(key);
  if (cached) {
    metricsHistory.cacheHits++;
    return cached;
  }

  const systemMessage: ChatMessage = {
    role: "system",
    content:
      "You are a scholarship admissions coach for Indonesian students. Give practical, honest, specific advice. Avoid inventing real scholarship deadlines. Reference previous messages for context. Structure responses with clear sections and actionable steps.",
  };

  const startTime = performance.now();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...conversation],
      temperature: 0.35,
      max_tokens: 600,
    }),
  });

  const endTime = performance.now();
  const responseTime = Math.round(endTime - startTime);

  // Error handling: retry on rate-limit (429) or server error (5xx)
  if (!response.ok) {
    if (response.status === 429) {
      metricsHistory.rateLimitWarnings++;
    }
    if ((response.status === 429 || response.status >= 500) && retryCount < 2) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retryCount + 1)),
      );
      return requestAiReview(profile, apiKey, conversation, retryCount + 1);
    }
    throw new Error(
      `AI review failed with status ${response.status}. ${response.status === 401 ? "Check your API key." : "Try again later."}`,
    );
  }

  const data = await response.json();
  const content =
    data.choices?.[0]?.message?.content ?? "No AI review returned.";
  const tokenCount = data.usage?.total_tokens ?? 0;

  // Update metrics
  metricsHistory.totalRequests++;
  metricsHistory.totalTokens += tokenCount;
  metricsHistory.lastResponseTime = responseTime;
  metricsHistory.lastTokenCount = tokenCount;
  metricsHistory.averageResponseTime = Math.round(
    metricsHistory.totalRequests === 1
      ? responseTime
      : (metricsHistory.averageResponseTime *
          (metricsHistory.totalRequests - 1) +
          responseTime) /
          metricsHistory.totalRequests,
  );

  responseCache.set(key, content);
  return content;
}

function copyText(text: string) {
  navigator.clipboard?.writeText(text);
}

function downloadPack(
  profile: StudentProfile,
  readiness: ReadinessScore[],
  matches: Scholarship[],
) {
  const pack = {
    appName: "BeasiswaCoach AI",
    generatedAt: new Date().toISOString(),
    profile,
    readiness,
    scholarshipMatches: matches,
    roadmap: makeRoadmap(profile),
    essayOutline: makeEssayOutline(profile),
    interviewQuestions: makeInterviewQuestions(profile),
  };
  const blob = new Blob([JSON.stringify(pack, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "beasiswacoach-ai-application-pack.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [apiKey, setApiKey] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [feedbackLog, setFeedbackLog] = useState<FeedbackEntry[]>([]);
  const [cacheHits, setCacheHits] = useState(0);
  const [metrics, setMetrics] = useState<ApiMetrics>(metricsHistory);
  const [responseQuality, setResponseQuality] =
    useState<ResponseQuality | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const readiness = useMemo(() => calculateReadiness(profile), [profile]);
  const matches = useMemo(() => matchScholarships(profile), [profile]);
  const roadmap = useMemo(() => makeRoadmap(profile), [profile]);
  const essayOutline = useMemo(() => makeEssayOutline(profile), [profile]);
  const interviewQuestions = useMemo(
    () => makeInterviewQuestions(profile),
    [profile],
  );
  const readinessAverage = Math.round(
    readiness.reduce((total, item) => total + item.value, 0) / readiness.length,
  );
  const summary = makeSubmissionSummary(profile, readinessAverage, matches[0]);

  const updateProfile = (field: keyof StudentProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const scrollToChatBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const runReview = async () => {
    setError("");
    setValidationErrors([]);
    setIsLoading(true);

    // Validate profile before sending to API
    const validation = validateProfileInput(profile);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      if (!apiKey.trim()) {
        setAiFeedback(
          "Local AI coach mode: strengthen the profile by adding one public portfolio URL, one quantified leadership result, one English-test timeline, and one specific scholarship target. The application will feel stronger if every claim has proof: certificate, project link, screenshot, recommendation, or reflection.",
        );
        return;
      }
      const initialMessages: ChatMessage[] = [
        {
          role: "user",
          content: `Review this student profile and suggest the 5 highest-impact improvements: ${JSON.stringify(profile)}`,
        },
      ];
      setConversation(initialMessages);
      const feedback = await requestAiReview(
        profile,
        apiKey.trim(),
        initialMessages,
      );
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: feedback },
      ]);
      setAiFeedback(feedback);

      // Evaluate response quality
      const quality = evaluateResponseQuality(feedback, profile);
      setResponseQuality(quality);

      // Update metrics display
      setMetrics({ ...metricsHistory });
      setCacheHits(metricsHistory.cacheHits);

      scrollToChatBottom();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to run AI review.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !apiKey.trim()) return;
    setError("");
    setIsLoading(true);

    // Preprocess input
    const processedInput = preprocessInput(chatInput.trim());
    const userMessage: ChatMessage = { role: "user", content: processedInput };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setChatInput("");
    scrollToChatBottom();

    try {
      const reply = await requestAiReview(
        profile,
        apiKey.trim(),
        newConversation,
      );
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
      setAiFeedback(reply);

      // Evaluate response quality
      const quality = evaluateResponseQuality(reply, profile);
      setResponseQuality(quality);

      // Update metrics display
      setMetrics({ ...metricsHistory });
      setCacheHits(metricsHistory.cacheHits);

      scrollToChatBottom();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to get AI response.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const submitFeedback = (rating: "up" | "down") => {
    const entry: FeedbackEntry = {
      question: aiFeedback.slice(0, 200),
      rating,
      comment: "",
      timestamp: new Date().toISOString(),
    };
    setFeedbackLog((prev) => [...prev, entry]);
  };

  const clearCache = () => {
    responseCache.clear();
    setCacheHits(0);
  };

  return (
    <main className="app-shell">
      {/* API Metrics Dashboard */}
      {metrics.totalRequests > 0 && (
        <section className="metrics-dashboard">
          <div className="section-heading compact">
            <Zap size={20} />
            <h2>API Performance Metrics</h2>
          </div>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">Total Requests</span>
              <span className="metric-value">{metrics.totalRequests}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Total Tokens</span>
              <span className="metric-value">
                {metrics.totalTokens.toLocaleString()}
              </span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Avg Response Time</span>
              <span className="metric-value">
                {metrics.averageResponseTime}ms
              </span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Last Response</span>
              <span className="metric-value">{metrics.lastResponseTime}ms</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Cache Hits</span>
              <span className="metric-value">{metrics.cacheHits}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Rate Limit Warnings</span>
              <span className="metric-value">{metrics.rateLimitWarnings}</span>
            </div>
          </div>
        </section>
      )}

      {/* Response Quality Evaluation */}
      {responseQuality && (
        <section className="quality-evaluation">
          <div className="section-heading compact">
            <Target size={20} />
            <h2>Response Quality Score</h2>
          </div>
          <div className="quality-grid">
            <div className="quality-card">
              <span className="quality-label">Relevance</span>
              <div className="quality-bar">
                <div
                  className="quality-fill"
                  style={{ width: `${responseQuality.relevance}%` }}
                />
              </div>
              <span className="quality-score">
                {responseQuality.relevance}/100
              </span>
            </div>
            <div className="quality-card">
              <span className="quality-label">Coherence</span>
              <div className="quality-bar">
                <div
                  className="quality-fill"
                  style={{ width: `${responseQuality.coherence}%` }}
                />
              </div>
              <span className="quality-score">
                {responseQuality.coherence}/100
              </span>
            </div>
            <div className="quality-card">
              <span className="quality-label">Actionability</span>
              <div className="quality-bar">
                <div
                  className="quality-fill"
                  style={{ width: `${responseQuality.actionability}%` }}
                />
              </div>
              <span className="quality-score">
                {responseQuality.actionability}/100
              </span>
            </div>
            <div className="quality-card overall">
              <span className="quality-label">Overall</span>
              <div className="quality-bar">
                <div
                  className="quality-fill"
                  style={{ width: `${responseQuality.overall}%` }}
                />
              </div>
              <span className="quality-score">
                {responseQuality.overall}/100
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <section className="validation-errors">
          <div className="section-heading compact">
            <AlertCircle size={20} />
            <h2>Profile Validation Issues</h2>
          </div>
          <ul className="error-list">
            {validationErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="hero-panel scholarship-hero">
        <div className="hero-copy">
          <p className="eyebrow">AI application challenge submission</p>
          <h1>BeasiswaCoach AI</h1>
          <p>
            An AI-powered scholarship strategy assistant for Indonesian
            students. It turns a student profile into scholarship matches,
            readiness scoring, essay direction, interview practice, and a 90-day
            action plan.
          </p>
          <div className="hero-actions">
            <a href="#profile" className="primary-action">
              Analyze profile <ArrowRight size={18} />
            </a>
            <button
              type="button"
              onClick={() => downloadPack(profile, readiness, matches)}
            >
              <Download size={18} /> Export application pack
            </button>
          </div>
        </div>
        <div
          className="score-orbit"
          aria-label={`Scholarship readiness score ${readinessAverage} out of 100`}
        >
          <span>{readinessAverage}</span>
          <small>/100 readiness</small>
        </div>
      </section>

      <section
        className="criteria-strip"
        aria-label="Scholarship readiness dimensions"
      >
        {readiness.map((score) => (
          <article key={score.label}>
            <strong>{score.label}</strong>
            <span>{score.value}/100</span>
          </article>
        ))}
      </section>

      <section id="profile" className="workspace-grid">
        <form className="builder-panel" aria-label="Student profile editor">
          <div className="section-heading">
            <GraduationCap size={24} />
            <div>
              <p className="eyebrow">Student profile</p>
              <h2>Tell the AI coach what the applicant can prove</h2>
            </div>
          </div>

          {(
            [
              ["name", "Applicant name"],
              ["educationLevel", "Education level"],
              ["targetCountry", "Target country or program type"],
              ["field", "Target field"],
              ["gpa", "Academic record"],
              ["english", "English readiness"],
              ["achievements", "Projects and achievements"],
              ["leadership", "Leadership and service"],
              ["financialNeed", "Financial need context"],
              ["goal", "Scholarship goal"],
              ["deadline", "Deadline plan"],
            ] as [keyof StudentProfile, string][]
          ).map(([field, label]) => (
            <label key={field}>
              <span>{label}</span>
              <textarea
                value={profile[field]}
                onChange={(event) => updateProfile(field, event.target.value)}
              />
            </label>
          ))}
        </form>

        <aside className="insight-stack">
          <section className="panel-card">
            <div className="section-heading compact">
              <Award size={20} />
              <h2>Best Scholarship Matches</h2>
            </div>
            <div className="score-list">
              {matches.map((match) => (
                <article key={match.name}>
                  <div>
                    <strong>{match.name}</strong>
                    <p>{match.reason}</p>
                    <p>{match.nextStep}</p>
                  </div>
                  <span>{match.fit}%</span>
                </article>
              ))}
            </div>
          </section>

          <section className="panel-card">
            <div className="section-heading compact">
              <BrainCircuit size={20} />
              <h2>AI Coach Review</h2>
            </div>
            <label className="api-field">
              <span>OpenAI API key</span>
              <input
                type="password"
                value={apiKey}
                placeholder="Optional, leave empty for local coach mode"
                onChange={(event) => setApiKey(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="wide-button"
              onClick={runReview}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="spin" size={18} />
              ) : (
                <Sparkles size={18} />
              )}
              Review application
            </button>
            {error && (
              <p className="error-text">
                {error}{" "}
                <button
                  type="button"
                  className="retry-button"
                  onClick={runReview}
                  disabled={isLoading}
                >
                  <RefreshCw size={14} /> Retry
                </button>
              </p>
            )}
            {aiFeedback && (
              <div className="feedback-row">
                <p className="mentor-note">{aiFeedback}</p>
                <div className="feedback-buttons">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => submitFeedback("up")}
                    aria-label="Helpful"
                  >
                    <ThumbsUp size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => submitFeedback("down")}
                    aria-label="Not helpful"
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>
              </div>
            )}
            {conversation.length > 0 && (
              <div className="chat-thread">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.role === "user"
                        ? "chat-bubble user"
                        : "chat-bubble assistant"
                    }
                  >
                    {msg.content}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
            {apiKey.trim() && conversation.length > 0 && (
              <div className="chat-input-row">
                <input
                  type="text"
                  value={chatInput}
                  placeholder="Ask a follow-up question..."
                  onChange={(event) => setChatInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !isLoading) {
                      sendChatMessage();
                    }
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={sendChatMessage}
                  disabled={isLoading || !chatInput.trim()}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
            {feedbackLog.length > 0 && (
              <p className="cache-info">
                <Zap size={14} /> {feedbackLog.length} feedback{" "}
                {feedbackLog.length === 1 ? "entry" : "entries"} logged
              </p>
            )}
            <button type="button" className="cache-clear" onClick={clearCache}>
              <RefreshCw size={14} /> Clear response cache
            </button>
          </section>
        </aside>
      </section>

      <section className="output-grid">
        <article className="output-panel wide">
          <div className="section-heading compact">
            <CalendarDays size={20} />
            <h2>90-Day Application Roadmap</h2>
          </div>
          <div className="roadmap-list four-column">
            {roadmap.map((phase) => (
              <section key={phase.phase}>
                <h3>{phase.phase}</h3>
                {phase.actions.map((action) => (
                  <p key={action}>
                    <Target size={16} /> {action}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <article className="output-panel">
          <div className="section-heading compact between">
            <div className="inline-title">
              <BookOpenCheck size={20} />
              <h2>Essay Outline</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => copyText(essayOutline.join("\n"))}
              aria-label="Copy essay outline"
            >
              <Clipboard size={18} />
            </button>
          </div>
          <div className="compact-list">
            {essayOutline.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>

        <article className="output-panel">
          <div className="section-heading compact between">
            <div className="inline-title">
              <Mic size={20} />
              <h2>Interview Practice</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => copyText(interviewQuestions.join("\n"))}
              aria-label="Copy interview questions"
            >
              <Clipboard size={18} />
            </button>
          </div>
          <div className="compact-list">
            {interviewQuestions.map((question) => (
              <p key={question}>{question}</p>
            ))}
          </div>
        </article>

        <article className="output-panel wide">
          <div className="section-heading compact between">
            <div className="inline-title">
              <FileText size={20} />
              <h2>Submission Summary</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => copyText(summary)}
              aria-label="Copy submission summary"
            >
              <Clipboard size={18} />
            </button>
          </div>
          <p className="generated-text">{summary}</p>
        </article>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
