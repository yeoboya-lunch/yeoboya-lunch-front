import type {NextPage} from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import {useSettingMember} from '@libs/hooks/services/queries/member';
import {
  usePublicProfileUpdate,
  useAccountSave,
  useAccountInfoUpdate,
} from '@libs/hooks/services/mutations/member';
import {FieldErrors, useForm, Controller} from 'react-hook-form';
import {useEffect, useMemo} from 'react';

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
  const {data: member, isSuccess: isSuccess} = useSettingMember({suspense: true});
  console.log(isSuccess);
  const publicProfile = usePublicProfileUpdate();
  const account = useAccountSave();
  const update = useAccountInfoUpdate();

  const {
    register: publicProfileRegister,
    handleSubmit: publicProfileHandleSubmit,
    formState: {errors: publicProfileErrors},
  } = useForm<PublicProfileForm>();

  const {
    register: accountRegister,
    handleSubmit: accountHandleSubmit,
    formState: {errors: accountErrors},
    reset,
    watch,
  } = useForm<AccountForm>({
    defaultValues: {
      bankName: member?.data.bankName,
      accountNumber: member?.data.accountNumber,
    },
  });
  console.log(watch());
  // useEffect(() => {
  //   if (member) {
  //     reset({
  //       bankName: member.data.bankName,
  //       accountNumber: member.data.accountNumber,
  //     });
  //   }
  // }, [member]);

  const onValidPublic = (validForm: PublicProfileForm) => {
    publicProfile.mutate(validForm);
  };

  const onValidAccount = (validForm: AccountForm) => {
    console.log(validForm);
    validForm.email = member?.data.email;
    member?.data.account ? update.mutate(validForm) : account.mutate(validForm);
  };

  const onInvalid = (publicProfileErrors: FieldErrors) => {
    console.log(publicProfileErrors);
  };

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
          defaultValue={member?.data.name}
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
          defaultValue={member?.data.email}
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
          defaultValue={member?.data.phoneNumber}
        />
        <Input
          required
          label="NickName"
          name="nickname"
          type="text"
          kind="text"
          defaultValue={member?.data.nickName}
        />
        <Input
          register={publicProfileRegister('bio')}
          label="Bio"
          name="bio"
          type="bio"
          kind="text"
          defaultValue={member?.data.bio}
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
        {isSuccess && (
          <>
            <Input
              register={accountRegister('bankName', {
                required: '은행명은 필수 입력입니다.',
              })}
              required
              label="은행"
              name="bankName"
              type="text"
              defaultValue={member?.data.bankName}
            />
            <Input
              register={accountRegister('accountNumber', {
                required: '계좌번호는 필수 입력입니다.',
              })}
              required
              label="계좌번호"
              name="accountNumber"
              type="text"
              defaultValue={member?.data.accountNumber}
            />
          </>
        )}

        {/*<div>*/}
        {/*  <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={'password'}>*/}
        {/*    은행명*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    {...accountRegister('bankName', {required: '은행명은 필수 입력입니다.'})}*/}
        {/*    name="bankName"*/}
        {/*    type="text"*/}
        {/*    required*/}
        {/*    defaultValue={member?.data.bankName}*/}
        {/*    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500*/}
        {/*    read-only:cursor-not-allowed read-only:text-gray-500"*/}
        {/*  />*/}
        {/*</div>*/}

        {/*<div>*/}
        {/*  <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={'password'}>*/}
        {/*    계좌번호*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    {...accountRegister('accountNumber', {required: '계좌번호는 필수 입력입니다.'})}*/}
        {/*    name="accountNumber"*/}
        {/*    type="text"*/}
        {/*    required*/}
        {/*    defaultValue={member?.data.accountNumber}*/}
        {/*    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500*/}
        {/*    read-only:cursor-not-allowed read-only:text-gray-500"*/}
        {/*  />*/}
        {/*</div>*/}

        {member?.data.account ? (
          <Button text={account.isLoading ? 'Loading' : 'Update Account'} />
        ) : (
          <Button text={account.isLoading ? 'Loading' : 'Create Account'} />
        )}
      </form>
    </Layout>
  );
};

export default EditProfile;
