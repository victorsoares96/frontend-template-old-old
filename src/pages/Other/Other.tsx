import { Fragment } from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Other() {
  return (
    <Box>
      <Meta title="Other" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Other</Typography>
      </FullSizeCenteredFlexBox>
    </Box>
  );
}

export default Other;
