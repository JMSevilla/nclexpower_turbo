interface Props {
  id: number;
  topic: string;
  question: string;
  description?: string[];
  subDescription?: string[];
}
export const faqMockData: Props[] = [
  {
    id: 1,
    topic: "About NCLEX",
    question: "What is NCLEXPower? Is it different from CORE-Zigma System?",
    description: [
      "NCLEXPower.com is our website name. The training program that embodies our methodology, philosophy, strategies and components is aptly named as the CORE-Zigma Review System.",
    ],
  },
  {
    id: 2,
    topic: "About NCLEX",
    question: "What is NCLEXPower? Is it different from CORE-Zigma System?",
    description: [
      "The essence of the CORE-Zigma System is conveyed in its name: CORE is the acronym Content Review , and Zigma is a spelling twist to the Greek letter Sigma S – which is commonly used in mathematics and analytics to symbolize summation or sum total.",
      "The system reveals itself to be literally a whole greater than the sum of its parts. No component stands on its own as a fragment – all components (e.g., videos, content cards, simulator) are carefully designed to seamlessly and dependently work together as an integrated whole.",
    ],
  },
  {
    id: 3,
    topic: "About NCLEX",
    question:
      "There are numerous websites and companies already offering their exam reviews. What makes your review program any different",
    description: [
      "Our system was built from the ground-up with the learner at the core – that all components maximally work together to elevate and enhance the learner s level of critical thinking, test-taking skills, and both physical and mental endurance for them to pass the NCLEX.",
      "From the quality of each component, to each component s unique features imbibed, even to the study plan schedule and implemented workflow – no stone was unturned to create the framework that ultimately bring about what matters most – YOU PASSING THE NCLEX.",
    ],
  },
  {
    id: 4,
    topic: "About Program and Access",
    question: "How many programs do you have available for NCLEX review",
    description: [
      "For each level of nursing graduate (e.g., Registered Nurse RN and Practical/Vocational Nurse PN), we offer two (2) program choices:",
    ],
    subDescription: [
      "The Standard (23-day) Program. A comprehensive review covering both body systems and patient units.",
      "The Fast Track (8-day) Program. Designed for those who feel they already have a solid background on body systems and their associated diseases, this track focuses on review of patient units.",
    ],
  },
  {
    id: 5,
    topic: "About Program and Access",
    question:
      "Would the 8-day Fast Track Program have fewer content than the 23-day Standard program?",
    description: [
      "Although the 8-day Fast Track Program focuses on topics concerning patient units, the following items are included:",
    ],
    subDescription: [
      "Simulator: End-of-Section Computer Adaptive Test (CAT) for Body Systems",
      "Content Cards for Body Systems (View access)",
      "Videos: Special content summary and guided strategies for Body Systems (recap)",
    ],
  },
  {
    id: 6,
    topic: "About Program and Access",
    question:
      "There are numerous websites and companies already offering their exam reviews. What makes your review program any different",
    description: [
      "Regardless of which type of program you purchased, both entitle the user to 6 months access time. This means that although one can finish the program within the intended number of training days as scheduled, users are given ample time to refortify their review (e.g., taking any of the simulator tests multiple times, rewatching topic videos needed for recall).",
    ],
  },
  {
    id: 7,
    topic: "About Payment",
    question: "I'd like to purchase! How do I do that?",
    description: [
      "All products are available for purchase only through our official website. Purchasing is as simple as selecting the product type you want – which will lead you to our secured checkout screen. Once your payment (credit/debit card) is successfully processed, you will receive a confirmation email for both the purchase receipt and the login information.",
    ],
  },
  {
    id: 8,
    topic: "About Payment",
    question: "Is there a free trial available?",
    description: [
      "Instead of a trial access, all the features of the program are shown in-detail in the introductory videos found at our main website and our YouTube channel. These sample videos are the same ones accessible inside the program upon purchase.",
    ],
  },
  {
    id: 9,
    topic: "About Payment",
    question: "Is there a refund?",
    description: [
      "We are every bit confident that you will both learn and like our review system. If for some reason you are not satisfied and would like to refund your purchase, simply send us an email at accounts@nclexpower.com, and we will process your refund accordingly.",
      "For refund requests, kindly specify what you didn’t like about your experience, so that we can further improve the system.",
      "For more details of our cancellation and refund policy, click here.",
    ],
  },
  {
    id: 10,
    topic: "About Payment",
    question: "Can I contact you for questions about my order?",
    description: [
      "For order inquiries, please contact us at: orders@nclexpower.com. Include your email, Order number and issue/request to facilitate assistance.",
    ],
  },
  {
    id: 11,
    topic: "Comments and Feedback",
    question:
      "I noticed an error in one of your content. How can I bring this to your attention?",
    description: [
      "Though great care has been made to avoid errors in all sections of the program,  some can inadvertently exist. We are deeply appreciative for calling this to our attention – you can use our form in our Contact Us page, or send us an email at comments@nclexpower.com.",
    ],
  },
];

interface MeetOurTeamProps {
  id: number;
  name: string;
  division: string;
}

export const executivesMockData: MeetOurTeamProps[] = [
  {
    id: 1,
    name: "Albert Rivera Jr.",
    division: "Instructional Content and Design",
  },
  {
    id: 2,
    name: "Jose Miguel Sevilla",
    division: "Software Strategy and Development",
  },
];

export const nursesMockData: MeetOurTeamProps[] = [
  {
    id: 1,
    name: "Nur-Aiza Singco",
    division: "Test Research and Development",
  },
  {
    id: 2,
    name: "Tinay Altajeros",
    division: "Test Research and Development",
  },
  {
    id: 3,
    name: "Nancy Llamas",
    division: "Test Research and Development",
  },
  {
    id: 4,
    name: "Isabella Miranda",
    division: "Test Research and Development",
  },
  {
    id: 5,
    name: "Christine Pitargue",
    division: "Test Research and Development",
  },
  {
    id: 6,
    name: "Min Pastor",
    division: "Test Research and Development",
  },
  {
    id: 7,
    name: "Von Marie Derafera",
    division: "Test Research and Development",
  },
  {
    id: 8,
    name: "Mary Ann Morante",
    division: "Test Research and Development",
  },
  {
    id: 9,
    name: "Alyssa Jenine Cruz",
    division: "Test Research and Development",
  },
  {
    id: 10,
    name: "Rosellen Balmeo",
    division: "Test Research and Development",
  },
  {
    id: 11,
    name: "Natasha Mae Jacinto",
    division: "Test Research and Development",
  },
  {
    id: 12,
    name: "Danielle Anas",
    division: "Test Research and Development",
  },
  {
    id: 13,
    name: "Cristine Romero",
    division: "Test Research and Development",
  },
  {
    id: 14,
    name: "Milles Aceveda",
    division: "Test Research and Development",
  },
  {
    id: 15,
    name: "Joanna Rose Angeles",
    division: "Content Design",
  },
  {
    id: 16,
    name: "Danielle Anas",
    division: "Content Design",
  },
  {
    id: 17,
    name: "Markus Carcamo",
    division: "Content Design",
  },
];

export const engineersMockData: MeetOurTeamProps[] = [
  {
    id: 1,
    name: "Monique Cassandra Teves",
    division: "Documents/Administration",
  },
  {
    id: 2,
    name: "Joseph Asuncion",
    division: "Development Team Phase 1",
  },
  {
    id: 3,
    name: "Joseph Litang",
    division: "Development Team Phase 1",
  },
  {
    id: 4,
    name: "Jezreel Bacasno",
    division: "Development Team Phase 2",
  },
  {
    id: 5,
    name: "Arnel Costales",
    division: "Development Team Phase 2",
  },
  {
    id: 6,
    name: "Jacob Allen Valderama",
    division: "Development Team Phase 2",
  },
  {
    id: 7,
    name: "Brian James Dela Cruz",
    division: "Development Team Phase 2",
  },
  {
    id: 8,
    name: "Lizter Keith Babael",
    division: "Development Team Phase 2",
  },
  {
    id: 9,
    name: "CidJohn Villanueva",
    division: "Development Team Phase 2",
  },
  {
    id: 10,
    name: "Ederson Marcial",
    division: "Development Team Phase 2",
  },
  {
    id: 11,
    name: "Bryan Palad",
    division: "Development Team Phase 2",
  },
  {
    id: 12,
    name: "Gabriel Nasol",
    division: "Development Team Phase 2",
  },
  {
    id: 13,
    name: "Samuel Javier",
    division: "Development Team Phase 2",
  },
  {
    id: 14,
    name: "Ralph John Ausan",
    division: "Development Team Phase 2",
  },
  {
    id: 15,
    name: "Ronnie Babael",
    division: "Development Team Phase 2",
  },
  {
    id: 16,
    name: "Keiji Inio",
    division: "Digital Design",
  },
  {
    id: 17,
    name: "Austin Jeff Tuaña",
    division: "Digital Design",
  },
  {
    id: 18,
    name: "Vincent Paul Aviles",
    division: "Digital Design",
  },
];
