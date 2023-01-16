import { CVSchemaType } from "@lightbringer/zod/CVSchema";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type ImageType = {
  src: string;
  alt: string;
};

type ImageUploadType = {
  label: string;
  selectImage: string;
  uploadingImage: string;
  currentImage?: string;
  accept?: string;
  sizeLimit?: number;
  onChangePicture: UseFormSetValue<CVSchemaType>;
};

export const ImageUpload: FC<ImageUploadType> = ({
  label,
  currentImage,
  uploadingImage,
  selectImage,
  accept = ".png, .jpg, .jpeg, .gif",
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture
}) => {
  const pictureRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageType>({
    src: currentImage ?? "",
    alt: "User Img"
  });
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [pictureError, setPictureError] = useState("");

  const handleOnChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    const fileName = file?.name?.split(".")?.[0] ?? "New file";

    reader.addEventListener(
      "load",
      async function () {
        try {
          setImage({ src: String(reader.result), alt: fileName });
          if (typeof onChangePicture === "function") {
            await onChangePicture("photo", String(reader.result));
          }
        } catch (err) {
          //
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError("");
        reader.readAsDataURL(file);
      } else {
        setPictureError("File size is exceeding 10MB.");
      }
    }
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className="mx-auto flex w-60 flex-col gap-y-1">
      <label
        htmlFor="thisimage"
        className="block text-sm font-bold text-gray-700"
      >
        {label}
      </label>

      <button
        type="button"
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        className={`group relative h-full min-h-[10rem] overflow-hidden rounded-md transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 
          ${
            image?.src
              ? "hover:opacity-50 disabled:hover:opacity-100"
              : "border-2 border-dashed hover:border-gray-400 focus:border-gray-400"
          } disabled:hover:border-gray-200`}
      >
        {image?.src ? <Image fill src={image.src} alt={image.alt} /> : null}

        {!image?.src ? (
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="shrink-0 rounded-full bg-gray-200 p-2 transition group-hover:scale-110 group-focus:scale-110">
                <ArrowUp className="h-4 w-4 text-gray-500 transition" />
              </div>
              <span className="text-xs font-semibold text-gray-500 transition">
                {updatingPicture ? uploadingImage : selectImage}
              </span>
            </div>
          </div>
        ) : null}
        <input
          ref={pictureRef}
          type="file"
          name="thisimage"
          accept={accept}
          onChange={handleOnChangePicture}
          className="hidden"
        />
      </button>

      {pictureError ? (
        <span className="text-sm text-red-600">{pictureError}</span>
      ) : null}
    </div>
  );
};
