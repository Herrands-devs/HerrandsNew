import React from 'react'
import { View } from 'react-native'
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const KeyboardAvoidingContainer = ({children , style}) => {
   return (
      <View style={{flex : 1}}>
         <KeyboardAvoidingView 
            style={{flex : 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerStyle={[styles.contentContainer]}
            >
               {children}
            </ScrollView>
         </KeyboardAvoidingView>
      </View>
   )
}


const styles = StyleSheet.create({
   contentContainer : {
   }
})
export default KeyboardAvoidingContainer