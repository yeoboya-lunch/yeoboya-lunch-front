interface IWriteForm {
  email: string | undefined;
  title: string;
  content: string;
  pin: number;
  secret: boolean;
  hashTag: String[];
}

interface IPaginationProps {
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
  totalPages: number;
  totalElements: number;
  [key: string]: any;
}