import React from 'react';
import { useForm } from 'react-hook-form';

import { useAccountInfoUpdate, useAccountSave } from '@/app/_queries/user/userMutations';
import { useSettingMember } from '@/app/_queries/user/userQueries';
import Button from '@/components/button';
import Input from '@/components/input';

interface AccountForm {
  email: string;
  bankName: string;
  accountNumber: string;
}

export default function AccountInfo() {
  const { data } = useSettingMember();
  const account = useAccountSave();
  const update = useAccountInfoUpdate();

  const onValidAccount = (validForm: AccountForm) => {
    validForm.email = data?.email ?? '';
    data?.account ? update.mutate(validForm) : account.mutate(validForm);
  };

  const { register, handleSubmit } = useForm<AccountForm>({
    defaultValues: {
      bankName: data?.bankName,
      accountNumber: data?.accountNumber,
    },
  });

  return (
    <>
      <h2 className="border-b-2 px-4 py-3 text-2xl">Account Info</h2>
      <form onSubmit={handleSubmit(onValidAccount)} className="space-y-4 px-4 pt-5">
        <Input
          register={register('bankName', {
            required: '은행명은 필수 입력입니다.',
          })}
          required
          label="은행"
          name="bankName"
          type="text"
        />
        <Input
          register={register('accountNumber', {
            required: '계좌번호는 필수 입력입니다.',
          })}
          required
          label="계좌번호"
          name="accountNumber"
          type="text"
        />
        {data?.account ? (
          <Button text={account.isLoading ? 'Loading' : 'Update AccountInfo'} />
        ) : (
          <Button text={account.isLoading ? 'Loading' : 'Create AccountInfo'} />
        )}
      </form>
    </>
  );
}
