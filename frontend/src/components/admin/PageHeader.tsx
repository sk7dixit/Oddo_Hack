import React from "react";

interface Props {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-1">
      <h1 className="text-4xl font-bold text-[#111827] tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-[#6B7280] font-medium">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
