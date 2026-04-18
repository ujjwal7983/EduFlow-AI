export const generateUniversityMatches = (profile) => {
  if (!profile) return [];
  const { targetCountry, targetCourse, cgpa, cgpaScale } = profile;
  
  let countries = Array.isArray(targetCountry) ? targetCountry : [targetCountry].filter(Boolean);
  if (!countries || countries.length === 0) {
    countries = ["USA", "Germany"]; // default fallback
  }

  // base match on cgpa
  const normalizedCgpa = (cgpa && cgpaScale) ? (cgpa / cgpaScale) : 0.75;
  const baseMatch = Math.round(normalizedCgpa * 100);

  const options = {
    "USA": [
      {
        title: "Georgia Institute of Technology",
        location: "Atlanta, USA",
        matchPercent: Math.min(98, baseMatch + 5),
        description: `Top-tier ${targetCourse ? targetCourse + ' ' : ''}placements in Silicon Valley MAANG companies.`,
        tags: ['Top Tech', 'Prestigious', 'High Cost']
      },
      {
        title: "University of Michigan",
        location: "Ann Arbor, USA",
        matchPercent: Math.min(95, baseMatch + 2),
        description: `Excellent research facilities for ${targetCourse || 'STEM'} students. Strong alumni network.`,
        tags: ['Public Ivys', 'Research', 'Campus Life']
      }
    ],
    "Germany": [
      {
        title: "Technical University of Munich",
        location: "Munich, Germany",
        matchPercent: Math.min(96, baseMatch + 8),
        description: `Extremely high ROI due to zero tuition fees and strong EU placement rates in ${targetCourse || 'your field'}.`,
        tags: ['Zero Tuition', 'High ROI', 'STEM']
      },
      {
        title: "RWTH Aachen University",
        location: "Aachen, Germany",
        matchPercent: Math.min(92, baseMatch + 4),
        description: `Renowned for its strong industry links and practical focus.`,
        tags: ['Industry Links', 'Public', 'High ROI']
      }
    ],
    "Canada": [
      {
         title: "University of Toronto",
         location: "Toronto, Canada",
         matchPercent: Math.min(94, baseMatch + 3),
         description: `Globally ranked for academics with great immigration pathways.`,
         tags: ['Immigration Friendly', 'Top Ranked', 'Research']
      },
      {
        title: "University of Waterloo",
        location: "Waterloo, Canada",
        matchPercent: Math.min(97, baseMatch + 6),
        description: "Unmatched co-op programs leading to direct hiring.",
        tags: ['Co-op', 'Tech', 'High Employment']
      }
    ],
    "UK": [
      {
         title: "Imperial College London",
         location: "London, UK",
         matchPercent: Math.min(88, baseMatch - 2),
         description: `Prestigious UK institution with focus on science, engineering, and business.`,
         tags: ['Elite', 'London', 'Expensive']
      },
      {
        title: "University of Edinburgh",
        location: "Edinburgh, UK",
        matchPercent: Math.min(91, baseMatch + 1),
        description: `Historic university with cutting edge research.`,
        tags: ['Historic', 'Research', 'Global']
      }
    ],
    "Australia": [
      {
         title: "University of Melbourne",
         location: "Melbourne, Australia",
         matchPercent: Math.min(90, baseMatch),
         description: `Premier Australian university with broad offerings.`,
         tags: ['Go8', 'High Quality', 'Sunny']
      }
    ],
    "India": [
      {
         title: "Indian Institute of Science (IISc)",
         location: "Bangalore, India",
         matchPercent: Math.min(93, baseMatch + 4),
         description: `Top research institution in India with excellent faculty.`,
         tags: ['Research', 'Elite', 'Low Cost']
      },
      {
         title: "IIT Madras",
         location: "Chennai, India",
         matchPercent: Math.min(95, baseMatch + 6),
         description: `Renowned technology institute with stellar placement records.`,
         tags: ['Top Tier', 'Tech', 'High ROI']
      }
    ]
  };

  let results = [];
  countries.forEach(country => {
    if (options[country]) {
      results = [...results, ...options[country]];
    }
  });

  if (results.length === 0) {
    // fallback if unmapped country like India or Ireland is picked
    results = [
      { title: "National Top University", location: countries[0], matchPercent: Math.min(95, baseMatch + 5), description: `A great generic fit for ${targetCourse || 'your profile'} in ${countries[0]}.`, tags: ['Solid Pick', 'Standard'] },
      { title: "Global Reach University", location: countries[0], matchPercent: Math.max(60, baseMatch - 10), description: `A competitive option that would require a strong holistic profile.`, tags: ['Reach', 'Prestigious'] }
    ];
  }

  // Shuffle or just pick top 2
  const selectedResults = results.slice(0, 2);
  
  // Inject proper Google Search linkUrl
  return selectedResults.map(uni => ({
    ...uni,
    linkUrl: `https://www.google.com/search?q=${encodeURIComponent(uni.title + " admissions international students")}`
  }));
};

export const generateNudges = (profile) => {
   if (!profile) return [];
   const { targetCountry, cgpa, cgpaScale } = profile;
   
   const normalizedCgpa = (cgpa && cgpaScale) ? (cgpa / cgpaScale) : 0.75;
   
   let nudges = [];
   
   let countries = Array.isArray(targetCountry) ? targetCountry : [targetCountry].filter(Boolean);
   
   if (countries.includes("USA")) {
      nudges.push({
         title: "Take GRE Mock Test",
         description: "Most top US universities required or recommend GRE scores. Establish your baseline.",
         timeRemaining: "This Week",
         linkText: "View resources",
         linkUrl: "https://www.ets.org/gre/"
      });
   } else if (countries.includes("UK") || countries.includes("Australia") || countries.includes("Canada")) {
      nudges.push({
         title: "Book IELTS/TOEFL",
         description: "English proficiency is mandatory. Secure your testing date early.",
         timeRemaining: "Next 14 Days",
         linkText: "Check Dates",
         linkUrl: "https://www.ets.org/toefl/"
      });
   } else if (countries.includes("Germany")) {
      nudges.push({
         title: "Start APS Process",
         description: "Germany requires an APS certificate for Indian students. Process takes months.",
         timeRemaining: "Urgent",
         linkText: "Learn More",
         linkUrl: "https://aps-india.de/"
      });
   } else {
      nudges.push({
         title: "Draft Statement of Purpose",
         description: "Start outlining your SOP early to allow multiple reviews by mentors.",
         linkText: "View AI Templates",
         linkUrl: "/ai-tools"
      });
   }
   
   if (normalizedCgpa < 0.75) {
      nudges.push({
         title: "Focus on Co-curriculars",
         description: "To balance your academic score, consider certifications or projects.",
         linkText: "Find Projects",
         linkUrl: "/ai-tools"
      });
   } else {
      nudges.push({
         title: "Shortlist Scholarships",
         description: "Your grade profile makes you competitive for merit scholarships. Start shortlisting.",
         timeRemaining: "Available Now",
         linkText: "View Matches",
         linkUrl: "/loans"
      });
   }
   
   return nudges.slice(0, 2);
}
