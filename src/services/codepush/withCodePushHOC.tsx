import React from 'react';
import CodePush, {DownloadProgress} from 'react-native-code-push';
import CodePushDialog from './CodePushDialog';

interface State {
  updateVisible: boolean;
  description?: string;
}

export const withCodePushHOC = (CodePushComponent: React.ElementType) => {
  return class CodePushApp extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        updateVisible: false,
        description: '',
      };
    }

    async componentDidMount() {
      CodePush.disallowRestart();
    }

    async codePushStatusDidChange(syncStatus: CodePush.SyncStatus) {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('[CodePush] CHECKING_FOR_UPDATE.');
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          console.log('[CodePush] AWAITING_USER_ACTION.');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('[CodePush] DOWNLOADING_PACKAGE.');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          console.log('[CodePush] INSTALLING_UPDATE.');
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          console.log('[CodePush] UP_TO_DATE.');
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          console.log('[CodePush] UPDATE_IGNORED.');
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          console.log('[CodePush] UPDATE_INSTALLED');
          const update = await CodePush.getUpdateMetadata(
            CodePush.UpdateState.LATEST,
          );
          this.setState({
            updateVisible: true,
            description: update?.description,
          });
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          console.log('[CodePush] UNKNOWN_ERROR');
          break;
      }
    }

    codePushDownloadDidProgress(download: DownloadProgress) {
      // do something
    }

    onRestart = () => {
      this.setState({updateVisible: false});
      CodePush.allowRestart();
    };

    onHideModal = () => {
      this.setState({updateVisible: false});
    };

    render() {
      return (
        <React.Fragment>
          <CodePushComponent />
          <CodePushDialog
            visible={this.state.updateVisible}
            onRestart={this.onRestart}
            onHideModal={this.onHideModal}
            messages={this.state.description?.split('\n')}
          />
        </React.Fragment>
      );
    }
  };
};
