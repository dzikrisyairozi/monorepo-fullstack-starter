import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/ui/accordion';
import { Section } from '../section';

export function AccordionSection() {
  return (
    <Section
      title="Accordion"
      description="Collapsible sections for organizing lengthy content."
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern and supports keyboard
            navigation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match your design system and
            can be customized using Tailwind CSS utilities.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses CSS animations for smooth open and close transitions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
}
