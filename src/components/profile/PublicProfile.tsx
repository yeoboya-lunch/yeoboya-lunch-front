import { FieldErrors, useForm } from 'react-hook-form';

import { usePublicProfileUpdate } from '@/app/_queries/user/userMutations';
import { useSettingMember } from '@/app/_queries/user/userQueries';
import Button from '@/components/button';
import Input from '@/components/input';

interface PublicProfileForm {
  name: string;
  email: string;
  phoneNumber: string;
  nickName: string;
  bio: string;
}

export default function PublicProfile() {
  const { data } = useSettingMember();
  const publicProfile = usePublicProfileUpdate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublicProfileForm>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      nickName: data?.nickName,
      bio: data?.bio,
    },
  });

  const onValidPublic = (validForm: PublicProfileForm) => {
    publicProfile.mutate(validForm);
  };

  const onInvalid = (publicProfileErrors: FieldErrors) => {
    console.log(publicProfileErrors);
  };

  return (
    <>
      <h2 className="border-b-2 px-4 py-3 text-2xl">Public profile</h2>
      <form onSubmit={handleSubmit(onValidPublic, onInvalid)} className="space-y-4 px-4 pt-5">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input id="picture" type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        <Input
          register={register('name', {
            required: '이메일은 필수 입력입니다.',
          })}
          required
          label="Name"
          name="name"
          type="name"
          readOnly={true}
        />
        <Input
          register={register('email', {
            required: '이메일은 필수 입력입니다.',
          })}
          required
          label="Email address"
          name="email"
          type="email"
          readOnly={true}
        />
        <Input
          register={register('phoneNumber', {
            required: '핸드폰 번호는 필수 입니다.',
          })}
          required
          label="Phone number"
          name="phone"
          type="tel"
          kind="phone"
        />
        <Input
          register={register('nickName', {
            required: '이메일은 필수 입력입니다.',
          })}
          required
          label="NickName"
          name="nickname"
          type="text"
          kind="text"
        />
        <Input register={register('bio')} label="Bio" name="bio" type="bio" kind="text" />
        {errors.bio && (
          <p role="alert" className="text-sm text-red-500">
            {errors.bio?.message}
          </p>
        )}
        <Button text={publicProfile.isLoading ? 'Loading' : 'Update profile'} />
      </form>
    </>
  );
}
