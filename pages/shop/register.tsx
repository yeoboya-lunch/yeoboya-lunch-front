import type {NextPage} from 'next';
import Layout from '@components/layout';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import Input from '@components/input';
import Button from '@components/button';
import {FieldErrors, useForm} from 'react-hook-form';
import {IShop} from '../../types/shop';
import {useRouter} from 'next/router';
import {useShopRegister} from '@libs/hooks/services/mutations/shop';
import {scalarOptions} from 'yaml';

const Register: NextPage = () => {
  const shopRegister = useShopRegister();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IShop>({
    mode: 'onSubmit',
  });

  const onValid = (shopForm: IShop) => {
    shopRegister.mutate(shopForm);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const router = useRouter();
  useEffect(() => {
    if (shopRegister.isError) {
      console.log(shopRegister);
    }
    if (shopRegister.isSuccess) {
      router.push('/');
    }
  }, [shopRegister.isLoading]);

  const [inputFields, setInputFields] = useState([{itemName: '', price: 0}]);

  const addFields = (e: SyntheticEvent) => {
    e.preventDefault();
    let newField = {itemName: '', price: 0};
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index: number) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <Layout canGoBack title="식당등록">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="p-4 space-y-4">
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register('shopName', {
            required: true,
          })}
          label="상점이름"
          name="shopName"
          type="text"
        />

        {inputFields.map((input, index) => {
          return (
            <div key={index} className="space-y-4">
              <Input
                register={register(`items.${index}.itemName`, {
                  required: true,
                })}
                label="메뉴"
                name="itemName"
                type="text"
              />
              <Input
                register={register(`items.${index}.price`, {
                  required: true,
                })}
                label="가격"
                name="price"
                type="text"
                kind="price"
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}

        <button onClick={addFields}>Add More..</button>

        <Button text="식당등록" />
      </form>
    </Layout>
  );
};

export default Register;
