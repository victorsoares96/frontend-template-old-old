import { Fragment } from 'react';

import { Typography } from '@mui/material';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

import { Image } from './styled';

function SignIn() {
  const isPortrait = useOrientation();

  const width = isPortrait ? '40%' : '30%';
  const height = isPortrait ? '30%' : '40%';

  return (
    <Fragment>
      <Meta title="Welcome" />

      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Typography>Foo</Typography>
      </FullSizeCenteredFlexBox>
    </Fragment>
  );
}

export default SignIn;
