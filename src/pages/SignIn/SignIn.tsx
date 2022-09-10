import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
} from '@mui/material';

import Checkbox from '@/components/Checkbox';
import LanguageSelector from '@/components/LanguageSelector';
import Meta from '@/components/Meta';
import TextField from '@/components/TextField';
import useOrientation from '@/hooks/useOrientation';
import { supportedLanguages } from '@/locales/i18n';

function SignIn() {
  const { t, i18n } = useTranslation(['common', 'glossary', 'validation']);

  const isPortrait = useOrientation();

  const [showPassword, setShowPassword] = useState(false);

  const currentLanguage = supportedLanguages.find((lang) => lang.code === i18n.language);
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Meta title={t('common:signIn')} />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignSelf="center"
        width="100%"
        maxWidth="400px"
      >
        <Typography variant="subtitle2" component="span" fontSize="12px" color="#646981">
          {t('common:welcome')}
        </Typography>

        <Typography
          variant="h6"
          component="h6"
          color="secondary.dark"
          fontWeight={700}
          fontSize="24px"
        >
          {t('common:logIntoMyAccount')}
        </Typography>

        <Box display="flex" flexDirection="column" marginTop="20px">
          <FormControl variant="outlined">
            <FormLabel htmlFor="email">{t('glossary:email')}</FormLabel>

            <TextField
              id="email"
              color="secondary"
              placeholder={t('validation:enterYourEmail')}
              variant="outlined"
            />
          </FormControl>

          <FormControl variant="outlined" style={{ marginTop: '20px' }}>
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

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            margin="20px 0"
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="caption" component="label" color="#646981" fontSize="12px">
                    {t('validation:rememberMe')}
                  </Typography>
                }
              />
            </FormGroup>

            <Button
              variant="text"
              href="/forgot-password"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecorationLine: 'underline',
                textDecorationColor: (theme) => theme.palette.primary.main,
              }}
            >
              {t('common:forgotPassword')}
            </Button>
          </Box>

          <Button variant="contained" style={{ padding: '20px 0' }}>
            <Typography
              variant="button"
              component="span"
              sx={{ fontWeight: 700, fontSize: '16px' }}
            >
              {t('glossary:enter').toUpperCase()}
            </Typography>
          </Button>
        </Box>
      </Box>

      <LanguageSelector />
    </Container>
  );
}

export default SignIn;
