"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapHeatmap } from "@/components/map-heatmap"
import { HeatmapLegend } from "@/components/heatmap-legend"
import { Filter, Download, RefreshCw } from "lucide-react"

const timeSlots = [
  { value: "all", label: "전체 시간" },
  { value: "morning", label: "오전 (06-12시)" },
  { value: "afternoon", label: "오후 (12-18시)" },
  { value: "evening", label: "저녁 (18-24시)" },
  { value: "night", label: "심야 (00-06시)" },
]

const dayTypes = [
  { value: "all", label: "전체 요일" },
  { value: "weekday", label: "평일" },
  { value: "weekend", label: "주말" },
  { value: "holiday", label: "공휴일" },
]

const regions = [
  { value: "all", label: "전체 지역" },
  { value: "gangnam", label: "강남구" },
  { value: "seocho", label: "서초구" },
  { value: "songpa", label: "송파구" },
  { value: "gangdong", label: "강동구" },
]

export default function HeatmapPage() {
  const [selectedTime, setSelectedTime] = useState("all")
  const [selectedDay, setSelectedDay] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleExport = () => {
    // Export functionality
    console.log("Exporting heatmap data...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="교통취약지 히트맵"
            description="MST-GCN 예측 수요와 서비스 소외 지역을 시각화하여 신규 노선 및 거점 설정을 지원합니다"
          />

          {/* Controls */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                필터 설정
              </CardTitle>
              <CardDescription>분석할 시간대, 요일, 지역을 선택하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">시간대</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">요일</label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dayTypes.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">지역</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={handleRefresh} disabled={isLoading} className="flex-1">
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                    새로고침
                  </Button>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    내보내기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>교통취약지 분포 현황</CardTitle>
                  <CardDescription>
                    빨간색: 높은 수요 + 서비스 부족, 파란색: 낮은 수요, 초록색: 서비스 충분
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                    <MapHeatmap
                      timeFilter={selectedTime}
                      dayFilter={selectedDay}
                      regionFilter={selectedRegion}
                      isLoading={isLoading}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Legend and Stats */}
            <div className="space-y-6">
              <HeatmapLegend />

              <Card>
                <CardHeader>
                  <CardTitle>분석 결과</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">고위험 지역</span>
                    <Badge variant="destructive">8개 구역</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">중위험 지역</span>
                    <Badge variant="secondary">15개 구역</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">안정 지역</span>
                    <Badge variant="default">23개 구역</Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">
                        <strong>우선 개선 필요:</strong> 강남구 역삼동, 서초구 방배동
                      </p>
                      <p>
                        <strong>예상 효과:</strong> 신규 거점 3개소 추가 시 서비스율 12% 향상 예상
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>실시간 알림</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">긴급</p>
                      <p className="text-red-600">강남역 인근 수요 급증 (평소 대비 +45%)</p>
                      <p className="text-xs text-red-500 mt-1">5분 전</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 font-medium">주의</p>
                      <p className="text-yellow-600">송파구 잠실동 서비스 공백 발생</p>
                      <p className="text-xs text-yellow-500 mt-1">12분 전</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
