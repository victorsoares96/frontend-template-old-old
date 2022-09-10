import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  alpha,
  styled,
} from '@mui/material';

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.secondary.main,
    border: '1.2px solid #DCDDE3',
    overflow: 'hidden',
    borderRadius: '12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),

    '& fieldset': {
      border: 'none',
    },

    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.secondary.main,
    },
  },

  '& .MuiInputBase-input': {
    '::placeholder': {
      color: theme.palette.secondary.main,
      fontWeight: 400,
      fontSize: '14px',
    },
  },

  '& .MuiInputAdornment-root': {
    color: theme.palette.secondary.main,

    '& .MuiIconButton-root': {
      color: '#B1B2B3',
    },
  },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.secondary.main,
    border: '1.2px solid #DCDDE3',
    overflow: 'hidden',
    borderRadius: '12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),

    '& fieldset': {
      border: 'none',
    },

    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.secondary.main,
    },
  },

  '& .MuiInputBase-input': {
    '::placeholder': {
      color: theme.palette.secondary.main,
      fontWeight: 400,
      fontSize: '14px',
    },
  },

  '& .MuiInputAdornment-root': {
    color: theme.palette.secondary.main,

    '& .MuiIconButton-root': {
      color: '#B1B2B3',
    },
  },
}));

export { MenuItem, Select };
