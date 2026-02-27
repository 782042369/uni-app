/*
 * @Author: AI Assistant
 * @Date: 2026-02-27
 * @LastEditTime: 2026-02-27
 * @LastEditors: AI Assistant
 * @Description: 知识库模块 - Mock 数据
 * @FilePath: /uni-app/src/api/mock/modules/knowledge.ts
 */
import { defineMock } from '@alova/mock'

// 资料分类枚举
export enum KnowledgeCategory {
  SAFETY_TECH = 'safety_tech', // 安全技术
  EQUIPMENT_OPERATION = 'equipment_operation', // 设备操作
  ENVIRONMENTAL = 'environmental', // 环保规范
  PRODUCTION_PROCESS = 'production_process', // 生产工艺
  EMERGENCY_RESPONSE = 'emergency_response', // 应急处置
}

// 资料分类显示名称映射
export const CATEGORY_NAMES: Record<KnowledgeCategory, string> = {
  [KnowledgeCategory.SAFETY_TECH]: '安全技术',
  [KnowledgeCategory.EQUIPMENT_OPERATION]: '设备操作',
  [KnowledgeCategory.ENVIRONMENTAL]: '环保规范',
  [KnowledgeCategory.PRODUCTION_PROCESS]: '生产工艺',
  [KnowledgeCategory.EMERGENCY_RESPONSE]: '应急处置',
}

// 资料类型枚举
export enum KnowledgeType {
  DOCUMENT = 'document', // 文档
  VIDEO = 'video', // 视频
  IMAGE = 'image', // 图片
  MANUAL = 'manual', // 手册
  REGULATION = 'regulation', // 规章制度
}

// 资料类型显示名称映射
export const TYPE_NAMES: Record<KnowledgeType, string> = {
  [KnowledgeType.DOCUMENT]: '文档',
  [KnowledgeType.VIDEO]: '视频',
  [KnowledgeType.IMAGE]: '图片',
  [KnowledgeType.MANUAL]: '手册',
  [KnowledgeType.REGULATION]: '规章制度',
}

// 知识库资料接口
export interface KnowledgeItem {
  id: string
  title: string
  category: KnowledgeCategory
  type: KnowledgeType
  publishTime: string
  viewCount: number
  author: string
  summary: string
  content: string
  tags: string[]
  fileUrl?: string
  fileSize?: string
  coverImage?: string
  isFavorite?: boolean
}

// 生成模拟的知识库数据
function generateKnowledgeData(): KnowledgeItem[] {
  const knowledgeList: KnowledgeItem[] = [
    // 安全技术类 (4条)
    {
      id: 'K001',
      title: '露天矿山边坡稳定安全技术规范',
      category: KnowledgeCategory.SAFETY_TECH,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-01-15 09:30:00',
      viewCount: 1245,
      author: '安全管理部',
      summary: '详细介绍了露天矿山边坡稳定的安全技术要求，包括边坡角度、排水系统、监测预警等方面的规范标准。',
      content: '本规范适用于各类露天矿山的边坡设计、施工和运营管理...\n\n一、总则\n1.1 为保障露天矿山安全生产，防止边坡失稳事故...\n\n二、边坡设计要求\n2.1 边坡角度应根据岩性、地质构造等因素确定...',
      tags: ['边坡安全', '技术规范', '露天开采'],
      fileUrl: '/mock/files/slope-safety.pdf',
      fileSize: '2.5MB',
      coverImage: '/mock/images/knowledge-slope.jpg',
    },
    {
      id: 'K002',
      title: '矿山瓦斯防治技术手册',
      category: KnowledgeCategory.SAFETY_TECH,
      type: KnowledgeType.MANUAL,
      publishTime: '2024-02-10 14:20:00',
      viewCount: 892,
      author: '技术部',
      summary: '全面介绍矿山瓦斯的监测、预警和防治技术，包含各类传感器使用方法和应急处理流程。',
      content: '瓦斯是矿山安全的主要威胁之一，本手册详细说明了...\n\n第一章：瓦斯基础知识\n1.1 瓦斯的成分和性质\n1.2 瓦斯的危害\n\n第二章：瓦斯监测\n2.1 监测设备选型\n2.2 监测点布置...',
      tags: ['瓦斯', '防治技术', '监测预警'],
      fileUrl: '/mock/files/gas-prevention.pdf',
      fileSize: '5.8MB',
      coverImage: '/mock/images/knowledge-gas.jpg',
    },
    {
      id: 'K003',
      title: '矿山防排水系统操作指南',
      category: KnowledgeCategory.SAFETY_TECH,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-03-05 11:00:00',
      viewCount: 678,
      author: '设备管理部',
      summary: '讲解矿山防排水系统的日常操作、维护保养和故障处理，确保汛期安全。',
      content: '防排水系统是矿山安全的重要保障...\n\n一、系统组成\n1.1 排水泵站\n1.2 水仓\n1.3 管路系统\n\n二、日常操作\n2.1 启动前检查\n2.2 运行监控...',
      tags: ['防排水', '操作指南', '设备维护'],
      fileUrl: '/mock/files/drainage-guide.pdf',
      fileSize: '1.2MB',
    },
    {
      id: 'K004',
      title: '矿山作业人员安全防护装备规范',
      category: KnowledgeCategory.SAFETY_TECH,
      type: KnowledgeType.REGULATION,
      publishTime: '2024-01-20 16:45:00',
      viewCount: 1523,
      author: '安全管理部',
      summary: '规定了矿山作业人员必须配备的安全防护装备种类、标准和使用方法。',
      content: '为保障作业人员安全，必须配备以下防护装备...\n\n一、头部防护\n1.1 安全帽：必须符合GB2811标准\n\n二、呼吸防护\n2.1 防尘口罩\n2.2 自救器...',
      tags: ['安全防护', '装备规范', '人员安全'],
      fileUrl: '/mock/files/safety-equipment.pdf',
      fileSize: '3.1MB',
    },

    // 设备操作类 (4条)
    {
      id: 'K005',
      title: '单斗挖掘机操作规程',
      category: KnowledgeCategory.EQUIPMENT_OPERATION,
      type: KnowledgeType.MANUAL,
      publishTime: '2024-02-15 10:30:00',
      viewCount: 934,
      author: '设备管理部',
      summary: '详细说明单斗挖掘机的启动、作业、停机等全流程操作规程和注意事项。',
      content: '本规程适用于WK系列单斗挖掘机...\n\n一、启动前检查\n1.1 检查液压油位\n1.2 检查钢丝绳状况\n\n二、启动操作\n2.1 鸣笛示意\n2.2 启动发动机...',
      tags: ['挖掘机', '操作规程', '设备'],
      fileUrl: '/mock/files/excavator-manual.pdf',
      fileSize: '4.2MB',
      coverImage: '/mock/images/knowledge-excavator.jpg',
    },
    {
      id: 'K006',
      title: '矿用自卸卡车驾驶操作培训视频',
      category: KnowledgeCategory.EQUIPMENT_OPERATION,
      type: KnowledgeType.VIDEO,
      publishTime: '2024-03-01 08:00:00',
      viewCount: 2156,
      author: '培训中心',
      summary: '视频教程，涵盖矿用自卸卡车的驾驶技巧、安全操作和日常维护。',
      content: '视频时长：45分钟\n\n主要内容：\n1. 车辆介绍（5分钟）\n2. 启动检查（8分钟）\n3. 驾驶技巧（20分钟）\n4. 安全注意事项（7分钟）\n5. 维护保养（5分钟）',
      tags: ['自卸卡车', '驾驶培训', '视频教程'],
      fileUrl: '/mock/videos/truck-training.mp4',
      fileSize: '156MB',
      coverImage: '/mock/images/knowledge-truck.jpg',
    },
    {
      id: 'K007',
      title: '破碎站设备维护手册',
      category: KnowledgeCategory.EQUIPMENT_OPERATION,
      type: KnowledgeType.MANUAL,
      publishTime: '2024-01-25 13:20:00',
      viewCount: 567,
      author: '设备管理部',
      summary: '破碎站设备的日常维护、定期保养和常见故障处理方法。',
      content: '破碎站是矿山生产的关键设备...\n\n一、日常维护\n1.1 每日检查项目\n1.2 润滑要求\n\n二、定期保养\n2.1 周保养\n2.2 月保养\n2.3 季度保养...',
      tags: ['破碎站', '设备维护', '保养手册'],
      fileUrl: '/mock/files/crusher-maintenance.pdf',
      fileSize: '6.7MB',
    },
    {
      id: 'K008',
      title: '带式输送机安全操作规范',
      category: KnowledgeCategory.EQUIPMENT_OPERATION,
      type: KnowledgeType.REGULATION,
      publishTime: '2024-02-28 15:10:00',
      viewCount: 789,
      author: '安全管理部',
      summary: '带式输送机的安全操作规程，包括启动、运行、停机和应急处理。',
      content: '带式输送机操作人员必须遵守以下规定...\n\n一、基本要求\n1.1 必须经过培训合格后上岗\n1.2 熟悉设备性能和结构\n\n二、操作规程\n2.1 启动前检查...\n2.2 正常运行...',
      tags: ['输送机', '安全操作', '设备规范'],
      fileUrl: '/mock/files/conveyor-safety.pdf',
      fileSize: '2.0MB',
    },

    // 环保规范类 (4条)
    {
      id: 'K009',
      title: '矿山大气污染物排放标准',
      category: KnowledgeCategory.ENVIRONMENTAL,
      type: KnowledgeType.REGULATION,
      publishTime: '2024-01-10 09:00:00',
      viewCount: 445,
      author: '环保管理部',
      summary: '矿山大气污染物的排放限值、监测要求和达标标准。',
      content: '为保护大气环境，特制定本标准...\n\n一、适用范围\n1.1 本标准适用于所有露天矿山\n\n二、排放限值\n2.1 颗粒物：1.0mg/m³\n2.2 二氧化硫：550mg/m³...',
      tags: ['大气污染', '排放标准', '环保'],
      fileUrl: '/mock/files/air-emission-standard.pdf',
      fileSize: '1.8MB',
    },
    {
      id: 'K010',
      title: '矿山废水处理技术规范',
      category: KnowledgeCategory.ENVIRONMENTAL,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-03-10 11:30:00',
      viewCount: 623,
      author: '环保管理部',
      summary: '矿山生产废水的处理工艺、排放标准和回用要求。',
      content: '矿山废水主要包括矿井水、生活污水...\n\n一、废水来源\n1.1 矿井涌水\n1.2 生产废水\n\n二、处理工艺\n2.1 沉淀处理\n2.2 过滤处理\n2.3 消毒处理...',
      tags: ['废水处理', '环保技术', '水处理'],
      fileUrl: '/mock/files/wastewater-treatment.pdf',
      fileSize: '3.5MB',
    },
    {
      id: 'K011',
      title: '矿山固废堆存管理规范',
      category: KnowledgeCategory.ENVIRONMENTAL,
      type: KnowledgeType.REGULATION,
      publishTime: '2024-02-20 14:50:00',
      viewCount: 356,
      author: '环保管理部',
      summary: '矿山固体废弃物的分类、堆存、处置和监测要求。',
      content: '矿山固废主要包括剥离物、废石...\n\n一、固废分类\n1.1 一般固废\n1.2 危险废物\n\n二、堆存要求\n2.1 排土场选址\n2.2 堆存方式\n2.3 防渗措施...',
      tags: ['固废管理', '排土场', '环保规范'],
      fileUrl: '/mock/files/solid-waste-management.pdf',
      fileSize: '2.9MB',
    },
    {
      id: 'K012',
      title: '矿山噪声控制技术措施',
      category: KnowledgeCategory.ENVIRONMENTAL,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-01-30 10:15:00',
      viewCount: 289,
      author: '环保管理部',
      summary: '矿山主要噪声源的控制措施和防护要求。',
      content: '矿山主要噪声源包括爆破、钻探、运输...\n\n一、噪声源识别\n1.1 固定噪声源\n1.2 移动噪声源\n\n二、控制措施\n2.1 声源控制\n2.2 传播途径控制\n2.3 接收者防护...',
      tags: ['噪声控制', '环保措施', '职业健康'],
      fileUrl: '/mock/files/noise-control.pdf',
      fileSize: '1.5MB',
    },

    // 生产工艺类 (4条)
    {
      id: 'K013',
      title: '露天矿采剥工艺流程',
      category: KnowledgeCategory.PRODUCTION_PROCESS,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-02-05 16:20:00',
      viewCount: 1876,
      author: '生产技术部',
      summary: '详细介绍露天矿的采掘、运输、排土等主要工艺流程和作业方法。',
      content: '露天开采主要包括穿孔、爆破、采装、运输...\n\n一、穿孔作业\n1.1 钻孔设备选型\n1.2 钻孔布置\n\n二、爆破作业\n2.1 爆破设计\n2.2 爆破施工...',
      tags: ['采剥工艺', '生产流程', '露天开采'],
      fileUrl: '/mock/files/mining-process.pdf',
      fileSize: '8.3MB',
      coverImage: '/mock/images/knowledge-mining.jpg',
    },
    {
      id: 'K014',
      title: '矿山爆破安全操作规程',
      category: KnowledgeCategory.PRODUCTION_PROCESS,
      type: KnowledgeType.REGULATION,
      publishTime: '2024-03-15 09:45:00',
      viewCount: 1432,
      author: '安全管理部',
      summary: '爆破作业的安全规程，包括爆破设计、炸药管理、警戒撤离等。',
      content: '爆破作业是高危作业，必须严格遵守...\n\n一、爆破设计\n1.1 设计资质要求\n1.2 设计内容\n\n二、炸药管理\n2.1 储存要求\n2.2 运输要求\n2.3 使用要求...',
      tags: ['爆破', '安全操作', '高危作业'],
      fileUrl: '/mock/files/blasting-safety.pdf',
      fileSize: '4.5MB',
    },
    {
      id: 'K015',
      title: '矿山运输组织优化方案',
      category: KnowledgeCategory.PRODUCTION_PROCESS,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-02-25 13:40:00',
      viewCount: 567,
      author: '生产调度部',
      summary: '优化矿山运输系统，提高运输效率，降低运输成本的方法和措施。',
      content: '运输成本占矿山生产成本的40%以上...\n\n一、运输系统优化\n1.1 道路布置\n1.2 车辆调度\n\n二、效率提升措施\n2.1 缩短运距\n2.2 减少等待时间...',
      tags: ['运输优化', '调度管理', '成本控制'],
      fileUrl: '/mock/files/transport-optimization.pdf',
      fileSize: '3.2MB',
    },
    {
      id: 'K016',
      title: '矿山选矿工艺流程说明',
      category: KnowledgeCategory.PRODUCTION_PROCESS,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-01-18 11:25:00',
      viewCount: 834,
      author: '生产技术部',
      summary: '煤炭洗选的工艺流程、设备配置和质量控制标准。',
      content: '选矿是提高煤炭质量的重要环节...\n\n一、选矿方法\n1.1 重选\n1.2 浮选\n\n二、工艺流程\n2.1 原煤准备\n2.2 分选作业\n2.3 产品脱水...',
      tags: ['选矿工艺', '煤炭洗选', '质量控制'],
      fileUrl: '/mock/files/coal-preparation.pdf',
      fileSize: '5.6MB',
    },

    // 应急处置类 (4条)
    {
      id: 'K017',
      title: '矿山边坡失稳应急预案',
      category: KnowledgeCategory.EMERGENCY_RESPONSE,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-03-20 15:30:00',
      viewCount: 1123,
      author: '应急管理部',
      summary: '边坡失稳事故的应急响应流程、救援措施和人员疏散方案。',
      content: '边坡失稳是矿山重大安全事故...\n\n一、预警信号\n1.1 监测数据异常\n1.2 现场发现裂缝\n\n二、应急响应\n2.1 启动应急预案\n2.2 人员疏散\n2.3 救援措施...',
      tags: ['边坡失稳', '应急预案', '事故救援'],
      fileUrl: '/mock/files/slope-emergency.pdf',
      fileSize: '2.8MB',
    },
    {
      id: 'K018',
      title: '矿山火灾应急处理流程',
      category: KnowledgeCategory.EMERGENCY_RESPONSE,
      type: KnowledgeType.REGULATION,
      publishTime: '2024-02-12 10:00:00',
      viewCount: 956,
      author: '消防管理部',
      summary: '矿山火灾的分类、报警方式、灭火方法和人员逃生路线。',
      content: '矿山火灾主要分为外因火灾和内因火灾...\n\n一、火灾分类\n1.1 电气火灾\n1.2 油料火灾\n1.3 煤炭自燃\n\n二、应急处理\n2.1 报警程序\n2.2 初期灭火\n2.3 人员疏散...',
      tags: ['火灾应急', '消防', '安全逃生'],
      fileUrl: '/mock/files/fire-emergency.pdf',
      fileSize: '1.9MB',
    },
    {
      id: 'K019',
      title: '矿山人员伤亡事故应急处置',
      category: KnowledgeCategory.EMERGENCY_RESPONSE,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-01-22 14:10:00',
      viewCount: 1345,
      author: '应急管理部',
      summary: '人员伤亡事故的现场急救、医疗救护和事故报告流程。',
      content: '人员伤亡事故的及时处置至关重要...\n\n一、现场急救\n1.1 伤情判断\n1.2 急救措施\n1.3 拨打120\n\n二、医疗救护\n2.1 现场救护\n2.2 转送医院\n\n三、事故报告...',
      tags: ['人员伤亡', '急救', '事故处理'],
      fileUrl: '/mock/files/injury-emergency.pdf',
      fileSize: '2.3MB',
    },
    {
      id: 'K020',
      title: '矿山恶劣天气应对措施',
      category: KnowledgeCategory.EMERGENCY_RESPONSE,
      type: KnowledgeType.DOCUMENT,
      publishTime: '2024-03-08 08:45:00',
      viewCount: 678,
      author: '生产调度部',
      summary: '暴雨、大风、雷电等恶劣天气下的停工标准和安全措施。',
      content: '恶劣天气严重影响矿山作业安全...\n\n一、预警标准\n1.1 暴雨预警\n1.2 大风预警\n1.3 雷电预警\n\n二、应对措施\n2.1 停工标准\n2.2 设备防护\n2.3 人员撤离...',
      tags: ['恶劣天气', '停工标准', '安全措施'],
      fileUrl: '/mock/files/weather-response.pdf',
      fileSize: '1.6MB',
    },
  ]

  return knowledgeList
}

// 模拟数据库
const mockKnowledgeList = generateKnowledgeData()
const mockFavoriteSet = new Set<string>() // 收藏ID集合

// 分类统计接口
interface CategoryStats {
  category: KnowledgeCategory
  categoryName: string
  count: number
}

export default defineMock({
  // 获取资料列表（支持分页和筛选）
  '[GET]/api/knowledge/list': ({ query }) => {
    console.log('[Mock] GET /api/knowledge/list', query)

    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10
    const category = query.category as KnowledgeCategory | undefined
    const keyword = (query.keyword as string) || ''

    // 筛选数据
    let filteredList = mockKnowledgeList

    // 按分类筛选
    if (category) {
      filteredList = filteredList.filter(item => item.category === category)
    }

    // 按关键词搜索（标题和内容）
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase()
      filteredList = filteredList.filter(item =>
        item.title.toLowerCase().includes(lowerKeyword)
        || item.summary.toLowerCase().includes(lowerKeyword)
        || item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)),
      )
    }

    // 排序：按发布时间倒序
    filteredList.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())

    // 分页
    const total = filteredList.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedList = filteredList.slice(startIndex, endIndex)
    const hasMore = endIndex < total

    return {
      code: 200,
      message: '获取成功',
      data: {
        list: paginatedList,
        total,
        page,
        pageSize,
        hasMore,
      },
    }
  },

  // 获取资料详情
  '[GET]/api/knowledge/{id}': ({ params }) => {
    console.log(`[Mock] GET /api/knowledge/${params.id}`)

    const id = params.id as string
    const item = mockKnowledgeList.find(k => k.id === id)

    if (!item) {
      return {
        code: 404,
        message: '资料不存在',
        data: null,
      }
    }

    // 增加浏览量
    item.viewCount += 1

    return {
      code: 200,
      message: '获取成功',
      data: {
        ...item,
        isFavorite: mockFavoriteSet.has(id),
      },
    }
  },

  // 获取分类统计
  '[GET]/api/knowledge/categories/stats': () => {
    console.log('[Mock] GET /api/knowledge/categories/stats')

    const stats: CategoryStats[] = Object.values(KnowledgeCategory).map((category) => {
      const count = mockKnowledgeList.filter(item => item.category === category).length
      return {
        category,
        categoryName: CATEGORY_NAMES[category],
        count,
      }
    })

    return {
      code: 200,
      message: '获取成功',
      data: stats,
    }
  },

  // 收藏/取消收藏
  '[POST]/api/knowledge/{id}/favorite': ({ params }) => {
    console.log(`[Mock] POST /api/knowledge/${params.id}/favorite`)

    const id = params.id as string
    const item = mockKnowledgeList.find(k => k.id === id)

    if (!item) {
      return {
        code: 404,
        message: '资料不存在',
        data: null,
      }
    }

    // 切换收藏状态
    if (mockFavoriteSet.has(id)) {
      mockFavoriteSet.delete(id)
      return {
        code: 200,
        message: '已取消收藏',
        data: {
          id,
          isFavorite: false,
        },
      }
    }
    else {
      mockFavoriteSet.add(id)
      return {
        code: 200,
        message: '收藏成功',
        data: {
          id,
          isFavorite: true,
        },
      }
    }
  },

  // 获取我的收藏
  '[GET]/api/knowledge/favorites': ({ query }) => {
    console.log('[Mock] GET /api/knowledge/favorites', query)

    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10

    // 获取收藏的资料
    const favoriteList = mockKnowledgeList.filter(item => mockFavoriteSet.has(item.id))

    // 按收藏时间倒序（这里简化为按ID倒序）
    favoriteList.sort((a, b) => b.id.localeCompare(a.id))

    // 分页
    const total = favoriteList.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedList = favoriteList.slice(startIndex, endIndex)
    const hasMore = endIndex < total

    return {
      code: 200,
      message: '获取成功',
      data: {
        list: paginatedList,
        total,
        page,
        pageSize,
        hasMore,
      },
    }
  },

  // 搜索资料
  '[GET]/api/knowledge/search': ({ query }) => {
    console.log('[Mock] GET /api/knowledge/search', query)

    const keyword = (query.keyword as string) || ''
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10

    if (!keyword) {
      return {
        code: 400,
        message: '搜索关键词不能为空',
        data: null,
      }
    }

    // 模糊搜索（标题、内容、标签）
    const lowerKeyword = keyword.toLowerCase()
    const searchResults = mockKnowledgeList.filter(item =>
      item.title.toLowerCase().includes(lowerKeyword)
      || item.summary.toLowerCase().includes(lowerKeyword)
      || item.content.toLowerCase().includes(lowerKeyword)
      || item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)),
    )

    // 按相关度排序（标题匹配优先）
    searchResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(lowerKeyword)
      const bTitleMatch = b.title.toLowerCase().includes(lowerKeyword)
      if (aTitleMatch && !bTitleMatch)
        return -1
      if (!aTitleMatch && bTitleMatch)
        return 1
      return b.viewCount - a.viewCount // 同等条件下按浏览量排序
    })

    // 分页
    const total = searchResults.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedList = searchResults.slice(startIndex, endIndex)
    const hasMore = endIndex < total

    return {
      code: 200,
      message: '搜索成功',
      data: {
        list: paginatedList,
        total,
        page,
        pageSize,
        hasMore,
        keyword,
      },
    }
  },

  // 下载资料
  '[GET]/api/knowledge/{id}/download': ({ params }) => {
    console.log(`[Mock] GET /api/knowledge/${params.id}/download`)

    const id = params.id as string
    const item = mockKnowledgeList.find(k => k.id === id)

    if (!item) {
      return {
        code: 404,
        message: '资料不存在',
        data: null,
      }
    }

    if (!item.fileUrl) {
      return {
        code: 400,
        message: '该资料不支持下载',
        data: null,
      }
    }

    // 模拟下载链接
    return {
      code: 200,
      message: '获取下载链接成功',
      data: {
        id: item.id,
        title: item.title,
        fileUrl: item.fileUrl,
        fileSize: item.fileSize || '未知',
        downloadToken: `download_token_${Date.now()}`,
        expireTime: new Date(Date.now() + 3600000).toISOString(), // 1小时后过期
      },
    }
  },

  // 记录浏览
  '[POST]/api/knowledge/{id}/view': ({ params }) => {
    console.log(`[Mock] POST /api/knowledge/${params.id}/view`)

    const id = params.id as string
    const item = mockKnowledgeList.find(k => k.id === id)

    if (!item) {
      return {
        code: 404,
        message: '资料不存在',
        data: null,
      }
    }

    // 增加浏览量
    item.viewCount += 1

    return {
      code: 200,
      message: '记录成功',
      data: {
        id: item.id,
        viewCount: item.viewCount,
      },
    }
  },
}, true)
