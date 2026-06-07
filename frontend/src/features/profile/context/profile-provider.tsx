import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProfile, updateProfile } from "@/features/profile/api/profile.api";
import type {
  TUpdateUserProfileRequest,
  TUserProfile,
} from "@/features/profile/types/profile.types";

import { ProfileContext } from "./profile-context";

type TProfileProviderProps = {
  children: ReactNode;
};

export function ProfileProvider({ children }: TProfileProviderProps) {
  const [profile, setProfile] = useState<TUserProfile | null>(null);

  const [isProfileLoading, setIsProfileLoading] = useState(() => {
    return Boolean(localStorage.getItem("accessToken"));
  });

  useEffect(() => {
    let isActive = true;

    async function loadInitialProfile() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return;
      }

      try {
        const data = await getProfile();

        if (isActive) {
          setProfile(data);
        }
      } catch {
        if (isActive) {
          setProfile(null);
        }
      } finally {
        if (isActive) {
          setIsProfileLoading(false);
        }
      }
    }

    void loadInitialProfile();

    return () => {
      isActive = false;
    };
  }, []);

  const refreshProfile = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setProfile(null);
      setIsProfileLoading(false);

      return null;
    }

    setIsProfileLoading(true);

    try {
      const data = await getProfile();

      setProfile(data);

      return data;
    } catch {
      setProfile(null);

      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  async function updateCurrentProfile(data: TUpdateUserProfileRequest) {
    const updatedProfile = await updateProfile(data);

    setProfile(updatedProfile);

    return updatedProfile;
  }

  function clearProfile() {
    setProfile(null);
    setIsProfileLoading(false);
  }

  const value = useMemo(
    () => ({
      profile,
      isProfileLoading,
      refreshProfile,
      updateCurrentProfile,
      clearProfile,
    }),
    [profile, isProfileLoading, refreshProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
