import Input from '@components/input';
import Button from '@components/button';
import {useSettingMember} from '@libs/hooks/services/queries/member';
import {usePublicProfileUpdate} from '@libs/hooks/services/mutations/member';
import {FieldErrors, useForm} from 'react-hook-form';

interface PublicProfileForm {
  name: string;
  email: string;
  phoneNumber: string;
  nickName: string;
  bio: string;
}

export default function PublicProfile() {
  const {data} = useSettingMember();
  const publicProfile = usePublicProfileUpdate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PublicProfileForm>({
    defaultValues: {
      name: data.data.name,
      email: data.data.email,
      phoneNumber: data.data.phoneNumber,
      nickName: data.data.nickName,
      bio: data.data.bio,
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
      <h2 className="text-2xl py-3 px-4 border-b-2">Public profile</h2>
      <form onSubmit={handleSubmit(onValidPublic, onInvalid)} className="pt-5 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
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
