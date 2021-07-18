import React, { useEffect, useState } from 'react';
import './App.css';
import WaitForNetwork from './WaitForNetwork';
import { Layout, Menu } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import Title from 'antd/lib/typography/Title';
import ServerSearch from './ServerSearch';
import { WizardComponent, WizardState, WizardStateProps } from './WizardState';
import { MenuInfo } from 'rc-menu/lib/interface';
import produce from 'immer';
import ConfigureServerConnection from './ConfigureServerConnection';
import WaitForConnection from './WaitForConnection';
import Login from './Login';
import ConfigRestore from './ConfigRestore';
import ReviewRestore from './ReviewRestore';
import Restoring from './Restoring';

export const useMountEffect = (fun : React.EffectCallback) => useEffect(fun, []);
export const sleep = (m: number) => new Promise(r => setTimeout(r, m))

function CurrentContent(args: WizardComponent) {
  switch(args.props.state)
  {
    case WizardState.WaitForNetwork:
      return <WaitForNetwork props={args.props} update={args.update} />;
    case WizardState.ServerSearch:
      return <ServerSearch props={args.props} update={args.update} />;
    case WizardState.ConfigureServerConnectionDetails:
      return <ConfigureServerConnection props={args.props} update={args.update} />;
    case WizardState.WaitForConnection:
      return <WaitForConnection props={args.props} update={args.update} />;
    case WizardState.LoginToServer:
      return <Login props={args.props} update={args.update} />;
    case WizardState.ConfigRestore:
      return <ConfigRestore props={args.props} update={args.update} />;
    case WizardState.ReviewRestore:
      return <ReviewRestore props={args.props} update={args.update} />;
    case WizardState.Restoring:
      return <Restoring props={args.props} update={args.update} />;
    default:
      return (<div>Unknown wizard state</div>);
  }
}

function App() {
  const [wizard_state, setWizardState] = useState<WizardStateProps>({
    state: WizardState.ConfigureServerConnectionDetails,
    max_state: WizardState.ConfigureServerConnectionDetails,
    serverFound: false,
    internetServer: false,
    serverUrl: "",
    serverAuthkey: "",
    serverProxy: "",
    username: "",
    password: "",
    restoreToDisk: {
      maj_min: "",
      model: "",
      path: "",
      size: "",
      type: ""
    },
    restoreImage: {
      clientname: "",
      id: 0,
      letter: "",
      time_s: 0,
      time_str: ""
    },
    disableMenu: false
  });

  const menuSelected = () => {
    return [wizard_state.state.toString()];
  }

  const menuClick = (menuInfo: MenuInfo) => {
    if(parseInt(menuInfo.key)===wizard_state.state)
      return;

    setWizardState(produce( draft => {
      draft.state = parseInt(menuInfo.key);
      console.log("New wizard state: "+WizardState[draft.state]);
    }));
  }

  const menuItemDisabled = (menu_state: WizardState) => {
    if(wizard_state.disableMenu)
      return true;

    if(menu_state>wizard_state.max_state)
      return true;

    return false;
  }

  return (
    <Layout style={{height: "100%"}}>
      <Header>
        <div className="logo" />
        <Title style={{color: 'white', textAlign: 'center'}}>UrBackup Image Restore</Title>
      </Header>
      <Layout hasSider={true}>
        <Sider width={200} className="site-layout-background">
          <Menu theme="dark" mode="inline" selectedKeys={menuSelected()}
            style={{ height: '100%', borderRight: 0 }} 
            onClick={menuClick}>
            <Menu.Item key={"" + WizardState.WaitForNetwork} disabled={menuItemDisabled(WizardState.WaitForNetwork)}>Waiting for network</Menu.Item>
            <Menu.Item key={"" + WizardState.ServerSearch} disabled={menuItemDisabled(WizardState.ServerSearch)}>Search for server</Menu.Item>
            <Menu.Item key={"" + WizardState.ConfigureServerConnectionDetails} disabled={menuItemDisabled(WizardState.ConfigureServerConnectionDetails)}>Configure server connection</Menu.Item>
            <Menu.Item key={"" + WizardState.WaitForConnection} disabled={menuItemDisabled(WizardState.WaitForConnection)}>Wait for connection</Menu.Item>
            <Menu.Item key={"" + WizardState.LoginToServer} disabled={menuItemDisabled(WizardState.LoginToServer)}>Login to server</Menu.Item>
            <Menu.Item key={"" + WizardState.ConfigRestore} disabled={menuItemDisabled(WizardState.ConfigRestore)}>Configure restore</Menu.Item>
            <Menu.Item key={"" + WizardState.ReviewRestore} disabled={menuItemDisabled(WizardState.ReviewRestore)}>Review restore</Menu.Item>
            <Menu.Item key={"" + WizardState.Restoring} disabled={menuItemDisabled(WizardState.Restoring)}>Restore</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>

          <Content className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
            <CurrentContent props={wizard_state} update={setWizardState} /> 
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;