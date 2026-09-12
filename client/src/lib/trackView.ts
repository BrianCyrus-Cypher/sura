import { useCallback } from "react";
import { trpc } from "./trpc";

type TrackContentType = "post" | "product" | "company_profile";

export function useTrackView() {
  const mutation = trpc.commerce.trackView.useMutation();
  return useCallback((contentType: TrackContentType, contentId: number, companyId: number) => {
    if (contentId > 0 && companyId > 0) mutation.mutate({ contentType, contentId, companyId });
  }, [mutation]);
}
