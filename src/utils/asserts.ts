function isString(data: unknown): boolean {
  return typeof data === "string";
}

export function isConsent(data: any): boolean {
  return (
    typeof data === "object" &&
    typeof data.data_controller === "object" &&
    Array.isArray(data.purpose) &&
    Array.isArray(data.sensitive) &&
    isString(data.jurisdiction) &&
    isString(data.moc) &&
    isString(data.sub) &&
    isString(data.notice) &&
    isString(data.policy_uri) &&
    isString(data.scopes) &&
    isString(data.iss) &&
    isString(data.jti)
  );
}
