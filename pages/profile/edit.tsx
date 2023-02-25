import type {NextPage} from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import {useSettingMember} from '@libs/hooks/services/queries/member';
import {usePublicProfileUpdate, useAccountSave} from '@libs/hooks/services/mutations/member';
import {FieldErrors, useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {useEffect, Suspense} from 'react';

interface PublicProfileForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

interface AccountForm {
  email: string;
  bankName: string;
  accountNumber: string;
}

const EditProfile: NextPage = () => {
  const {data: member} = useSettingMember({suspense: true});
  const publicProfile = usePublicProfileUpdate();
  const account = useAccountSave();
  // const update = useAccountInfoSave();

  const {
    register: publicProfileRegister,
    handleSubmit: publicProfileHandleSubmit,
    formState: {errors: publicProfileErrors},
  } = useForm<PublicProfileForm>();

  const {
    register: accountRegister,
    handleSubmit: accountHandleSubmit,
    formState: {errors: accountErrors},
  } = useForm<AccountForm>();

  const onValidPublic = (validForm: PublicProfileForm) => {
    publicProfile.mutate(validForm);
  };

  const onValidAccount = (validForm: AccountForm) => {
    validForm.email = member?.email;
    account.mutate(validForm);
  };

  const onInvalid = (publicProfileErrors: FieldErrors) => {
    console.log(publicProfileErrors);
  };

  const router = useRouter();
  useEffect(() => {
    if (publicProfile.isError || account.isError) {
      console.log(publicProfileErrors, accountErrors);
    }
    if (publicProfile.isSuccess || account.isSuccess) {
      router.push('/profile');
    }
  }, [publicProfile.isLoading]);

  return (
    <Layout canGoBack title="Edit Profile">
      <h2 className="text-2xl py-3 px-4 border-b-2">Public profile</h2>
      <form
        onSubmit={publicProfileHandleSubmit(onValidPublic, onInvalid)}
        className="pt-5 px-4 space-y-4"
      >
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
          register={publicProfileRegister('email', {
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
          register={publicProfileRegister('phoneNumber', {
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
          register={publicProfileRegister('bio', {
            required: '정보는 필수 입력입니다.',
          })}
          required
          label="Bio"
          name="bio"
          type="bio"
          kind="text"
          defaultValue={member?.bio}
        />
        {publicProfileErrors.bio && (
          <p role="alert" className="text-sm text-red-500">
            {publicProfileErrors.bio?.message}
          </p>
        )}
        <Button text={publicProfile.isLoading ? 'Loading' : 'Update profile'} />
      </form>
      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <h2 className="text-2xl py-3 px-4 border-b-2">Account Info</h2>
      <form
        onSubmit={accountHandleSubmit(onValidAccount, onInvalid)}
        className="pt-5 px-4 space-y-4"
      >
        <Input
          register={accountRegister('bankName', {
            required: '이메일은 필수 입력입니다.',
          })}
          required
          label="은행"
          name="bankName"
          type="text"
          defaultValue={member?.bankName}
        />
        <Input
          register={accountRegister('accountNumber', {
            required: '이메일은 필수 입력입니다.',
          })}
          required
          label="계좌번호"
          name="accountNumber"
          type="text"
          defaultValue={member?.accountNumber}
        />
        <Button text={account.isLoading ? 'Loading' : 'Create Account'} />
      </form>
    </Layout>
  );
};

export default EditProfile;