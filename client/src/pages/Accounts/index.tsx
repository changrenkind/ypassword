import Taro, { useState } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';
import AccountList from './components/List';
import { useSelector } from '@tarojs/redux';
import { AccountState } from './model';
import "./index.scss";
import MyIcon from 'components/myIcon';

export default function Index() {
  const [searchText, setSearchText] = useState('');
  const accounts = useSelector<any, AccountState>(state => state.account);

  return (
    <View className="accounts_container">
      <View className="search_bar">
        <Input className="search" placeholder="输入标题搜索" onInput={(e) => setSearchText(e.detail.value)} />
        <Button className="btn async" onClick={() => Taro.navigateTo({url: '/pages/Accounts/subpages/Editor/index'})}>
          <MyIcon name="allocat" size={20} />
        </Button>
        <Button 
          className="btn add"
          onClick={() => Taro.navigateTo({url: '/pages/Accounts/subpages/Editor/index'})}
        ><MyIcon name="add-circle" size={20} /></Button>
      </View>

      <AccountList list={accounts.accounts} />
    </View>
  );
}
