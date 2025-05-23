import { editProfile } from '@/api/test';
import { useMutation } from '@tanstack/react-query';


export const useEditProfile = () => {
  return useMutation({
    mutationFn: editProfile,
  });
};
