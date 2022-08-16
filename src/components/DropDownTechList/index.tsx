import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';

interface Props {
  displayTechList: boolean;
  setDisplayTechList: React.Dispatch<React.SetStateAction<boolean>>;
  language: String[] | undefined;
  handleSearch: (value: string) => void;
  linguageInDisplay: string;
}
export function DropDownTechList({
  displayTechList,
  handleSearch,
  language,
  setDisplayTechList,
  linguageInDisplay,
}: Props) {
  return (
    <>
      <TouchableOpacity
        onPress={() => setDisplayTechList(!displayTechList)}
        style={styles.inputBoxTech}>
        <View style={styles.boxSearch}>
          <FontAwesomeIcon
            style={{alignSelf: 'center'}}
            icon={faSearch}
            size={15}
          />
        </View>

        <View style={styles.inputSearch}>
          <Text style={styles.inputTextSearch}>{linguageInDisplay}</Text>
        </View>
      </TouchableOpacity>

      {displayTechList ? (
        <SafeAreaView style={styles.contentAreaView}>
          <ScrollView>
            {language?.map((lang, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => handleSearch(lang.toString())}
                  style={styles.listTextTech}>
                  <Text>{lang}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      ) : null}
    </>
  );
}
