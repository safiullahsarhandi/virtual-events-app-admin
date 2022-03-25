import { useState } from "react";

export default function useTableControls({
  defaultStatus = "",
  defaultPerPage = 10,
  defaultSearchString = "",
  defaultFrom = "",
  defaultTo = "",
} = {}) {
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [status, setStatus] = useState(defaultStatus);
  const [search_string, setSearchString] = useState(defaultSearchString);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  return {
    perPage,
    setPerPage,
    status,
    setStatus,
    search_string,
    setSearchString,
    from,
    setFrom,
    to,
    setTo,
  };
}
