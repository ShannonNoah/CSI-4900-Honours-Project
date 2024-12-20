// Full List of Do's (100 items)
const dos = [
  "Embrace Change",
  "Forgive Quickly",
  "Welcome New Beginnings",
  "Love Fiercely",
  "Celebrate Small Wins",
  "Take Bold Risks",
  "Express Gratitude",
  "Lead with Kindness",
  "Seek Clarity",
  "Let Go Gracefully",
  "Start Fresh Daily",
  "Find Your Balance",
  "Chase Your Dreams",
  "Speak Your Truth",
  "Build Connections",
  "Choose Peace",
  "Support Others",
  "Learn From Failure",
  "Focus on Growth",
  "Take Ownership",
  "Trust the Process",
  "Invest in Yourself",
  "Let Yourself Heal",
  "Honor Commitments",
  "Find Your Voice",
  "Keep Promises",
  "Reignite Passions",
  "Follow Through",
  "Celebrate Progress",
  "Look Ahead Boldly",
  "Set Clear Goals",
  "Value Your Time",
  "Listen Closely",
  "Create Joy",
  "Encourage Curiosity",
  "Prioritize Boundaries",
  "Focus on Solutions",
  "Remember Your Worth",
  "Pause to Reflect",
  "Be Fully Present",
  "Build Trust",
  "Share Positivity",
  "Protect Your Peace",
  "Appreciate Efforts",
  "Take Responsibility",
  "Dream Beyond Limits",
  "Find New Perspectives",
  "Create Opportunities",
  "Let Yourself Feel",
  "Plan for Success",
  "Own Your Story",
  "Keep Moving Forward",
  "Reconnect with Nature",
  "Stay Optimistic",
  "Fuel Your Passions",
  "Acknowledge Efforts",
  "Enjoy the Moment",
  "Be Open to Change",
  "Strengthen Bonds",
  "Cultivate Curiosity",
  "Empower Others",
  "Appreciate Differences",
  "Follow Through Boldly",
  "Step Outside Comfort",
  "Laugh More Often",
  "Adapt to Challenges",
  "Seek Understanding",
  "Simplify Decisions",
  "Value Contributions",
  "Be Generous",
  "Nurture Creativity",
  "Take It Slow",
  "Savor the Journey",
  "Be Accountable",
  "Uplift Your Circle",
  "Accept Feedback",
  "Build Resilience",
  "Be Consistent",
  "Create Stability",
  "Share Your Vision",
  "Align with Purpose",
  "Practice Patience",
  "Welcome Surprises",
  "Choose Happiness",
  "Inspire Others",
  "Appreciate Yourself",
  "Expand Perspectives",
  "Celebrate Diversity",
  "Focus on Intentions",
  "Recognize Progress",
  "Be a Problem Solver",
  "Help Without Asking",
  "Trust the Timing",
  "Forgive Yourself",
  "Be Curious",
  "Find Common Ground",
  "Rediscover Yourself",
  "Evolve Continuously",
];

// Full List of Don'ts (100 items)
const donts = [
  "Complicate Relationships",
  "Skip Milestones",
  "Overpromise",
  "Ignore Lessons Learned",
  "Avoid Responsibility",
  "Rely on Luck",
  "Delay Decisions",
  "Overshare Secrets",
  "Burn Bridges",
  "Disregard Advice",
  "Break Promises",
  "Misjudge Intentions",
  "Bury Emotions",
  "Dismiss Feedback",
  "Hold onto Anger",
  "Let Ego Rule",
  "Dismiss Support",
  "Lose Perspective",
  "Sabotage Progress",
  "Force Outcomes",
  "Assume the Worst",
  "Follow the Crowd",
  "Rush to Judge",
  "Ignore Red Flags",
  "Overlook Details",
  "Shut People Out",
  "Blame Others",
  "Avoid Conflict",
  "Undermine Trust",
  "Neglect Priorities",
  "Expect Perfection",
  "Create Drama",
  "Cling to Control",
  "Misplace Confidence",
  "Resist Growth",
  "Overcomplicate Solutions",
  "Dismiss Opportunities",
  "Reject Change",
  "Isolate Yourself",
  "Push Too Hard",
  "Skip the Basics",
  "Refuse Help",
  "Ignore Warning Signs",
  "Live in Regret",
  "Fear the Unknown",
  "Underestimate Risks",
  "Lose Your Temper",
  "Break Your Word",
  "Postpone Accountability",
  "Close Your Mind",
  "Overthink Decisions",
  "Focus on Negatives",
  "Resist Feedback",
  "Take Things Personally",
  "Neglect Self-Care",
  "Procrastinate Growth",
  "Overanalyze Choices",
  "Dismiss Ideas Quickly",
  "Hoard Resentments",
  "Stay Stagnant",
  "Overextend Yourself",
  "Trust Blindly",
  "Underestimate Efforts",
  "Spread Negativity",
  "Ignore Solutions",
  "Blame Circumstances",
  "Dismiss Kindness",
  "Forget the Details",
  "Sabotage Progress",
  "Rush Milestones",
  "Criticize Unfairly",
  "Disrespect Time",
  "Chase Validation",
  "Misuse Resources",
  "Let Fear Win",
  "Suppress Emotions",
  "Break Promises Casually",
  "Limit Possibilities",
  "Ignore Hard Truths",
  "Reject Challenges",
  "Criticize Efforts",
  "Dismiss Potential",
  "Let Doubts Rule",
  "Suppress Confidence",
  "Bend Your Values",
  "Compromise Integrity",
  "Cling to Old Habits",
  "Prioritize Excuses",
  "Dismiss Reality",
  "Overlook the Process",
  "Sabotage Yourself",
  "Push Others Away",
  "Break Important Bonds",
  "Focus on What’s Lost",
  "Stay Unprepared",
  "Ignore Boundaries",
  "Abandon Growth",
  "Make Excuses",
  "Hesitate to Act",
];

// Seeded Shuffle Algorithm (Based on Date)
function seededShuffle(array, seed) {
  const result = [...array];
  let m = result.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--);
    t = result[m];
    result[m] = result[i];
    result[i] = t;
    seed++;
  }

  return result;
}

// Generate a Random Number Based on a Seed
function random(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Get Today's Date as a Seed
function getDailySeed() {
  const today = new Date();
  return parseInt(
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
    10
  );
}

// Get Daily Do's and Don'ts
export const getDailyDosAndDonts = () => {
  const seed = getDailySeed();
  const dailyDos = seededShuffle(dos, seed).slice(0, 3);
  const dailyDonts = seededShuffle(donts, seed + 100).slice(0, 3);
  return { dos: dailyDos, donts: dailyDonts };
};
