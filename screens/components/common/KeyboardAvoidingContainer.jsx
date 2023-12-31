import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const KeyboardAvoidingContainer = ({children , style}) => {
   return (
      <SafeAreaView style={{flex : 1 , backgroundColor : 'white'}}>
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
      </SafeAreaView>
   )
}


const styles = StyleSheet.create({
   contentContainer : {
      height: 100,
      
   }
})
export default KeyboardAvoidingContainer