import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {StyledTouchable, StyledView} from 'src/components/base';
import {LightTheme as theme} from 'src/theme';

interface ICodePushDialog {
  messages?: string[];
  visible: boolean;
  onHideModal: () => void;
  onRestart: () => void;
}

const CodePushDialog = ({
  messages,
  visible = false,
  onRestart,
  onHideModal,
}: ICodePushDialog) => {
  return (
    <Modal animationType="fade" visible={visible} transparent>
      <StyledView
        style={{
          backgroundColor: theme.blackOpacity(0.7),
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}>
        <StyledView
          style={{
            backgroundColor: theme.colors['neutral-white'],
            borderRadius: 16,
            padding: 16,
          }}>
          <Text style={{color: 'black'}}>Codepush Update</Text>
          {messages &&
            messages.map(mes => <Text style={{color: 'black'}}>{mes}</Text>)}
          <StyledView flexDirection={'row'} justifyContent={'flex-end'}>
            <StyledTouchable activeOpacity={0.5} onPress={onHideModal}>
              <Text style={{color: 'black'}}>Later</Text>
            </StyledTouchable>
            <StyledTouchable
              activeOpacity={0.5}
              onPress={onRestart}
              style={{marginLeft: 12}}>
              <Text style={{color: 'black'}}>Restart</Text>
            </StyledTouchable>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default CodePushDialog;
