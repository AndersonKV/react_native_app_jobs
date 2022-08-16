import React, {useState} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import user_default from '../../assets/user_default.png';
import company_default from '../../assets/company_default.png';
import {RoutesPath} from '../../utils/routesPath';

interface Props {
  image: ImageSourcePropType | String;
  width: string | number;
  height: string | number;
  border?: number;
  borderColor?: string;
  borderWidth?: string | number;
  role?: 'USER' | 'COMPANY';
}
export function Avatar({
  image,
  width,
  borderWidth,
  borderColor,
  height,
  border,
  role,
}: Props) {
  const [inCaseErrorImage, setInCaseErrorImage] = useState(false);

  const set = role === 'COMPANY' ? company_default : user_default;

  const setImage = inCaseErrorImage
    ? set
    : {uri: `${RoutesPath.SERVER}uploads/${image}`};

  return (
    <View>
      <Image
        onError={() => setInCaseErrorImage(true)}
        source={setImage}
        resizeMode={'center'}
        style={{
          width: width,
          height: height,
          borderWidth: 3,
          borderRadius: border || 0,
        }}
      />
    </View>
  );
}
