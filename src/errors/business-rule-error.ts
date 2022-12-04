import { ApplicationError } from "@/protocols";

export function businessRuleError(): ApplicationError {
  return {
    name: "businessRuleError",
    message: "Something out of the Business Rule",
  };
}
