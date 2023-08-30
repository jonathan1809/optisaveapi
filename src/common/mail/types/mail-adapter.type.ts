type Context = {
  [key: string]: any;
};

export type MailParams = {
  from?: string;
  to: string;
  subject: string;
  template: 'test';
  text: string;
  context: Context;
}