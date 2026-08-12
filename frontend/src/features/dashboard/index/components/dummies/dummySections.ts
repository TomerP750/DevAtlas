import type { SectionDto } from "../../models/learningPath/SectionDto";
import { ConfidenceLevel } from "../../models/learningPath/enums/ConfidenceLevel";

export type DummySection = SectionDto & {
    topicId: string;
};

export const dummySections: DummySection[] = [
    {
        id: "1",
        topicId: "1",
        name: "Writing JSX",
        description: "Learn the syntax rules for writing markup inside JavaScript.",
        codeSnippet: "const heading = <h1>Hello, React!</h1>;",
        confidenceLevel: ConfidenceLevel.HIGH,
        completed: true,
    },
    {
        id: "2",
        topicId: "1",
        name: "Creating Components",
        description: "Build reusable function components and render them in your application.",
        codeSnippet: "function Welcome() {\n    return <h1>Welcome</h1>;\n}",
        confidenceLevel: ConfidenceLevel.HIGH,
        completed: true,
    },
    {
        id: "3",
        topicId: "1",
        name: "Component Composition",
        description: "Combine small components to create larger user interfaces.",
        confidenceLevel: ConfidenceLevel.MEDIUM,
        completed: false,
    },
    {
        id: "4",
        topicId: "1",
        name: "React Fragments",
        description: "Group multiple elements without adding an extra DOM node.",
        codeSnippet: "return <><Header /><Main /></>;",
        confidenceLevel: ConfidenceLevel.MEDIUM,
        completed: false,
    },
    {
        id: "5",
        topicId: "2",
        name: "Passing Props",
        description: "Send data from a parent component to a child component.",
        confidenceLevel: ConfidenceLevel.HIGH,
        completed: true,
    },
    {
        id: "6",
        topicId: "2",
        name: "Typing Props",
        description: "Define clear TypeScript types for component properties.",
        confidenceLevel: ConfidenceLevel.MEDIUM,
        completed: false,
    },
    {
        id: "7",
        topicId: "3",
        name: "Using State",
        description: "Store and update values that affect what a component renders.",
        confidenceLevel: ConfidenceLevel.LOW,
        completed: false,
    },
];
