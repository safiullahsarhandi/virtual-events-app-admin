import { useEffect } from "react";

export default function useLocationTitle(title) {
  useEffect(() => (document.title = `Could You Tell | ${title}`));
}
