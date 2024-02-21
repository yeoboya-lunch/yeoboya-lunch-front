interface WriteFormData {
  email: string | undefined;
  title: string;
  content: string;
  pin: number;
  secret: boolean;
  hashTag: string[];
}

interface IPagination {
  PaginationProps: IPaginationProps;

  [key: string]: any;
}

interface IPaginationProps {
  page: number;
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
  totalPages: number;
  totalElements: number;
  [key: string]: any;
}

interface IBoardContent {
  boardId: number;
  content: string;
  email: strin;
  files: [];
  hashTags: IHashTag[];
  secret: boolean;
  title: string;
  name: string;
  createDate: string;
}

interface IHashTag {
  tag: string;
}
