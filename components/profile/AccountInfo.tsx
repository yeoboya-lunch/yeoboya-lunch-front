import Input from '@components/input';
import Button from '@components/button';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useSettingMember} from '@libs/hooks/services/queries/member';
import {useAccountInfoUpdate, useAccountSave} from '@libs/hooks/services/mutations/member';

interface AccountForm {
  email: string;
  bankName: string;
  accountNumber: string;
}

export default function AccountInfo() {
  const {data} = useSettingMember();
  const account = useAccountSave();
  const update = useAccountInfoUpdate();

  const onValidAccount = (validForm: AccountForm) => {
    validForm.email = data.data.email;
    data.data.account ? update.mutate(validForm) : account.mutate(validForm);
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AccountForm>({
    defaultValues: {
      bankName: data.data.bankName,
      accountNumber: data.data.accountNumber,
    },
  });

  return (
    <>
      <h2 className="text-2xl py-3 px-4 border-b-2">Account Info</h2>
      <form onSubmit={handleSubmit(onValidAccount)} className="pt-5 px-4 space-y-4">
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
        {data.data.account ? (
          <Button text={account.isLoading ? 'Loading' : 'Update AccountInfo'} />
        ) : (
          <Button text={account.isLoading ? 'Loading' : 'Create AccountInfo'} />
        )}
      </form>
    </>
  );
}
