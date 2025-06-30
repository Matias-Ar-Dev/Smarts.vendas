import { api } from '@/lib/axios';


interface EditProfileData {
  name_user: string;
  email_user: string;
  password_user?: string;
}

export const editProfile = async (data: EditProfileData) => {
  const response = await api.put('/edit_profile', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
};
