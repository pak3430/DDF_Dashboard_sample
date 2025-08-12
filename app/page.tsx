import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  MapPin,
  TrendingUp,
  AlertCircle,
  DollarSign,
  HelpCircle,
  Cloud,
  Building,
} from "lucide-react"

const stats = [
  {
    name: "총 서비스 지역",
    value: "12개 구역",
    icon: MapPin,
    change: "+2개",
    changeType: "positive" as const,
  },
  {
    name: "일평균 이용자",
    value: "1,247명",
    icon: Users,
    change: "+12.5%",
    changeType: "positive" as const,
  },
  {
    name: "평균 대기시간",
    value: "8.3분",
    icon: TrendingUp,
    change: "-2.1분",
    changeType: "positive" as const,
  },
  {
    name: "서비스율",
    value: "94.2%",
    icon: BarChart3,
    change: "+1.8%",
    changeType: "positive" as const,
  },
  {
    name: "월 운영비용",
    value: "2,850만원",
    icon: DollarSign,
    change: "-5.2%",
    changeType: "positive" as const,
  },
  {
    name: "문제 지역",
    value: "3개 구역",
    icon: AlertCircle,
    change: "-1개",
    changeType: "positive" as const,
  },
]

const quickActions = [
  {
    title: "교통취약지 분석",
    description: "수요 집중 구역과 미서비스 구역을 히트맵으로 확인",
    href: "/heatmap",
    icon: MapPin,
    category: "분석",
  },
  {
    title: "실시간 수요예측",
    description: "거점별 24시간 수요 변화 패턴 분석",
    href: "/demand-forecast",
    icon: TrendingUp,
    category: "분석",
  },
  {
    title: "POI 오버레이 분석",
    description: "주요 시설물과 DRT 수요 패턴의 상관관계 분석",
    href: "/poi-analysis",
    icon: Building,
    category: "분석",
    isNew: true,
  },
  {
    title: "외부 변수 영향 분석",
    description: "날씨, 이벤트, 휴일이 수요에 미치는 영향 분석",
    href: "/external-factors",
    icon: Cloud,
    category: "분석",
    isNew: true,
  },
  {
    title: "예산 시뮬레이션",
    description: "차량 대수별 운영비용과 예상 효과 계산",
    href: "/budget-simulator",
    icon: DollarSign,
    category: "계획",
  },
  {
    title: "효과 검증",
    description: "도입 전후 교통 패턴 변화 및 성과 분석",
    href: "/impact-analysis",
    icon: BarChart3,
    category: "검증",
  },
  {
    title: "정책 질문 가이드",
    description: "주요 정책 질문에 대응하는 기능을 빠르게 찾기",
    href: "/policy-guide",
    icon: HelpCircle,
    category: "가이드",
    isNew: true,
  },
]

const groupedActions = quickActions.reduce(
  (acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = []
    }
    acc[action.category].push(action)
    return acc
  },
  {} as Record<string, typeof quickActions>,
)

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="MST-GCN 기반 DRT 대시보드"
            description="수요응답형 교통 서비스의 정책 의사결정을 지원하는 통합 분석 시스템"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change} 전월 대비</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">주요 기능</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                3개 신규 기능 추가
              </Badge>
            </div>

            {Object.entries(groupedActions).map(([category, actions]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {actions.map((action) => (
                    <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer relative">
                      {action.isNew && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">NEW</Badge>
                      )}
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <action.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{action.title}</CardTitle>
                            <CardDescription className="mt-1 text-sm">{action.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>시스템 상태</CardTitle>
                <CardDescription>MST-GCN 모델 및 데이터 수집 상태</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">MST-GCN 모델 상태</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">정상 운영</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">실시간 데이터 수집</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">연결됨</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">외부 API 연동</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">정상</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">POI 데이터 동기화</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">완료</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">마지막 업데이트</span>
                    <span className="text-sm text-gray-600">2분 전</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>최근 업데이트</CardTitle>
                <CardDescription>새로 추가된 기능 및 개선사항</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-500 text-white text-xs mt-1">NEW</Badge>
                    <div>
                      <div className="text-sm font-medium">POI 오버레이 분석</div>
                      <div className="text-xs text-gray-600">주요 시설물과 수요 패턴 상관관계 분석 기능</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-500 text-white text-xs mt-1">NEW</Badge>
                    <div>
                      <div className="text-sm font-medium">외부 변수 통합</div>
                      <div className="text-xs text-gray-600">날씨, 이벤트, 휴일 영향 분석 기능</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-500 text-white text-xs mt-1">NEW</Badge>
                    <div>
                      <div className="text-sm font-medium">정책 질문 가이드</div>
                      <div className="text-xs text-gray-600">질문 기반 기능 매핑 및 가이드 시스템</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-500 text-white text-xs mt-1">UPD</Badge>
                    <div>
                      <div className="text-sm font-medium">효과 검증 강화</div>
                      <div className="text-xs text-gray-600">버스 탑승률 비교 및 대체효과 분석 추가</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
