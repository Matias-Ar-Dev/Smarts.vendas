
import { editProfile } from '@/lib/profile_user';
import { useMutation } from '@tanstack/react-query';


export const useEditProfile = () => {
  return useMutation({
    mutationFn: editProfile,
  });
};
