import CheckIcon from '@mui/icons-material/Check';
import { Box, CheckboxProps, Checkbox as MuiCheckbox } from '@mui/material';
import { styled } from '@mui/material/styles';

const Icon = styled('div')(({ theme }) => ({
  borderRadius: 5,
  width: 24,
  height: 24,
  border: '1.2px solid #ADB5BD',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={
        <Box
          sx={{
            border: '1.2px solid #ADB5BD',
            width: 24,
            height: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
          }}
        >
          <CheckIcon
            fontSize="small"
            sx={{ color: (theme) => theme.palette.primary.dark, opacity: 0.8 }}
          />
        </Box>
      }
      icon={<Icon />}
      {...props}
    />
  );
}

export default Checkbox;
