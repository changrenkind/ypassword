import Taro, {useEffect} from '@tarojs/taro'
import { CSSProperties } from 'react'
import { View, Text } from '@tarojs/components'
import MyIcon from 'components/myIcon'
import Exception from 'components/Exception'
import classnames from 'classnames'
import './index.scss'

export interface PaginationProviderProps {
  loading: boolean,
  errMsg?: string,
  increasing?: boolean,
  lastPage?: boolean,
  style?: CSSProperties,
  className?: string,
  children?: any
}

export default function PaginationProvider(props: PaginationProviderProps) {
  const { loading, errMsg, increasing, lastPage, style, className, children } = props;

  useEffect(() => {
    if (loading) {
      Taro.showLoading({title: '加载中...'})
    } else {
      Taro.hideLoading();
    }
  }, [loading])

  if (errMsg) {
    return <Exception type="noData" message={errMsg} />
  }

  const cls = classnames('pagination_provider', {
    // @ts-ignore
    [className]: !!className
  })

  return (
    <View className={cls} style={style}>
      {children}
      {!loading && increasing && !lastPage && (
        <View className="pagination_bottom">
          <MyIcon className="loading" name="settings" size={26} spin />
          <Text className="desc">数据加载中...</Text>
        </View>
      )}
      {!loading && lastPage && (
      <View className="pagination_bottom">
        <Text className="desc">已经到底啦</Text>
      </View>
      )}
    </View>
  )
}

PaginationProvider.options = {
  addGlobalClass: true
};