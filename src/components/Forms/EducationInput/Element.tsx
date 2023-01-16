import { EducationSchemaType } from "@lightbringer/zod/CVSchema";
import { FC, useState } from "react";

type EducationElementProps = {
  element: EducationSchemaType;
  index: number;
  del: (i: number) => void;
  edit: (i: number, element: EducationSchemaType) => void;
};

export const EducationElement: FC<EducationElementProps> = ({
  del,
  edit,
  element
}) => {
  const [editedElement, setEditedElement] = useState(element);
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <div className="flex gap-x-1">
        <input type="date" />
      </div>
    </div>
  );
};
