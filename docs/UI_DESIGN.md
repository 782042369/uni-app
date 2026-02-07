# 工业监控 App UI/UX 设计方案 (Industrial Monitor Pro)

本方案专为工业监控场景设计，基于 **uni-app + wot-design-uni + UnoCSS** 框架，旨在提供一个专业、高可靠性且数据驱动的移动端监控体验。

## 1. 设计原则 (Design Principles)

*   **数据优先 (Data-First):** 核心指标必须清晰、实时，减少视觉干扰。
*   **高对比度 (High Contrast):** 采用工业深色模式，确保在昏暗或强光工业环境下均可快速阅读。
*   **状态语义化 (Semantic Status):** 严格使用颜色区分状态（绿色-正常，琥珀色-警告，红色-紧急）。
*   **操作安全 (Operational Safety):** 关键操作（如停机、复位）需有二次确认和明确的触觉反馈。

## 2. 视觉规范 (Visual Specifications)

### 2.1 颜色系统 (Color Palette)
采用 **OLED 深色主题** 以降低能耗并减少长期盯着屏幕的视觉疲劳。

| 类型 | 颜色值 | 用途 |
| :--- | :--- | :--- |
| **背景 (Background)** | `#000000` | 页面基础背景 (OLED Black) |
| **容器 (Surface)** | `#121212` | 卡片、列表项背景 |
| **主色 (Primary)** | `#3B82F6` | 交互元素、正常趋势线 (Blue 500) |
| **成功 (Success)** | `#10B981` | 运行中、正常状态 |
| **警告 (Warning)** | `#F59E0B` | 预警、待机状态 |
| **危险 (Danger)** | `#EF4444` | 故障、报警状态 |
| **文本 (Primary Text)** | `#F8FAFC` | 核心数据、标题 |
| **文本 (Muted Text)** | `#94A3B8` | 标签、辅助说明 |

### 2.2 字体 (Typography)
*   **标题/数据:** `Fira Code` (等宽字体，确保数值变化时排版稳定)
*   **正文:** `Fira Sans` / 默认系统字体
*   **规范:**
    *   核心指标: 24px - 32px, Bold
    *   页面标题: 18px, Medium
    *   次要标签: 12px, Regular

## 3. 页面布局与架构 (Layout & Architecture)

### 3.1 核心页面规划
1.  **工作台 (Dashboard):** 实时状态概览、核心 KPI、当前活动报警。
2.  **设备监控 (Monitor):** 设备列表/矩阵、状态筛选、设备详情。
3.  **报警中心 (Alarms):** 实时报警列表、历史报警查询、确认/解除操作。
4.  **我的 (Profile):** 用户信息、设置、主题切换。

### 3.2 组件应用 (Wot UI Component Mapping)
*   **导航栏:** `wd-navbar` (固定顶部，集成状态提示)。
*   **标签栏:** `wd-tabbar` (底部主导航)。
*   **状态概览:** `wd-grid` + `wd-card` (展示设备在线率、故障数等)。
*   **报警提示:** `wd-notice-bar` (顶部滚动展示最新严重报警)。
*   **指标展示:** `wd-badge` (用于报警计数) + `wd-tag` (设备状态标识)。
*   **数据列表:** `wd-cell-group` + `wd-swipe-action` (侧滑快速处理报警)。
*   **加载反馈:** `wd-skeleton` (骨架屏优化首屏体验)。

## 4. 图表与可视化 (Data Visualization)

使用 `uni-echarts` 实现以下图表：

*   **实时趋势图 (Real-time Streaming):**
    *   类型: Streaming Area Chart (渐变填充)。
    *   用途: 电流、压力、温度等连续变化量。
    *   视觉: 主色线条 + 20% 透明度填充。
*   **状态占比 (Status Distribution):**
    *   类型: Donut Chart (环形图)。
    *   用途: 设备运行/待机/故障比例。
*   **预测分析 (Predictive Analytics):**
    *   类型: Line Chart + Confidence Band (带置信区间)。
    *   用途: 预测性维护、产量预估。

## 5. 交互与体验 (UX Guidelines)

*   **实时性反馈:** 
    *   数值变化时使用微光闪烁 (`wd-transition`) 提醒。
    *   报警触发时使用 Haptic Feedback (触觉反馈)。
*   **无障碍 (Accessibility):**
    *   图标配合文字使用，不单独使用图标表达状态。
    *   确保颜色对比度符合 WCAG AAA 标准。
*   **弱网处理:**
    *   所有 API 请求集成全局 Loading (`wd-loading`)。
    *   数据断连时，数值显示为灰色并在显著位置提示“离线”。

## 6. 实施建议 (Implementation Recommendations)



### 6.1 核心组件升级 (Wot UI Upgrade)

将现有的原生或自定义组件升级为 `wot-design-uni` 标准组件，以获得更好的平台兼容性和交互体验：



*   **区域选择器:** 将原生 `picker` 升级为 `wd-picker`。

    ```vue

    <wd-picker :columns="areas" v-model="selectedArea" label="监测区域" />

    ```

*   **报警提示:** 在首页顶部使用 `wd-notice-bar` 代替静态卡片，用于展示滚动报警。

    ```vue

    <wd-notice-bar 

      text="警告：1号矿井东区 CO 浓度接近阈值，请注意监控。" 

      prefix="i-carbon-warning" 

      type="warning" 

    />

    ```

*   **状态汇总:** 使用 `wd-grid` 统一展示核心指标。

    ```vue

    <wd-grid :column="2" border>

      <wd-grid-item v-for="metric in keyMetrics" :key="metric.label">

        <view class="tech-card">...</view>

      </wd-grid-item>

    </wd-grid>

    ```



### 6.2 实时图表集成 (ECharts)

建议在 `Trend` 模块中集成 `uni-echarts`，配置如下以匹配工业风格：



```ts

// ECharts 配置示例

const option = {

  backgroundColor: 'transparent',

  color: ['#3B82F6'],

  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },

  xAxis: { type: 'category', boundaryGap: false, axisLine: { lineStyle: { color: '#1E3A8A' } } },

  yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1E3A8A', opacity: 0.2 } } },

  series: [{

    type: 'line',

    smooth: true,

    areaStyle: {

      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [

        { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },

        { offset: 1, color: 'rgba(59, 130, 246, 0)' }

      ])

    }

  }]

}

```



### 6.3 UnoCSS 扩展建议

在 `uno.config.ts` 中保持现有的 `tech-*` 快捷方式，并考虑添加以下以支持更深层的 OLED 黑：



```ts

// uno.config.ts 建议补充

theme: {

  colors: {

    'oled-black': '#000000',

    'oled-surface': '#0A0A0A',

    'alarm-red': '#FF5252',

  }

}

```



## 7. 预交付清单 (Pre-Delivery Checklist)

- [ ] 所有实时数据变化必须有平滑的过渡动画。

- [ ] 确保在 `App.vue` 中正确配置 `wd-config-provider` 的深色模式。

- [ ] 检查所有交互元素的点击热区，确保不小于 44x44rpx。

- [ ] 验证在不同屏幕尺寸（如小屏 Android 或 折叠屏）下的自适应表现。
