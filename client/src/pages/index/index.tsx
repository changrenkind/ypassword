import Taro, { useState, useEffect, Config, usePullDownRefresh, useReachBottom, showShareMenu, useDidShow } from "@tarojs/taro";
import RealTabBar from "components/tabBar";
import { useSelector, useDispatch } from "@tarojs/redux";
import { View } from "@tarojs/components";

import Home from "pages/Home";
import SwitchLock from "pages/SwitchLock";
import Feeds from 'pages/Feeds'
import Profile from "pages/Profile";

import PlaceholderView from 'components/PlaceholderView';
import { FeedsState } from 'pages/Feeds/model';
import "./index.scss";

export const titles = {
  0: '发现',
  1: '专栏',
  2: '账户',
  3: '我的'
}

export default function Layout() {
  const [current, setCurrent] = useState(0);
  const [initial, setInitial] = useState(true);

  showShareMenu({
    withShareTicket: true
  })
  
  const dispatch = useDispatch();
  const feeds = useSelector<any, FeedsState>(state => state.feeds)
  const { list } = feeds

  useEffect(() => {
    dispatch({ type: 'global/login' })
  }, []);

  usePullDownRefresh(() => {
    if (current == 0) {
      dispatch({
        type: 'book/fetchList',
        payload: { current: 1 }
      })
    }
    if (current == 1) {
      dispatch({
        type: 'feeds/fetchList',
        payload: { current: 1 }
      })
    }
    
    if (current == 3) {
      dispatch({ type: 'global/login' })
    }
  })

  useReachBottom(() => {
    if (!list.pagination.lastPage) {
      dispatch({
        type: 'feeds/fetchList',
        payload: { current: list.pagination.current + 1 }
      })
    }
  })

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: titles[current] });
  }, [current]);
  
  if (current === 0) {
    Taro.setNavigationBarColor({backgroundColor: '#ededed', frontColor: '#000000'})
    Taro.setBackgroundColor({backgroundColor: '#ededed', backgroundColorTop: '#ededed', backgroundColorBottom: '#ededed'})
  }
  if (current === 1) {
    Taro.setNavigationBarColor({backgroundColor: '#ededed', frontColor: '#000000'})
    Taro.setBackgroundColor({backgroundColor: '#ededed', backgroundColorBottom: '#ededed', backgroundColorTop: '#ededed'})
  }
  if (current === 2 || current === 3) {
    Taro.setNavigationBarColor({ backgroundColor: '#FFF', frontColor: '#000000' })
    Taro.setBackgroundColor({backgroundColor: '#FFF', backgroundColorBottom: '#FFF', backgroundColorTop: '#FFF'})
  }
  
  return (
    <View className="container">
      <View style={{flex: 1, overflow: 'scroll'}}>
        {current === 0 && <Home />}
        {current === 1 && <Feeds />}
        {current === 2 && <SwitchLock />}
        {current === 3 && <Profile />}
      </View>
    
      <View style={{height: '60Px', background: 'rgba(0, 0, 0, 0)'}} />
      <PlaceholderView />
      
      <RealTabBar
        onClick={(current: number) => { setCurrent(current); setInitial(false); }}
        initial={initial}
        current={current}
        backgroundColor="#ededed"
        color="#999"
        tintColor="#000"
        fixed
        tabList={[
          {text: "发现", iconPath: "home"},
          {text: "专栏", iconPath: "RectangleCopy62"},
          {text: "账户", iconPath: "RectangleCopy162"},
          {text: "我的", iconPath: "RectangleCopy49"}
        ]}
      />
    </View>
  );
}

Layout.config = {
  navigationBarTitleText: "",
  navigationBarBackgroundColor: "#FFFFFF",
  navigationBarTextStyle: "black",
  enablePullDownRefresh: true
} as Config;
