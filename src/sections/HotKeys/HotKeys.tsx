import { useHotkeys } from 'react-hotkeys-hook';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  close as closeHotkeysDialog,
  toggle as toggleHotkeysDialog,
} from '@/store/hotkeys/hotkeys.slice';
import { toggle as toggleSidebar } from '@/store/sidebar/sidebar.slice';
import { toggle as toggleTheme } from '@/store/theme/theme.slice';

function HotKeys() {
  const dispatch = useAppDispatch();

  const isHotKeysDialogOpen = useAppSelector((state) => state.hotkeys.open);

  // I would love to define all hotkeys in the config and loop it here and avoid this repetitive code.
  // But the `react-hotkeys-hook` library, which we use to handle hotkeys provides only hook (`useHotkeys`).
  // And as you know we can't use hooks inside loops (read "Rules of Hooks" - https://reactjs.org/docs/hooks-rules.html).
  // There is always a workaround, but sometimes it's better to avoid premature and unnecessary optimizations :)
  useHotkeys('alt+s', () => {
    dispatch(toggleSidebar());
  });
  useHotkeys('alt+t', () => {
    dispatch(toggleTheme());
  });
  useHotkeys('alt+/', () => {
    dispatch(toggleHotkeysDialog());
  });

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={() => dispatch(closeHotkeysDialog())}
      open={isHotKeysDialogOpen}
    >
      <DialogTitle>Hot Keys</DialogTitle>
      <DialogContent>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Typography>Toggle Theme</Typography>

          <Button color="warning" variant="outlined" onClick={() => dispatch(toggleTheme())}>
            alt + t
          </Button>
        </FlexBox>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Typography>Toggle Sidebar</Typography>

          <Button color="warning" variant="outlined" onClick={() => dispatch(toggleSidebar())}>
            alt + s
          </Button>
        </FlexBox>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Typography>Toggle Hot Keys&apos; Dialog</Typography>

          <Button
            color="warning"
            variant="outlined"
            onClick={() => dispatch(toggleHotkeysDialog())}
          >
            alt + /
          </Button>
        </FlexBox>
      </DialogContent>
    </Dialog>
  );
}

export default HotKeys;
