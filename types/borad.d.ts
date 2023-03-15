interface IWriteForm {
  email: string | undefined;
  title: string;
  content: string;
  pin: number;
  secret: boolean;
  hashTag: String[];
}
