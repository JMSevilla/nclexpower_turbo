import React from "react";
import { ControlledAccordion } from "core-library/components";
import { useForm } from "react-hook-form";
import { faqMockData } from "./types";

interface AccordionContentProps {
  description?: string[];
  subDescription?: string[];
}

interface FAQItemBlockProps {
  topic: string;
}

const renderListItems = (
  items: string[],
  className: string,
  marginLeft: string
) => (
  <ul
    style={{ listStyleType: "disc", marginLeft }}
    className={`flex flex-col gap-2 ${className}`}
  >
    {items.map((item, idx) => (
      <li
        key={idx}
        className="font-ptSansNarrow text-[14px] lg:text-[16px] font-bold text-[#6C6C6C]"
      >
        {item}
      </li>
    ))}
  </ul>
);

const AccordionContent: React.FC<AccordionContentProps> = ({
  description,
  subDescription,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {description && renderListItems(description, "gap-4", "20px")}
      {subDescription && renderListItems(subDescription, "gap-2", "40px")}
    </div>
  );
};

export const FAQItemBlock: React.FC<FAQItemBlockProps> = ({ topic }) => {
  const { control } = useForm();
  const accordionItems = faqMockData
    .filter((item) => item.topic === topic)
    .map((item) => ({
      title: item.question,
      content: (
        <AccordionContent
          description={item.description}
          subDescription={item.subDescription}
        />
      ),
    }));

  return (
    <section className="mt-0 lg:mt-[-20px]">
      <ControlledAccordion
        items={accordionItems}
        control={control}
        name="accordion"
        titleColor="#0F2A71"
        titleFontWeight="bold"
        titleFontSize="14px"
      />
    </section>
  );
};
