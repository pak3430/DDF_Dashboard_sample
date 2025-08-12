"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface BeforeAfterComparisonProps {
  period: string
  region: string
}

export function BeforeAfterComparison({ period, region }: BeforeAfterComparisonProps) {
  const comparisonData = [
    {
      metric: "일평균 이용객",
      before: 1240,
      after: 1680,
      unit: "명",
      change: 35.5,
      trend: "up",
    },
    {
      metric: "평균 대기시간",
      before: 18.5,
      after: 12.3,
      unit: "분",
      change: -33.5,
      trend: "down",
    },
    {
      metric: "서비스 만족도",
      before: 3.2,
      after: 4.4,
      unit: "/5.0",
      change: 37.5,
      trend: "up",
    },
    {
      metric: "월 운영비용",
      before: 3800,
      after: 3100,
      unit: "만원",
      change: -18.4,
      trend: "down",
    },
    {
      metric: "커버리지",
      before: 68,
      after: 92,
      unit: "%",
      change: 35.3,
      trend: "up",
    },
    {
      metric: "차량 활용률",
      before: 62,
      after: 78,
      unit: "%",
      change: 25.8,
      trend: "up",
    },
  ]

  const monthlyTrendData = [
    { month: "도입 전 6개월", traditional: 1240, drt: 0 },
    { month: "도입 1개월", traditional: 980, drt: 420 },
    { month: "도입 2개월", traditional: 850, drt: 680 },
    { month: "도입 3개월", traditional: 720, drt: 890 },
    { month: "도입 4개월", traditional: 580, drt: 1120 },
    { month: "도입 5개월", traditional: 450, drt: 1340 },
    { month: "도입 6개월", traditional: 320, drt: 1680 },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === "up" && isPositive) return "text-green-600"
    if (trend === "down" && isPositive) return "text-green-600"
    if (trend === "up" && !isPositive) return "text-red-600"
    if (trend === "down" && !isPositive) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonData.map((item, index) => {
          const isPositiveChange =
            item.metric === "평균 대기시간" || item.metric === "월 운영비용" ? item.change < 0 : item.change > 0

          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-sm">{item.metric}</h4>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(item.trend, isPositiveChange)}`}>
                      {item.change > 0 ? "+" : ""}
                      {item.change.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">도입 전</span>
                    <span className="text-sm font-medium">
                      {item.before.toLocaleString()}
                      {item.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">도입 후</span>
                    <span className="text-sm font-bold text-blue-600">
                      {item.after.toLocaleString()}
                      {item.unit}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <Badge variant={isPositiveChange ? "default" : "destructive"} className="text-xs">
                    {isPositiveChange ? "개선" : "악화"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Monthly Transition Chart */}
      <Card>
        <CardHeader>
          <CardTitle>이용객 전환 추이</CardTitle>
          <CardDescription>기존 교통수단에서 DRT로의 점진적 전환 과정</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="traditional" stroke="#ef4444" strokeWidth={2} name="기존 교통수단" />
                <Line type="monotone" dataKey="drt" stroke="#3b82f6" strokeWidth={2} name="DRT 서비스" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Service Quality Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>서비스 품질 비교</CardTitle>
            <CardDescription>도입 전후 주요 서비스 지표 변화</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="before" fill="#94a3b8" name="도입 전" />
                  <Bar dataKey="after" fill="#3b82f6" name="도입 후" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주요 성과 요약</CardTitle>
            <CardDescription>DRT 도입으로 인한 핵심 개선 사항</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800 mb-2">✓ 접근성 대폭 개선</div>
                <div className="text-sm text-green-700">교통소외지역 커버리지 68% → 92% (24%p 증가)</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800 mb-2">✓ 이용자 만족도 향상</div>
                <div className="text-sm text-blue-700">평균 만족도 3.2 → 4.4점 (37.5% 개선)</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-800 mb-2">✓ 운영 효율성 증대</div>
                <div className="text-sm text-purple-700">차량 활용률 62% → 78% (25.8% 향상)</div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="font-medium text-orange-800 mb-2">✓ 비용 효율성 달성</div>
                <div className="text-sm text-orange-700">월 운영비 3,800만원 → 3,100만원 (18.4% 절감)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
