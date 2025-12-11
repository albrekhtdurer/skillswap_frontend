import React, { useCallback, useMemo, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import styles from "./image-upload-widget.module.css";
import { ImagesIcon, CrossIcon } from "../../assets/img/icons";
import { Button } from "../../shared/ui/Button/Button";
import { useImages } from "../../shared/hooks/useImages";

export interface IUploadedFile extends File {
  preview: string;
  id: string;
}

export interface IImageUploaderProps {
  maxFiles?: number;
  onFilesUploaded?: (files: IUploadedFile[]) => void;
  onFileRemoved?: (file: IUploadedFile) => void;
  className?: string;
  accept?: Record<string, string[]>;
  multiple?: boolean;
}

export interface DropzoneStyles {
  base: React.CSSProperties;
  active: React.CSSProperties;
  accept: React.CSSProperties;
  reject: React.CSSProperties;
}

const ImageUploader: React.FC<IImageUploaderProps> = ({
  maxFiles = 10,
  className = "",
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "image/gif": [".gif"],
  },
  multiple = true,
}) => {
  const { addImages, removeImage } = useImages();

  const [files, setFiles] = useState<IUploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setErrors([]);
      if (fileRejections.length > 0) {
        const newErrors: string[] = [];
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            if (error.code === "file-invalid-type") {
              newErrors.push(
                `Файл ${rejection.file.name} имеет недопустимый формат`,
              );
            } else {
              newErrors.push(
                `Ошибка при загрузке файла ${rejection.file.name}: ${error.message}`,
              );
            }
          });
        });
        setErrors(newErrors);
      }

      const filesWithId: IUploadedFile[] = acceptedFiles.map((file) => {
        const filesWithId = Object.assign(file, {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          preview: URL.createObjectURL(file),
        });
        return filesWithId as IUploadedFile;
      });
      setFiles((prevFiles) => [...prevFiles, ...filesWithId]);

      // Добавляем в indexDB
      addImages(acceptedFiles);
    },
    [addImages],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      multiple,
      maxFiles,
    });

  const dropzoneStyle = useMemo(() => {
    let style = styles.dropzone;
    if (className) style += ` ${className}`;
    return style;
  }, [className]);

  const removeFile = useCallback(
    (fileId: string) => {
      setFiles((prevFiles) => {
        const fileToRemove = prevFiles.find((f) => f.id === fileId);

        if (fileToRemove) {
          // Удаляем из IndexedDB
          removeImage(fileToRemove);
          // Освобождаем память
          URL.revokeObjectURL(fileToRemove.preview);
        }
        return prevFiles.filter((f) => f.id !== fileId);
      });
    },
    [removeImage],
  );

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const shouldLimit = maxFiles !== undefined && maxFiles > 0;
  const displayedFiles = shouldLimit ? files.slice(0, maxFiles) : files;

  return (
    <section className={styles.container}>
      <div
        {...getRootProps({
          className: dropzoneStyle,
          "data-testid": "dropzone-area",
        })}
      >
        <input {...getInputProps()} aria-label="Поле загрузки файлов" />
        <div className={styles.dropzoneContent}>
          <div className={styles.dropzoneText}>
            {isDragActive ? (
              <span>Отпустите файлы здесь...</span>
            ) : isDragReject ? (
              <span className={styles.errorText}>
                Некоторые файлы не поддерживаются
              </span>
            ) : (
              <>
                {files.length > 0 ? (
                  <aside className={styles.fileList}>
                    <ul>
                      {displayedFiles.map((file) => (
                        <li
                          key={file.id}
                          className={styles.fileItem}
                          data-testid={`file-item-${file.id}`}
                        >
                          <div className={styles.fileInfo}>
                            <span className={styles.fileName} title={file.name}>
                              {file.name}
                            </span>
                            <div className={styles.fileDetails}>
                              <span className={styles.fileSize}>
                                {formatFileSize(file.size)}
                              </span>
                              <span className={styles.fileType}>
                                {file.type.split("/")[1]?.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <Button
                            className={styles.deleteFileButton}
                            type={"tertiary"}
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement>,
                            ) => {
                              e.stopPropagation();
                              removeFile(file.id);
                            }}
                          >
                            <CrossIcon />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : (
                  <>
                    Перетащите или выберите изображения навыка
                    <br />
                  </>
                )}

                <span className={styles.browseLink}>
                  <span className={styles.browseIcon}>
                    <ImagesIcon />
                  </span>
                  Выбрать изображения
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {errors.length > 0 && (
        <div className={styles.errorsContainer} role="alert">
          <h5 className={styles.errorsTitle}>Ошибки загрузки:</h5>
          <ul className={styles.errorsList}>
            {errors.map((error, index) => (
              <li key={index} className={styles.errorItem}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ImageUploader;
