
"use client";

import { useEffect, useState } from "react";

type Enquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  interestedIn: string;
  status: string;
  notes: string | null;
  followUpDate: string | null;
  createdAt: string;
};

type Draft = {
  status: string;
  notes: string;
  followUpDate: string;
};

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingIds, setSavingIds] = useState<number[]>([]);
  const [successMessages, setSuccessMessages] = useState<
    Record<number, string>
  >({});
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "NEW").length;
  const contactedEnquiries = enquiries.filter(
    (e) => e.status === "CONTACTED"
  ).length;
  const interestedEnquiries = enquiries.filter(
    (e) => e.status === "INTERESTED"
  ).length;
  const siteVisits = enquiries.filter((e) => e.status === "SITE VISIT").length;
  const closedEnquiries = enquiries.filter((e) => e.status === "CLOSED").length;

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/enquiries", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load enquiries.");
        return;
      }

      setEnquiries(data);
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function updateEnquiry(
    id: number,
    updates: {
      status?: string;
      notes?: string;
      followUpDate?: string;
    }
  ) {
    setSavingIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
    setSuccessMessages((current) => ({ ...current, [id]: "" }));

    try {
      const response = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updates }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Unable to update enquiry.");
        return;
      }

      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === id ? { ...enquiry, ...data } : enquiry
        )
      );

      setSuccessMessages((current) => ({
        ...current,
        [id]: "Enquiry updated successfully.",
      }));
    } catch {
      alert("Unable to connect to the server.");
    } finally {
      setSavingIds((current) => current.filter((savingId) => savingId !== id));
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  const summaryCards = [
    { label: "Total Enquiries", count: totalEnquiries },
    { label: "New", count: newEnquiries },
    { label: "Contacted", count: contactedEnquiries },
    { label: "Interested", count: interestedEnquiries },
    { label: "Site Visits", count: siteVisits },
    { label: "Closed", count: closedEnquiries },
  ];

  return (
    <main className="min-h-screen w-full bg-[#f7f5ef] text-[#123f32]">
     
<header className="border-b border-[#e5e1d7] bg-white">
  <div className="flex min-h-[88px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#b48728] sm:text-sm">
        Sri Balaji
      </p>
      <p className="text-xl font-bold tracking-[0.12em] sm:text-2xl">
        PRIDE HOMES
      </p>
    </div>

    <div className="flex items-center gap-4">
      <p className="text-sm font-medium text-[#557068] sm:text-lg">
        Admin Dashboard
      </p>

      <button
        type="button"
        onClick={async () => {
          try {
            const response = await fetch("/api/admin/logout", {
              method: "POST",
            });

            if (response.ok) {
              window.location.href = "/admin/login";
            } else {
              alert("Unable to log out. Please try again.");
            }
          } catch {
            alert("Unable to connect to the server.");
          }
        }}
        className="rounded-lg border border-[#b48728] px-4 py-2 text-sm font-semibold text-[#8a681b] hover:bg-[#faf6ea]"
      >
        Logout
      </button>
    </div>
  </div>
</header>

      <section className="w-full px-4 py-8 sm:px-8 lg:px-16">
        <div className="rounded-2xl border border-[#e5e1d7] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b48728] sm:text-sm">
                Evergreen Homes
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Enquiry Dashboard
              </h1>
              <p className="mt-3 text-base text-[#71817b] sm:text-lg">
                Manage and follow up with customer enquiries.
              </p>
            </div>

            <button
              type="button"
              onClick={loadEnquiries}
              disabled={loading}
              className="rounded-lg bg-[#123f32] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#1b5545] disabled:opacity-60"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Summary cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
            {summaryCards.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#e5e1d7] bg-[#faf9f5] p-4 sm:p-6"
              >
                <p className="text-sm font-medium text-[#71817b] sm:text-base">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-[#123f32] sm:text-4xl">
                  {item.count}
                </p>
              </div>
            ))}
          </div>

          {/* Loading and error messages */}
          <div className="mt-8">
            {loading && (
              <div className="rounded-xl border border-[#e5e1d7] p-10 text-center">
                <p className="text-base text-[#71817b] sm:text-lg">
                  Loading enquiries...
                </p>
              </div>
            )}

            {error && !loading && (
              <div className="rounded-xl bg-red-50 p-5 text-base text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && enquiries.length === 0 && (
              <div className="rounded-xl border border-dashed border-[#d9d5ca] p-10 text-center">
                <p className="text-lg font-medium text-[#557068]">
                  No enquiries found.
                </p>
                <p className="mt-2 text-base text-[#8a9690]">
                  Customer enquiries will appear here when submitted.
                </p>
              </div>
            )}

            {!loading && !error && enquiries.length > 0 && (
              <div className="space-y-6">
                {enquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="rounded-xl border border-[#e5e1d7] bg-white p-5 shadow-sm sm:p-7"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-semibold">
                          {enquiry.name}
                        </h2>

                        <div className="mt-3 space-y-2 break-words text-base text-[#557068]">
                          <p>📞 {enquiry.phone}</p>
                          <p>✉️ {enquiry.email || "No email provided"}</p>
                          <p>
                            Interested in:{" "}
                            <span className="font-medium text-[#123f32]">
                              {enquiry.interestedIn}
                            </span>
                          </p>
                          <p className="text-sm text-[#8a9690]">
                            Received:{" "}
                            {new Date(enquiry.createdAt).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="grid w-full gap-5 sm:grid-cols-3 lg:max-w-[950px]">
                        {/* Status */}
                        <div>
                          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-[#71817b]">
                            Status
                          </label>
                          <select
                            value={drafts[enquiry.id]?.status ?? enquiry.status}
                            onChange={(e) =>
                              setDrafts((current) => ({
                                ...current,
                                [enquiry.id]: {
                                  status: e.target.value,
                                  notes:
                                    current[enquiry.id]?.notes ??
                                    enquiry.notes ??
                                    "",
                                  followUpDate:
                                    current[enquiry.id]?.followUpDate ??
                                    (enquiry.followUpDate
                                      ? enquiry.followUpDate.slice(0, 10)
                                      : ""),
                                },
                              }))
                            }
                            className="w-full rounded-lg border border-[#d9d5ca] bg-white px-4 py-3.5 text-base outline-none focus:border-[#b48728]"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="INTERESTED">INTERESTED</option>
                            <option value="SITE VISIT">SITE VISIT</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="NOT INTERESTED">
                              NOT INTERESTED
                            </option>
                          </select>
                        </div>

                        {/* Follow-up */}
                        <div>
                          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-[#71817b]">
                            Follow-up
                          </label>
                          <input
                            type="date"
                            value={
                              drafts[enquiry.id]?.followUpDate ??
                              (enquiry.followUpDate
                                ? enquiry.followUpDate.slice(0, 10)
                                : "")
                            }
                            onChange={(e) =>
                              setDrafts((current) => ({
                                ...current,
                                [enquiry.id]: {
                                  status:
                                    current[enquiry.id]?.status ??
                                    enquiry.status,
                                  notes:
                                    current[enquiry.id]?.notes ??
                                    enquiry.notes ??
                                    "",
                                  followUpDate: e.target.value,
                                },
                              }))
                            }
                            className="w-full rounded-lg border border-[#d9d5ca] bg-white px-4 py-3.5 text-base outline-none focus:border-[#b48728]"
                          />
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-[#71817b]">
                            Notes
                          </label>
                          <textarea
                            key={`${enquiry.id}-${enquiry.notes ?? ""}`}
                            defaultValue={enquiry.notes || ""}
                            onBlur={(e) =>
                              updateEnquiry(enquiry.id, {
                                notes: e.target.value,
                              })
                            }
                            rows={2}
                            placeholder="Add follow-up notes..."
                            className="w-full resize-y rounded-lg border border-[#d9d5ca] bg-white px-4 py-3.5 text-base outline-none focus:border-[#b48728]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-[#eeeae1] pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          const draft = drafts[enquiry.id];

                          if (!draft) return;

                          const updates: {
                            status?: string;
                            notes?: string;
                            followUpDate?: string;
                          } = {};

                          if (draft.status !== enquiry.status) {
                            updates.status = draft.status;
                          }

                          if (draft.notes !== (enquiry.notes ?? "")) {
                            updates.notes = draft.notes;
                          }

                          const originalDate = enquiry.followUpDate
                            ? enquiry.followUpDate.slice(0, 10)
                            : "";

                          if (draft.followUpDate !== originalDate) {
                            updates.followUpDate = draft.followUpDate;
                          }

                          if (Object.keys(updates).length > 0) {
                            void updateEnquiry(enquiry.id, updates);
                          }
                        }}
                        disabled={
                          savingIds.includes(enquiry.id) ||
                          !drafts[enquiry.id] ||
                          (drafts[enquiry.id].status === enquiry.status &&
                            drafts[enquiry.id].notes ===
                              (enquiry.notes ?? "") &&
                            drafts[enquiry.id].followUpDate ===
                              (enquiry.followUpDate
                                ? enquiry.followUpDate.slice(0, 10)
                                : ""))
                        }
                        className="rounded-lg bg-[#123f32] px-7 py-3 text-base font-semibold text-white hover:bg-[#1b5545] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {savingIds.includes(enquiry.id)
                          ? "Saving..."
                          : "Save Changes"}
                      </button>

                      {successMessages[enquiry.id] && (
                        <span className="self-center text-base font-medium text-green-700">
                          {successMessages[enquiry.id]}
                        </span>
                      )}

                      <a
                        href={`tel:${enquiry.phone}`}
                        className="rounded-lg bg-[#123f32] px-7 py-3 text-base font-semibold text-white hover:bg-[#1b5545]"
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${enquiry.phone.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[#b48728] px-7 py-3 text-base font-semibold text-[#8a681b] hover:bg-[#faf6ea]"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
