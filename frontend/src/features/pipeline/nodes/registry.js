import { InputNode } from "./io/InputNode";
import { OutputNode } from "./io/OutputNode";
import { LLMNode } from "./services/LLMNode";
import { TextNode } from "./data/TextNode";
import { MathAddNode } from "./logic/MathAddNode";
import { APICallNode } from "./services/APICallNode";
import { ImageTransformNode } from "./services/ImageTransformNode";
import { ConditionNode } from "./logic/ConditionNode";
import { ParseJsonNode } from "./data/ParseJsonNode";
import { ConcatTextNode } from "./data/ConcatTextNode";

// Node types for React Flow
export const NODE_TYPES = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  mathAdd: MathAddNode,
  apiCall: APICallNode,
  imageTransform: ImageTransformNode,
  condition: ConditionNode,
  parseJson: ParseJsonNode,
  concatText: ConcatTextNode,
};

// Toolbar categories
export const NODE_CATEGORIES = {
  io: {
    label: "I/O",
    nodes: [
      { type: "customInput", label: "Input", iconColor: "text-emerald-400" },
      { type: "customOutput", label: "Output", iconColor: "text-sky-400" },
    ],
  },
  data: {
    label: "Data",
    nodes: [
      { type: "text", label: "Text", iconColor: "text-amber-400" },
      { type: "concatText", label: "Concat Text", iconColor: "text-amber-400" },
      { type: "parseJson", label: "Parse JSON", iconColor: "text-amber-400" },
    ],
  },
  logic: {
    label: "Logic",
    nodes: [
      { type: "mathAdd", label: "Math: Add", iconColor: "text-rose-400" },
      { type: "condition", label: "Condition", iconColor: "text-rose-400" },
    ],
  },
  services: {
    label: "Services",
    nodes: [
      { type: "llm", label: "LLM", iconColor: "text-violet-400" },
      { type: "apiCall", label: "API Call", iconColor: "text-violet-400" },
      { type: "imageTransform", label: "Image Transform", iconColor: "text-violet-400" },
    ],
  },
};

export function getDefaultNodeData(nodeType) {
  switch (nodeType) {
    case "text":
      return { text: "{{input}}" };
    case "customInput":
      return { inputName: "input", inputType: "Text" };
    case "customOutput":
      return { outputName: "output", outputType: "Text" };
    default:
      return { label: `${nodeType} node` };
  }
}

export function getNodeIcon(nodeType) {
  const iconMap = {
    customInput: "SquarePen",
    customOutput: "SquareArrowOutUpRight",
    llm: "Sparkles",
    text: "FileText",
    concatText: "Link2",
    parseJson: "FileCode",
    mathAdd: "Plus",
    condition: "GitFork",
    apiCall: "Network",
    imageTransform: "Image",
  };
  return iconMap[nodeType] || "Box";
}
