export interface MailData {
  to: string | string[];
  subject: string;
  templateName: string;
  replacements: Record<string, string | number>;
}
