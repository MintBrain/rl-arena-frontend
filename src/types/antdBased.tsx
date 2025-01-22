import { RcFile } from "antd/lib/upload";

type file =  RcFile & {
  originFileObj: File;
};

export type BeforeUploadParamsType = {
  file: RcFile;
  fileList: file[];
};