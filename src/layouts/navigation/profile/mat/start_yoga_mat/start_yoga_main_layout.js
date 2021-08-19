{
    /* 
    Author: Ridho Wahyu Nugroho
    edited: 14 agustus 2021
    email: wridho246@gmail.com
    */
  }
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {ScrollView, StyleSheet, View, Text} from 'react-native';
import color from '../../../../../material/color';
import ukuran from '../../../../../material/dimen';
import strings from '../../../../../material/strings';
import TextTitle from '../../../../items/title_text';
import UnderlineLayout from '../../../../items/underline_layout';
import PreviewMat from '../preview_mat_popup';
import CustomButton from '../../../../button/default_button';

const MatYogaStart = (props) => {
  const navigation = useNavigation();

  const {start} = props.route.params;

  console.log(start);
  return (
    <>
    {/* view header my nirvana mat */}
      <View style={{flex: 1, backgroundColor: color.white}}>
        <Text
          style={{
            marginTop: 20,
            marginBottm: ukuran.dp_20,
            textAlign: 'center',
          }}>
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            text={'MY '}
            maxLine={1}
            warna={color.defaultColor}
          />
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            tipe={'bold'}
            text={'NIRVANA '}
            maxLine={1}
            warna={color.defaultColor}
          />
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            text={'MAT'}
            maxLine={1}
            warna={color.defaultColor}
          />
        </Text>
        <View
          style={{
            width: ukuran.wpMatchParent,
            height: 1,
            backgroundColor: color.white_300,
            marginTop: ukuran.dp_20,
          }}
        />
        {/*  view parent include previewmat form preview mat popup and custom button */}
        <View style={styleMain.parent}>
          {/* mat data from preview mat popup using var start from this file, cause start retrieve data from preview_mat*/}
          <PreviewMat
            matData={start}
            nav={props.navigation}
          />
        </View>
        {/* view button custom*/}
        <View style={styleMain.custombutton}>
            {/* on press navigation using navigation react, and navigate to page training with boolean withOur false or true */}
          <CustomButton
            width={'match'}
            onpressed={(e) => navigation.navigate('PageTraining',{withOur:false})}
            backgroundColor={color.defaultColor}
            text={!props.onStartText ? `Start on Your Own` : props.onStartText}
            style={{marginTop: -100}}
          />
          <CustomButton
            width={'match'}
            onpressed={(e) => {
                navigation.navigate('PageTraining',{withOur:true})
            }}
            backgroundColor={color.white}
            text={
              !props.onProgressText
                ? `With our Instructor`
                : props.onProgressText
            }
          />
        </View>
      </View>
    </>
  );
};

const styleMain = StyleSheet.create({
  parent: {
    margin: 30,
  },
  custombutton: {
    marginTop: -130,
    alignSelf: 'center',
  },
});

export default MatYogaStart;
