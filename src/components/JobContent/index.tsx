import React from 'react';

import {View, Text, ImageSourcePropType} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBriefcase as IconeCompany,
  faMapMarkerAlt as IconeLocal,
  faBuilding as IconeSizeCompany,
  faChartBar as IconeExperienceLevel,
  faFileAlt as IconeTypeContract,
  faMoneyBillAlt as IconeSalary,
} from '@fortawesome/free-solid-svg-icons';
import {Avatar} from '../Avatar';
import {converteDateCreated} from '../../utils/utils';
import {styles} from './styles';

interface Props {
  id?: number;
  user_id?: number;
  title?: string;
  size_company?: string;
  salary?: string;
  experience_level?: string;
  types_contract?: string;
  remote?: string;
  name_company?: string;
  benefits?: string;
  responsibilities?: string;
  requirements?: string;
  techs?: Array<String>;
  updated_at?: Date;
  created_at?: Date;
  expired_days?: number;
  expired?: boolean;
  avatar?: {
    source: ImageSourcePropType;
    height: number | string;
    width: number | string;
  };
  width?: number | string;
}

export function JobContent({
  benefits,
  created_at,
  experience_level,
  expired,
  expired_days,
  id,
  name_company,
  remote,
  requirements,
  responsibilities,
  salary,
  size_company,
  techs,
  title,
  types_contract,
  user_id,
  avatar,
  width,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          opacity: expired ? 10 : 10,
          width: width || '100%',
        },
      ]}>
      {avatar ? (
        <Avatar
          image={avatar.source}
          height={avatar.height}
          width={avatar.width}
          role={'COMPANY'}
        />
      ) : null}

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.viewWraped}>
          <View style={styles.div}>
            <FontAwesomeIcon icon={IconeCompany} />
            <Text style={styles.span}>{name_company}</Text>
          </View>
          <View style={styles.div}>
            <FontAwesomeIcon icon={IconeLocal} />
            <Text style={styles.span}>Remoto: {remote}</Text>
          </View>
          <View style={styles.div}>
            <FontAwesomeIcon icon={IconeSizeCompany} />
            <Text style={styles.span}>{size_company}</Text>
          </View>
          <View style={styles.div}>
            <FontAwesomeIcon icon={IconeExperienceLevel} />
            <Text style={styles.span}>{experience_level}</Text>
          </View>
          <View style={styles.div}>
            <FontAwesomeIcon icon={IconeTypeContract} />
            <Text style={styles.span}>{types_contract}</Text>
          </View>
          <View style={styles.div}>
            <FontAwesomeIcon icon={IconeSalary} />
            <Text style={styles.span}>{salary}</Text>
          </View>
        </View>
        {expired === true ? (
          <View style={styles.viewExpired}>
            <Text style={styles.textExpired}>VENCIDO</Text>
          </View>
        ) : null}

        {created_at && expired_days ? (
          <View>
            <Text style={{alignSelf: 'flex-end'}}>
              até: {converteDateCreated(created_at, expired_days)}
            </Text>
          </View>
        ) : null}

        {techs && techs?.length > 0 ? (
          <View style={styles.listTech}>
            {techs?.map((tech, index) => {
              return (
                <Text key={index.toString()} style={styles.textTech}>
                  {tech}
                </Text>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}
