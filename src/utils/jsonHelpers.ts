
import { Json } from "@/integrations/supabase/types";

// Type guard to check if value is a JSON object
export const isJsonObject = (value: Json | null): value is { [key: string]: Json } => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Helper function to safely extract string values from JSON
export const getJsonString = (obj: Json | null, key: string, defaultValue: string = ""): string => {
  if (!isJsonObject(obj)) return defaultValue;
  const value = obj[key];
  return typeof value === 'string' ? value : defaultValue;
};

// Helper function to safely extract number values from JSON
export const getJsonNumber = (obj: Json | null, key: string, defaultValue: number = 0): number => {
  if (!isJsonObject(obj)) return defaultValue;
  const value = obj[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return parseInt(value, 10) || defaultValue;
  return defaultValue;
};

// Helper function to safely extract string array values from JSON
export const getJsonStringArray = (obj: Json | null, key: string, defaultValue: string[] = []): string[] => {
  if (!isJsonObject(obj)) return defaultValue;
  const value = obj[key];
  if (Array.isArray(value)) {
    return value.map(item => typeof item === 'string' ? item : String(item));
  }
  return defaultValue;
};

// Helper function to safely extract education field from JSON
export const getEducation = (obj: Json | null): { school: string } => {
  if (!isJsonObject(obj)) return { school: "" };
  const education = obj.education;
  
  if (isJsonObject(education)) {
    return { 
      school: getJsonString(education, 'school', "")
    };
  }
  
  return { school: "" };
};
