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

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    try {
      const response = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...updates,
        }),
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
    } catch {
      alert("Unable to connect to the server.");
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#123f32]">
      <header className="border-b border-[#e5e1d7] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#b48728]">
              Sri Balaji
            </p>

            <p className="text-[16px] font-bold tracking-[0.12em] text-[#123f32]">
              PRIDE HOMES
            </p>
          </div>

          <p className="text-sm font-medium text-[#557068]">
            Admin Dashboard
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        <div className="rounded-2xl border border-[#e5e1d7] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b48728]">
                Evergreen Homes
              </p>

              <h1 className="mt-2 text-2xl font-semibold text-[#123f32]">
                Enquiry Dashboard
              </h1>

              <p className="mt-2 text-sm text-[#71817b]">
                Manage and follow up with customer enquiries.
              </p>
            </div>

            <button
              type="button"
              onClick={loadEnquiries}
              className="rounded-lg bg-[#123f32] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1b5545]"
            >
              Refresh
            </button>
          </div>

          <div className="mt-7">
            {loading && (
              <div className="rounded-xl border border-[#e5e1d7] p-8 text-center">
                <p className="text-sm text-[#71817b]">
                  Loading enquiries...
                </p>
              </div>
            )}

            {error && !loading && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && enquiries.length === 0 && (
              <div className="rounded-xl border border-dashed border-[#d9d5ca] p-8 text-center">
                <p className="text-sm font-medium text-[#557068]">
                  No enquiries found.
                </p>

                <p className="mt-1 text-xs text-[#8a9690]">
                  Customer enquiries will appear here when submitted.
                </p>
              </div>
            )}

            {!loading && !error && enquiries.length > 0 && (
              <div className="space-y-4">
                {enquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="rounded-xl border border-[#e5e1d7] bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-[#123f32]">
                          {enquiry.name}
                        </h2>

                        <div className="mt-2 space-y-1 text-sm text-[#557068]">
                          <p>📞 {enquiry.phone}</p>

                          <p>
                            ✉️ {enquiry.email || "No email provided"}
                          </p>

                          <p>
                            Interested in:{" "}
                            <span className="font-medium text-[#123f32]">
                              {enquiry.interestedIn}
                            </span>
                          </p>

                          <p className="text-xs text-[#8a9690]">
                            Received:{" "}
                            {new Date(
                              enquiry.createdAt
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-[650px]">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#71817b]">
                            Status
                          </label>

                          <select
                            value={enquiry.status}
                            onChange={(e) =>
                              updateEnquiry(enquiry.id, {
                                status: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border border-[#d9d5ca] bg-white px-3 py-2.5 text-sm text-[#34534a] outline-none focus:border-[#b48728]"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="INTERESTED">
                              INTERESTED
                            </option>
                            <option value="SITE VISIT">
                              SITE VISIT
                            </option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="NOT INTERESTED">
                              NOT INTERESTED
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#71817b]">
                            Follow-up
                          </label>

                          <input
                            type="date"
                            value={
                              enquiry.followUpDate
                                ? enquiry.followUpDate.slice(0, 10)
                                : ""
                            }
                            onChange={(e) =>
                              updateEnquiry(enquiry.id, {
                                followUpDate: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border border-[#d9d5ca] bg-white px-3 py-2.5 text-sm text-[#34534a] outline-none focus:border-[#b48728]"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#71817b]">
                            Notes
                          </label>

                          <textarea
                            defaultValue={enquiry.notes || ""}
                            onBlur={(e) =>
                              updateEnquiry(enquiry.id, {
                                notes: e.target.value,
                              })
                            }
                            rows={1}
                            placeholder="Add follow-up notes..."
                            className="w-full resize-none rounded-lg border border-[#d9d5ca] bg-white px-3 py-2.5 text-sm text-[#34534a] outline-none focus:border-[#b48728]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-[#eeeae1] pt-4">
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="rounded-lg bg-[#123f32] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1b5545]"
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
                        className="rounded-lg border border-[#b48728] px-4 py-2 text-xs font-semibold text-[#8a681b] hover:bg-[#faf6ea]"
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