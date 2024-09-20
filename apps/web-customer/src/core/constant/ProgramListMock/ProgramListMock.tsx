import { StandardProgramListType } from "../../../core/types/programList";
import {
  WelcomeProgram,
  CardioVascular,
  Respiratory,
  Gastrointestinal,
  Nephrology,
  Hematology,
  InfectiousDiseases,
  RestDayOne,
  Neurology,
  Endocrine,
  Musculoskeletal,
  Integumentary,
  Oncology,
  OBGYN,
  SystemsCAT,
  RestDayTwo,
  MotherBaby,
  Pediatrics,
  MedicalSurgical,
  CriticalCare,
  Emergency,
  MentalHealth,
  NurseStation,
  PatientUnitsCAT,
  RestDayThree,
  CaseStudies,
  FinalCAT,
} from "core-library/assets";

export const standardProgramList: StandardProgramListType[] = [
    {
        programId: 1,
        title: 'Welcome to the Program',
        programStatus: 'completed',
        programImage: WelcomeProgram,
        sections: [
            { sectionId: 1, sectionType: 'document', sectionTitle: 'Welcome to the CORE Zigma System', sectionStatus: 'completed'},
            { sectionId: 2, sectionType: 'document', sectionTitle: 'About the NGN (the current NCLEX)', sectionStatus: 'completed'},
        ]
    },
    {
        programId: 2,
        title: '01 Cardiovascular System',
        programStatus: 'completed',
        programImage: CardioVascular,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 1 Videos', sectionStatus: 'completed' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 1 Simulator', sectionStatus: 'completed' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'completed' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'completed' },
        ]
    },
    {
        programId: 3,
        title: '02 Respiratory System',
        programStatus: 'progress',
        programImage: Respiratory,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 2 Videos', sectionStatus: 'completed' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 2 Simulator', sectionStatus: 'in-progress' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'in-progress' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'in-progress' },
        ]
    },
    {
        programId: 4,
        title: '03 Gastrointestinal System',
        programStatus: 'unavailable',
        programImage: Gastrointestinal,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 3 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 3 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 5,
        title: '04 Nephrology System',
        programStatus: 'unavailable',
        programImage: Nephrology,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 4 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 4 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 6,
        title: '05 Hematology System',
        programStatus: 'unavailable',
        programImage: Hematology,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 5 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 5 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 7,
        title: '06 Infectious Diseases',
        programStatus: 'unavailable',
        programImage: InfectiousDiseases,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 6 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 6 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 8,
        title: '07 Rest Day I',
        programStatus: 'unavailable',
        programImage: RestDayOne,
        sections: [
            { sectionId: 1, sectionType: 'perspective', sectionTitle: 'Perspectives', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'strategy', sectionTitle: 'Continue with Strategies', sectionStatus: 'available' }
        ]
    },
    {
        programId: 9,
        title: '08 Neurology System',
        programStatus: 'unavailable',
        programImage: Neurology,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 8 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 8 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 10,
        title: '09 Endocrine System',
        programStatus: 'unavailable',
        programImage: Endocrine,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 9 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 9 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 11,
        title: '10 Musculoskeletal System',
        programStatus: 'unavailable',
        programImage: Musculoskeletal,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 10 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 10 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 12,
        title: '11 Integumentary/Skin System',
        programStatus: 'unavailable',
        programImage: Integumentary,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 11 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 11 Simulator', sectionStatus: 'available' },
        ]
    },
    {
        programId: 13,
        title: '12 Oncology System',
        programStatus: 'unavailable',
        programImage: Oncology,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 12 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 12 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 14,
        title: '12 OB/GYN System',
        programStatus: 'unavailable',
        programImage: OBGYN,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 12 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 12 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 15,
        title: '13 Systems CAT',
        programStatus: 'unavailable',
        programImage: SystemsCAT,
        sections: [
            { sectionId: 1, sectionType: 'CAT', sectionTitle: 'Primer on Taking the Systems CAT', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'CAT', sectionTitle: 'Systems CAT Simulator', sectionStatus: 'available' },
        ]
    },
    {
        programId: 16,
        title: '14 Rest Day II',
        programStatus: 'unavailable',
        programImage: RestDayTwo,
        sections: [
            { sectionId: 1, sectionType: 'perspective', sectionTitle: 'Perspectives', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'strategy', sectionTitle: 'Intro to Patient Units Section', sectionStatus: 'available' }
        ]
    },
    {
        programId: 17,
        title: '15 Mother-Baby',
        programStatus: 'unavailable',
        programImage: MotherBaby,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 15 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 15 Simulator (50 questions)', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 18,
        title: '16 Pediatrics',
        programStatus: 'unavailable',
        programImage: Pediatrics,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 16 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 16 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 19,
        title: '17 Medical-Surgical',
        programStatus: 'unavailable',
        programImage: MedicalSurgical,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 17 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 17 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 20,
        title: '18 Critical Care (ICU)',
        programStatus: 'unavailable',
        programImage: CriticalCare,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 18 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 18 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 21,
        title: '19 Emergency (ER)',
        programStatus: 'unavailable',
        programImage: Emergency,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 19 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 19 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 22,
        title: '20 Mental Health',
        programStatus: 'unavailable',
        programImage: MentalHealth,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 20 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 20 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 23,
        title: '20 Nurse Station',
        programStatus: 'unavailable',
        programImage: NurseStation,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 20 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 20 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 24,
        title: '20 Patient Units CAT',
        programStatus: 'unavailable',
        programImage: PatientUnitsCAT,
        sections: [
            { sectionId: 1, sectionType: 'CAT', sectionTitle: 'Primer on Taking the Units CAT', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'CAT', sectionTitle: 'Systems CAT Simulator (100 questions)', sectionStatus: 'available' },
        ]
    },
    {
        programId: 25,
        title: '21 Rest Day III',
        programStatus: 'unavailable',
        programImage: RestDayThree,
        sections: [
            { sectionId: 1, sectionType: 'perspective', sectionTitle: 'Perspectives', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'document', sectionTitle: 'What Endurance Means', sectionStatus: 'available' },
        ]
    },
    {
        programId: 26,
        title: '22 Case Studies',
        programStatus: 'unavailable',
        programImage: CaseStudies,
        sections: [
            { sectionId: 1, sectionType: 'document', sectionTitle: 'About Case Studies', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'document', sectionTitle: 'Guided Practice for Case Studies', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'simulator', sectionTitle: 'Case Studies Simulator', sectionStatus: 'available' },
        ]
    },
    {
        programId: 27,
        title: '23 Final CAT',
        programStatus: 'unavailable',
        programImage: FinalCAT,
        sections: [
            { sectionId: 1, sectionType: 'CAT', sectionTitle: 'Words on the Final CAT', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'CAT', sectionTitle: 'Final CAT Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'CAT', sectionTitle: 'Post Test: Final Words', sectionStatus: 'available' },
        ]
    },
];

export const fastrackProgramList: StandardProgramListType[] = [
    {
        programId: 1,
        title: 'Welcome to the Program',
        programStatus: 'available',
        programImage: WelcomeProgram,
        sections: [
            { sectionId: 1, sectionType: 'document', sectionTitle: 'Welcome to the Core Zigma System', sectionStatus: 'available'},
            { sectionId: 2, sectionType: 'document', sectionTitle: 'The current NCLEX', sectionStatus: 'available'},
            { sectionId: 3, sectionType: 'document', sectionTitle: 'Intro to the Fastrack Program', sectionStatus: 'available'},
            { sectionId: 4, sectionType: 'content-cards', sectionTitle: 'View Content Cards for Body Systems', sectionStatus: 'available' },
            { sectionId: 5, sectionType: 'med-cards', sectionTitle: 'DL Med Cards for Body Systems', sectionStatus: 'available' },
        ]
    },
    {
        programId: 2,
        title: '01 Mother-Baby',
        programStatus: 'unavailable',
        programImage: MotherBaby,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 1 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 1 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 3,
        title: '02 Pediatrics',
        programStatus: 'unavailable',
        programImage: Pediatrics,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 2 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 2 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 4,
        title: '03 Medical-Surgical',
        programStatus: 'unavailable',
        programImage: MedicalSurgical,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 3 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 3 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 5,
        title: '04 Critical Care (ICU)',
        programStatus: 'unavailable',
        programImage: CriticalCare,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 4 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 4 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 6,
        title: '05 Emergency (ER)',
        programStatus: 'unavailable',
        programImage: Emergency,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 5 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 5 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 7,
        title: '06 Mental Health',
        programStatus: 'unavailable',
        programImage: MentalHealth,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 20 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 20 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 8,
        title: '06 Nurse Station',
        programStatus: 'unavailable',
        programImage: NurseStation,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 8 Videos', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 8 Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: 9,
        title: '07 Case Studies',
        programStatus: 'unavailable',
        programImage: CaseStudies,
        sections: [
            { sectionId: 1, sectionType: 'document', sectionTitle: 'About Case Studies', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'document', sectionTitle: 'Guided Practice for Case Studies', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'simulator', sectionTitle: 'Case Studies Simulator', sectionStatus: 'available' },
        ]
    },
    {
        programId: 10,
        title: '08 Final CAT',
        programStatus: 'unavailable',
        programImage: FinalCAT,
        sections: [
            { sectionId: 1, sectionType: 'CAT', sectionTitle: 'Words on the Final CAT', sectionStatus: 'available' },
            { sectionId: 2, sectionType: 'CAT', sectionTitle: 'Final CAT Simulator', sectionStatus: 'available' },
            { sectionId: 3, sectionType: 'CAT', sectionTitle: 'Post Test: Final Words', sectionStatus: 'available' },
        ]
    },
];