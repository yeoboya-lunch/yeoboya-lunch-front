'use client';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Layout from '@/components/layout';

const EditProfile: NextPage = () => {
  const AccountInfo = dynamic(() => import('@/components/profile/AccountInfo'), {
    suspense: true,
    ssr: false,
    loading: () => <></>,
  });

  const PublicProfile = dynamic(() => import('@/components/profile/PublicProfile'), {
    suspense: true,
    ssr: false,
    loading: () => <></>,
  });

  return (
    <Layout canGoBack title="Edit Profile">
      <Suspense>
        <PublicProfile />
      </Suspense>
      <Suspense>
        <AccountInfo />
      </Suspense>
    </Layout>
  );
};

export default EditProfile;
