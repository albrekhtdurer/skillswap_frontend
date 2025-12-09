import ImageUploader, { type IUploadedFile } from "./image-upload-widget";

const handleFilesUploaded = (files: IUploadedFile[]) => {
  console.log("Файлы в родительском компоненте:", files);
};
const handleFileRemoved = (file: IUploadedFile) => {
  console.log("Файл удален:", file.name);
};

const ImageUploadWidgetTest = () => {
  return (
    <ImageUploader
      maxFiles={3}
      onFilesUploaded={handleFilesUploaded}
      onFileRemoved={handleFileRemoved}
      accept={{
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      }}
    />
  );
};

export default ImageUploadWidgetTest;
