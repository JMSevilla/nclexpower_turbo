interface TourStep {
  selector: string;
  content: string | JSX.Element;
}

export const TourSteps: TourStep[] = [
  {
    selector: '.header-step-1',
    content: 'Welcome to our website! This header is designed to help you navigate and utilize our site efficiently.',
  },
  { selector: '.header-step-2', content: 'Displays the time remaining for the current session or task' },
  { selector: '.header-step-3', content: ' Shows the total duration allocated for the session.' },
  { selector: '.header-step-4', content: 'third step' },
  { selector: '.header-step-5', content: 'Indicates the current page out of the total number of pages.' },
  { selector: '.header-step-6', content: 'Clears current inputs or selections' },
  { selector: '.header-step-7', content: 'Provides access to additional settings and tools' },
  { selector: '.questionnaire-step-8', content: 'this content provides questions' },
  { selector: '.footer-step-9', content: 'This is the footer' },
  {
    selector: '.footer-step-10',
    content: `Displays the name of the institution (Acme Medical Prep School) and the instructor's name (Patricia Freeman).`,
  },
  { selector: '.footer-step-11', content: ' Opens the navigator settings.' },
  {
    selector: '.footer-step-12',
    content: 'Proceeds to the next step or action. Click here to continue to the next part of the session.',
  },
];
