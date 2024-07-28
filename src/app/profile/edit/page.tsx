'use client';

import type { NextPage } from 'next';
import { ChangeEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/app/_components/ui/input/Input';
import { Label } from '@/app/_components/ui/input/Label';
import ProfileImg from '@/app/_components/ui/user/ProfileImg';
import { cn } from '@/app/_lib/utils';
import { useSettingMember } from '@/app/_queries/member/memberQueries';
import Layout from '@/components/layout';

type FormProps = {
  name: string;
  img: File | null;
};
const EditProfile: NextPage = () => {
  const { data: member } = useSettingMember();
  const [tempImg, setTempImg] = useState<string | null>(null);
  const { register } = useForm<FormProps>({
    defaultValues: async () => {
      return {
        name: member?.name ?? '',
        img: null,
      };
    },
  });

  const handleImgChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    if (tempImg) {
      URL.revokeObjectURL(tempImg);
    }
    const file = e.target.files[0];
    if (file) {
      const img = URL.createObjectURL(file);
      setTempImg(() => img);
    }
  };

  return (
    <Layout canGoBack title="프로필 수정" className="p-4">
      <form>
        <div className={cn('flex items-center space-x-3', 'p-4')}>
          <Label className="cursor-pointer">
            <Input {...register('img')} type="file" className="hidden" onChange={handleImgChange} />
            {tempImg ? (
              <ProfileImg src={tempImg} className="h-16 w-16" />
            ) : (
              <ProfileImg className="h-16 w-16" />
            )}
            이미지 변경
          </Label>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{member?.loginId}</span>
            <Input {...register('name')} className="text-sm text-muted-foreground" />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default EditProfile;
