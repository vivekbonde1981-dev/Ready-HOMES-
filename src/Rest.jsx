import React, { useState, useEffect } from 'react';

export function Restation() {
  // Application states
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('Projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);

  // Form states
  const [contactForm, setContactForm] = useState({ name: '', email: '', projectType: 'Residential', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Interactive Horizontal Accordion state
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Active filter state for the Asymmetric Landmark Projects grid
  const [asymmetricFilter, setAsymmetricFilter] = useState('All');

  // Load More state for projects
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  // Cost Estimator states
  const [estimator, setEstimator] = useState({
    projectType: 'Commercial',
    sqft: 12000,
    finishTier: 'Premium'
  });

  // Dynamic Google Font & Icon Loading
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const iconLink = document.createElement('link');
    iconLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    iconLink.rel = 'stylesheet';
    document.head.appendChild(iconLink);

    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(iconLink);
    };
  }, []);

  // System Dark Mode Sync & Local Setup
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle estimator calculation
  const calculateCost = () => {
    let baseRate = 150; // default standard residential
    if (estimator.projectType === 'Commercial') baseRate = 220;
    if (estimator.projectType === 'Eco-Sustainable') baseRate = 190;

    let multiplier = 1.0;
    if (estimator.finishTier === 'Premium') multiplier = 1.4;
    if (estimator.finishTier === 'Ultra-Luxury') multiplier = 1.9;

    const estimatedValue = estimator.sqft * baseRate * multiplier;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(estimatedValue);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsContactOpen(false);
      setContactForm({ name: '', email: '', projectType: 'Residential', message: '' });
    }, 2500);
  };

  // Leadership Team Bio Data
  const executiveTeam = [
    {
      id: 'exec1',
      name: 'David Chen',
      role: 'Chief Architect',
      degree: 'Harvard GSD, M.Arch',
      bio: 'David leads Spaciazs physical modeling division and BIM design matrix. With over 18 years of pioneering sustainable high-rises, David ensures raw structural physics match Spaciazs zero-emission design vision.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6du_DfpdVMvND6P-n82I7OqqME7nfMVGPUQZg19-kvGlPlLR6kXdiDjLDD2kZnm9XrPJg_k3McJDGX716IwaUYioId7umbrDZNkHcxkmirDr6sLeQm1rrAEgG_Dwcq5ODKPriOLMSkKevzt0Lybnx2FBn3-mGbFFITXjk6aP4xUyzRMXMb9wVxYFaOq_5wFY6np-2bT5S18l1R-W3ca2kkmTRySISLYEDaCLRUas9VkPbTdMJQ43oPeSeBRsS1VZQ0L3pYW3_6u4',
      primaryProject: 'Vanguard Glass Spires'
    },
    {
      id: 'exec2',
      name: 'Sarah Jenkins',
      role: 'Head of Design',
      degree: 'Royal College of Art, MA',
      bio: 'Sarah is an organic minimalist visionary. Her methodology blends localized clay and recycled lumber elements into custom interior configurations that promote airflow, organic light-harvesting, and user wellness.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBETaa1OXu5KgHHkH_W_t8wtDZgLjlJ3pb5yfxa5fgV4cmudmkRfP5ZiMhQjSZ5Sw0Sb8ngL8iVqFtQed1_uVAEAECA5MJb3vk7nFh3C1yy4BHj8kuSfuxH_ajnBDD2pRi4pqradxMmEId6SXxcmpm9mTFecqvJ_4cuTJdW2PIkcSfGse9_zUmB5w1q_I0Gk5xwbUtpmbeN2AirKhF9Kr1v5Ix-W7L08k-O1NkDY0NBud5TcbLDbjHRGAHczNfcX1uUYms8bP56lgQ',
      primaryProject: 'Metropolis Cascade Residency'
    },
    {
      id: 'exec3',
      name: 'Michael Ross',
      role: 'Managing Partner',
      degree: 'The Wharton School, MBA',
      bio: 'Michael oversees project economics, compliance models, and international real estate portfolios. He focuses on protecting capital structures and executing smooth project handovers on tight, transparent schedule metrics.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGRdXkuG7LIBRz8A6I7lOw0XAyuDGwClZkgS2MjGIQGgdM_rG4rQY9W6poO-_Czk7LJJHQvzAAoLl1oDBHhejqtxzYrLSlWZxtzAwHB9r8EwWgKk7hY2Svq1ngsvX2n9YqZE2ZgUrhmQ9H60YY3fvI-WYQmfRaNBsUTRgTYtU0plXB0E187FqudDSqaFombNdOC1gFFNUCWgwGebwd5Md_VTCxl0wIvwlMR1b4OLH9FAC59i7CCg1MccUTj05rdBbI7nvLVMbFtY8',
      primaryProject: 'Eco Logistics Park'
    }
  ];

  // Awards Details Data
  const awardsData = [
    { id: 'aw1', title: 'Emerging Designer of the Year', body: 'Global Architectural Council', year: '2025', project: 'Vanguard Glass Spires' },
    { id: 'aw2', title: 'Best Residential Design', body: 'American Institute of Building Arts', year: '2024', project: 'Metropolis Cascade Residency' },
    { id: 'aw3', title: 'Sustainable Design Award', body: 'LEED verification board honoree', year: '2025', project: 'Elysium Wooded Haven' },
    { id: 'aw4', title: 'Top Estate Consultant', body: 'International Property Federation', year: '2023', project: 'Urban Masterplan 01' },
    { id: 'aw5', title: 'Residential Architect of the Year', body: 'David Chen - Architectural DigestAD', year: '2025', project: 'Cascade Steps Project' },
    { id: 'aw6', title: 'Best Interior Appointment', body: 'London Interior Council', year: '2024', project: 'Stirling Lofts & Art' }
  ];

  // Asymmetric Projects Grid Data
  const asymmetricProjects = [
    {
      id: 201,
      title: 'Urban Height Residence',
      category: 'Residential',
      location: 'New York, USA',
      year: '2025',
      sqft: '420,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwB5Zskg9yWuHhXReEaahD28bWBCLyGUlGpIFeJY3-4nVOFOBtQnRhQusyVQ6ayAKM4l3KEzwf8Gbhnv4iX6_94tpS20K6lp_243APlzUUhrrClYomaMIpknP9P4UC3Fm--g1lq-pOzSezAWLe1vX_xiE_j_CuDbDxoDfrhvyBEIGnRlTvCNo4vewXTtFGrU1uj_LUw0ZUKFQH3PQmo3xayqxRLd-E0EFkf5Xr34UZlFZWONsGmEDhBTl-frkI3t8-KPShzTSSMb4',
      gridClass: 'md:col-span-2 lg:col-span-2 aspect-[16/9] lg:aspect-[2/1]',
      desc: 'A magnificent skyline installation that challenges physical gravity. Featuring sleek, cantilevered garden balconies, custom thermal-glass structures, and a premium light-infused lobby lounge.'
    },
    {
      id: 202,
      title: 'Nexus Tech Hub',
      category: 'Commercial',
      location: 'London, UK',
      year: '2024',
      sqft: '250,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWn9auLRnQkV8NOg_eO8Onojbf2dXn8rY4I2QkTmMXQIdYpFe8d6F1FY6uzYKawQ9zpDWH1lLRigyTi85RFFtFOuSTIpigMkCn5rBdsv1sL5-qSd6ipR4-C0IlHYe8Ohgo39T7weEMY-HvVJvwqEBYUhmWbnn2iSmbKaLAk92zNXx-zm8FDQStGC19j2MysotYAGwzfXCK-KbsMlt-WsQ2IdkdePUlz4G5o9sTAvLUhChij-i4klzRyreiB9DB7f5LP7AypkVS4pk',
      gridClass: 'aspect-square',
      desc: 'Sleek geometric steel and structural glass facades catching twilight rays on the Thames. Built using premium recycled concrete blocks and modular carbon-filtering air-circulation systems.'
    },
    {
      id: 203,
      title: 'Greenview Apartments',
      category: 'Residential',
      location: 'Singapore',
      year: '2026',
      sqft: '185,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5qu5Eq7fMpqePq0FaZVBZOWge0-dKP7NgucBG-2xtM5HXfRViW0rb-wloTQrBI-Wo2Z6fZU01jScXA3N77_131y3pbL0W_vZsfqRnikUaxYPGXm-rPRWpKhywdIsdeb5JRShdiOAQzE0ao3MpQs5p-knpRJkTKTPmPRT3uk4LYZtJKNUuNcTLpaWtBDo-ZrnEaXrS5cEMif6AdMXeJt4OdXlq79L6jLzQKs5THVte30AQHMuqOb_PN0JZ4grVDWcRULllbgTRLQs',
      gridClass: 'aspect-square',
      desc: 'A gorgeous biophilic residency wrapped in cascading organic vines. Combines sustainable water collection circuits with state-of-the-art climate-responsive insulation layers.'
    },
    {
      id: 204,
      title: 'The Apex Museum',
      category: 'Cultural',
      location: 'Berlin, Germany',
      year: '2025',
      sqft: '95,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK6f-0EgzGaAYxY-X2DDN9UcPQL--1a5K5Ce4nVUZ-sBPZlN4G6O6C9eaEc0IJUxvGROECVo27j4kVLMHpKcVaaDKgyT2vLFp_dbuBj6R_sCH0VJrCYvH0xHX9rVKlFIWRx5uDKIbX03R7q4DSP4BAdS4sXTBItG5dGFenwyhiyECTT2pHcR6D5ZZYlmta3JOg-N2uvjGAiDVKknqFXQ5t5bVNX2eIacLWuteRwwiISNPKaRGp3YQkruBb3iNnXJBmBwnHNNwBIIA',
      gridClass: 'md:col-span-1 lg:col-span-1 aspect-[3/4] lg:row-span-2',
      desc: 'Imposing raw brutalist contours meeting contemporary glass cutouts. Engineered to stand as a cultural beacon, delivering natural, dramatic shadow parameters throughout its inner exhibit galleries.'
    },
    {
      id: 205,
      title: 'Eco Logistics Park',
      category: 'Industrial',
      location: 'Rotterdam, NL',
      year: '2025',
      sqft: '1,200,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZpvb_e0D7DhGb0b3o6tCasDV3KbUhJebwL7kfBeSjp3Q7N2HsQaDJpCRDHbm1Dfz-VbGtMhz6S4bOUkMONgcQH05O2EFkpz5aktr9-3vED-zgybBX7JBN9N18m5eAhln0XGIdRn6Mg7GW2NxY_0c4Loe-kpHJ39yT-qjsU6NWDimsn30I_1-xoX7j2ixCODAveGIlKQMfWgeC3ig3S73EjenFLS0eRcNqf1Wjbg4KOzydOW310tkku148J3n2j7S7l8UXCOEZ04o',
      gridClass: 'md:col-span-2 lg:col-span-2 aspect-[16/9] lg:aspect-[2/1]',
      desc: 'Highly efficient warehouse spaces engineered to operate entirely off-grid. Integrated with multi-megawatt rooftop arrays and native wetlands drainage paths.'
    }
  ];

  // Projects shown after clicking "Load More"
  const moreProjectsData = [
    {
      id: 206,
      title: 'Vanguard Glass Spires',
      category: 'Commercial',
      location: 'Tokyo, Japan',
      year: '2026',
      sqft: '450,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbzzWQET4yMcc_-4sXiJmYdmWXW84F1rjbTpKjvlv-5p5DMSJD66yxV3KQ9uPMAHBjYJ5Icbg8Fab7Om0QerdVNNPvxrbg0-SMEtDMYpFLAhbl5J4a1Jo0fI0hp16SJ3oX_6_hVYt0uCIUYLcJt59yJIpGCeUzyjztScKLZAcN8ZgMbaZz2H91Bj3CpLN7RXfDkH5I9MzkZxC8l86CVntRB3AD9RQUBTN0sSjd9UNjbm4Jb1anfwpOHF3gU5xzo7ISEz9YnqZG6SI',
      gridClass: 'aspect-square',
      desc: 'Sleek, eco-sustainable commercial headquarters designed to blend greenery and futuristic glass facades in prime metropolitan districts.'
    },
    {
      id: 207,
      title: 'Metropolis Cascade Residency',
      category: 'Residential',
      location: 'Austin, USA',
      year: '2025',
      sqft: '180,000 sq ft',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGdkUIlUuoWGcoSfi3j7nJcVUe9MrHy30boUSXGTS9Q89ZeLaLil3e5NX4rW-5xqvRI3cPMDjOlX19F-1iZ8-nsgyDEE-Poa3h_sI7Cow_AZ73QmF4X8lP5Gn-Z6tNjkQZxnsdHWRUxStpXqKpKDfGIg-QZdNpu11db4xUNjsZ6tAumLk_2TjfWXWdj20r7Nd2LNdfWbg_WoYolBEpXwkrtIhn3nJ1-fJi18je3Z-nZPV7e5DC-vD_tThtU7sYzcKEE1uxe-AytdI',
      gridClass: 'aspect-square',
      desc: 'High-density urban housing with beautiful concrete step terraces designed to maximize natural lighting and cross-breeze circulation.'
    }
  ];

  // Combine baseline projects and expanded projects
  const activeProjectsGrid = showMoreProjects 
    ? [...asymmetricProjects, ...moreProjectsData] 
    : asymmetricProjects;

  // Horizontal Accordion data
  const accordionProjects = [
    {
      id: 101,
      title: 'Mixed-Use Development',
      category: 'Category A',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS5G9tb_USuPBUq5pkioYgcu0NKDHO_KYWWpFaKluhrFBgIoeVWJI_PiXEaDvEMyggCjdj_Su_7hkH1JSLJSt17BZlBhVRs39fN1QMv6oYCugpFTlHIw4xSshZvdrLPZE8_lKAH7DU1fbzuQZg9N4_J0jN6-LQtp0WJdUBtPe7DzHeAjFo1stErjb49I289QsketUi6aEaxkrK5ziIHQJbEY6GwHtTFDMOjiF5G2uDbgtJRnqxjZMIK_fOKlx0BXDFgbLxofV0Gqw',
      desc: 'A seamless blend of modern commercial spaces, luxury lofts, and community parks under a zero-emission energy grid.'
    },
    {
      id: 102,
      title: 'Oakridge Apartments',
      category: 'Category B',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYw_s43Cv-g_NbXtEPSt8HVrO-KZ-OsGDIYpk2_WBb7HusIKxSbtjRhHb0lX2ueTQ_WSdBins-gV8RcmwJDueGWD59av4FYMEDFDsjXUyd6ppnnuW6QDia21Zqk0Zt0LWyLj7UN2jJGu837DH8QMdy2FIKc28hpiMuDnW_9CYgfEOD2Nq_SN4XxGgeXGN0q7YOQAaZGyz_pi7zp1FayMl9EhzIiu8Yo4snmMiPvhVZU1OuBrD8U3JpcIW8aYTZG0AEGYI5RVfQI6g',
      desc: 'Organic architectures crafted from native limestone and timber, offering private garden balconies in prime forestry districts.'
    },
    {
      id: 103,
      title: 'Piermont Office Tower',
      category: 'Category C',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRKZyPBotYU1bvG9rEnSUBZ5EWloBPUtOlDOWFtmpqMlX0WY0dk7HoctU0rpQyH-cU2wQeHw8twafuTadWMIFEKdu5WC3-pLqfgAhWmqBruazkJzczjZ-S9J1HEGgQgmtaV9tMLzZUXXBhjfHIlBJNsiVe0OFerotp9yS2uEnhH6MSSD6klEF_lFscJ7RayntnKnHsNyGDp7n0lniok4GbYPzpKUpuf6D5ySDBSBC7ZloZOsftehl94tV8bC3-6u2MR6I9OnSlvk',
      desc: 'A soaring steel pinnacle with high solar glass facades, optimizing daytime electricity and visual landscape horizons.'
    },
    {
      id: 104,
      title: 'Urban Heights Residence',
      category: 'Category D',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHXRSBv_5sDV6E7004IfbswXIjcYzWWMFaEnFA2GzdAuWBqTXD8DZwvCHSaegfBaEprZgjSWp3QS9MGHe0f557tRM0WZpKbUJXKO7OiLN-HPIP6B6BK3BZndFW_H9FBVVwU0zMuOUrFMVFyPOr9oo9IAKCFwlPwp9GH86shWopayaqK4AiHifSrASeFmjOSez2nIyjPHAqshJX5bfZDnLxM6a2YNFdTC2rdj0DDMtM9YZMfqqrSu2Q_Iztnw5lwHFKG211lBGU4',
      desc: 'Clean, minimalist geometry emphasizing high ceilings, concrete-step structures, and panoramic glass vistas.'
    },
    {
      id: 105,
      title: 'Stirling Lofts & Art',
      category: 'Category E',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4V6HpdIchCMtxAyZUg9UkRm-plrOU8AySLn5AOmhf3asroMaQv-smK9zt5FvQXhOq0mqJ8aAOHAisNW1K1G1tx_pUCUMzLwjOzI6cs_0JhzLmBuBqgwBQJ7-qOTa4sBerDjEeFdVTUI3LW52IzV1MegnMKeAE6ehmgBHGOY2qXrQbrKhH1TkVY1E4hJP6NQg2QTpCoAtiTshMp60njaNY3lJbNsIn4CoyYotnV04ITYednX0Ccjd1xdQFaANCoxHeyJaCH4ofx7Y',
      desc: 'Historic preservation meets contemporary expansions, catering to creative live-work communities.'
    },
    {
      id: 106,
      title: 'Commercial & Business',
      category: 'Category F',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPX9WnjUzDcU7rD3BDGyuCMZmQnCjHU5vPuDwpjRzN0HmlYMMzKh7PNCu6uZ_HHwLMmXq0Eh7GQDQm0Za7Y2TPo9XN_T3ydCfY_Sw6mQN65EmQIAqjoKgqYpSvgu-tYQAa-URg7QuH8go_sDuLCiEFcGSLNiAPZb-SVKHvAWnQo2RNAz2XXMsyQ3gPvP59VM8qRW1-fOCMTnz1Nars1r9dJRnFZ48ydXEl_LiIj3iMEkaJAA-Rnhm2hI9AHQeD9mlt9G-tyJmb2iE',
      desc: 'Innovative retail hubs utilizing multi-tiered pedestrian terraces and natural bio-filtration gardens.'
    }
  ];

  // Bento Services data
  const serviceDetailData = {
    architectural: {
      id: '01',
      title: 'Architectural Design',
      tagline: 'Blending Aesthetic Vision with Structural Physics',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg62e219oYZSXcyaYPh9HW_mbfKttSb5o_rRKamNHGhQBfbAcI-lYl9d8JakdRY4OLoBJZ8oY03pq42XECoxNE_yCceSkFD3ReW7na1k9nc8cJwtWKeJaZ4LD8_tszVqbjcTKy-qVge87b3tEXqA7la9rJWvzdk_7VLY3_LqeV6ZbGeRcO-aV8S80gnJt_di_z5-CuThOR0rZIb8cNcu9wkygDPEouczz2Yi8cPzgLJ8Zfoq-8YwMBDxxk2ZTKrnSwJlW2ODFSy2w',
      desc: 'We map raw space metrics into responsive steel, glass, and timber. Operating with next-generation Building Information Modeling (BIM), our architectural design stream ensures that structural sustainability is verified long before physical excavation begins.',
      phases: ['BIM virtual reality mockups', 'Seismic structural computations', 'Daylight harvesting design parameters'],
      timeline: '2 - 5 months standard planning'
    },
    interior: {
      id: '02',
      title: 'Interior Design & Spatial planning',
      tagline: 'Flow, Light, & Sophisticated Bespoke Materiality',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbzzWQET4yMcc_-4sXiJmYdmWXW84F1rjbTpKjvlv-5p5DMSJD66yxV3KQ9uPMAHBjYJ5Icbg8Fab7Om0QerdVNNPvxrbg0-SMEtDMYpFLAhbl5J4a1Jo0fI0hp16SJ3oX_6_hVYt0uCIUYLcJt59yJIpGCeUzyjztScKLZAcN8ZgMbaZz2H91Bj3CpLN7RXfDkH5I9MzkZxC8l86CVntRB3AD9RQUBTN0sSjd9UNjbm4Jb1anfwpOHF3gU5xzo7ISEz9YnqZG6SI',
      desc: 'Crafting premium internal atmospheres focusing on thermal, acoustic, and custom visual layers. We select organic textures, design bespoke custom millwork, and organize modular pathways that optimize user wellness.',
      phases: ['Sensory interior tactile planning', 'Bespoke built-in cabinet specifications', 'Ergonomic pathway flow mapping'],
      timeline: '1 - 3 months selection phase'
    },
    sustainable: {
      id: '03',
      title: 'Sustainable Planning & LEED Certification',
      tagline: 'Zero Emissions, Low Carbon Footprints, Active Eco Systems',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_UQggmjYIz_gIr7alF_o8lnRQZuE02Un3PuGaMMZaU65azrH-taOD320GU10nWp7jT_T5zoazSb1Dw33ktSo3o5O7pNMfao3o1pACKb96GiE-azIKRXk4eMxX9RrVskqNy6uZYL6djNXxSv7nCu2ABkoUUrYzEBv8ZdM6W8q_hGJLn_wkK8Azsa9RxTCTbfDJNdaPdPtCaJ3XpQU-Is-dOHZE3oDVXMk_clkY-vuFI5ynbQcP6QbziUzAMHSy-f3M_JXYMzvgr0',
      desc: 'Enabling active green technologies natively into standard frameworks. We utilize local bio-filtration resources, draft integrated solar arrays, configure geothermal heat pumps, and analyze lifetime thermal efficiencies.',
      phases: ['Active solar and battery yield analysis', 'Greywater bio-filtration circuits', 'Local sourcing circular materials metrics'],
      timeline: 'Continuous development integration'
    },
    management: {
      id: '04',
      title: 'Rigorous Technical Project Management',
      tagline: 'Precision Delivery to Handover with Transparent Metrics',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA264DqSQBoqSX_vtjiYegi7aiJmP8Xe3sTPaxWiZtdfW26J47mmXFhIxqlKSdnuyEJlS_AqOHz9Ddm2q7akkZdulvBznnIlG9fHZEdYPevF_0Klo9GKqn37MowucuOOnbPROFCkSbDi_V81E_v3RKd6K4DrEX8ZMaTzAMxCDD6YQi1s8Moxb8XyxeSYBhaQSTnQZexg2vzanpoBFH1xheQnYkup5P85M-sMJzZa4fzI_xiU77BH8kKUzr5iTnYQg0bmcBKRWYmZHA',
      desc: 'Protecting real estate budgets and timeline goals through on-site surveillance cameras, automated supplier workflows, and highly skilled master builders coordinating in real-time.',
      phases: ['Automated cost-control alerts', 'Rigorous vendor quality checks', 'Seamless legal sign-offs and handovers'],
      timeline: 'From ground-breaking to occupancy'
    }
  };

  // Journal Articles mock data
  const journalArticles = [
    {
      id: 301,
      title: 'Biophilic Design Bringing Nature Indoors',
      category: 'Architecture',
      date: 'March 23, 2026',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9jHIyS39e72A13BMUmPWlUUFjefV_BCTyHgvkoG_395jhCT5pWI6gI42ihf4V01WAw2LcMU0dQ82K3ZDEzSersFgYPme4Hjxe4AzDaB55J0WMA3o_2lzSTGLXkqF1IZwNjybexjpyDuFUQMu4NgqZxF9ZWUFMfoqFUY2osIoKt2Hq0zm3jvppET7juMtkwJlWzo4YoVxrTXD_PlxsAV0VuC5JpGYm9YpEXVnz1JLUf_Dn9xQdoW7Qn5Jg5j_Nyc7vOu26ow5m0UQ',
      readingTime: '6 min read',
      author: 'Evelyn Sterling (Principal Biophilic Architect)',
      summary: 'Exploring the vital neurological link between indoor organic environments and human stress reduction metrics.',
      content: 'Integrating plant systems directly into the primary HVAC ventilation allows a continuous supply of clean filtered oxygen while stabilizing moisture parameters. In our Singapore Greenview project, we monitored a 15% increase in cognitive performance and marked stress reduction when offices integrated cascading natural plant life, daylight-mimicking glass filters, and localized timber structural partitions.'
    },
    {
      id: 302,
      title: 'Revamping Old Spaces: Urban Restoration Blueprints',
      category: 'Interior',
      date: 'March 20, 2026',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-CHyqusuZvKs6SUXyETM16diIxxHUstc8M-eji9Nc3QFmYXkM5Mq9OPWd3UeB4CzDxAxcA-JLTqmV5WwyRqff7x-XjVyLNQUv7Ts3iY0ApPhG1fh-Eucj7LXxFgxWa0ZX3y6m5OBhvC1HzXcCEQCW-UjOEtLtneUtiFV4SmkveVeOc4Yb4893UiwojVRLJ4bQNFs-5N9Yuuc6eSVRrIRAy_dO0YZ_bR_mvFmMiIKsPwMk9COMGCDK_NCtFGlnnMpBPTxe_5tawc',
      readingTime: '5 min read',
      author: 'Marcus Vance (Director of Urban Preservation)',
      summary: 'How historic buildings are updated to support full zero-emission targets without erasing structural heritage.',
      content: 'Restoring raw elements like concrete columns or brick frames from the 1920s presents a fantastic challenge. We insulate historic brickworks from the interior using natural cork compounds, keeping the original facade intact. High-efficiency double-glazed black frame steel windows are custom-fitted into original arches, guaranteeing low thermal leakage while preserving heritage.'
    },
    {
      id: 303,
      title: 'How to Get Started in Buying Your First Custom Home',
      category: 'Tips & Tricks',
      date: 'March 15, 2026',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
      readingTime: '8 min read',
      author: 'Clara Oswald (Bespoke Land Developer)',
      summary: 'Navigating real estate permits, material selection, and budget planning with zero unexpected cost spikes.',
      content: 'Most new buyers get overwhelmed with initial site preparation costs or complex local structural codes. We recommend starting with a strict spatial footprint analysis. Determine your essential baseline square footage, select local circular materials (which dramatically lowers transport overheads), and use cloud design interfaces to calculate costs in real-time before finalizing the structural blueprint.'
    }
  ];

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-secondary-fixed selection:text-on-secondary-fixed transition-colors duration-300`}>
      
      {/* Styles Injections to handle custom Material and Brand Theme Token config */}
      <style>{`
        :root {
          --on-primary-fixed: #020617;
          --primary-fixed: #dbeafe;
          --on-tertiary-container: #1e293b;
          --on-tertiary-fixed-variant: #0f172a;
          --surface: #ffffff;
          --tertiary-fixed-dim: #cbd5e1;
          --tertiary-container: #0f172a;
          --surface-container-highest: #e2e8f0;
          --surface-container-low: #f1f5f9;
          --on-primary-fixed-variant: #1e3a8a;
          --surface-container-high: #dbeafe;
          --primary-fixed-dim: #93c5fd;
          --on-primary: #ffffff;
          --surface-bright: #ffffff;
          --on-surface: #020617;
          --outline-variant: #cbd5e1;
          --surface-variant: #e2e8f0;
          --on-error-container: #7f1d1d;
          --on-secondary: #ffffff;
          --primary: #020617;
          --surface-tint: #1e3a8a;
          --secondary-container: #dbeafe;
          --on-secondary-container: #1e3a8a;
          --on-primary-container: #020617;
          --on-error: #ffffff;
          --secondary-fixed-dim: #1d4ed8;
          --on-background: #020617;
          --inverse-primary: #93c5fd;
          --outline: #94a3b8;
          --on-surface-variant: #334155;
          --secondary-fixed: #38bdf8;
          --tertiary-fixed: #e2e8f0;
          --surface-dim: #cbd5e1;
          --error: #dc2626;
          --tertiary: #0f172a;
          --secondary: #1e3a8a;
          --surface-container-lowest: #ffffff;
          --inverse-on-surface: #f8fafc;
          --error-container: #fee2e2;
          --inverse-surface: #020617;
          --on-tertiary-fixed: #f8fafc;
          --primary-container: #dbeafe;
          --on-secondary-fixed: #020617;
          --surface-container: #f8fafc;
          --on-secondary-fixed-variant: #1d4ed8;
          --on-tertiary: #ffffff;
          --background: #f8fafc;
        }

        .dark {
          --background: #020617;
          --on-background: #f8fafc;
          --surface: #0f172a;
          --on-surface: #f8fafc;
          --surface-container-low: #111827;
          --surface-container-high: #1e293b;
          --primary: #ffffff;
          --on-primary: #020617;
          --on-surface-variant: #cbd5e1;
          --outline-variant: #334155;
          --primary-container: #0b1220;
          --on-primary-container: #e2e8f0;
          --tertiary-container: #0f172a;
          --secondary-fixed: #38bdf8;
          --secondary-fixed-dim: #2563eb;
          --secondary: #60a5fa;
          --secondary-container: #1e3a8a;
          --on-secondary-fixed: #020617;
          --on-secondary: #ffffff;
          --outline: #475569;
          --surface-container: #111827;
          --surface-container-highest: #334155;
          --surface-container-lowest: #020617;
          --surface-bright: #0f172a;
          --surface-dim: #020617;
          --surface-variant: #1e293b;
          --inverse-surface: #f8fafc;
          --inverse-on-surface: #020617;
        }

        /* Standardized Classes Matching Original Config */
        .bg-background { background-color: var(--background) !important; }
        .text-on-background { color: var(--on-background) !important; }
        .text-secondary-fixed { color: var(--secondary-fixed) !important; }
        .text-secondary-fixed-dim { color: var(--secondary-fixed-dim) !important; }
        .text-primary { color: var(--primary) !important; }
        .dark\:text-on-surface { color: var(--on-surface) !important; }
        .text-on-surface-variant { color: var(--on-surface-variant) !important; }
        .dark\:text-outline-variant { color: var(--outline-variant) !important; }
        .hover\:text-secondary-fixed-dim:hover { color: var(--secondary-fixed-dim) !important; }
        .border-secondary { border-color: var(--secondary) !important; }
        .bg-secondary-fixed { background-color: var(--secondary-fixed) !important; }
        .text-on-secondary-fixed { color: var(--on-secondary-fixed) !important; }
        .hover\:bg-secondary-fixed-dim:hover { background-color: var(--secondary-fixed-dim) !important; }
        .bg-surface-container-low { background-color: var(--surface-container-low) !important; }
        .bg-surface { background-color: var(--surface) !important; }
        .border-outline-variant { border-color: var(--outline-variant) !important; }
        .hover\:bg-surface-variant:hover { background-color: var(--surface-variant) !important; }
        .bg-primary-container { background-color: var(--primary-container) !important; }
        .text-on-primary-container { color: var(--on-primary-container) !important; }
        .text-on-primary { color: var(--on-primary) !important; }
        .border-on-primary\/30 { border-color: rgba(255, 255, 255, 0.3) !important; }
        .hover\:border-on-primary:hover { border-color: var(--on-primary) !important; }
        .bg-surface-container-high { background-color: var(--surface-container-high) !important; }
        .text-tertiary-fixed { color: var(--tertiary-fixed) !important; }
        .dark\:text-on-tertiary-container { color: var(--on-tertiary-container) !important; }
        .text-tertiary-fixed-dim { color: var(--tertiary-fixed-dim) !important; }
        .bg-tertiary-container { background-color: var(--tertiary-container) !important; }
        .bg-surface-container-lowest { background-color: var(--surface-container-lowest) !important; }
        .bg-primary { background-color: var(--primary) !important; }

        /* Font classes mapping */
        .font-body-md, .font-body-lg, .font-label-md {
          font-family: 'Manrope', sans-serif !important;
        }
        .font-display-lg, .font-display-lg-mobile, .font-headline-lg, .font-headline-md {
          font-family: 'Hanken Grotesk', sans-serif !important;
        }
        .text-balance {
          text-wrap: balance;
        }

        /* Custom scrollbars */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--background);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--outline-variant);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--secondary-fixed-dim);
        }

        /* Staggered Vertical Lines */
        .stat-line {
          width: 1px;
          background-color: rgba(56, 189, 248, 0.25);
          margin-right: 16px;
          transition: height 0.5s ease-in-out;
        }

        /* Horizontal project accordion panels transitions */
        .project-accordion-panel {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Feature Icons Box Styling */
        .feature-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(56, 189, 248, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary-fixed);
          margin-bottom: 16px;
          border: 1px solid rgba(56, 189, 248, 0.22);
        }

        /* Custom shape curvatures from services design */
        .shape-tl { border-top-left-radius: 4rem !important; }
        .shape-br { border-bottom-right-radius: 4rem !important; }
      `}</style>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md flex justify-between items-center px-4 md:px-16 py-5 transition-all duration-300 border-b border-outline-variant/10" id="main-nav">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="material-symbols-outlined text-secondary-fixed text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold tracking-tighter text-primary dark:text-on-surface">SPACIAZ</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-label-md text-xs uppercase tracking-widest">
          {['Demos', 'Pages', 'Services', 'Projects', 'Journal', 'Contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Contact') {
                  setIsContactOpen(true);
                } else if (tab === 'Services') {
                  handleScrollTo('services-expertise-section');
                } else if (tab === 'Projects') {
                  handleScrollTo('asymmetric-projects-grid');
                } else if (tab === 'Journal') {
                  handleScrollTo('journal-section');
                } else if (tab === 'Pages') {
                  handleScrollTo('differentiation-section');
                }
              }}
              className={`pb-1 transition-all duration-300 ${
                activeTab === tab
                  ? 'text-primary dark:text-on-surface border-b-2 border-secondary font-bold scale-105'
                  : 'text-on-surface-variant dark:text-outline-variant hover:text-secondary-fixed-dim hover:scale-105'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Switcher Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full bg-surface-container-high dark:bg-surface-container-low hover:scale-105 transition-transform duration-200 flex items-center justify-center text-primary dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-xl">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Quick Contact Info */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs font-label-md text-on-surface-variant font-bold">
            <span className="material-symbols-outlined text-sm text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            +(284) 123 - 456 88
          </div>

         

          {/* Responsive Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-md lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-[280px] bg-surface p-8 flex flex-col gap-6 shadow-2xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-4">
              <span className="font-display-lg text-xl font-bold tracking-tighter">SPACIAZ MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {['Demos', 'Pages', 'Services', 'Projects', 'Journal', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                  if (tab === 'Contact') {
                    setIsContactOpen(true);
                  } else if (tab === 'Services') {
                    handleScrollTo('services-expertise-section');
                  } else if (tab === 'Projects') {
                    handleScrollTo('asymmetric-projects-grid');
                  } else if (tab === 'Journal') {
                    handleScrollTo('journal-section');
                  } else if (tab === 'Pages') {
                    handleScrollTo('differentiation-section');
                  }
                }}
                className={`text-left text-lg font-semibold py-2 uppercase tracking-wide border-b border-outline-variant/10 ${
                  activeTab === tab ? 'text-secondary-fixed font-bold' : 'text-on-surface-variant'
                }`}
              >
                {tab}
              </button>
            ))}

            <div className="mt-auto pt-6 border-t border-outline-variant/20">
              <p className="text-xs text-on-surface-variant mb-4">Call Us: +(284) 123 - 456 88</p>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="w-full bg-secondary-fixed text-on-secondary-fixed py-3 rounded-full text-center font-bold text-xs uppercase"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-[110px] md:pt-[130px]">
        
        {/* Interactive Estimator Quick Notification Bar */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 mb-8">
          <div className="bg-primary-container text-on-primary-container p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary-fixed text-2xl">calculate</span>
              <p className="text-sm font-medium">
                Want to estimate design or building costs for your custom property? Try our interactive planner!
              </p>
            </div>
            <button
              onClick={() => setIsEstimatorOpen(true)}
              className="bg-secondary-fixed text-on-secondary-fixed text-xs uppercase font-bold py-2 px-5 rounded-full hover:bg-secondary-fixed-dim transition-colors"
            >
              Open Project Estimator
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[650px] lg:min-h-[800px]">
            
            {/* Left Image Column */}
            <div className="lg:col-span-6 relative rounded-[2rem] overflow-hidden group shadow-lg h-[450px] lg:h-auto">
              <img
                alt="Modern Skyscraper"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbzzWQET4yMcc_-4sXiJmYdmWXW84F1rjbTpKjvlv-5p5DMSJD66yxV3KQ9uPMAHBjYJ5Icbg8Fab7Om0QerdVNNPvxrbg0-SMEtDMYpFLAhbl5J4a1Jo0fI0hp16SJ3oX_6_hVYt0uCIUYLcJt59yJIpGCeUzyjztScKLZAcN8ZgMbaZz2H91Bj3CpLN7RXfDkH5I9MzkZxC8l86CVntRB3AD9RQUBTN0sSjd9UNjbm4Jb1anfwpOHF3gU5xzo7ISEz9YnqZG6SI"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              {/* Image Floating badge */}
              <div className="absolute top-6 left-6 bg-primary/80 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-outline-variant/20">
                Pioneer Series
              </div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center bg-surface-container-low rounded-[2rem] p-6 md:p-12 lg:p-16 relative overflow-hidden shadow-sm">
              <div className="absolute top-8 left-8 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Explore —
              </div>

              <h1 className="font-display-lg-mobile md:font-display-lg text-4xl lg:text-7xl text-primary mb-6 leading-[1.05] font-extrabold tracking-tight mt-6">
                A new standard of excellence
              </h1>

              <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-md mb-8">
                The largest privately held real estate investors and managers in the world. Crafting timeless architectural masterpieces.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={() => setIsEstimatorOpen(true)}
                  className="inline-flex items-center gap-3 bg-surface text-primary px-6 py-3.5 rounded-full border border-outline-variant font-label-md text-xs uppercase font-extrabold hover:bg-surface-variant hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  View All Services
                  <span className="bg-secondary-fixed text-on-secondary-fixed p-1 rounded-full material-symbols-outlined text-sm font-extrabold">arrow_outward</span>
                </button>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 text-primary dark:text-white border-b-2 border-primary hover:border-secondary-fixed font-bold py-1.5 transition-colors text-xs uppercase tracking-widest"
                >
                  Request Brochure
                </button>
              </div>

              <div className="flex items-center justify-between mt-auto pt-8 border-t border-outline-variant/30">
                <div className="flex items-center gap-4">
                  <span className="bg-secondary-fixed text-on-secondary-fixed rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-display-lg text-2xl md:text-3xl font-extrabold shadow-sm animate-pulse">
                    40
                  </span>
                  <span className="font-label-md text-[10px] md:text-xs text-on-surface-variant uppercase tracking-widest max-w-[110px] leading-tight font-extrabold">
                    years of experience
                  </span>
                </div>

                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="w-28 h-14 md:w-32 md:h-16 rounded-full bg-primary text-on-primary flex items-center justify-center relative overflow-hidden group shadow-md"
                >
                  <img
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-75 transition-all"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCauyqKpt5yB5fWv0NzbuBzV3HqKLorJPUIT1n0tfOGXoeWIMNXSmtwhzRbjdCwG3E73emsfVeZ5b9vhhEbJ0OOgi0_WwXH_eg6ZDtKtuLqsZ5aGJ0U05zuc4X3e0BK_TK2TOqAuHonOpdnGRd4qcPqV7cHafvVO7Xz9BRIHftNpDis4Ky3ZwNwTcDgb0Aul1-6tQc372icz3ClsMdh_yJuBMVc5YU2wvGe3MnNZ7pYDSeWWKB0Dcp6kIocz9SvMRVT8_3mWb2n76c"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <span className="material-symbols-outlined relative z-10 text-white text-3xl transition-transform duration-300 group-hover:scale-125" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Landmark Projects Section */}
        <section id="projects-section" className="max-w-[1440px] mx-auto px-4 md:px-16 mb-24 scroll-mt-28">
          <div className="text-center mb-16">
            <span className="inline-block border border-outline-variant rounded-full px-5 py-1.5 font-label-md text-xs text-on-surface-variant uppercase tracking-widest mb-4 font-bold bg-surface-container-low">
              Who we are
            </span>
            <h2 className="font-headline-lg text-3xl md:text-5xl text-primary max-w-2xl mx-auto text-balance leading-tight font-extrabold">
              We develop landmark real estate projects
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-lg mx-auto text-sm md:text-base">
              Explore our core methodologies below or scroll down to browse our fully filtered asymmetric portfolio grid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Dark */}
            <div 
              onClick={() => {
                setSelectedProject({
                  title: 'SPACIAZ Global Design Solutions',
                  category: 'Urban Innovation',
                  img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                  desc: 'Our dedicated master-planning unit. We specialize in converting heavily complex commercial codes and environmental regulations into flawless, flowing urban developments that capture green-credits and structural awards globally.',
                  sqft: 'Over 25,000,000 sq ft delivered',
                  location: 'Global operations',
                  year: 'Est. 1986'
                });
              }}
              className="bg-primary-container text-on-primary-container rounded-[2rem] p-10 flex flex-col justify-between h-[450px] relative group overflow-hidden shadow-sm cursor-pointer border border-outline-variant/10 hover:border-secondary-fixed/50 transition-all duration-300"
            >
              <div className="font-label-md text-sm font-bold opacity-60 mb-4">01</div>
              <div className="mt-auto relative z-10">
                <h3 className="font-headline-md text-2xl text-on-primary mb-3 font-extrabold">What we do</h3>
                <p className="font-body-md text-sm opacity-80 mb-6 max-w-[280px]">
                  We maintain this by ensuring transparency and professional conduct in every aspect.
                </p>
                <button className="inline-flex items-center gap-2 font-label-md text-xs uppercase tracking-widest text-on-primary border-b border-on-primary/30 pb-1 hover:border-on-primary transition-all">
                  Our Solutions
                </button>
              </div>
              <div className="absolute bottom-6 right-6 w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-on-secondary-fixed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                <span className="material-symbols-outlined text-base font-extrabold">arrow_outward</span>
              </div>
            </div>

            {/* Card 2: Volt */}
            <div 
              onClick={() => {
                setSelectedProject(projectsData[1]);
              }}
              className="bg-secondary-fixed text-on-secondary-fixed rounded-[2rem] p-10 flex flex-col relative overflow-hidden h-[450px] group cursor-pointer shadow-sm border border-secondary-fixed-dim hover:scale-[1.02] transition-all duration-500"
            >
              <div className="font-label-md text-sm font-bold opacity-60 mb-4">02</div>
              <h3 className="font-headline-md text-2xl font-extrabold mb-3 relative z-10 text-on-secondary-fixed">Our impact</h3>
              <p className="font-body-md text-sm opacity-80 mb-6 max-w-[250px] relative z-10 text-on-secondary-fixed">
                We work with both investors and developers to create landmarks that make an impact.
              </p>
              <button className="inline-flex items-center gap-2 font-label-md text-xs uppercase tracking-widest border-b border-on-secondary-fixed/30 pb-1 hover:border-on-secondary-fixed transition-colors relative z-10 w-fit">
                See Projects
              </button>
              <img
                alt="Building"
                className="absolute bottom-0 right-0 w-3/4 h-1/2 object-cover rounded-tl-[2rem] mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGdkUIlUuoWGcoSfi3j7nJcVUe9MrHy30boUSXGTS9Q89ZeLaLil3e5NX4rW-5xqvRI3cPMDjOlX19F-1iZ8-nsgyDEE-Poa3h_sI7Cow_AZ73QmF4X8lP5Gn-Z6tNjkQZxnsdHWRUxStpXqKpKDfGIg-QZdNpu11db4xUNjsZ6tAumLk_2TjfWXWdj20r7Nd2LNdfWbg_WoYolBEpXwkrtIhn3nJ1-fJi18je3Z-nZPV7e5DC-vD_tThtU7sYzcKEE1uxe-AytdI"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="absolute bottom-6 right-6 w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-lg">
                <span className="material-symbols-outlined text-base font-extrabold">arrow_outward</span>
              </div>
            </div>

            {/* Card 3: Light with image */}
            <div 
              onClick={() => {
                setSelectedProject(projectsData[2]);
              }}
              className="bg-surface-container-high rounded-[2rem] p-10 flex flex-col justify-end h-[450px] relative overflow-hidden group cursor-pointer shadow-sm hover:scale-[1.02] transition-all duration-500 border border-outline-variant/10"
            >
              <div className="absolute top-10 left-10 font-label-md text-sm font-bold text-on-surface-variant opacity-60 z-10">03</div>
              <img
                alt="House"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_UQggmjYIz_gIr7alF_o8lnRQZuE02Un3PuGaMMZaU65azrH-taOD320GU10nWp7jT_T5zoazSb1Dw33ktSo3o5O7pNMfao3o1pACKb96GiE-azIKRXk4eMxX9RrVskqNy6uZYL6djNXxSv7nCu2ABkoUUrYzEBv8ZdM6W8q_hGJLn_wkK8Azsa9RxTCTbfDJNdaPdPtCaJ3XpQU-Is-dOHZE3oDVXMk_clkY-vuFI5ynbQcP6QbziUzAMHSy-f3M_JXYMzvgr0"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent"></div>
              <div className="relative z-10 text-on-primary">
                <h3 className="font-headline-md text-2xl font-extrabold mb-3">Core values</h3>
                <p className="font-body-md text-sm opacity-85 mb-6">
                  To empower businesses with cutting-edge web solutions that enhance their digital presence and drive growth.
                </p>
                <button className="inline-flex items-center gap-2 font-label-md text-xs uppercase tracking-widest border-b border-on-primary/30 pb-1 hover:border-on-primary transition-colors">
                  Discover More
                </button>
              </div>
              <div className="absolute bottom-6 right-6 w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-on-secondary-fixed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-md">
                <span className="material-symbols-outlined text-base font-extrabold">arrow_outward</span>
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES HERO & EXPERTISE SECTION */}
        <section id="services-expertise-section" className="scroll-mt-28 px-4 md:px-16 max-w-[1440px] mx-auto mb-24 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-primary font-bold text-xs uppercase tracking-wider mb-6">
                OUR EXPERTISE
              </span>
              <h2 className="font-display-lg-mobile md:font-display-lg text-4xl lg:text-6xl font-black text-primary mb-6 leading-[1.1] tracking-tight">
                Crafting spaces that define the future.
              </h2>
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-lg mb-8 leading-relaxed">
                We provide comprehensive architectural and design services, turning visionary concepts into landmark realities through innovation and precision.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsEstimatorOpen(true)}
                  className="bg-primary text-on-primary font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-full hover:bg-secondary-fixed hover:text-on-secondary-fixed hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  Launch Project Estimator
                </button>
              </div>
            </div>
            
            <div className="relative h-[350px] md:h-[500px] lg:h-[580px] rounded-[2rem] shape-br overflow-hidden shadow-lg group">
              <img 
                alt="Modern architectural structure" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBydEzAi8QlCjb09A1nr9TTf_NTN4ZDx4D4mJRWuAvHSuo5LWF6y2A8bwBShxyJoAMhzS4Eh9NEFHzoQ1uQbzTJNDeCiWwEJze3v0M_CksRQXL0j7RKA26FPVEHycJbT42m1HhCPtuFiqpDx6R2xYN5D58AAEhf7pf0SuajEHiZublcgDYFjuaG6iLfuuyR4Q2GTD9DJDqa2h7BlqAqY0RKF3Swe2c87tA-bc4nfyWFiSBhnZJ_OVSgz8Gvw7xjTf9KXAMsFf-ukq8"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </div>

          {/* Integrated Bento Grid of Core Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1: Architectural Design (Large Spanning Card) */}
            <div className="lg:col-span-2 bg-primary-container text-on-primary rounded-[2rem] p-8 md:p-12 relative overflow-hidden group shape-tl border border-outline-variant/10 shadow-sm flex flex-col justify-between min-h-[380px]">
              <div className="relative z-10 w-full md:w-2/3">
                <span className="text-secondary-fixed font-bold text-sm mb-4 block">01</span>
                <h3 className="font-display-lg text-3xl md:text-4xl font-extrabold mb-4 text-white">Architectural Design</h3>
                <p className="text-sm text-outline-variant/90 mb-8 leading-relaxed">
                  From initial concept to final execution, we create structures that blend aesthetic brilliance with structural integrity.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 font-semibold text-xs text-white">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> Concept Development
                  </li>
                  <li className="flex items-center gap-3 font-semibold text-xs text-white">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> 3D Modeling &amp; Rendering
                  </li>
                  <li className="flex items-center gap-3 font-semibold text-xs text-white">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> Construction Documentation
                  </li>
                </ul>
              </div>
              
              <div className="relative z-10 mt-auto">
                <button 
                  onClick={() => setSelectedService(serviceDetailData.architectural)}
                  className="flex items-center gap-2 text-secondary-fixed font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all"
                >
                  Explore Service <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>

              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 md:opacity-35 group-hover:scale-105 transition-transform duration-700">
                <img 
                  alt="Architectural Blueprint" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg62e219oYZSXcyaYPh9HW_mbfKttSb5o_rRKamNHGhQBfbAcI-lYl9d8JakdRY4OLoBJZ8oY03pq42XECoxNE_yCceSkFD3ReW7na1k9nc8cJwtWKeJaZ4LD8_tszVqbjcTKy-qVge87b3tEXqA7la9rJWvzdk_7VLY3_LqeV6ZbGeRcO-aV8S80gnJt_di_z5-CuThOR0rZIb8cNcu9wkygDPEouczz2Yi8cPzgLJ8Zfoq-8YwMBDxxk2ZTKrnSwJlW2ODFSy2w"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=500&q=80';
                  }}
                />
              </div>
            </div>

            {/* Service 2: Interior Design */}
            <div className="bg-secondary-fixed text-primary rounded-[2rem] p-8 md:p-12 shape-br group shadow-sm flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-primary font-bold text-sm mb-4 block">02</span>
                <h3 className="font-display-lg text-2xl md:text-3xl font-extrabold mb-4">Interior Design</h3>
                <p className="text-sm opacity-85 mb-8 leading-relaxed">
                  Crafting interior spaces that optimize flow, light, and materiality for an elevated living and working experience.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 font-semibold text-xs">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Space Planning
                  </li>
                  <li className="flex items-center gap-3 font-semibold text-xs">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Material Selection
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => setSelectedService(serviceDetailData.interior)}
                className="w-12 h-12 rounded-full bg-primary text-secondary-fixed flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform mt-auto shadow-md"
              >
                <span className="material-symbols-outlined text-xl">arrow_outward</span>
              </button>
            </div>

            {/* Service 3: Sustainable Planning */}
            <div className="bg-surface-container-high text-primary rounded-[2rem] p-8 md:p-12 relative overflow-hidden group shadow-sm flex flex-col justify-between min-h-[380px] border border-outline-variant/10">
              <div>
                <span className="text-outline font-bold text-sm mb-4 block">03</span>
                <h3 className="font-display-lg text-2xl md:text-3xl font-extrabold mb-4">Sustainable Planning</h3>
                <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                  Integrating eco-friendly practices and energy-efficient systems into every phase of development.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 font-semibold text-xs">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span> LEED Certification
                  </li>
                  <li className="flex items-center gap-3 font-semibold text-xs">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Energy Analysis
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => setSelectedService(serviceDetailData.sustainable)}
                className="w-12 h-12 rounded-full border border-primary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-surface transition-all mt-auto shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">arrow_outward</span>
              </button>
            </div>

            {/* Service 4: Project Management (Large Spanning Card) */}
            <div className="lg:col-span-2 bg-surface text-primary rounded-[2rem] p-8 md:p-12 border border-surface-container-highest flex flex-col md:flex-row gap-8 items-center group shadow-sm min-h-[380px]">
              <div className="w-full md:w-1/2">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner">
                  <img 
                    alt="Construction site" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA264DqSQBoqSX_vtjiYegi7aiJmP8Xe3sTPaxWiZtdfW26J47mmXFhIxqlKSdnuyEJlS_AqOHz9Ddm2q7akkZdulvBznnIlG9fHZEdYPevF_0Klo9GKqn37MowucuOOnbPROFCkSbDi_V81E_v3RKd6K4DrEX8ZMaTzAMxCDD6YQi1s8Moxb8XyxeSYBhaQSTnQZexg2vzanpoBFH1xheQnYkup5P85M-sMJzZa4fzI_xiU77BH8kKUzr5iTnYQg0bmcBKRWYmZHA"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
                <div>
                  <span className="text-outline font-bold text-sm mb-4 block">04</span>
                  <h3 className="font-display-lg text-2xl md:text-3xl font-extrabold mb-4">Project Management</h3>
                  <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                    Ensuring seamless execution from ground-breaking to handover, adhering to strict timelines and quality standards.
                  </p>
                  <ul className="space-y-2 mb-8 grid grid-cols-2 gap-x-2">
                    <li className="flex items-center gap-2 font-bold text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> Budget Control
                    </li>
                    <li className="flex items-center gap-2 font-bold text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> Site Supervision
                    </li>
                    <li className="flex items-center gap-2 font-bold text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> Vendor Coord.
                    </li>
                    <li className="flex items-center gap-2 font-bold text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> Quality Assurance
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => setSelectedService(serviceDetailData.management)}
                  className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all border-b-2 border-primary pb-1 w-fit mt-auto"
                >
                  Discuss Your Project <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>
      {/* MODAL 1: Lead Inquiry / Contact Form Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-surface text-on-surface rounded-3xl w-full max-w-lg p-8 relative shadow-2xl border border-outline-variant/35">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 p-1 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <span className="inline-block bg-secondary-fixed text-on-secondary-fixed text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full mb-3">
              Premium Inquiry
            </span>
            <h3 className="text-2xl font-black mb-1">Let's craft your space</h3>
            <p className="text-on-surface-variant text-sm mb-6">Our project developers usually respond within 3 business hours.</p>

            {formSubmitted ? (
              <div className="py-12 text-center animate-scaleIn">
                <span className="material-symbols-outlined text-6xl text-secondary-fixed-dim mb-4 animate-bounce">check_circle</span>
                <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
                <p className="text-sm text-on-surface-variant">Thank you for contacting SPACIAZ. We will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed text-on-background" 
                    placeholder="E.g. Alexis Wright" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed text-on-background" 
                    placeholder="E.g. alexis@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Project Type</label>
                  <select 
                    value={contactForm.projectType}
                    onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed text-on-background"
                  >
                    <option>Residential</option>
                    <option>Commercial Tower</option>
                    <option>Eco-Sustainable retreat</option>
                    <option>Urban Public Masterplan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Brief Description of Project Goals</label>
                  <textarea 
                    rows="3"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed text-on-background" 
                    placeholder="What are your timeline, location, and aesthetic preferences?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-secondary-fixed text-on-secondary-fixed font-bold uppercase py-4 rounded-full text-xs tracking-widest hover:bg-secondary-fixed-dim transition-all shadow-md mt-4"
                >
                  Submit Brief Form
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive Cost Estimator Modal */}
      {isEstimatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-surface text-on-surface rounded-3xl w-full max-w-xl p-8 relative shadow-2xl border border-outline-variant/30">
            <button 
              onClick={() => setIsEstimatorOpen(false)}
              className="absolute top-6 right-6 p-1 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <span className="inline-block bg-secondary-fixed text-on-secondary-fixed text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full mb-3">
              Budget Calculator
            </span>
            <h3 className="text-2xl font-black mb-1">Interactive Project Planner</h3>
            <p className="text-on-surface-variant text-sm mb-6">Explore dynamic ballpark estimates of architectural materials and design fees.</p>

            <div className="space-y-6">
              {/* Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Project Classification</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Residential', 'Commercial', 'Eco-Sustainable'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setEstimator({ ...estimator, projectType: type })}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                        estimator.projectType === type 
                          ? 'bg-primary text-on-primary border-primary' 
                          : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Sq Ft */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Project Footprint Area</label>
                  <span className="text-sm font-black text-secondary-fixed-dim">{estimator.sqft.toLocaleString()} Sq Ft</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="80000" 
                  step="1000"
                  value={estimator.sqft}
                  onChange={(e) => setEstimator({ ...estimator, sqft: parseInt(e.target.value) })}
                  className="w-full accent-secondary-fixed h-2 bg-surface-container-high rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant/70 mt-1">
                  <span>2,000 SF</span>
                  <span>40,000 SF</span>
                  <span>80,000 SF</span>
                </div>
              </div>

              {/* Selector for Finish */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Finish Tier & Materials</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard', 'Premium', 'Ultra-Luxury'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setEstimator({ ...estimator, finishTier: tier })}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                        estimator.finishTier === tier 
                          ? 'bg-primary text-on-primary border-primary' 
                          : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated output box */}
              <div className="bg-primary-container text-on-primary-container p-6 rounded-2xl border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Estimated Design & Dev Range</span>
                  <div className="text-3xl font-black text-secondary-fixed mt-1">{calculateCost()}</div>
                </div>
                <button 
                  onClick={() => {
                    setIsEstimatorOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-secondary-fixed-dim"
                >
                  Discuss Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Cinematic Video Walkthrough Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-black text-white rounded-3xl w-full max-w-4xl overflow-hidden relative shadow-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <div className="relative pt-[56.25%] bg-zinc-900">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="SPACIAZ Architecture Showcase"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="p-6 bg-zinc-950 flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-lg">Cinematic Walkthrough: Glass Spires</h4>
                <p className="text-zinc-400 text-sm">4K drone capture of exterior terraces, smart climate atrium, and structural engineering highlights.</p>
              </div>
              <button 
                onClick={() => {
                  setIsVideoOpen(false);
                  setIsContactOpen(true);
                }}
                className="bg-secondary-fixed text-on-secondary-fixed text-xs uppercase tracking-widest font-extrabold px-5 py-3 rounded-full hover:bg-secondary-fixed-dim"
              >
                Inquire Developer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Project Detail Modal (Blueprints & Detailed metrics) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedProject(null)}>
          <div className="bg-surface text-on-surface rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl border border-outline-variant/30" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors z-10 text-on-surface"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <div className="h-[300px] relative">
              <img 
                src={selectedProject.img} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <span className="text-[10px] uppercase font-bold bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-black mt-2 text-white">{selectedProject.title}</h3>
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Architectural Blueprint Brief</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {selectedProject.desc}
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-b border-outline-variant/35 py-4 mb-6 text-center">
                <div>
                  <span className="text-[10px] text-on-surface-variant/70 uppercase">Location</span>
                  <div className="font-bold text-sm text-primary mt-1">{selectedProject.location || 'Selected Operations'}</div>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant/70 uppercase">Total Footprint</span>
                  <div className="font-bold text-sm text-primary mt-1">{selectedProject.sqft || 'Bespoke Area'}</div>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant/70 uppercase">Delivery Date</span>
                  <div className="font-bold text-sm text-primary mt-1">{selectedProject.year || '2026'}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsContactOpen(true);
                  }}
                  className="flex-1 bg-secondary-fixed text-on-secondary-fixed font-bold uppercase py-3.5 rounded-full text-xs tracking-widest text-center hover:bg-secondary-fixed-dim"
                >
                  Schedule Private Viewing
                </button>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimatorOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-full border border-outline-variant font-bold text-xs uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant"
                >
                  Estimate Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Dynamic Service Explore Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedService(null)}>
          <div className="bg-surface text-on-surface rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl border border-outline-variant/30" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors z-10 text-on-surface"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <div className="h-[250px] relative">
              <img 
                src={selectedService.bgImg} 
                alt={selectedService.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white z-10">
                <span className="text-[10px] uppercase font-bold bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full">
                  Service {selectedService.id}
                </span>
                <h3 className="text-3xl font-black mt-2 text-white">{selectedService.title}</h3>
              </div>
            </div>

            <div className="p-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-secondary-fixed-dim block mb-2">
                {selectedService.tagline}
              </span>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {selectedService.desc}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Key Design Deliverables:</h4>
                <ul className="space-y-2">
                  {selectedService.phases.map((phase, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary-fixed text-base font-black">done</span>
                      {phase}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl mb-6">
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Estimated Planning Time</span>
                <span className="text-xs font-black text-primary uppercase">{selectedService.timeline}</span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setIsContactOpen(true);
                  }}
                  className="flex-1 bg-secondary-fixed text-on-secondary-fixed font-bold uppercase py-3.5 rounded-full text-xs tracking-widest text-center hover:bg-secondary-fixed-dim"
                >
                  Consult an Expert
                </button>
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setIsEstimatorOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-full border border-outline-variant font-bold text-xs uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant"
                >
                  Calculate Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Dynamic Journal Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedArticle(null)}>
          <div className="bg-surface text-on-surface rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl border border-outline-variant/30" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors z-10 text-on-surface"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <div className="h-[280px] relative">
              <img 
                src={selectedArticle.img} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white z-10">
                <span className="text-[10px] uppercase font-bold bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white">{selectedArticle.title}</h3>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/20 text-xs text-on-surface-variant/70">
                <span className="font-extrabold text-primary">{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span className="bg-surface-container-high px-2 py-0.5 rounded-full">{selectedArticle.readingTime}</span>
              </div>

              <p className="font-body-lg text-base font-extrabold text-primary mb-4 leading-relaxed">
                {selectedArticle.summary}
              </p>

              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 text-justify">
                {selectedArticle.content}
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedArticle(null);
                    setIsContactOpen(true);
                  }}
                  className="flex-1 bg-secondary-fixed text-on-secondary-fixed font-bold uppercase py-3.5 rounded-full text-xs tracking-widest text-center hover:bg-secondary-fixed-dim"
                >
                  Discuss Custom Blueprints
                </button>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3.5 rounded-full border border-outline-variant font-bold text-xs uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant"
                >
                  Dismiss Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: Dynamic Executive Bio Modal */}
      {selectedExecutive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedExecutive(null)}>
          <div className="bg-surface text-on-surface rounded-3xl w-full max-w-xl overflow-hidden relative shadow-2xl border border-outline-variant/30" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedExecutive(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors z-10 text-on-surface"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <div className="h-[250px] relative">
              <img 
                src={selectedExecutive.avatar} 
                alt={selectedExecutive.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=350&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white z-10">
                <span className="text-[10px] uppercase font-bold bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full mb-2 inline-block">
                  Spaciaz Leader
                </span>
                <h3 className="text-3xl font-black mt-1 text-white">{selectedExecutive.name}</h3>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4 text-xs font-bold uppercase tracking-wider text-secondary-fixed-dim">
                <span>{selectedExecutive.role}</span>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-primary">{selectedExecutive.degree}</span>
              </div>

              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {selectedExecutive.bio}
              </p>

              <div className="bg-surface-container p-4 rounded-xl mb-6">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-on-surface-variant block mb-1">Key Portfolio Target</span>
                <span className="text-sm font-black text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">home_work</span> {selectedExecutive.primaryProject}
                </span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedExecutive(null);
                    setIsContactOpen(true);
                  }}
                  className="flex-grow bg-secondary-fixed text-on-secondary-fixed font-bold uppercase py-3.5 rounded-full text-xs tracking-widest text-center hover:bg-secondary-fixed-dim transition-colors"
                >
                  Direct Inquiry with Spaciaz
                </button>
                <button 
                  onClick={() => setSelectedExecutive(null)}
                  className="px-6 py-3.5 rounded-full border border-outline-variant font-bold text-xs uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 8: Dynamic Award Spotlight Modal */}
      {selectedAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedAward(null)}>
          <div className="bg-surface text-on-surface rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl border border-outline-variant/30" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedAward(null)}
              className="absolute top-6 right-6 p-1 rounded-full bg-surface-container-high hover:bg-outline-variant/20 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-fixed/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-4xl font-extrabold animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                  trophy
                </span>
              </div>

              <span className="inline-block bg-primary text-on-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3">
                Year {selectedAward.year} Recognition
              </span>
              <h3 className="text-2xl font-black mb-2 text-primary">{selectedAward.title}</h3>
              <p className="text-xs text-on-surface-variant/80 uppercase tracking-wider font-extrabold mb-6">
                Presented by: {selectedAward.body}
              </p>

              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 text-left mb-6">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold block mb-1">Honored Spaciaz Development</span>
                <span className="text-sm font-black text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">apartment</span> {selectedAward.project}
                </span>
              </div>

              <button 
                onClick={() => setSelectedAward(null)}
                className="w-full bg-secondary-fixed text-on-secondary-fixed font-bold uppercase py-3.5 rounded-full text-xs tracking-widest hover:bg-secondary-fixed-dim transition-all shadow-md"
              >
                Dismiss Spotlight
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}