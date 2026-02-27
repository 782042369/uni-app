# 数据模型

> 基于「马郎综管平台产品设计文档（移动端）」的前端数据模型定义

## 目录

- [首页数据模型](#首页数据模型)
- [安全环保中心数据模型](#安全环保中心数据模型)
- [生产运营数据模型](#生产运营数据模型)
- [知识库数据模型](#知识库数据模型)
- [我的数据模型](#我的数据模型)
- [通用数据模型](#通用数据模型)

---

## 首页数据模型

### 核心数据看板

```typescript
// 生产核心数据
interface ProductionData {
  coalOutput: number        // 今日采煤量（万吨）
  strippingVolume: number   // 今日剥离量（万立方米）
  transportVolume: number   // 运输量（万吨）
}

// 安全核心数据
interface SafetyData {
  unhandledRisks: number    // 未处理风险（项）
  unhandledHazards: number  // 未处理隐患（项）
}

// 设备核心数据
interface EquipmentData {
  onlineCount: number       // 在线设备（台）
  faultCount: number        // 故障设备（台）
}

// 环保核心数据
interface EnvironmentalData {
  waterQuality: 'compliant' | 'abnormal'     // 水质：达标/异常
  soilQuality: 'compliant' | 'abnormal'      // 土壤：达标/异常
  solidWaste: 'compliant' | 'abnormal'       // 固废：合规/异常
  atmosphere: 'compliant' | 'abnormal'       // 大气：达标/异常
}

// 产存销核心数据
interface SalesData {
  todayOutput: number       // 今日产量（万吨）
  currentStock: number      // 当前库存（万吨）
  todaySales: number        // 今日销量（万吨）
}

// 核心数据看板
interface CoreDataDashboard {
  production: ProductionData
  safety: SafetyData
  equipment: EquipmentData
  environmental: EnvironmentalData
  sales: SalesData
  updateTime: string        // 数据更新时间
}
```

### 待办提醒

```typescript
// 待办类型
type TodoType = '隐患整改' | '预警处置' | '其他'

// 待办状态
type TodoStatus = 'pending' | 'processing' | 'completed'

// 待办事项
interface TodoItem {
  id: string
  type: TodoType
  content: string           // 不超过15字
  deadline: string          // 如"今日18:00前"
  status: TodoStatus
  link: string              // 跳转链接
}

// 待办列表
interface TodoList {
  items: TodoItem[]         // 最多显示3条
  total: number             // 总数量
  moreLink: string          // "更多待办"链接
}
```

### 常用功能

```typescript
// 功能项
interface QuickAction {
  id: string
  name: string              // 不超过6字
  icon: string              // 图标名称
  path: string              // 跳转路径
  badge?: number            // 角标数量（可选）
}

// 常用功能列表
interface QuickActionList {
  items: QuickAction[]      // 9个常用功能
}
```

---

## 安全环保中心数据模型

### 安全监测

```typescript
// 监测类型
type MonitorType =
  | 'person'              // 人员监测
  | 'vehicle'             // 车辆监测
  | 'slope'               // 边坡监测
  | 'spontaneous'         // 煤层防自燃
  | 'drainage'            // 防排水
  | 'system'              // 生产系统安全监测
  | 'video'               // AI视频监测

// 监测点状态
type MonitorStatus = 'normal' | 'warning' | 'error'

// 监测点
interface MonitorPoint {
  id: string
  name: string
  type: MonitorType
  status: MonitorStatus
  position: { lat: number, lng: number }
  data: Record<string, any>
  alertMessage?: string    // 异常说明
}

// 监测列表
interface MonitorList {
  points: MonitorPoint[]
  abnormalCount: number     // 异常数量
  filterType: MonitorType   // 当前筛选类型
}
```

### 预警处置

```typescript
// 预警级别
type AlertLevel = 'minor' | 'moderate' | 'major' | 'critical'

// 预警类型
type AlertType = 'safety' | 'environmental'

// 处置状态
type AlertStatus = 'pending' | 'processing' | 'completed'

// 预警信息
interface Alert {
  id: string
  level: AlertLevel
  type: AlertType
  content: string
  time: string
  location: string
  status: AlertStatus
  assignee?: string         // 处置人
  deadline?: string         // 截止时间
  photos?: string[]         // 现场照片
}

// 预警列表
interface AlertList {
  items: Alert[]
  filter: {
    level?: AlertLevel
    type?: AlertType
    status?: AlertStatus
  }
}

// 预警详情
interface AlertDetail extends Alert {
  indicators: Record<string, any>  // 预警指标
  abnormalData: Record<string, any> // 异常数据
  history: Alert[]                 // 处置历史
}
```

### 风险管控

```typescript
// 风险等级
type RiskLevel = 'major' | 'large' | 'general' | 'low'

// 风险信息
interface Risk {
  id: string
  name: string
  level: RiskLevel
  manager: string          // 管控责任人
  measures: string[]       // 管控措施
  location: string
  status: 'active' | 'controlled' | 'eliminated'
  checkRecords: RiskCheckRecord[]
}

// 检查记录
interface RiskCheckRecord {
  id: string
  checker: string
  checkTime: string
  result: string
  photos?: string[]
}

// 风险列表
interface RiskList {
  items: Risk[]
  filter: {
    level?: RiskLevel
  }
}
```

### 应急通讯录

```typescript
// 联系人分组
type ContactGroup =
  | 'command'             // 应急指挥组
  | 'safety'              // 安全管理部
  | 'medical'             // 医疗急救
  | 'fire'                // 消防救援
  | 'maintenance'         // 设备维修
  | 'external'            // 外部救援

// 联系人
interface Contact {
  id: string
  name: string
  department: string
  position: string
  phone: string
  group: ContactGroup
  avatar?: string
}

// 通讯录
interface ContactList {
  groups: ContactGroup[]
  contacts: Contact[]
  emergencyPhone: string   // 紧急呼叫电话
}
```

### 隐患排查

```typescript
// 隐患等级
type HazardLevel = 'major' | 'large' | 'general'

// 整改状态
type HazardStatus = 'pending' | 'rectifying' | 'rectified' | 'rejected'

// 隐患信息
interface Hazard {
  id: string
  name: string
  level: HazardLevel
  reporter: string         // 排查人
  reportTime: string
  description: string
  location: string
  photos?: string[]
  status: HazardStatus
  assignee?: string        // 整改责任人
  deadline?: string        // 整改截止时间
  rectification?: {
    measures: string
    photos?: string[]
    submitTime: string
  }
  verification?: {
    result: 'passed' | 'failed'
    comment: string
    verifier: string
    verifyTime: string
  }
}

// 隐患列表
interface HazardList {
  items: Hazard[]
  filter: {
    level?: HazardLevel
    status?: HazardStatus
    area?: string
  }
  statistics: {
    byLevel: Record<HazardLevel, number>
    byStatus: Record<HazardStatus, number>
  }
}
```

### 环保监测

```typescript
// 监测类型
type EnvironmentalType =
  | 'water'               // 水质监测
  | 'soil'                // 土壤监测
  | 'waste'               // 固废监测
  | 'air'                 // 大气监测
  | 'noise'               // 噪声监测

// 监测指标
interface EnvironmentalIndicator {
  name: string            // 指标名称
  value: number           // 当前数值
  unit: string            // 单位
  standard: number        // 标准值
  status: 'compliant' | 'abnormal'
  trend?: number[]        // 趋势数据
}

// 监测数据
interface EnvironmentalData {
  type: EnvironmentalType
  indicators: EnvironmentalIndicator[]
  monitorPoints: {
    id: string
    name: string
    position: { lat: number, lng: number }
  }[]
  updateTime: string
}

// 环保监测汇总
interface EnvironmentalSummary {
  water: EnvironmentalData
  soil: EnvironmentalData
  waste: EnvironmentalData
  air: EnvironmentalData
  noise: EnvironmentalData
}
```

---

## 生产运营数据模型

### 生产监控

```typescript
// 监控类型
type ProductionMonitorType = 'vehicle' | 'autonomous'

// 车辆/设备状态
type VehicleStatus = 'normal' | 'fault' | 'idle'

// 车辆信息
interface Vehicle {
  id: string
  number: string          // 设备编号
  type: string            // 设备类型（挖掘机、装载机、运输车等）
  status: VehicleStatus
  position: { lat: number, lng: number }
  speed?: number          // 速度
  workArea: string        // 作业区域
  driver?: string         // 驾驶员信息
  workTime?: number       // 工作时长
  trajectory?: { lat: number, lng: number }[]  // 历史轨迹
}

// 无人驾驶车辆
interface AutonomousVehicle extends Vehicle {
  task: string            // 作业任务（如"运输原煤"、"排土"）
  route: { lat: number, lng: number }[]  // 路线规划
}

// 生产监控数据
interface ProductionMonitor {
  vehicles: Vehicle[]
  autonomousVehicles: AutonomousVehicle[]
  filterType: ProductionMonitorType
  faultCount: number
}
```

### 综合自动化

```typescript
// 自动化系统类型
type AutomationSystemType =
  | 'crushing'           // 破碎站无人值守
  | 'power'              // 电力系统
  | 'transport'          // 运输系统自动化
  | 'dump'               // 排土系统自动化

// 系统状态
type SystemStatus = 'normal' | 'fault' | 'standby'

// 自动化系统
interface AutomationSystem {
  id: string
  name: string
  type: AutomationSystemType
  status: SystemStatus
  parameters: Record<string, any>
  manager: string         // 责任人
  faultRecords?: FaultRecord[]
}

// 故障记录
interface FaultRecord {
  id: string
  time: string
  description: string
  resolved: boolean
}

// 综合自动化数据
interface AutomationData {
  systems: AutomationSystem[]
  filterType: AutomationSystemType
}
```

### 生产报表

```typescript
// 报表类型
type ReportType =
  | 'mining'             // 采剥报表
  | 'transport'          // 运输报表
  | 'dump'               // 排土报表
  | 'summary'            // 产量汇总报表

// 时间筛选
type TimeFilter = 'today' | 'yesterday' | 'week' | 'month' | 'custom'

// 采剥报表
interface MiningReport {
  area: string           // 作业区域
  coalOutput: number     // 采煤量
  strippingVolume: number // 剥离量
  strippingRatio: number // 采剥比
  workers: number        // 作业人员
  equipment: number      // 设备数量
}

// 运输报表
interface TransportReport {
  route: string          // 运输线路
  volume: number         // 运输量
  times: number          // 运输次数
  turnoverRate: number   // 车辆周转率
  duration: number       // 运输时长
}

// 排土报表
interface DumpReport {
  area: string           // 排土场
  volume: number         // 排土量
  efficiency: number     // 排土效率
  equipment: number      // 作业设备
}

// 产量汇总
interface OutputSummary {
  today: {
    coalOutput: number
    strippingVolume: number
    transportVolume: number
  }
  yesterday: {
    coalOutput: number
    strippingVolume: number
    transportVolume: number
  }
  month: {
    coalOutput: number
    strippingVolume: number
    transportVolume: number
  }
  year: {
    coalOutput: number
    strippingVolume: number
    transportVolume: number
  }
}

// 生产报表数据
interface ProductionReport {
  type: ReportType
  timeFilter: TimeFilter
  data: MiningReport | TransportReport | DumpReport | OutputSummary
  chartData?: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
    }[]
  }
}
```

### 生产视频

```typescript
// 视频区域
type VideoArea =
  | 'workface'           // 作业面
  | 'crushing'           // 破碎站
  | 'transport'          // 运输线路
  | 'dump'               // 排土场
  | 'office'             // 办公区

// 摄像头
interface Camera {
  id: string
  number: string         // 摄像头编号
  name: string
  area: VideoArea
  thumbnail: string      // 实时画面缩略图
  online: boolean
  streamUrl: string      // 视频流地址
}

// 视频播放参数
interface VideoPlayOptions {
  autoplay?: boolean
  fullscreen?: boolean
  speed?: 1.0 | 1.5 | 2.0
  quality?: 'high' | 'medium' | 'low'
}

// 生产视频数据
interface ProductionVideo {
  cameras: Camera[]
  filterArea: VideoArea
  currentCamera?: Camera
  playOptions: VideoPlayOptions
  historyVideos?: {
    id: string
    time: string
    url: string
  }[]
}
```

### 产运销

```typescript
// 数据类型
type SalesDataType = 'output' | 'sales' | 'stock'

// 产量数据
interface OutputData {
  today: {
    coalOutput: number
    strippingVolume: number
  }
  yesterday: {
    coalOutput: number
    strippingVolume: number
  }
  month: {
    coalOutput: number
    strippingVolume: number
  }
  year: {
    coalOutput: number
    strippingVolume: number
  }
  byArea: {
    area: string
    coalOutput: number
    strippingVolume: number
  }[]
  dailyTrend: {
    date: string
    output: number
  }[]
}

// 销售数据
interface SalesData {
  today: {
    volume: number
    amount: number
  }
  yesterday: {
    volume: number
    amount: number
  }
  month: {
    volume: number
    amount: number
  }
  year: {
    volume: number
    amount: number
  }
  byCustomer: {
    customer: string
    volume: number
    amount: number
    sales: {
      time: string
      volume: number
    }[]
  }[]
}

// 库存数据
interface StockData {
  current: {
    coal: number          // 原煤库存
    waste: number         // 剥离物库存
  }
  byArea: {
    area: string          // 库存区域（煤场、排土场）
    coal: number
    waste: number
  }[]
  trend: {
    date: string
    coal: number
    waste: number
  }[]
  alert?: {
    type: 'excess' | 'shortage'
    message: string
  }
}

// 产运销数据
interface SalesProductionData {
  type: SalesDataType
  output: OutputData
  sales: SalesData
  stock: StockData
}
```

---

## 知识库数据模型

### 资料分类

```typescript
// 资料类型
type MaterialType =
  | 'safety'              // 安全技术
  | 'equipment'           // 设备操作
  | 'environmental'       // 环保规范
  | 'process'             // 生产工艺
  | 'emergency'           // 应急处置

// 资料信息
interface Material {
  id: string
  title: string
  type: MaterialType
  publishTime: string
  viewCount: number
  content: string
  images?: string[]
  attachments?: {
    name: string
    url: string
  }[]
}

// 资料列表
interface MaterialList {
  items: Material[]
  filterType?: MaterialType
  total: number
}

// 资料详情
interface MaterialDetail extends Material {
  isFavorited: boolean
  relatedMaterials?: Material[]
}
```

### 搜索

```typescript
// 搜索结果
interface SearchResult {
  id: string
  title: string
  type: MaterialType
  highlight: string      // 高亮片段
}

// 搜索响应
interface SearchResponse {
  results: SearchResult[]
  total: number
  keyword: string
}
```

---

## 我的数据模型

### 用户信息

```typescript
// 用户信息
interface UserInfo {
  id: string
  name: string
  avatar: string
  position: string        // 岗位
  department: string      // 部门
  status: 'online' | 'offline'
  phone?: string
  email?: string
}
```

### 消息通知

```typescript
// 消息类型
type MessageType = 'system' | 'warning' | 'todo'

// 消息信息
interface Message {
  id: string
  type: MessageType
  title: string
  content: string
  time: string
  read: boolean
  link?: string
}

// 消息列表
interface MessageList {
  items: Message[]
  unreadCount: number
}
```

### 我的待办

```typescript
// 待办事项
interface MyTodo {
  id: string
  type: string
  content: string
  deadline: string
  status: 'pending' | 'processing' | 'completed'
  link: string
}

// 我的待办列表
interface MyTodoList {
  items: MyTodo[]
  byType: Record<string, MyTodo[]>
}
```

### 我的收藏

```typescript
// 收藏项
interface FavoriteItem {
  id: string
  type: 'material' | 'other'
  title: string
  addTime: string
  link: string
}

// 收藏列表
interface FavoriteList {
  items: FavoriteItem[]
}
```

### 账号设置

```typescript
// 账号设置
interface AccountSettings {
  userId: string
  phone: string
  notificationEnabled: boolean
  autoLogin: boolean
}

// 修改密码
interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}
```

### 意见反馈

```typescript
// 反馈信息
interface Feedback {
  id: string
  userId: string
  content: string
  images?: string[]
  submitTime: string
  status: 'pending' | 'processing' | 'resolved'
}

// 提交反馈
interface SubmitFeedbackRequest {
  content: string
  images?: string[]
}
```

---

## 通用数据模型

### 分页

```typescript
// 分页参数
interface PageParams {
  page: number
  pageSize: number
}

// 分页响应
interface PageResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  isLastPage: boolean
}
```

### API 响应

```typescript
// API 响应
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 分页 API 响应
interface ApiPageResponse<T> {
  code: number
  message: string
  data: {
    list: T[]
    total: number
    page: number
    pageSize: number
  }
  timestamp: number
}
```

### 位置信息

```typescript
// 位置信息
interface Location {
  latitude: number
  longitude: number
  address?: string
}

// 地图标记
interface MapMarker {
  id: string
  position: Location
  title: string
  status?: 'normal' | 'warning' | 'error'
}
```

### 文件上传

```typescript
// 上传文件
interface UploadFile {
  id: string
  name: string
  url: string
  size: number
  type: string
}

// 上传响应
interface UploadResponse {
  file: UploadFile
  url: string
}
```

---

## 数据模型使用示例

### 在组件中使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CoreDataDashboard } from '@/types/models'

const dashboard = ref<CoreDataDashboard | null>(null)

onMounted(async () => {
  const response = await api.getCoreData()
  dashboard.value = response.data
})
</script>
```

### 类型定义文件

```typescript
// src/types/models/index.ts
export * from './home'
export * from './safety'
export * from './production'
export * from './knowledge'
export * from './profile'
export * from './common'
```

---

## 参考资料

- 产品设计文档：@docs/马郎综管平台产品设计文档（移动端）.docx
- API 层文档：@.claude/skills/alova-api-module/SKILL.md

---

最后更新：2026-02-27
