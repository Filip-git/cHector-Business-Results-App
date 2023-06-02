import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getFormatedDate } from 'react-native-modern-datepicker'

export default function getHeaderTitle(route) {

  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'Tasks':
      return getFormatedDate(new Date(), 'MMMM DD, YYYY');
    case 'Goals':
      return getFormatedDate(new Date(), 'MMMM DD, YYYY');
    case 'AddGoal':
      return 'Add new goal';
    case 'AddTask':
      return 'Add new task';
    case 'EditAccount':
      return 'Edit your profile';
    default:
      return 'cHector';
  }
}