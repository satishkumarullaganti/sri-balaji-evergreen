
"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! Welcome to Sri Balaji Evergreen. How can I help you with our apartments today?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [enquiryError, setEnquiryError] = useState("");
  const [enquirySuccess, setEnquirySuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interestedIn, setInterestedIn] = useState("2 BHK");
  const [consent, setConsent] = useState(false);
  const [leadCollectionStarted, setLeadCollectionStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendMessage(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const message = input.trim();

    if (!message || isLoading) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: message },
    ];

    setInput("");
    setError("");
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: updatedMessages.slice(-12),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get a response."
        );
      }

      setMessages((previous) => [
  ...previous,
  {
    role: "assistant",
    content: data.reply,
  },
]);

if (
  data.intent === "SUBMIT_ENQUIRY" ||
  data.intent === "APARTMENT_INTEREST"
) {
  const lowerMessage = message.toLowerCase();

  if (/\b3\s*bhk\b/.test(lowerMessage)) {
    setInterestedIn("3 BHK");
  } else if (/\b2\s*bhk\b/.test(lowerMessage)) {
    setInterestedIn("2 BHK");
  }

  setShowEnquiryForm(true);
}
    } catch {
      setError(
        "Sorry, I couldn't reach the AI assistant. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function submitEnquiry(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting || enquirySuccess) return;

    setEnquiryError("");

    if (!consent) {
      setEnquiryError(
        "Please agree to be contacted before submitting your enquiry."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/chat-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          interestedIn,
          consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to submit your enquiry."
        );
      }

      setEnquirySuccess(
        `Your enquiry was submitted successfully. Reference ID: ${data.enquiryId}`
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: `Thank you, ${name.trim()}! Your enquiry has been submitted successfully. Your reference ID is ${data.enquiryId}. Our sales team can follow up regarding your ${interestedIn} enquiry.`,
        },
      ]);

      setName("");
      setPhone("");
      setEmail("");
      setInterestedIn("2 BHK");
      setConsent(false);
    } catch (err) {
      setEnquiryError(
        err instanceof Error
          ? err.message
          : "Unable to submit the enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function startAnotherEnquiry() {
    setEnquirySuccess("");
    setEnquiryError("");
    setName("");
    setPhone("");
    setEmail("");
    setInterestedIn("2 BHK");
    setConsent(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {isOpen && (
        <section
          className="mb-3 flex h-[min(600px,80vh)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          aria-label="Sri Balaji Evergreen AI chat"
        >
          <header className="flex items-center justify-between bg-emerald-800 px-4 py-3 text-white">
            <div>
              <h2 className="font-semibold">
                Sri Balaji Evergreen
              </h2>
              <p className="text-xs text-emerald-100">
                AI Apartment Assistant
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-2 text-xl hover:bg-emerald-700"
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="flex gap-2 border-b bg-white p-3">
            <button
              type="button"
              onClick={() => {
                setShowEnquiryForm(false);
                setError("");
              }}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                !showEnquiryForm
                  ? "bg-emerald-800 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Chat with AI
            </button>

            <button
              type="button"
              onClick={() => {
                setShowEnquiryForm(true);
                setEnquiryError("");
              }}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                showEnquiryForm
                  ? "bg-emerald-800 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Submit an Enquiry
            </button>
          </div>

          {showEnquiryForm ? (
            <form
              onSubmit={submitEnquiry}
              className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4"
            >
              {enquirySuccess ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-800">
                    ✓
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    Enquiry Submitted!
                  </h3>

                  <p
                    className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
                    role="status"
                  >
                    {enquirySuccess}
                  </p>

                  <p className="text-sm text-gray-600">
                    Thank you for your interest in Sri Balaji
                    Evergreen. Please keep your reference ID for
                    future communication.
                  </p>

                  <button
                    type="button"
                    onClick={startAnotherEnquiry}
                    className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Interested in an apartment?
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">
                      Share your details so our sales team can
                      contact you.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Full name *
                    </label>
                    <input
                      id="enquiry-name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Phone number *
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      required
                      minLength={8}
                      maxLength={20}
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Email address (optional)
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      maxLength={254}
                      autoComplete="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-interest"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Apartment configuration *
                    </label>
                    <select
                      id="enquiry-interest"
                      value={interestedIn}
                      onChange={(event) =>
                        setInterestedIn(event.target.value)
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-700"
                    >
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                    </select>
                  </div>

                  <label className="flex items-start gap-2 text-xs leading-5 text-gray-700">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) =>
                        setConsent(event.target.checked)
                      }
                      required
                      className="mt-1 accent-emerald-800"
                    />
                    <span>
                      I agree to be contacted by the Sri Balaji
                      Evergreen sales team regarding this enquiry.
                    </span>
                  </label>

                  {enquiryError && (
                    <p
                      className="text-sm text-red-600"
                      role="alert"
                    >
                      {enquiryError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Confirm & Submit Enquiry"}
                  </button>

                  <p className="text-xs text-gray-500">
                    Your enquiry will be submitted only when you
                    confirm using the button above.
                  </p>
                </>
              )}
            </form>
          ) : (
            <>
              <div
                className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-3"
                aria-live="polite"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-emerald-800 text-white"
                          : "border border-gray-200 bg-white text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <p className="text-sm text-gray-500" role="status">
                    Assistant is typing…
                  </p>
                )}

                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={sendMessage}
                className="flex gap-2 border-t p-3"
              >
                <input
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Ask about our apartments..."
                  maxLength={2000}
                  disabled={isLoading}
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-700"
                  aria-label="Your message"
                />

                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-emerald-800 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="flex h-14 items-center gap-2 rounded-full bg-emerald-800 px-5 font-semibold text-white shadow-lg hover:bg-emerald-900"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        >
          <span aria-hidden="true">💬</span>
          <span>{isOpen ? "Close chat" : "Ask AI"}</span>
        </button>
      </div>
    </div>
  );
}
