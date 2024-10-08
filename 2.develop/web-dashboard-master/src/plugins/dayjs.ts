import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(advancedFormat)

dayjs.extend(relativeTime) // 如果使用到计算相对时间差需要添加此插件，如倒计时
export default dayjs
