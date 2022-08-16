import {useEffect} from 'react';
import {api} from '../../api/api';
import {RoutesPath} from '../../utils/routesPath';
import {ScreenApply} from '../../utils/routesType/rootScreenProps';

interface PropsValues {
  token: string;
  id_job: number;
}

export function Matching({route, navigation}: ScreenApply) {
  useEffect(() => {
    async function init() {
      const params = route.params as any;
      const values = params.values as PropsValues;

      try {
        await api.post(RoutesPath.APPLY, {
          id_job: values.id_job,
          Authorization: `Bearer ${values.token}`,
        });

        navigation.goBack();
      } catch (err) {
        navigation.navigate('AuthStack', {
          screen: 'Error',
        });
      }
    }

    init();
  }, []);
  return null;
}
