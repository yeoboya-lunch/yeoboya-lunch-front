import type {NextPage} from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import {useSettingMember} from '@libs/hooks/services/queries/member';
import {useMemberUpdate} from '@libs/hooks/services/mutations/member';
import {FieldErrors, useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {useEffect, Suspense} from 'react';

interface UpdateForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

const EditProfile: NextPage = () => {
  const {data: member} = useSettingMember({suspense: true});
  const update = useMemberUpdate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UpdateForm>();

  const onValid = (validForm: UpdateForm) => {
    update.mutate(validForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (update.isError) {
      // console.log(errors);
    }
    if (update.isSuccess) {
      router.push('/profile');
    }
  }, [update.isLoading]);

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  const Loading = () => {
    return <h1>loading...</h1>;
  };
  return (
    <Layout canGoBack title="Edit Profile">
      <h2 className="text-2xl">Public profile</h2>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="py-10 px-4 space-y-4">
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
          required
          label="Name"
          name="name"
          type="name"
          readOnly={true}
          defaultValue={member?.name}
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
          defaultValue={member?.email}
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
          defaultValue={member?.phoneNumber}
        />
        <Input
          required
          label="NickName"
          name="nickname"
          type="text"
          kind="text"
          defaultValue={member?.nickName}
        />
        <Input
          register={register('bio', {
            required: '정보는 필수 입력입니다.',
          })}
          required
          label="Bio"
          name="bio"
          type="bio"
          kind="text"
          defaultValue={member?.bio}
        />
        {errors.bio && (
          <p role="alert" className="text-sm text-red-500">
            {errors.bio?.message}
          </p>
        )}
        <Button text={update.isLoading ? 'Loading' : 'Update profile'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
