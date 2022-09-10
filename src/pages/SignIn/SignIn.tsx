import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';

import Meta from '@/components/Meta';
import TextField from '@/components/TextField';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

function SignIn() {
  const { t } = useTranslation(['common', 'glossary', 'validation']);

  const isPortrait = useOrientation();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Meta title="Sign In" />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignSelf="center"
        width="100%"
        maxWidth="600px"
        // margin="0 80px"
        // height="100%"
      >
        <Typography variant="subtitle2" component="span">
          {t('common:welcome')}
        </Typography>

        <Typography variant="h6" component="h6" color="secondary" sx={{ fontWeight: 700 }}>
          {t('common:logIntoMyAccount')}
        </Typography>

        <FormControl variant="outlined">
          <FormLabel htmlFor="email">{t('glossary:email')}</FormLabel>

          <TextField
            id="email"
            color="secondary"
            placeholder={t('validation:enterYourEmail')}
            variant="outlined"
          />
        </FormControl>

        <FormControl variant="outlined">
          <FormLabel htmlFor="password">{t('glossary:password')}</FormLabel>

          <TextField
            id="password"
            color="secondary"
            placeholder={t('validation:enterYourPassword')}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={t('validation:rememberMe')}
          />
        </FormGroup>
      </Box>
    </Container>
  );
}

export default SignIn;
