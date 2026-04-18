/*
   Onboarding Page — Theme Park Stays
   New property onboarding guide
   ============================================================= */

export default function OnboardingPage() {
  const onboardingHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Theme Park Stays — New Property Onboarding</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:       #0B1F45;
      --navy-mid:   #122354;
      --navy-light: #1A3370;
      --orange:     #F47B20;
      --gold:       #F5A623;
      --gold-light: #FFF3E0;
      --white:      #FFFFFF;
      --off-white:  #F7F9FC;
      --border:     #DDE3EE;
      --text:       #1C2A45;
      --muted:      #6B7A99;
      --success:    #27AE60;
      --error:      #E74C3C;
      --shadow-sm:  0 2px 8px rgba(11,31,69,.07);
      --shadow-md:  0 6px 24px rgba(11,31,69,.11);
      --shadow-lg:  0 12px 40px rgba(11,31,69,.15);
      --radius:     14px;
      --radius-sm:  8px;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Poppins', sans-serif;
      background: var(--off-white);
      color: var(--text);
      font-size: 15px;
      line-height: 1.6;
    }

    .sticky-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--navy);
      box-shadow: var(--shadow-md);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-logo {
      font-size: 24px;
      font-weight: 700;
      color: var(--white);
    }

    .header-nav {
      display: flex;
      gap: 30px;
      list-style: none;
    }

    .header-nav a {
      color: var(--white);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }

    .header-nav a:hover {
      color: var(--gold);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .hero {
      text-align: center;
      margin-bottom: 60px;
    }

    .hero h1 {
      font-size: 48px;
      color: var(--navy);
      margin-bottom: 15px;
      font-weight: 800;
    }

    .hero p {
      font-size: 18px;
      color: var(--muted);
      max-width: 600px;
      margin: 0 auto;
    }

    .section {
      margin-bottom: 50px;
    }

    .section h2 {
      font-size: 32px;
      color: var(--navy);
      margin-bottom: 25px;
      font-weight: 700;
    }

    .card {
      background: var(--white);
      border-radius: var(--radius);
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: var(--shadow-sm);
      border-left: 4px solid var(--gold);
    }

    .card h3 {
      font-size: 20px;
      color: var(--navy);
      margin-bottom: 12px;
      font-weight: 600;
    }

    .card p {
      color: var(--text);
      line-height: 1.8;
    }

    .checklist {
      list-style: none;
      padding: 0;
    }

    .checklist li {
      padding: 12px 0;
      padding-left: 35px;
      position: relative;
      color: var(--text);
    }

    .checklist li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--success);
      font-weight: 700;
      font-size: 18px;
    }

    .cta-button {
      display: inline-block;
      background: var(--gold);
      color: var(--navy);
      padding: 15px 40px;
      border-radius: var(--radius-sm);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }

    .cta-button:hover {
      background: var(--orange);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }

    footer {
      background: var(--navy);
      color: var(--white);
      text-align: center;
      padding: 30px 20px;
      margin-top: 60px;
    }

    @media (max-width: 768px) {
      .hero h1 { font-size: 32px; }
      .section h2 { font-size: 24px; }
      .header-nav { gap: 15px; }
    }
  </style>
</head>
<body>
  <header class="sticky-header">
    <div class="header-content">
      <div class="header-logo">Theme Park Stays</div>
      <nav>
        <ul class="header-nav">
          <li><a href="#getting-started">Getting Started</a></li>
          <li><a href="#requirements">Requirements</a></li>
          <li><a href="#next-steps">Next Steps</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="hero">
      <h1>Welcome to Theme Park Stays!</h1>
      <p>Your comprehensive guide to onboarding your property and maximizing your rental success.</p>
    </div>

    <section class="section" id="getting-started">
      <h2>Getting Started</h2>
      <div class="grid">
        <div class="card">
          <h3><i class="fas fa-home"></i> Property Setup</h3>
          <p>Complete your property profile with accurate details, high-quality photos, and competitive pricing. Ensure all amenities are clearly listed.</p>
        </div>
        <div class="card">
          <h3><i class="fas fa-calendar"></i> Availability Calendar</h3>
          <p>Sync your availability calendar with all booking platforms. Keep your calendar updated to prevent double bookings.</p>
        </div>
        <div class="card">
          <h3><i class="fas fa-dollar-sign"></i> Pricing Strategy</h3>
          <p>Set competitive pricing based on market rates, seasonality, and local events. Consider dynamic pricing for peak periods.</p>
        </div>
      </div>
    </section>

    <section class="section" id="requirements">
      <h2>Onboarding Checklist</h2>
      <div class="card">
        <h3>Essential Requirements</h3>
        <ul class="checklist">
          <li>Complete property description (minimum 150 characters)</li>
          <li>Upload at least 10 high-quality photos</li>
          <li>Set accurate guest capacity and bedroom count</li>
          <li>List all amenities and house rules</li>
          <li>Configure check-in and check-out times</li>
          <li>Set cancellation policy</li>
          <li>Add emergency contact information</li>
          <li>Verify property address and location</li>
          <li>Set up payment information</li>
          <li>Activate your listing</li>
        </ul>
      </div>
    </section>

    <section class="section" id="next-steps">
      <h2>Next Steps</h2>
      <div class="card">
        <h3>Optimize Your Listing</h3>
        <p>After completing the basic setup, focus on these optimization strategies:</p>
        <ul class="checklist">
          <li>Write a compelling property title</li>
          <li>Highlight unique features and amenities</li>
          <li>Include photos of common areas and attractions nearby</li>
          <li>Respond quickly to guest inquiries</li>
          <li>Encourage guest reviews after stays</li>
          <li>Monitor and adjust pricing regularly</li>
        </ul>
      </div>
      <div class="card">
        <h3>Support & Resources</h3>
        <p>Our team is here to help you succeed. Contact support for any questions or assistance with your property setup.</p>
        <button class="cta-button">Contact Support</button>
      </div>
    </section>
  </div>

  <footer>
    <p>&copy; 2026 Theme Park Stays. All rights reserved.</p>
  </footer>
</body>
</html>`;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: onboardingHTML }}
      style={{ width: '100%' }}
    />
  );
}
