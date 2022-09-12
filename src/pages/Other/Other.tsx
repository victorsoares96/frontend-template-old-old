import { Fragment } from 'react';

import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Other() {
  return (
    <Fragment>
      <Meta title="Other" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Other</Typography>
      </FullSizeCenteredFlexBox>
    </Fragment>
  );
}

export default Other;
