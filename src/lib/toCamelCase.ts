export const toCamelCase = (name: string) => {
  return name
    .split(" ") // Split into ["Web", "Development"]
    .map((word, index) => {
      // If it's the first word, make it all lowercase
      if (index === 0) {
        return word.toLowerCase();
      }
      // For other words, capitalize the first letter and lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};
