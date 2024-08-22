import { ContactFormBlock } from "../components/blocks/ContactBlock/ContactFormBlock";
import { ContactHero } from "../components/blocks/ContactBlock/ContactHero";

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactFormBlock />
    </div>
  );
}