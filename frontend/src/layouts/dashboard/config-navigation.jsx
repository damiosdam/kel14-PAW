import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <AccessTimeFilledIcon />,
  },
  {
    title: 'anggota',
    path: '/anggota',
    icon: <GroupsIcon />,
  },
  {
    title: 'inventaris',
    path: '/inventaris',
    icon: <Inventory2Icon />,
  },
  {
    title: 'persuratan',
    path: '/persuratan',
    icon: <EmailIcon />,
  },
  {
    title: 'proposal',
    path: '/proposal',
    icon: <DescriptionIcon />,
  },
  {
    title: 'LPJ',
    path: '/LPJ',
    icon: <NoteAltIcon />,
  },
  {
    title: 'logout',
    path: '/logout',
    icon: <LogoutIcon />,
  }
];

export default navConfig;
