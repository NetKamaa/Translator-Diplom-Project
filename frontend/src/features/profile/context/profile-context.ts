import { createContext } from "react";

import type {
  TUpdateUserProfileRequest,
  TUserProfile,
} from "@/features/profile/types/profile.types";

export type TProfileContextValue = {
  profile: TUserProfile | null;
  isProfileLoading: boolean;
  refreshProfile: () => Promise<TUserProfile | null>;
  updateCurrentProfile: (
    data: TUpdateUserProfileRequest,
  ) => Promise<TUserProfile>;
  clearProfile: () => void;
};

export const ProfileContext = createContext<TProfileContextValue | null>(null);
