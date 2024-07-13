import { ContactFormBlock } from "../../components/blocks/ContactBlock/ContactFormBlock";
import { TiltDivider } from "core-library/components";
import { ContactMap } from "../../components/blocks/ContactBlock/ContactMap";
import { ContactHero } from "../../components/blocks/ContactBlock/ContactHero";
import { ContactAccordion } from "../../components/blocks/ContactBlock/ContactAccordion";

export default function ContactPage() {
  return (
    <div className="font-['Poppins']">
      <ContactHero />;
      <TiltDivider />
      <ContactAccordion />
      <ContactFormBlock />
      <ContactMap />;
    </div>
  );
}
