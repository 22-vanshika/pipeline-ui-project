import { useMemo } from 'react'; 

const parseVariables = (text) => {
  if (!text) return [];
  
  // Match valid JS identifiers inside double curly braces, trimming whitespace
  const regex = /{{\s*([A-Za-z_$][\w$]*)\s*}}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1]);
  }
  return Array.from(new Set(variables));
};


export const useVariableParser = (text) => {
  // 2. useMemo will calculate the variables synchronously and only
  const variables = useMemo(() => parseVariables(text), [text]);

  return variables;
};