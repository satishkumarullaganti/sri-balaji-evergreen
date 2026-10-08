"use client";

import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#123f32]">

      {/* ================= HEADER ================= */}
      {/* ================= HEADER ================= */}
<header className="sticky top-0 z-50 border-b border-[#e5e1d7] bg-white/95 backdrop-blur">
  <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

    <div className="flex h-[68px] items-center justify-between">

      {/* BRAND */}
      <a href="#project" onClick={() => setMenuOpen(false)}>
        <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#b48728]">
          Sri Balaji
        </p>

        <p className="mt-0.5 text-[16px] font-bold tracking-[0.12em] text-[#123f32]">
          PRIDE HOMES
        </p>
      </a>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#34534a] md:flex">
        <a href="#project" className="transition hover:text-[#b48728]">
          Project
        </a>

        <a href="#previous-projects" className="transition hover:text-[#b48728]">
          Previous Projects
        </a>

        <a href="#floor-plans" className="transition hover:text-[#b48728]">
          Floor Plans
        </a>

        <a href="#amenities" className="transition hover:text-[#b48728]">
          Amenities
        </a>

        <a href="#contact" className="transition hover:text-[#b48728]">
          Contact
        </a>
      </nav>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ddd8ce] text-[#123f32] md:hidden"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
      >
        <span className="text-[24px] leading-none">
          {menuOpen ? "×" : "☰"}
        </span>
      </button>

    </div>

    {/* MOBILE NAVIGATION */}
    {menuOpen && (
      <nav className="border-t border-[#e5e1d7] py-3 md:hidden">

        <a
          href="#project"
          onClick={() => setMenuOpen(false)}
          className="block rounded-lg px-3 py-3 text-[14px] font-medium text-[#34534a] hover:bg-[#f7f5ef]"
        >
          Project
        </a>

        <a
          href="#previous-projects"
          onClick={() => setMenuOpen(false)}
          className="block rounded-lg px-3 py-3 text-[14px] font-medium text-[#34534a] hover:bg-[#f7f5ef]"
        >
          Previous Projects
        </a>

        <a
          href="#floor-plans"
          onClick={() => setMenuOpen(false)}
          className="block rounded-lg px-3 py-3 text-[14px] font-medium text-[#34534a] hover:bg-[#f7f5ef]"
        >
          Floor Plans
        </a>

        <a
          href="#amenities"
          onClick={() => setMenuOpen(false)}
          className="block rounded-lg px-3 py-3 text-[14px] font-medium text-[#34534a] hover:bg-[#f7f5ef]"
        >
          Amenities
        </a>

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="block rounded-lg px-3 py-3 text-[14px] font-medium text-[#34534a] hover:bg-[#f7f5ef]"
        >
          Contact
        </a>

      </nav>
    )}

  </div>
</header>


      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-[1400px] bg-white">
        <img
          src="/evergreen-hero.jpg"
          alt="Sri Balaji Evergreen Homes"
          className="block h-auto w-full"
        />
      </section>


      {/* ================= PROJECT INTRODUCTION ================= */}
      <section
        id="project"
        className="bg-[#123f32] px-6 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f2cf78]">
            Coming Soon
          </p>

          <h1 className="mt-4 max-w-[850px] text-[34px] font-bold leading-tight tracking-[-0.02em] sm:text-[40px] lg:text-[46px]">
            Shree Balaji Evergreen Homes
          </h1>

          <p className="mt-5 max-w-[720px] text-[16px] leading-7 text-[#d7e1dc] sm:text-[17px]">
            Luxury 2 &amp; 3 BHK homes designed for comfortable,
            contemporary living.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-7 rounded-full bg-[#f0c65d] px-7 py-3 text-[14px] font-semibold text-[#123f32] transition hover:bg-[#f6d77e]"
          >
            Register Your Interest
          </button>

        </div>
      </section>


      {/* ================= PROJECT HIGHLIGHTS ================= */}
      <section className="bg-white px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b48728]">
            The Project
          </p>

          <h2 className="mt-3 text-[30px] font-bold leading-tight sm:text-[36px]">
            A thoughtfully planned community.
          </h2>

          <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-[#557068]">
            Evergreen Homes brings together well-planned residences,
            practical layouts and lifestyle-focused amenities in a
            contemporary residential setting.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-[#e5e1d7] bg-[#faf9f5] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b48728]">
                Homes
              </p>
              <p className="mt-2 text-[22px] font-bold">
                2 &amp; 3 BHK
              </p>
              <p className="mt-2 text-[13px] leading-5 text-[#60766f]">
                Comfortable residences designed for modern family living.
              </p>
            </div>

            <div className="rounded-xl border border-[#e5e1d7] bg-[#faf9f5] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b48728]">
                3 BHK Plans
              </p>
              <p className="mt-2 text-[22px] font-bold">
                1,360–1,680 sq.ft.
              </p>
              <p className="mt-2 text-[13px] leading-5 text-[#60766f]">
                Multiple 3 BHK SBA options are shown in the supplied plan.
              </p>
            </div>

            <div className="rounded-xl border border-[#e5e1d7] bg-[#faf9f5] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b48728]">
                Lift
              </p>
              <p className="mt-2 text-[22px] font-bold">
                6 Passenger
              </p>
              <p className="mt-2 text-[13px] leading-5 text-[#60766f]">
                Passenger lift provision as specified in the project material.
              </p>
            </div>

            <div className="rounded-xl border border-[#e5e1d7] bg-[#faf9f5] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b48728]">
                Planning
              </p>
              <p className="mt-2 text-[22px] font-bold">
                Vaastu Compliant
              </p>
              <p className="mt-2 text-[13px] leading-5 text-[#60766f]">
                The supplied material identifies the project as 100% Vaastu compliant.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= FLOOR PLANS ================= */}
      <section
        id="floor-plans"
        className="bg-[#eeeae0] px-6 py-14 sm:px-8 lg:px-10 lg:py-18"
      >
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b48728]">
            Floor Plans
          </p>

          <h2 className="mt-3 text-[30px] font-bold leading-tight sm:text-[36px]">
            Find a home that fits your lifestyle.
          </h2>

          <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-[#557068]">
            Explore the thoughtfully planned residences available at
            Evergreen Homes.
          </p>


          {/* 3 BHK */}
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="grid lg:grid-cols-[1fr_340px]">

              <div className="bg-white p-4 sm:p-6">
                <img
                  src="/evergreen-web-assets-3bhk-floor-plan.png"
                  alt="Evergreen Homes 3 BHK floor plan"
                  className="h-auto w-full rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-center bg-[#123f32] p-7 text-white sm:p-9">

                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f2cf78]">
                  Available Plan
                </p>

                <h3 className="mt-3 text-[27px] font-bold">
                  3 BHK
                </h3>

                <p className="mt-3 text-[14px] leading-6 text-[#d6e1dc]">
                  The supplied architectural plan shows three 3 BHK
                  configurations with different saleable built-up areas.
                </p>

                <div className="mt-6 space-y-3">

                  <div className="rounded-lg border border-white/15 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-wider text-[#f2cf78]">
                      Option 01
                    </p>
                    <p className="mt-1 text-[20px] font-semibold">
                      1,360 sq.ft.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/15 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-wider text-[#f2cf78]">
                      Option 02
                    </p>
                    <p className="mt-1 text-[20px] font-semibold">
                      1,665 sq.ft.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/15 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-wider text-[#f2cf78]">
                      Option 03
                    </p>
                    <p className="mt-1 text-[20px] font-semibold">
                      1,680 sq.ft.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>


          {/* 2 BHK */}
          <div className="mt-6 rounded-2xl border border-[#ddd7ca] bg-white p-7 sm:p-9">

            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b48728]">
                  Floor Plan
                </p>

                <h3 className="mt-2 text-[26px] font-bold">
                  2 BHK
                </h3>

                <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#61756f]">
                  Detailed 2 BHK floor-plan information will be published
                  once the final plan is available.
                </p>
              </div>

              <span className="rounded-full bg-[#f4e8c4] px-5 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#8c661b]">
                Coming Soon
              </span>

            </div>

          </div>

        </div>
      </section>


{/* ================= PREVIOUS PROJECTS ================= */}
{/* ================= PREVIOUS PROJECTS ================= */}
<section
  id="previous-projects"
  className="scroll-mt-24 border-t border-slate-200 bg-white py-14 sm:py-16"
>
  <div className="mx-auto max-w-6xl px-5 sm:px-6">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
        Sri Balaji Pride Homes
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Our Previous Projects
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        A journey of thoughtfully planned homes built with quality, comfort
        and trust.
      </p>
    </div>

    <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          name: "Elite Homes",
          image: "/elite-homes.jpg",
          description:
            "Quality homes designed for comfortable and modern living.",
        },
        {
          name: "Sri Balaji Classic",
          image: "/sri-balaji-classic.jpg",
          description:
            "2 & 3 BHK luxury apartments planned for contemporary living.",
        },
        {
          name: "Sri Balaji Navagruha",
          image: "/sri-balaji-navagruha.jpg",
          description:
            "2 BHK luxury apartments designed for practical modern living.",
        },
        {
          name: "Vista Homes",
          image: "/vista-homes.jpg",
          description:
            "3 BHK luxury apartments with thoughtfully planned amenities.",
        },
      ].map((project) => (
        <div
          key={project.name}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <h3 className="text-base font-semibold text-slate-900">
              {project.name}
            </h3>

            <p className="mt-2 text-sm leading-5 text-slate-600">
              {project.description}
            </p>

            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
              Completed Project
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================= AMENITIES ================= */}
      <section
        id="amenities"
        className="bg-white px-6 py-14 sm:px-8 lg:px-10 lg:py-18"
      >
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b48728]">
            Amenities
          </p>

          <h2 className="mt-3 text-[30px] font-bold leading-tight sm:text-[36px]">
            Designed around your lifestyle.
          </h2>

          <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-[#557068]">
            Discover thoughtfully planned spaces and lifestyle amenities
            at Evergreen Homes.
          </p>


          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "Gym / Fitness Facility",
              "Party Hall",
              "Intercom Facility",
              "Sewage Treatment Plant",
              "Stilt Car Parking",
              "Landscaped Garden",
              "CCTV Surveillance",
              "Round-the-clock Security",
              "Rain Water Harvesting",
              "24×7 Water Supply",
              "Generator Power Backup",
              "6 Passenger Lift",
            ].map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-4 rounded-xl border border-[#e5e1d7] bg-[#faf9f5] px-5 py-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#123f32] text-[15px] text-[#f2cf78]">
                  ✓
                </div>

                <p className="text-[14px] font-medium text-[#34534a]">
                  {amenity}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ================= SPECIFICATIONS ================= */}
      <section className="bg-[#123f32] px-6 py-14 text-white sm:px-8 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f2cf78]">
            Specifications
          </p>

          <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
            Quality details that matter.
          </h2>

          <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-[#d5e0db]">
            Key specifications based on the supplied project material.
          </p>


          <div className="mt-9 grid gap-4 md:grid-cols-2">

            <Specification
              title="Framed Structure"
              text="RCC framed structure with seismic compliance resistance."
            />

            <Specification
              title="Super Structure"
              text={'6" solid blocks for external walls and 4" solid blocks for internal walls.'}
            />

            <Specification
              title="Plastering"
              text="Internal smooth finish and external smooth sponge-finish cement plastering."
            />

            <Specification
              title="Doors"
              text="Teak wood frame with OST door shutter for the main door and Sal wood frames with flush shutters for remaining doors."
            />

            <Specification
              title="Windows"
              text="Three-track UPVC windows with provision for mosquito mesh and M.S. grills with enamel paint."
            />

            <Specification
              title="Flooring"
              text='24" × 24" vitrified tile flooring with 4" skirting.'
            />

            <Specification
              title="Toilets"
              text="Glazed tile dadoing, ceramic tile flooring, European commode and washbasin with CERA/Parryware or equivalent fittings and taps."
            />

            <Specification
              title="Kitchen"
              text="Granite kitchen platform with stainless-steel sink, glazed tile dadoing and provision for washing machine, water purifier, chimney and electrical hub."
            />

            <Specification
              title="Electrical"
              text="Concealed copper wiring, modular switches, ELCB and power points in kitchen and toilets."
            />

            <Specification
              title="Car Parking"
              text="Covered car parking."
            />

            <Specification
              title="Lobby & Lift"
              text="Entrance lobby with granite flooring and one 6-passenger lift."
            />

            <Specification
              title="Generator"
              text="24×7 1KW power backup to each apartment with additional backup for lift, water pumps and common-area lighting."
            />

          </div>

        </div>
      </section>


      {/* ================= LOCATION ================= */}
      <section className="bg-[#f7f5ef] px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b48728]">
            Location
          </p>

          <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
            Conveniently located in K.R. Puram.
          </h2>

          <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-[#557068]">
            The supplied project material places the development at
            Kithaganur Main Road, Prashanti Nagar Layout, K.R. Puram,
            Bangalore.
          </p>

          <div className="mt-8 rounded-2xl border border-[#ded9ce] bg-white p-7 sm:p-9">

            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b48728]">
              Site Address
            </p>

            <p className="mt-4 text-[17px] font-semibold leading-7 text-[#123f32]">
              Site No. 404, Kithaganur Main Road,
              <br />
              Prashanti Nagar Layout,
              <br />
              K.R. Puram, Bangalore – 560036,
              <br />
              Karnataka, India.
            </p>

          </div>

        </div>
      </section>


      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="bg-white px-6 py-14 sm:px-8 lg:px-10 lg:py-18"
      >
        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b48728]">
                Contact
              </p>

              <h2 className="mt-3 text-[30px] font-bold sm:text-[36px]">
                Make Evergreen Homes your next address.
              </h2>

              <p className="mt-4 max-w-[680px] text-[16px] leading-7 text-[#557068]">
                Interested in a 2 BHK or 3 BHK home? Register your
                interest and our team can share the latest availability
                and project information.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-7 rounded-full bg-[#123f32] px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1d5645]"
              >
                Register Your Interest
              </button>

            </div>


            <div className="rounded-2xl bg-[#123f32] p-7 text-white sm:p-8">

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f2cf78]">
                Get in touch
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#9db4aa]">
                    Email
                  </p>
                  <a
                    href="mailto:infovistahomes@gmail.com"
                    className="mt-1 block text-[15px] font-medium hover:text-[#f2cf78]"
                  >
                    infovistahomes@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#9db4aa]">
                    Phone
                  </p>

                  <div className="mt-1 space-y-1 text-[15px] font-medium">
                    <a href="tel:+918867113579" className="block hover:text-[#f2cf78]">
                      +91 88671 13579
                    </a>
                    <a href="tel:+918106427845" className="block hover:text-[#f2cf78]">
                      +91 81064 27845
                    </a>
                    <a href="tel:+919886059682" className="block hover:text-[#f2cf78]">
                      +91 98860 59682
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#0d3026] px-6 py-7 text-white sm:px-8">

        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-3 text-[12px] text-[#aebfb8] sm:flex-row">

          <p>
            © {new Date().getFullYear()} Sri Balaji Pride Homes. All rights reserved.
          </p>

          <p>
            Evergreen Homes
          </p>

        </div>

      </footer>


      {/* ================= REGISTRATION MODAL ================= */}
      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5"
          onClick={() => setShowForm(false)}
        >

          <div
            className="w-full max-w-[460px] rounded-2xl bg-white p-7 shadow-2xl sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b48728]">
                  Evergreen Homes
                </p>

                <h3 className="mt-2 text-[25px] font-bold text-[#123f32]">
                  Register Your Interest
                </h3>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-[24px] leading-none text-[#71817b] hover:text-[#123f32]"
                aria-label="Close"
              >
                ×
              </button>

            </div>


           <form
  className="mt-7 space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          interestedIn: formData.get("interestedIn"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit enquiry.");
      }

      alert(
        "Thank you for your interest in Evergreen Homes. Our team will contact you."
      );

      form.reset();
      setShowForm(false);
    } catch (error) {
      console.error("Form submission error:", error);

      alert(
        "Sorry, we could not submit your enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }}
>
  <input
    required
    name="name"
    type="text"
    placeholder="Your Name"
    className="w-full rounded-lg border border-[#ddd8ce] px-4 py-3 text-[14px] outline-none focus:border-[#123f32]"
  />

  <input
    required
    name="phone"
    type="tel"
    placeholder="Phone Number"
    className="w-full rounded-lg border border-[#ddd8ce] px-4 py-3 text-[14px] outline-none focus:border-[#123f32]"
  />

  <input
    name="email"
    type="email"
    placeholder="Email Address"
    className="w-full rounded-lg border border-[#ddd8ce] px-4 py-3 text-[14px] outline-none focus:border-[#123f32]"
  />

  <select
    required
    name="interestedIn"
    className="w-full rounded-lg border border-[#ddd8ce] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#123f32]"
    defaultValue=""
  >
    <option value="" disabled>
      Interested In
    </option>
    <option value="2 BHK">2 BHK</option>
    <option value="3 BHK">3 BHK</option>
  </select>

  <button
    type="submit"
    disabled={submitting}
    className="w-full rounded-lg bg-[#123f32] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1d5645] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {submitting ? "Submitting..." : "Submit Interest"}
  </button>
</form>

          </div>

        </div>
      )}

    </main>
  );
}


/* ================= SPECIFICATION CARD ================= */

function Specification({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">

      <h3 className="text-[15px] font-semibold text-[#f2cf78]">
        {title}
      </h3>

      <p className="mt-2 text-[13px] leading-6 text-[#d3dfda]">
        {text}
      </p>

    </div>
  );
}



