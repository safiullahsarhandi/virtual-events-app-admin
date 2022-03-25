import React from "react";

export default function TableHeader({ headings }) {
  return (
    <thead>
      <tr>
        {headings?.map((heading) => (
          <th className>{heading}</th>
        ))}
      </tr>
    </thead>
  );
}
