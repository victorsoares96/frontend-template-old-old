import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import { useSignInMutation } from '@/api/main/main.api';
import lightDarkModeAnimation from '@/assets/animations/light-dark-mode.json';
import Checkbox from '@/components/Checkbox';
import LanguageSelector from '@/components/LanguageSelector';
import Meta from '@/components/Meta';
import TextField from '@/components/TextField';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeTheme } from '@/store/theme/theme.slice';
import { Themes } from '@/theme/types';
import isMobile from '@/utils/is-mobile';

function SignIn() {
  const { t } = useTranslation(['common', 'glossary', 'validation']);

  const [signIn] = useSignInMutation();

  const lightDarkModeAnimationRef = useRef<LottieRefCurrentProps>(null);

  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  const [showPassword, setShowPassword] = useState(false);

  const switchToDarkTheme = () => {
    lightDarkModeAnimationRef.current?.playSegments([30, 100], true);
    dispatch(changeTheme(Themes.DARK));
  };

  const switchToLightTheme = () => {
    lightDarkModeAnimationRef.current?.playSegments([60, 30], true);
    dispatch(changeTheme(Themes.LIGHT));
  };

  const toggleTheme = () => {
    if (themeMode === Themes.DARK) switchToLightTheme();
    else switchToDarkTheme();
  };

  const { values, handleChange, touched, errors, handleSubmit, setSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ email, password }) => {
      signIn({ email, password })
        .unwrap()
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <Meta title={t('common:signIn')} />

      <Box
        sx={{
          background:
            'linear-gradient(190deg, rgba(129,118,255,0.85) 0%, rgba(17,0,29,1) 35%, rgba(21,21,24,1) 95%)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.32,
        }}
      />

      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="40px 80px"
      >
        <Box
          display="flex"
          alignItems="center"
          alignSelf="flex-end"
          style={{ cursor: 'pointer' }}
          onClick={toggleTheme}
        >
          <Lottie
            animationData={lightDarkModeAnimation}
            loop={false}
            autoplay={false}
            style={{ width: '100px', height: '100px' }}
            lottieRef={lightDarkModeAnimationRef}
          />

          {!isMobile && (
            <Typography variant="overline">
              {themeMode === Themes.DARK ? 'Dark' : 'Light'}
            </Typography>
          )}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignSelf="center"
          width="100%"
          maxWidth="400px"
        >
          <Typography variant="subtitle2" component="span" fontSize="12px">
            {t('common:welcome')}
          </Typography>

          <Typography
            variant="h6"
            component="h6"
            color="secondary.main"
            fontWeight={700}
            fontSize="24px"
          >
            {t('common:logIntoMyAccount')}
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            marginTop="20px"
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl variant="outlined">
              <FormLabel htmlFor="email">{t('glossary:email')}</FormLabel>

              <TextField
                id="email"
                name="email"
                color="secondary"
                placeholder={t('validation:enterYourEmail')}
                variant="outlined"
                defaultValue={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </FormControl>

            <FormControl variant="outlined" style={{ marginTop: '20px' }}>
              <FormLabel htmlFor="password">{t('glossary:password')}</FormLabel>

              <TextField
                id="password"
                name="password"
                color="secondary"
                placeholder={t('validation:enterYourPassword')}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                    <Typography variant="caption" component="label" fontSize="12px">
                      {t('validation:rememberMe')}
                    </Typography>
                  }
                />
              </FormGroup>

              <Button
                color="secondary"
                variant="text"
                href="/forgot-password"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecorationLine: 'underline',
                  textDecorationColor: (theme) => theme.palette.secondary.main,
                }}
              >
                {t('common:forgotPassword')}
              </Button>
            </Box>

            <Button
              variant="contained"
              sx={{
                padding: '20px 0',
                background: (theme) =>
                  `linear-gradient(60deg, #6B5EFF 0%, ${theme.palette.primary.main} 82%)`,
              }}
              type="submit"
            >
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
      </Box>
    </Box>
  );
}

export default SignIn;
