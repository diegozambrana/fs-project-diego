export const validateGitHubRepo = (input: string) => {
  if (input.includes("github.com")) {
    return input.split("/").at(-2) !== "github.com" && input.split("/").at(-1) !== "";
  }
  const parts = input.split("/");
  return parts.length == 2 && parts[0] !== "" && parts[1] !== "";
}

export const validateGitHubOrg = (input: string) => {
  if (input.includes("github.com")) {
    return input.split("/").at(-2) !== "" && input.split("/").at(-1) !== "";
  }
  const parts = input.split("/");
  return parts.length == 1 && parts[0] !== "";
}